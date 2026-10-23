// Verification run against a server (dev or preview):
// Needs playwright: npm i -D playwright, then npx playwright install chromium (not added to package.json).
//   node scripts/verify.cjs --base http://localhost:4180
// For every route: HTTP status, title, description, canonical, og:image,
// JSON-LD types, robots, computed fonts (body, h1, button), loaded font
// faces, horizontal overflow at phone width, cumulative layout shift during
// load, the LCP element, first-load JS transferred, console errors and
// failed requests. Also checks the manifest, robots.txt, sitemap.xml and the
// 404 page, and that the dark-mode canvas is painted before React runs.
const { chromium } = require("playwright");
const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const base = opt("base", "http://localhost:4180");
const routes = [
  "/",
  "/About/Our-Mission",
  "/About/Meet-Our-Team",
  "/Program/Tutoring-Services",
  "/Program/Making-a-Difference",
  "/Program/Events-Programs",
  "/Get-Involved/Volunteer-Opportunities",
  "/Get-Involved/Apply-as-Tutor",
  "/Get-Involved/Join-Exec-Team",
  "/Contact-Us",
  "/Donate-Now",
  "/our-impact",
  "/this-page-does-not-exist",
];
const THIRD_PARTY = /facebook\.com|fbcdn\.net|instagram\.com|cdninstagram\.com|fburl\.com|web-share|upgrade-insecure-requests|ErrorUtils/;

(async () => {
  const browser = await chromium.launch();
  const rows = [];
  const problems = [];
  for (const route of routes) {
    for (const width of [1280, 390]) {
      const context = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, isMobile: width < 600, deviceScaleFactor: 1 });
      const page = await context.newPage();
      const consoleIssues = [];
      const failed = [];
      let jsBytes = 0;
      let cssBytes = 0;
      page.on("console", (m) => {
        if (["error", "warning"].includes(m.type()) && !THIRD_PARTY.test(m.text())) consoleIssues.push(`${m.type()}: ${m.text().slice(0, 160)}`);
      });
      page.on("pageerror", (e) => consoleIssues.push(`pageerror: ${String(e).slice(0, 160)}`));
      page.on("response", async (res) => {
        const url = res.url();
        if (res.status() >= 400 && !THIRD_PARTY.test(url)) failed.push(`${res.status()} ${url.slice(0, 120)}`);
        if (url.startsWith(base)) {
          try {
            const body = await res.body();
            if (/\.js(\?|$)/.test(url)) jsBytes += body.length;
            if (/\.css(\?|$)/.test(url)) cssBytes += body.length;
          } catch {
            /* streamed */
          }
        }
      });
      await page.addInitScript(() => {
        window.__cls = 0;
        window.__lcp = null;
        try {
          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
          }).observe({ type: "layout-shift", buffered: true });
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            if (last) window.__lcp = { time: Math.round(last.startTime), element: last.element ? last.element.tagName + (last.element.id ? "#" + last.element.id : "") + (last.element.className && typeof last.element.className === "string" ? "." + last.element.className.split(" ")[0] : "") : null, url: last.url || null, size: last.size };
          }).observe({ type: "largest-contentful-paint", buffered: true });
        } catch (e) {
          /* not supported */
        }
      });
      const res = await page.goto(base + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const info = await page.evaluate(() => {
        const cf = (sel) => {
          const el = document.querySelector(sel);
          return el ? getComputedStyle(el).fontFamily.split(",")[0].replace(/"/g, "") : "(none)";
        };
        const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => {
          try {
            const v = JSON.parse(s.textContent);
            return (Array.isArray(v) ? v : [v]).map((r) => (Array.isArray(r["@type"]) ? r["@type"].join("+") : r["@type"]));
          } catch {
            return ["(invalid)"];
          }
        });
        return {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content || "",
          canonical: document.querySelector('link[rel="canonical"]')?.href || "",
          ogImage: document.querySelector('meta[property="og:image"]')?.content || "",
          robots: document.querySelector('meta[name="robots"]')?.content || "",
          jsonLd: ld,
          h1: document.querySelector("h1")?.textContent?.trim() || "(none)",
          h1Count: document.querySelectorAll("h1").length,
          bodyFont: cf("body"),
          h1Font: cf("h1"),
          buttonFont: cf("button"),
          loadedFaces: [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family))],
          overflow: document.documentElement.scrollWidth > window.innerWidth + 1 ? `${document.documentElement.scrollWidth}>${window.innerWidth}` : "",
          cls: Number(window.__cls.toFixed(4)),
          lcp: window.__lcp,
          theme: document.documentElement.getAttribute("data-theme"),
          hexInStyles: (() => {
            // Inline style attributes with hex colors, a sign a component wrote a literal
            return [...document.querySelectorAll("[style*='#']")].filter((el) => /#[0-9a-fA-F]{3,8}/.test(el.getAttribute("style")) && !el.closest("iframe")).length;
          })(),
        };
      });
      const row = { route, width, status: res.status(), ...info, jsKB: Math.round(jsBytes / 1024), cssKB: Math.round(cssBytes / 1024), consoleIssues, failed };
      rows.push(row);
      if (!info.title || info.title === "Enlighten Learning") problems.push(`${route}@${width}: generic or missing title`);
      if (!info.description) problems.push(`${route}@${width}: missing description`);
      if (!info.canonical.endsWith(route === "/" ? "/" : route) && route !== "/this-page-does-not-exist") problems.push(`${route}@${width}: canonical ${info.canonical}`);
      if (!info.ogImage) problems.push(`${route}@${width}: missing og:image`);
      if (!info.jsonLd.length) problems.push(`${route}@${width}: no JSON-LD`);
      if (info.overflow) problems.push(`${route}@${width}: horizontal overflow ${info.overflow}`);
      if (info.cls > 0.05) problems.push(`${route}@${width}: CLS ${info.cls}`);
      if (info.h1Count !== 1) problems.push(`${route}@${width}: ${info.h1Count} h1 elements`);
      if (info.bodyFont !== "Inter") problems.push(`${route}@${width}: body font ${info.bodyFont}`);
      if (info.h1Font !== "Fraunces") problems.push(`${route}@${width}: h1 font ${info.h1Font}`);
      if (info.hexInStyles) problems.push(`${route}@${width}: ${info.hexInStyles} inline hex style(s)`);
      consoleIssues.forEach((c) => problems.push(`${route}@${width}: ${c}`));
      failed.forEach((f) => problems.push(`${route}@${width}: failed ${f}`));
      await context.close();
    }
  }

  // Dark mode pre-paint: the html background must already be dark before any script module runs
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.addInitScript(() => {
      try {
        localStorage.setItem("el-mode", "dark");
      } catch (e) {
        /* ignore */
      }
    });
    const page = await context.newPage();
    await page.route("**/*.js", (r) => r.abort());
    await page.goto(base + "/", { waitUntil: "domcontentloaded" }).catch(() => {});
    const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor + " / " + document.documentElement.getAttribute("data-theme"));
    rows.push({ route: "(pre-paint, scripts blocked, dark remembered)", bg });
    if (!/rgb\(18, 16, 24\)/.test(bg)) problems.push(`pre-paint dark canvas not applied: ${bg}`);
    await context.close();
  }

  // Static files
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const file of ["/site.webmanifest", "/robots.txt", "/sitemap.xml", "/og/default.png", "/icons/icon-192.png", "/fonts/inter-latin-wght-normal.woff2", "/fonts/fraunces-latin-opsz-normal.woff2", "/definitely-missing.png"]) {
    const r = await page.request.get(base + file);
    const ct = r.headers()["content-type"] || "";
    rows.push({ route: file, status: r.status(), contentType: ct });
    if (file === "/definitely-missing.png" ? r.status() !== 404 && ct.includes("text/html") : r.status() !== 200) problems.push(`${file}: ${r.status()} ${ct}`);
  }
  await browser.close();

  console.log(JSON.stringify(rows, null, 1));
  console.log("\n=== PROBLEMS (" + problems.length + ")");
  problems.forEach((p) => console.log(" ", p));
})();
