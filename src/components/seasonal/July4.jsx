import PropTypes from "prop-types";
import { Drift } from "./Drift";
import { fillVar, strokeVar } from "./shared";
import { twinkle, bloom, onGround, inSky, still } from "./sceneryKit";
import { Burst } from "./Burst";

// The Fourth of July, dressed: red, white and blue stars coming down, and the
// fundraising balloon painted as the flag. Colors are the season's CSS variables.

const STAR = "M12 1.5 L14.9 8.6 L22.6 9.1 L16.7 14.1 L18.5 21.6 L12 17.6 L5.5 21.6 L7.3 14.1 L1.4 9.1 L9.1 8.6 Z";

export const Star = ({ tone }) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ display: "block" }}>
    <path d={STAR} style={{ ...fillVar(tone), ...strokeVar(tone === "star-white" ? "star-edge" : tone) }} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

Star.propTypes = { tone: PropTypes.oneOf(["star-red", "star-white", "star-blue", "star-gold"]).isRequired };

const FIELD_STARS = [
  [4.4, 5], [11.6, 5], [18.8, 5], [8, 10], [15.2, 10], [22.4, 10], [4.4, 15], [11.6, 15], [18.8, 15],
];

export const FlagOnPole = () => (
  <svg viewBox="0 0 84 60" width="100%" height="100%">
    <path d="M3 4 V60" style={strokeVar("pole")} strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="3" cy="3" r="2.6" style={fillVar("star-gold")} />
    <g transform="translate(5 5)">
      <rect width="74" height="38" style={{ ...fillVar("flag-white"), ...strokeVar("flag-line") }} strokeWidth="0.8" />
      {[0, 2, 4, 6].map((i) => (
        <rect key={i} y={i * 5.43} width="74" height="5.43" style={fillVar("flag-red")} />
      ))}
      <rect width="30" height="21.7" style={fillVar("flag-blue")} />
      <g style={fillVar("flag-white")}>
        {FIELD_STARS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y + 1} r="1.4" />
        ))}
      </g>
    </g>
  </svg>
);

// A firework rocket waiting on the ground
export const Rocket = () => (
  <svg viewBox="0 0 20 50" width="100%" height="100%">
    <path d="M10 0 L16 12 H4 Z" style={fillVar("rocket-nose")} />
    <rect x="4" y="12" width="12" height="24" style={fillVar("flag-red")} />
    <rect x="4" y="18" width="12" height="5" style={fillVar("flag-white")} />
    <rect x="9" y="36" width="2" height="14" style={fillVar("pole")} />
    <path d="M4 36 L1 42 M16 36 L19 42" style={strokeVar("fuse")} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const PicketFence = () => (
  <svg viewBox="0 0 80 34" width="100%" height="100%">
    <g style={{ ...fillVar("fence"), ...strokeVar("fence-edge") }} strokeWidth="0.8" strokeLinejoin="round">
      <rect x="0" y="12" width="80" height="4" />
      <rect x="0" y="24" width="80" height="4" />
      {[3, 16, 29, 42, 55, 68].map((x) => (
        <path key={x} d={`M${x} 34 V6 L${x + 4.5} 1 L${x + 9} 6 V34 Z`} />
      ))}
    </g>
  </svg>
);

export const Watermelon = () => (
  <svg viewBox="0 0 40 22" width="100%" height="100%">
    <path d="M1 2 A19 19 0 0 0 39 2 Z" style={fillVar("rind")} />
    <path d="M4 2 A16 16 0 0 0 36 2 Z" style={fillVar("rind-pale")} />
    <path d="M6 2 A14 14 0 0 0 34 2 Z" style={fillVar("melon")} />
    <g style={fillVar("seed")}>
      <ellipse cx="13" cy="6" rx="1" ry="1.7" />
      <ellipse cx="20" cy="8" rx="1" ry="1.7" />
      <ellipse cx="27" cy="6" rx="1" ry="1.7" />
    </g>
  </svg>
);

const SWAGS = [0, 1, 2, 3];

// Red, white and blue bunting draped along the top of the fundraising sky
export const Bunting = () => (
  <svg viewBox="0 0 400 34" width="100%" height="100%" preserveAspectRatio="none" style={{ display: "block" }}>
    {SWAGS.map((swag) => {
      const x = swag * 100;
      const stripe = (from, to, tone) => <path key={tone} d={`M${x} ${from} Q${x + 50} ${from + 26} ${x + 100} ${from} L${x + 100} ${to} Q${x + 50} ${to + 26} ${x} ${to} Z`} style={fillVar(tone)} />;
      return (
        <g key={swag}>
          {stripe(-2, 4, "flag-blue")}
          {stripe(4, 8, "flag-white")}
          {stripe(8, 12, "flag-red")}
        </g>
      );
    })}
  </svg>
);

// ---- The balloon ----

// The flag painted on the body of the balloon
export const FlagPaint = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
    {[0, 2, 4, 6, 8, 10, 12].map((i) => (
      <rect key={i} x="0" y={i * 7.7} width="100" height="7.7" style={fillVar("flag-red")} />
    ))}
    <rect x="0" y="0" width="52" height="53.9" style={fillVar("flag-blue")} />
    <g style={fillVar("flag-white")}>
      {[
        [32, 7], [42, 7], [24, 13], [34, 13], [44, 13], [17, 19], [27, 19], [37, 19], [47, 19],
        [12, 26], [22, 26], [32, 26], [42, 26], [8, 33], [18, 33], [28, 33], [38, 33], [47, 33],
        [6, 40], [16, 40], [26, 40], [36, 40], [46, 40], [10, 47], [20, 47], [30, 47], [40, 47],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={STAR} transform={`translate(${x - 2.6} ${y - 2.6}) scale(0.22)`} />
      ))}
    </g>
  </svg>
);

// A gold star at the shoulder of the balloon, and two small ones beside it
export const StarTopper = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible", display: "block" }} aria-hidden="true">
    <path d={STAR} transform="translate(68 -8) scale(1.5) rotate(12 12 12)" style={{ ...fillVar("star-gold"), ...strokeVar("star-gold-edge") }} strokeWidth="1" strokeLinejoin="round" />
    <path d={STAR} transform="translate(100 24) scale(0.5)" style={{ ...fillVar("star-gold"), ...strokeVar("star-gold-edge") }} strokeWidth="1" strokeLinejoin="round" />
    <path d={STAR} transform="translate(58 -18) scale(0.42)" style={{ ...fillVar("star-gold"), ...strokeVar("star-gold-edge") }} strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

const FALLING = [
  { node: <Star tone="star-red" />, size: [12, 20] },
  { node: <Star tone="star-white" />, size: [12, 18] },
  { node: <Star tone="star-blue" />, size: [12, 20] },
];

// ---- Scenery on the donate page ----

export function July4Scenery() {
  return (
    <>
      {inSky({ top: 0, left: 0, right: 0, height: { xs: 16, sm: 30 } }, <Bunting />, "bunting")}

      {inSky({ top: { xs: 180, sm: 140 }, left: { xs: "1%", sm: "5%" }, width: { xs: 50, sm: 100 }, height: { xs: 50, sm: 100 } }, <Burst color="burst-red" tip="burst-gold" />, "burst-1", { animation: `${bloom} 4.2s ease-in-out infinite`, ...still })}
      {inSky({ top: { xs: 176, sm: 130 }, right: { xs: "3%", sm: "7%" }, width: { xs: 64, sm: 118 }, height: { xs: 64, sm: 118 } }, <Burst color="burst-blue" tip="burst-red" />, "burst-2", { animation: `${bloom} 5s ease-in-out 1s infinite`, ...still })}
      {inSky({ top: { xs: 286, sm: 290 }, right: { xs: "9%", sm: "21%" }, width: { xs: 36, sm: 62 }, height: { xs: 36, sm: 62 } }, <Burst color="burst-gold" tip="burst-blue" />, "burst-3", { animation: `${bloom} 3.6s ease-in-out 1.8s infinite`, ...still })}
      {inSky({ top: { xs: 300, sm: 300 }, left: { xs: "3%", sm: "14%" }, width: { xs: 16, sm: 24 }, height: { xs: 16, sm: 24 } }, <Star tone="star-gold" />, "star", { animation: `${twinkle} 3.2s ease-in-out infinite`, ...still })}

      {onGround("left", "2%", { xs: 56, sm: 92 }, { xs: 40, sm: 66 }, <FlagOnPole />, "flag")}
      {onGround("right", "14%", { xs: 26, sm: 40 }, { xs: 14, sm: 22 }, <Watermelon />, "melon")}
      {onGround("right", "4%", { xs: 16, sm: 22 }, { xs: 40, sm: 55 }, <Rocket />, "rocket-1")}
      {onGround("right", "9%", 16, 40, <Rocket />, "rocket-2", { display: { xs: "none", sm: "block" } })}
    </>
  );
}

// ---- The mark on the greeting ----

export const StarMark = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M12 1.5 L14.9 8.6 L22.6 9.1 L16.7 14.1 L18.5 21.6 L12 17.6 L5.5 21.6 L7.3 14.1 L1.4 9.1 L9.1 8.6 Z" style={{ fill: "var(--el-season-star-red)" }} />
  </svg>
);

export default function July4() {
  return <Drift kinds={FALLING} count={14} phoneCount={7} />;
}
