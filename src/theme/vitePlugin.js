// Vite plugin that writes the design tokens into index.html before the
// application loads, so the first paint already has the right canvas color
// in dark mode, and that generates the web app manifest from the same tokens.
import { cssVariablesBlock, modes } from "./tokens.js";
import { site } from "../config/site.js";

export function tokensCss() {
  const parts = [
    `:root{${cssVariablesBlock("light")}}`,
    `:root[data-theme="dark"]{${cssVariablesBlock("dark")}}`,
    `html{background-color:var(--el-canvas);color:var(--el-text);color-scheme:light}`,
    `html[data-theme="dark"]{color-scheme:dark}`,
  ];
  return parts.join("\n");
}

export function manifestJson() {
  return JSON.stringify(
    {
      name: site.legalName,
      short_name: site.name,
      description: site.description,
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: modes.light.canvas,
      theme_color: modes.light.canvas,
      icons: [
        { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    null,
    2
  );
}

export default function tokensPlugin() {
  return {
    name: "enlighten-tokens",
    transformIndexHtml() {
      return [
        { tag: "style", attrs: { id: "el-tokens" }, children: tokensCss(), injectTo: "head-prepend" },
        { tag: "meta", attrs: { name: "theme-color", media: "(prefers-color-scheme: light)", content: modes.light.canvas }, injectTo: "head" },
        { tag: "meta", attrs: { name: "theme-color", media: "(prefers-color-scheme: dark)", content: modes.dark.canvas }, injectTo: "head" },
      ];
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.split("?")[0] === "/site.webmanifest") {
          res.setHeader("Content-Type", "application/manifest+json");
          res.end(manifestJson());
          return;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.split("?")[0] === "/site.webmanifest") {
          res.setHeader("Content-Type", "application/manifest+json");
          res.end(manifestJson());
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "site.webmanifest", source: manifestJson() });
    },
  };
}
