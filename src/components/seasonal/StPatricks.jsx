import { Drift } from "./Drift";
import { fillVar, strokeVar, seasonVar } from "./shared";
import { twinkle, onGround, inSky, still } from "./sceneryKit";

// St. Patrick's, dressed: clovers and now and then a gold coin coming down, and
// the fundraising balloon as a four-leaf clover in a green hat. Colors are the
// season's CSS variables.

// A leaf drawn point at the origin, growing up
const LEAF = "M0 0 C-6 -5 -30 -14 -30 -36 C-30 -52 -10 -56 0 -42 C10 -56 30 -52 30 -36 C30 -14 6 -5 0 0 Z";

export const Clover = () => (
  <svg viewBox="-34 -34 68 68" width="100%" height="100%">
    {[0, 120, 240].map((angle) => (
      <path key={angle} d={LEAF} transform={`rotate(${angle}) scale(0.58)`} style={{ ...fillVar("clover"), ...strokeVar("clover-deep") }} strokeWidth="2" />
    ))}
    <path d="M0 0 C2 10 6 18 12 26" fill="none" style={strokeVar("clover-deep")} strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

export const Coin = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <circle cx="12" cy="12" r="11" style={{ ...fillVar("coin"), ...strokeVar("coin-deep") }} strokeWidth="1.6" />
    <circle cx="12" cy="12" r="7" fill="none" style={strokeVar("coin-deep")} strokeWidth="1" opacity="0.7" />
    <path d="M9 8 C9 6.4 15 6.4 15 8" fill="none" style={strokeVar("coin-bright")} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const PotOfGold = () => (
  <svg viewBox="0 0 60 52" width="100%" height="100%">
    <g style={{ ...fillVar("coin"), ...strokeVar("coin-deep") }} strokeWidth="1">
      <circle cx="17" cy="14" r="7" />
      <circle cx="43" cy="14" r="7" />
      <circle cx="30" cy="9" r="7.5" />
      <circle cx="24" cy="16" r="6" />
      <circle cx="37" cy="16" r="6" />
    </g>
    <path d="M9 22 Q3 44 17 48 L43 48 Q57 44 51 22 Z" style={{ ...fillVar("pot"), ...strokeVar("pot-edge") }} strokeWidth="1" />
    <path d="M15 48 L13 52 M45 48 L47 52" style={strokeVar("pot")} strokeWidth="3.4" strokeLinecap="round" />
    <ellipse cx="30" cy="22" rx="25" ry="6" style={{ ...fillVar("pot-rim"), ...strokeVar("pot-edge") }} strokeWidth="1" />
    <g style={{ ...fillVar("coin"), ...strokeVar("coin-deep") }} strokeWidth="0.8">
      <circle cx="20" cy="20" r="4.5" />
      <circle cx="30" cy="19" r="5" />
      <circle cx="40" cy="20" r="4.5" />
    </g>
  </svg>
);

export const LeprechaunHat = () => (
  <svg viewBox="0 0 50 42" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
    <path d="M12 34 L14 6 Q25 1 36 6 L38 34 Z" style={{ ...fillVar("hat"), ...strokeVar("hat-edge") }} strokeWidth="1" strokeLinejoin="round" />
    <path d="M13.2 22 H36.8 L37.6 31 H12.4 Z" style={fillVar("band")} />
    <rect x="20" y="20.5" width="10" height="11" rx="1" fill="none" style={strokeVar("coin")} strokeWidth="2.2" />
    <ellipse cx="25" cy="35" rx="24" ry="5.6" style={{ ...fillVar("hat"), ...strokeVar("hat-edge") }} strokeWidth="1" />
  </svg>
);

// A patch of clover for the footer and the fundraising ground
export const CloverPatch = () => (
  <svg viewBox="0 0 60 36" width="100%" height="100%">
    {[
      [12, 22, 0.42],
      [30, 12, 0.5],
      [48, 22, 0.42],
    ].map(([x, y, s]) => (
      <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M0 0 C2 14 2 24 0 36" fill="none" style={strokeVar("clover-deep")} strokeWidth="5" strokeLinecap="round" />
        {[0, 120, 240].map((angle) => (
          <path key={angle} d={LEAF} transform={`rotate(${angle}) scale(0.55)`} style={{ ...fillVar("clover"), ...strokeVar("clover-deep") }} strokeWidth="2.4" />
        ))}
      </g>
    ))}
  </svg>
);

const BANDS = [1, 2, 3, 4, 5, 6];

// A rainbow: a short leg on its left that goes out of sight behind the numbers,
// a long one on its right that comes down into the pot. The drawing stretches
// to the box it is put in; the bands keep their width in pixels.
export const Rainbow = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
    {BANDS.map((band) => {
      const inset = (band - 1) * 6;
      return (
        <path
          key={band}
          d={`M${inset} 152 C${inset} ${18 + inset} ${60 + inset * 0.2} ${inset} ${100} ${inset} C${150 - inset * 0.8} ${inset} ${192 - inset} 70 ${192 - inset} 200`}
          fill="none"
          style={{ stroke: seasonVar(`rainbow-${band}`) }}
          strokeWidth="6"
          vectorEffect="non-scaling-stroke"
        />
      );
    })}
  </svg>
);

// ---- The balloon ----

// Four leaves behind the logo, and the stem that curls under them
export const CloverLeaves = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden="true">
    <path d="M50 60 C50 80 52 98 50 113" fill="none" style={strokeVar("clover-deep")} strokeWidth="4.6" strokeLinecap="round" />
    {[45, 135, 225, 315].map((angle) => (
      <g key={angle} transform={`translate(50 50) rotate(${angle}) scale(0.94)`}>
        <path d={LEAF} style={{ ...fillVar("clover"), ...strokeVar("clover-deep") }} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M0 -8 V-42 M0 -22 L-13 -36 M0 -22 L13 -36" fill="none" style={strokeVar("vein")} strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ))}
  </svg>
);

const FALLING = [
  { node: <Clover />, size: [18, 28] },
  { node: <Clover />, size: [16, 24] },
  { node: <Coin />, size: [12, 16] },
  { node: <Clover />, size: [18, 26] },
];

// ---- Scenery on the donate page ----

export function StPatricksScenery() {
  return (
    <>
      {/* A rainbow from behind the numbers down into the pot. On a phone the numbers fill the width, so it ends behind them */}
      {inSky({ top: { xs: 216, sm: 250 }, height: { xs: 340, sm: 550 }, right: { xs: "6%", sm: "3%" }, width: { xs: "28%", sm: "30%" } }, <Rainbow />, "rainbow", { opacity: 0.85 })}

      {inSky({ top: { xs: 300, sm: 370 }, left: { xs: "2%", sm: "9%" }, width: { xs: 18, sm: 26 }, height: { xs: 18, sm: 26 } }, <Coin />, "coin-1", { animation: `${twinkle} 3.4s ease-in-out infinite`, ...still })}
      {inSky({ top: { xs: 230, sm: 190 }, left: { xs: "6%", sm: "14%" }, width: { xs: 14, sm: 20 }, height: { xs: 14, sm: 20 } }, <Coin />, "coin-2", { animation: `${twinkle} 4s ease-in-out 1s infinite`, ...still })}

      {onGround("left", "3%", { xs: 44, sm: 62 }, { xs: 26, sm: 38 }, <CloverPatch />, "patch-1")}
      {onGround("left", "14%", { xs: 30, sm: 46 }, { xs: 25, sm: 38 }, <LeprechaunHat />, "hat", { display: { xs: "none", sm: "block" } })}
      {onGround("right", "3%", { xs: 46, sm: 64 }, { xs: 40, sm: 55 }, <PotOfGold />, "pot")}
      {onGround("right", "14%", { xs: 40, sm: 56 }, { xs: 24, sm: 34 }, <CloverPatch />, "patch-2", { display: { xs: "none", sm: "block" } })}
    </>
  );
}

// ---- The mark on the greeting ----

export const CloverMark = () => (
  <svg viewBox="-12 -12 24 24" width="16" height="16" aria-hidden="true">
    {[45, 135, 225, 315].map((angle) => (
      <path key={angle} d="M0 0 C-2 -2 -6.6 -4 -6.6 -8 C-6.6 -11 -2 -11.5 0 -9 C2 -11.5 6.6 -11 6.6 -8 C6.6 -4 2 -2 0 0 Z" transform={`rotate(${angle})`} style={{ fill: "var(--el-season-clover)" }} />
    ))}
  </svg>
);

export default function StPatricks() {
  return <Drift kinds={FALLING} count={12} phoneCount={6} />;
}
