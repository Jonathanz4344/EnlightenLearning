import { createElement as h } from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";

// Helpers for each season's scenery on the donate page's fundraising sky. The
// pieces sit behind the balloon and the numbers, and keep to the edges.

export const twinkle = keyframes`
  0%, 100% { opacity: 0.9; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.7); }
`;

export const snowDrift = keyframes`
  from { transform: translate3d(0, -20px, 0); }
  to { transform: translate3d(14px, 620px, 0); }
`;

export const glide = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(-4deg); }
  50% { transform: translate(-26px, 10px) rotate(4deg); }
`;

export const bloom = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(0.86); }
  50% { opacity: 1; transform: scale(1); }
`;

export const swing = keyframes`
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
`;

export const still = {
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
  "html[data-motion='off'] &": { animation: "none" },
};

export const gone = {
  "@media (prefers-reduced-motion: reduce)": { display: "none" },
  "html[data-motion='off'] &": { display: "none" },
};

// Fixed, scattered spots so the stars look random but stay put between visits
export const STARS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 94,
  top: (i * 23 + 7) % 55,
  size: i % 4 === 0 ? 3 : 2,
  delay: (i * 0.45) % 3,
}));

export const FLAKES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 29 + 5) % 98,
  size: 3 + (i % 3),
  duration: 7 + (i % 5) * 1.6,
  delay: -((i * 1.3) % 9),
}));

// Props standing on the ground, at the edges so they stay clear of the numbers
export const onGround = (side, offset, width, height, node, key, sx) =>
  h(Box, { key, sx: { position: "absolute", [side]: offset, bottom: { xs: 30, sm: 34 }, width, height, zIndex: 1, ...sx } }, node);

// Something in the sky, placed by its corner
export const inSky = (where, node, key, sx) => h(Box, { key, sx: { position: "absolute", ...where, ...sx } }, node);

// A few small drawings coming down the sky, or nothing under reduced motion
const FLOATERS = Array.from({ length: 8 }, (_, i) => ({
  left: (i * 41 + 4) % 96,
  size: 12 + (i % 3) * 3,
  duration: 12 + (i % 4) * 2.2,
  delay: -((i * 2.1) % 14),
}));

export const falling = (nodes) =>
  FLOATERS.map((piece, i) =>
    h(
      Box,
      {
        key: `floater-${i}`,
        sx: {
          position: "absolute",
          top: 0,
          left: `${piece.left}%`,
          width: piece.size,
          height: piece.size,
          animation: `${snowDrift} ${piece.duration}s linear ${piece.delay}s infinite`,
          ...gone,
        },
      },
      nodes[i % nodes.length]
    )
  );

// Below the title and subtitle, which take more room on a phone
export const SKY_TOP = { xs: 176, sm: 136 };
