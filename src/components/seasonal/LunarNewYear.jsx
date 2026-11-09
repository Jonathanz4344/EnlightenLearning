import { Drift } from "./Drift";
import { fillVar, strokeVar, seasonVar } from "./shared";
import { swing, onGround, inSky, SKY_TOP, still } from "./sceneryKit";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useSeason } from "../../theme/SeasonContext";
import ZodiacFace from "./ZodiacFace";

// Lunar New Year, dressed: plum blossom coming down, a few paper lanterns going
// up, and the fundraising balloon as a red lantern. Colors are the season's CSS
// variables.

export const PlumBlossom = () => (
  <svg viewBox="-12 -12 24 24" width="100%" height="100%">
    {[0, 72, 144, 216, 288].map((angle) => (
      <ellipse key={angle} cy="-5.8" rx="4.2" ry="5.2" transform={`rotate(${angle})`} style={{ ...fillVar("blossom"), ...strokeVar("blossom-deep") }} strokeWidth="0.5" />
    ))}
    <circle r="2.4" style={fillVar("blossom-heart")} />
  </svg>
);

export const GoldCoin = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <circle cx="12" cy="12" r="11" style={{ ...fillVar("gold"), ...strokeVar("gold-deep") }} strokeWidth="1.4" />
    <rect x="8.4" y="8.4" width="7.2" height="7.2" style={{ ...fillVar("red-deep"), ...strokeVar("gold-deep") }} strokeWidth="1" />
  </svg>
);

export const PaperLantern = () => (
  <svg viewBox="0 0 40 62" width="100%" height="100%">
    <rect x="13" y="1" width="14" height="6" rx="2" style={fillVar("gold-deep")} />
    <ellipse cx="20" cy="25" rx="18" ry="19" style={fillVar("lantern")} />
    <path d="M20 6 V44 M11.5 8.6 C7 18 7 32 11.5 41.4 M28.5 8.6 C33 18 33 32 28.5 41.4" style={strokeVar("gold")} strokeWidth="1.3" fill="none" />
    <rect x="13" y="43" width="14" height="6" rx="2" style={fillVar("gold-deep")} />
    <path d="M16 49 V58 M20 49 V61 M24 49 V58" style={strokeVar("lantern")} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Orange = () => (
  <svg viewBox="0 0 24 26" width="100%" height="100%">
    <circle cx="12" cy="15" r="10.5" style={fillVar("orange")} />
    <path d="M4.5 12 C7 8 17 8 19.5 12 C17 10.5 7 10.5 4.5 12 Z" style={fillVar("orange-deep")} opacity="0.5" />
    <path d="M12 5 C14 1 19 1 21 3 C19 6 15 7 12 5 Z" style={fillVar("orange-leaf")} />
    <circle cx="12" cy="5" r="1.4" style={fillVar("orange-deep")} />
  </svg>
);

export const RedEnvelope = () => (
  <svg viewBox="0 0 26 36" width="100%" height="100%">
    <rect x="1" y="1" width="24" height="34" rx="2" style={fillVar("lantern")} />
    <path d="M1 3 Q1 1 3 1 H23 Q25 1 25 3 V10 Q13 18 1 10 Z" style={fillVar("lantern-deep")} />
    <circle cx="13" cy="13.5" r="3.6" style={fillVar("gold")} />
    <path d="M6 24 H20 M6 28 H20" style={strokeVar("gold")} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const BRANCH_BLOOMS = [
  [62, 18, 11],
  [88, 12, 9],
  [38, 34, 10],
  [106, 28, 8],
  [20, 16, 8],
];

// A plum branch, flowering. It grows from the left of its box.
export const PlumBranch = () => (
  <svg viewBox="0 0 120 56" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
    <path d="M0 6 C24 14 46 30 66 28 C84 26 96 18 118 22 M34 20 C30 14 26 12 18 12 M66 28 C68 22 66 16 60 12 M84 24 C88 18 88 12 86 8" fill="none" style={strokeVar("branch")} strokeWidth="2.6" strokeLinecap="round" />
    {BRANCH_BLOOMS.map(([x, y, size]) => (
      <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${size / 12})`}>
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse key={angle} cy="-5.8" rx="4.2" ry="5.2" transform={`rotate(${angle})`} style={{ ...fillVar("blossom"), ...strokeVar("blossom-deep") }} strokeWidth="0.5" />
        ))}
        <circle r="2.4" style={fillVar("blossom-heart")} />
      </g>
    ))}
  </svg>
);

// A flowering plum tree for the footer
export const PlumTree = () => (
  <svg viewBox="0 0 60 70" width="100%" height="100%">
    <path d="M28 70 L30 44 C24 38 16 34 10 26 M26 40 C24 34 22 28 24 20 M30 44 C32 32 30 22 36 10 M32 30 C38 26 46 24 52 18" fill="none" style={strokeVar("branch")} strokeWidth="3.2" strokeLinecap="round" />
    {[
      [10, 26], [24, 20], [36, 10], [52, 18], [44, 26], [18, 14], [44, 10], [6, 16],
    ].map(([x, y]) => (
      <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(0.72)`}>
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse key={angle} cy="-5.8" rx="4.2" ry="5.2" transform={`rotate(${angle})`} style={fillVar("blossom")} />
        ))}
        <circle r="2.4" style={fillVar("blossom-heart")} />
      </g>
    ))}
  </svg>
);

// A lantern on a post, for the footer
export const LanternOnPost = () => (
  <svg viewBox="0 0 30 70" width="100%" height="100%">
    <rect x="13.5" y="30" width="3" height="40" style={fillVar("branch")} />
    <path d="M15 6 V3" style={strokeVar("gold-deep")} strokeWidth="2" />
    <rect x="9" y="4" width="12" height="4" rx="1.4" style={fillVar("gold-deep")} />
    <ellipse cx="15" cy="20" rx="14" ry="13" style={fillVar("lantern")} />
    <path d="M15 7 V33 M8.5 9 C5 15 5 25 8.5 31 M21.5 9 C25 15 25 25 21.5 31" style={strokeVar("gold")} strokeWidth="1.1" fill="none" />
    <rect x="9" y="31" width="12" height="4" rx="1.4" style={fillVar("gold-deep")} />
  </svg>
);

// ---- The balloon ----

// Gold ribs and bands painted on the body of the balloon
export const LanternRibs = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
    <g fill="none" style={strokeVar("gold")} strokeWidth="1.6" strokeLinecap="round">
      <path d="M50 0 V100" />
      <path d="M50 0 C28 18 28 82 50 100" />
      <path d="M50 0 C72 18 72 82 50 100" />
      <path d="M50 0 C8 22 8 78 50 100" />
      <path d="M50 0 C92 22 92 78 50 100" />
    </g>
    <rect x="0" y="0" width="100" height="9" style={fillVar("gold")} />
    <rect x="0" y="91" width="100" height="9" style={fillVar("gold")} />
  </svg>
);

// The gold cap on top, with its cord
export const LanternCap = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible", display: "block" }} aria-hidden="true">
    <path d="M50 -16 V-2" style={strokeVar("gold-deep")} strokeWidth="2" strokeLinecap="round" />
    <path d="M32 6 C32 -2 36 -4 40 -4 H60 C64 -4 68 -2 68 6 Z" style={{ ...fillVar("gold"), ...strokeVar("gold-deep") }} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

// The tassel hanging in place of the balloon's tie
export const LanternTassel = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible", display: "block" }} aria-hidden="true">
    <path d="M32 94 H68 C68 102 64 104 60 104 H40 C36 104 32 102 32 94 Z" style={{ ...fillVar("gold"), ...strokeVar("gold-deep") }} strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="50" cy="109" r="4.4" style={{ ...fillVar("gold"), ...strokeVar("gold-deep") }} strokeWidth="1" />
    <path d="M44 113 V128 M47 113 V130 M50 113 V132 M53 113 V130 M56 113 V128" style={strokeVar("lantern")} strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);

const FALLING = [
  { node: <PlumBlossom />, size: [14, 22] },
  { node: <PlumBlossom />, size: [12, 20] },
  { node: <GoldCoin />, size: [12, 16] },
  { node: <PlumBlossom />, size: [14, 22] },
];

const RISING = [{ node: <PaperLantern />, size: [22, 30], spins: false }];

// ---- Scenery on the donate page ----

const Hanging = ({ drop }) => (
  <>
    <Box sx={{ width: "1.5px", height: drop, mx: "auto", backgroundColor: seasonVar("string") }} />
    <PaperLantern />
  </>
);

Hanging.propTypes = { drop: PropTypes.number.isRequired };

export function LunarScenery() {
  const { zodiac } = useSeason();
  return (
    <>
      {/* The year's animal, hung in the sky */}
      <Box
        sx={{
          position: "absolute",
          top: SKY_TOP,
          right: { xs: "3%", sm: "8%" },
          width: { xs: 64, sm: 100 },
          height: { xs: 64, sm: 100 },
          transformOrigin: "50% -60px",
          animation: `${swing} 6s ease-in-out infinite`,
          ...still,
        }}
      >
        <ZodiacFace animal={zodiac} />
      </Box>

      {/* Lanterns on cords down the left edge, with a plum branch coming in below them */}
      {inSky({ top: 0, left: "5%", width: 44, display: { xs: "none", sm: "block" } }, <Hanging drop={104} />, "lantern-1", { transformOrigin: "top center", animation: `${swing} 5s ease-in-out infinite`, ...still })}
      {inSky({ top: 0, left: "13%", width: 30, display: { xs: "none", sm: "block" } }, <Hanging drop={40} />, "lantern-2", { transformOrigin: "top center", animation: `${swing} 4.2s ease-in-out 0.7s infinite`, ...still })}
      {inSky({ top: { xs: 244, sm: 300 }, left: 0, width: { xs: 58, sm: 190 }, height: { xs: 27, sm: 88 } }, <PlumBranch />, "branch")}

      {onGround("left", "3%", { xs: 28, sm: 34 }, { xs: 30, sm: 36 }, <Orange />, "orange-1")}
      {onGround("left", "11%", { xs: 22, sm: 26 }, { xs: 24, sm: 28 }, <Orange />, "orange-2")}
      {onGround("left", "18%", 26, 36, <RedEnvelope />, "envelope", { display: { xs: "none", sm: "block" } })}
      {onGround("right", "11%", { xs: 24, sm: 30 }, { xs: 28, sm: 34 }, <Orange />, "orange-3")}
      {onGround("right", "3%", { xs: 18, sm: 30 }, { xs: 40, sm: 70 }, <LanternOnPost />, "post")}
    </>
  );
}

// ---- The mark on the greeting ----

export const LanternMark = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <rect x="8.5" y="1" width="7" height="3" rx="1" style={{ fill: "var(--el-season-gold-deep)" }} />
    <ellipse cx="12" cy="11" rx="9.5" ry="8" style={{ fill: "var(--el-season-lantern)" }} />
    <rect x="8.5" y="18" width="7" height="2.4" rx="1" style={{ fill: "var(--el-season-gold-deep)" }} />
    <path d="M12 20 V23.5" strokeWidth="1.6" strokeLinecap="round" style={{ stroke: "var(--el-season-lantern)" }} />
  </svg>
);

export default function LunarNewYear() {
  return (
    <>
      <Drift kinds={FALLING} count={12} phoneCount={6} />
      <Drift kinds={RISING} count={3} phoneCount={1} rising />
    </>
  );
}
