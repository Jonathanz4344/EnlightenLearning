// Screenshot runner.
// Needs playwright: npm i -D playwright, then npx playwright install chromium (not added to package.json).
// node scripts/screenshots.cjs --base http://localhost:5180 --out shots/x --routes /,/About/Our-Mission --modes light,dark --widths 390,1280 [--full] [--motion] [--season halloween --date 2026-10-15] [--clip-header]
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const flag = (name) => args.includes(`--${name}`);

const base = opt("base", "http://localhost:5180");
const out = path.resolve(process.cwd(), opt("out", "shots/run"));
const routes = opt("routes", "/").split(",");
const modes = opt("modes", "light,dark").split(",");
const widths = opt("widths", "390,1280").split(",").map(Number);
const season = opt("season", null);
const style = opt("style", null);
const date = opt("date", null);
const full = flag("full");
const motion = flag("motion");
const clipHeader = flag("clip-header");
fs.mkdirSync(out, { recursive: true });

const slug = (route) => (route === "/" ? "home" : route.replace(/^\//, "").replace(/[\/?=&]/g, "_"));

(async () => {
  const browser = await chromium.launch();
  const issues = [];
  for (const width of widths) {
    for (const mode of modes) {
      const context = await browser.newContext({
        viewport: { width, height: width < 600 ? 844 : 900 },
        deviceScaleFactor: width < 600 ? 2 : 1,
        isMobile: width < 600,
        hasTouch: width < 600,
        reducedMotion: motion ? "no-preference" : "reduce",
        colorScheme: "light",
      });
      await context.addInitScript((m) => {
        try {
          localStorage.setItem("el-mode", m);
        } catch (e) {
          /* ignore */
        }
      }, mode);
      const page = await context.newPage();
      if (date) await page.clock.setFixedTime(new Date(date));
      page.on("console", (msg) => {
        if (["error", "warning"].includes(msg.type())) issues.push(`[${mode} ${width} console.${msg.type()}] ${msg.text().slice(0, 200)}`);
      });
      page.on("pageerror", (err) => issues.push(`[${mode} ${width} pageerror] ${String(err).slice(0, 200)}`));
      page.on("response", (res) => {
        if (res.status() >= 400) issues.push(`[${mode} ${width} http ${res.status()}] ${res.url().slice(0, 140)}`);
      });
      for (const route of routes) {
        const url = new URL(route, base);
        if (season) url.searchParams.set("season", season);
        if (style) url.searchParams.set("style", style);
        await page.goto(url.toString(), { waitUntil: "networkidle" });
        await page.waitForTimeout(motion ? 1800 : 500);
        if (full) {
          // Walk down the page so lazy images load and in-view reveals have fired, then return to the top
          await page.evaluate(async () => {
            const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
            for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
              window.scrollTo(0, y);
              await new Promise((r) => setTimeout(r, 60));
            }
            window.scrollTo(0, 0);
          });
          await page.waitForLoadState("networkidle").catch(() => {});
          await page.waitForTimeout(400);
        }
        const name = `${slug(route)}-${mode}-${width}${season ? "-" + season : ""}${style ? "-" + style : ""}.png`;
        if (clipHeader) {
          await page.screenshot({ path: path.join(out, name), clip: { x: 0, y: 0, width, height: 120 } });
        } else {
          await page.screenshot({ path: path.join(out, name), fullPage: full });
        }
        console.log("shot", name);
      }
      await context.close();
    }
  }
  await browser.close();
  const unique = [...new Set(issues)];
  console.log(`\nissues (${unique.length}):`);
  unique.slice(0, 60).forEach((i) => console.log(" ", i));
  fs.writeFileSync(path.join(out, "issues.txt"), unique.join("\n"));
})();
