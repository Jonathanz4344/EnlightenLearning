import { createElement as h } from "react";
import Box from "@mui/material/Box";
import { camelToKebab } from "../../theme/tokens";
import { seasonVar } from "./shared";
import NavbarGarland from "./NavbarGarland";
import FooterScene from "./FooterScene";
// Pulled in here so every season shares one chunk for them
import "./Drift";
import "./Burst";
import "./sceneryKit";

// What a season's chunk hands to the page: its palette, the parts that go in
// each slot, and the art of the fundraising balloon. The palette goes in as CSS
// variables before anything of the season is drawn.

// Garland helpers: charms under flags hang long, the others short
export const hang = (charms, short, long) => charms.map((charm, i) => ({ ...charm, thread: i % 2 === 0 ? short : long }));
export const flagColors = (...names) => names.map(seasonVar);
export const lightColors = () => [1, 2, 3, 4].map((i) => seasonVar(`lights-${i}`));

function variables(colors) {
  const entries = [
    ["accent", colors.accent],
    ["accent-soft", colors.accentSoft],
    ["tint", colors.tint],
    ["on-accent", colors.onAccent],
  ];
  Object.entries(colors.decor).forEach(([key, value]) => {
    if (Array.isArray(value)) value.forEach((v, i) => entries.push([`${camelToKebab(key)}-${i + 1}`, v]));
    else entries.push([camelToKebab(key), value]);
  });
  return entries.map(([name, value]) => `--el-season-${name}:${value};`).join("");
}

export default function defineSeason({ name, tokens, garland, footer, Effects, Scenery, balloon, Mark }) {
  function Garland() {
    return h(NavbarGarland, { theme: garland });
  }

  function Footer() {
    return h(FooterScene, footer);
  }

  function Sky() {
    // No stacking context of its own, so the pieces stay level with the ground and below the numbers
    return h(Box, { "aria-hidden": "true", sx: { pointerEvents: "none", "@media print": { display: "none" } } }, h(Scenery));
  }

  return {
    name,
    tokens,
    balloon,
    Effects,
    Mark,
    Garland,
    FooterScene: Footer,
    Scenery: Sky,
    install() {
      if (document.getElementById(`el-season-${name}`)) return;
      const style = document.createElement("style");
      style.id = `el-season-${name}`;
      style.textContent = `:root[data-season="${name}"]{${variables(tokens.light)}}:root[data-theme="dark"][data-season="${name}"]{${variables(tokens.dark)}}`;
      document.head.appendChild(style);
    },
  };
}
