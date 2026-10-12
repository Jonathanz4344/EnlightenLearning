import { keyframes } from "@emotion/react";

// Building blocks shared by the seasonal scenes.

export const random = (min, max) => min + Math.random() * (max - min);

// Every decoration layer sits below the header (z-index 1100) and its menus,
// ignores clicks, is hidden from screen readers by the caller, and never prints.
export const layerSx = (zIndex) => ({
  position: "fixed",
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
  zIndex,
  "@media print": { display: "none" },
});

// Hide moving pieces for visitors whose device asks for reduced motion
export const motionOnly = {
  "@media (prefers-reduced-motion: reduce)": { display: "none" },
};

// Show only the first `count` pieces on phones
export const fewerOnPhones = (count) => ({
  "@media (max-width: 600px)": {
    [`& > :nth-of-type(n+${count + 1})`]: { display: "none" },
  },
});

export const fall = keyframes`
  from { transform: translate3d(0, -12vh, 0); }
  to { transform: translate3d(0, 112vh, 0); }
`;

export const sway = keyframes`
  0%, 100% { transform: translateX(calc(var(--sway) * -1)) rotate(calc(var(--tilt) * -1)); }
  50% { transform: translateX(var(--sway)) rotate(var(--tilt)); }
`;

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const flap = keyframes`
  from { transform: rotate(-24deg); }
  to { transform: rotate(30deg); }
`;

// Put on a parent of FlyingBat to flap its wings; --flap sets the speed
export const flapWings = {
  "& .bat-wing": {
    transformBox: "fill-box",
    transformOrigin: "100% 60%",
    animation: `${flap} var(--flap, 0.2s) ease-in-out infinite alternate`,
  },
};

// A corner spider web: threads fan out from the top-left corner of a square of
// the given size, joined by rings that sag toward the corner
export function buildWebPath(size) {
  const angles = Array.from({ length: 7 }, (_, i) => (i / 6) * (Math.PI / 2));
  const rings = [0.22, 0.38, 0.54, 0.7, 0.86];
  const point = (angle, radius) =>
    `${(Math.cos(angle) * radius).toFixed(1)} ${(Math.sin(angle) * radius).toFixed(1)}`;
  // Slight unevenness so the web looks hand-spun
  const radiusAt = (ring, ringIndex, threadIndex) =>
    size * ring * (1 + 0.04 * Math.sin(threadIndex * 2.3 + ringIndex));

  let d = "";
  angles.forEach((angle) => {
    d += `M0 0 L${point(angle, size)} `;
  });
  rings.forEach((ring, ringIndex) => {
    angles.slice(0, -1).forEach((angle, i) => {
      const next = angles[i + 1];
      const r1 = radiusAt(ring, ringIndex, i);
      const r2 = radiusAt(ring, ringIndex, i + 1);
      d += `M${point(angle, r1)} Q${point((angle + next) / 2, ((r1 + r2) / 2) * 0.84)} ${point(next, r2)} `;
    });
  });
  return d.trim();
}
