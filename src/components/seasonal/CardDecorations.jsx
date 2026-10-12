import PropTypes from "prop-types";
import GlobalStyles from "@mui/material/GlobalStyles";
import { SEASONS } from "../../constants/season";
import { buildWebPath } from "./shared";

// Seasonal touches on every card across the site: a cobweb in the top corner
// at Halloween, and a cap of snow with a sprig of holly at Christmas.
//
// Drawn with each card's ::after layer, because a few cards already use ::before
// for a colored bar along their top edge.

const svgUrl = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

const WEB_SIZE = 64;

// Cobweb anchored in the top-right corner
const cobweb = (color) =>
  svgUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WEB_SIZE} ${WEB_SIZE}">` +
      `<g transform="translate(${WEB_SIZE} 0) scale(-1 1)">` +
      `<path d="${buildWebPath(WEB_SIZE)}" fill="none" stroke="${color}" stroke-width="0.9" stroke-linecap="round"/>` +
      `</g></svg>`
  );

// One tile of snow that repeats along the top edge; both ends meet at the same height
const snowCap = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 14">` +
    `<path d="M0 0 H60 V6 C55 6 54 11 50 11 C46 11 46 7 41 7 C37 7 36 12 31 12 C27 12 26 6 20 6 C15 6 14 10 10 10 C6 10 5 6 0 6 Z" fill="#ffffff"/>` +
    `<path d="M60 6 C55 6 54 11 50 11 C46 11 46 7 41 7 C37 7 36 12 31 12 C27 12 26 6 20 6 C15 6 14 10 10 10 C6 10 5 6 0 6" fill="none" stroke="rgba(110, 150, 200, 0.45)" stroke-width="0.8"/>` +
    `</svg>`
);

const holly = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 26">` +
    `<ellipse cx="11" cy="11" rx="9.5" ry="4.4" transform="rotate(-22 11 11)" fill="#2e7d32"/>` +
    `<ellipse cx="25" cy="11" rx="9.5" ry="4.4" transform="rotate(22 25 11)" fill="#388e3c"/>` +
    `<path d="M3 14 L17 8 M33 14 L19 8" stroke="#1b5e20" stroke-width="0.8"/>` +
    `<circle cx="15.5" cy="15" r="2.8" fill="#d32f2f"/>` +
    `<circle cx="20.5" cy="15" r="2.8" fill="#c62828"/>` +
    `<circle cx="18" cy="19.2" r="2.8" fill="#e53935"/>` +
    `<circle cx="14.6" cy="14.1" r="0.8" fill="rgba(255, 255, 255, 0.7)"/>` +
    `</svg>`
);

const decoration = (season, isDark) => {
  if (season === SEASONS.HALLOWEEN) {
    return {
      top: 0,
      right: 0,
      width: WEB_SIZE,
      height: WEB_SIZE,
      backgroundImage: cobweb(isDark ? "rgba(230, 225, 245, 0.45)" : "rgba(80, 70, 100, 0.4)"),
      backgroundSize: "100% 100%",
    };
  }
  return {
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundImage: `${holly}, ${snowCap}`,
    backgroundRepeat: "no-repeat, repeat-x",
    // Holly on the right, clear of badges that sit in the top-left corner of some cards
    backgroundPosition: "right 10px top 4px, 0 0",
    backgroundSize: "36px 26px, 60px 14px",
  };
};

export default function CardDecorations({ season, mode }) {
  if (season !== SEASONS.HALLOWEEN && season !== SEASONS.CHRISTMAS) return null;

  return (
    <GlobalStyles
      styles={{
        ".MuiCard-root": { position: "relative" },
        ".MuiCard-root::after": {
          content: '""',
          position: "absolute",
          pointerEvents: "none",
          zIndex: 2,
          ...decoration(season, mode === "dark"),
        },
        "@media print": { ".MuiCard-root::after": { display: "none" } },
      }}
    />
  );
}

CardDecorations.propTypes = {
  season: PropTypes.oneOf(Object.values(SEASONS)).isRequired,
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
};
