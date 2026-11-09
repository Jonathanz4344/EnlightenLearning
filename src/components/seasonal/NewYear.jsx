import PropTypes from "prop-types";
import { Drift } from "./Drift";
import { fillVar, strokeVar, seasonVar } from "./shared";
import { twinkle, bloom, onGround, inSky, still } from "./sceneryKit";
import Box from "@mui/material/Box";
import { Burst } from "./Burst";

// New Year's, dressed: gold and midnight confetti coming down, and the
// fundraising balloon as the ball from the top of the pole, except this one
// goes up. Colors are the season's CSS variables.

const SPARKLE = "M12 0 C12.7 7.6 16.4 11.3 24 12 C16.4 12.7 12.7 16.4 12 24 C11.3 16.4 7.6 12.7 0 12 C7.6 11.3 11.3 7.6 12 0 Z";

export const Sparkle = ({ color = "star" }) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path d={SPARKLE} style={fillVar(color)} />
  </svg>
);

Sparkle.propTypes = { color: PropTypes.string };

const Confetti = ({ tone, kind }) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    {kind === "strip" && <rect x="9" y="2" width="6" height="20" rx="1" style={{ ...fillVar(`confetti-${tone}`), ...strokeVar("confetti-edge") }} strokeWidth="0.6" />}
    {kind === "dot" && <circle cx="12" cy="12" r="6.5" style={{ ...fillVar(`confetti-${tone}`), ...strokeVar("confetti-edge") }} strokeWidth="0.6" />}
    {kind === "curl" && <path d="M6 3 C14 5 14 9 8 12 C2 15 10 21 18 21" fill="none" style={strokeVar(`confetti-${tone}`)} strokeWidth="3" strokeLinecap="round" />}
  </svg>
);

Confetti.propTypes = { tone: PropTypes.number.isRequired, kind: PropTypes.oneOf(["strip", "dot", "curl"]).isRequired };

export const PartyHat = () => (
  <svg viewBox="0 0 30 40" width="100%" height="100%">
    <path d="M15 5 L28 38 Q15 42 2 38 Z" style={fillVar("hat")} />
    <path d="M12 12.6 L18 12.6 L20.4 18.6 L9.6 18.6 Z M7.4 24 L22.6 24 L25.2 30.6 L4.8 30.6 Z" style={fillVar("hat-stripe")} />
    <circle cx="15" cy="4.5" r="4" style={fillVar("pom")} />
  </svg>
);

// A clock tower one minute to midnight
export const ClockTower = () => (
  <svg viewBox="0 0 34 70" width="100%" height="100%">
    <path d="M17 0 L27 16 L7 16 Z" style={fillVar("skyline")} />
    <rect x="5" y="16" width="24" height="54" style={fillVar("skyline")} />
    <circle cx="17" cy="28" r="9" style={fillVar("clock")} />
    <path d="M17 28 L17 21 M17 28 L15.4 22" style={strokeVar("clock-hand")} strokeWidth="1.6" strokeLinecap="round" />
    <g style={fillVar("window")}>
      <rect x="10" y="44" width="4" height="5" />
      <rect x="20" y="44" width="4" height="5" />
      <rect x="10" y="55" width="4" height="5" />
      <rect x="20" y="55" width="4" height="5" />
    </g>
  </svg>
);

const SKYLINE_WINDOWS = [
  [6, 26], [14, 26], [6, 36], [14, 36], [6, 46], [32, 12], [40, 12], [32, 22], [40, 32], [32, 42], [40, 42],
  [56, 34], [64, 34], [56, 44], [64, 44], [80, 20], [88, 20], [80, 30], [88, 40], [80, 50],
];

export const Skyline = () => (
  <svg viewBox="0 0 100 60" width="100%" height="100%">
    <path d="M0 60 V20 H24 V60 Z M26 60 V6 H48 V60 Z M50 60 V28 H72 V60 Z M74 60 V14 H96 V60 Z" style={fillVar("skyline")} />
    <g style={fillVar("window")}>
      {SKYLINE_WINDOWS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="4" height="5" />
      ))}
    </g>
  </svg>
);

// The ball on its pole, for the footer
export const BallOnPole = () => (
  <svg viewBox="0 0 30 70" width="100%" height="100%">
    <rect x="13.5" y="22" width="3" height="48" style={fillVar("pole")} />
    <circle cx="15" cy="13" r="12" style={{ ...fillVar("ball"), ...strokeVar("ball-edge") }} strokeWidth="1" />
    <path d="M3.5 10 H26.5 M3.5 16 H26.5 M15 1 V25 M8 2.8 C5 9 5 17 8 23.2 M22 2.8 C25 9 25 17 22 23.2" fill="none" style={strokeVar("ball-deep")} strokeWidth="0.8" />
    <path d={SPARKLE} transform="translate(5 3) scale(0.4)" style={fillVar("glint")} />
  </svg>
);

// The tiles of a mirror ball, seen from the front, as rows and columns of a
// sphere flattened onto the disc. Fixed shading, so they sit still between visits.
const ROWS = 11;
const COLUMNS = 16;
const SHADES = ["ball", "ball-bright", "ball", "ball-deep", "ball-bright", "ball", "ball-deep", "ball", "ball"];

const onSphere = (latitude, longitude) => {
  const lat = (latitude / ROWS) * Math.PI - Math.PI / 2;
  const lon = (longitude / COLUMNS) * Math.PI - Math.PI / 2;
  return `${(50 + 50 * Math.cos(lat) * Math.sin(lon)).toFixed(2)} ${(50 + 50 * Math.sin(lat)).toFixed(2)}`;
};

const TILES = Array.from({ length: ROWS * COLUMNS }, (_, n) => {
  const row = Math.floor(n / COLUMNS);
  const column = n % COLUMNS;
  return {
    id: n,
    d: `M${onSphere(row, column)} L${onSphere(row, column + 1)} L${onSphere(row + 1, column + 1)} L${onSphere(row + 1, column)} Z`,
    shade: SHADES[(row * 5 + column * 7 + ((row * column) % 3)) % SHADES.length],
  };
});

export const MirrorTiles = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
    {TILES.map((tile) => (
      <path key={tile.id} d={tile.d} style={{ ...fillVar(tile.shade), ...strokeVar("ball-edge") }} strokeWidth="0.45" />
    ))}
  </svg>
);

// The year on a plate at the shoulder of the ball, and the light catching it
export const YearPlate = ({ year }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible", display: "block" }} aria-hidden="true">
    <path d={SPARKLE} transform="translate(2 10) scale(1)" style={fillVar("glint")} />
    <path d={SPARKLE} transform="translate(84 62) scale(0.8)" style={fillVar("glint")} />
    <g transform="rotate(14 82 12)">
      <rect x="60" y="2" width="44" height="20" rx="6" style={{ ...fillVar("plate"), ...strokeVar("ball-edge") }} strokeWidth="1" />
      <text x="82" y="16.8" textAnchor="middle" fontSize="15" fontWeight="600" style={{ fill: seasonVar("plate-text"), fontFamily: "var(--el-font-display)" }}>
        {year}
      </text>
    </g>
  </svg>
);

YearPlate.propTypes = { year: PropTypes.number.isRequired };

const FALLING = [
  { node: <Confetti tone={1} kind="strip" />, size: [12, 18] },
  { node: <Confetti tone={2} kind="dot" />, size: [9, 13] },
  { node: <Confetti tone={3} kind="curl" />, size: [14, 20] },
  { node: <Sparkle />, size: [12, 18] },
  { node: <Confetti tone={4} kind="strip" />, size: [12, 18] },
  { node: <Confetti tone={1} kind="curl" />, size: [14, 20] },
  { node: <Confetti tone={3} kind="dot" />, size: [9, 13] },
];

// ---- Scenery on the donate page ----

// Below the words and to either side of the milestones
const SPARKS = [
  [4, 24, 0],
  [11, 33, 1.1],
  [3, 42, 2.2],
  [12, 50, 0.6],
  [70, 23, 1.6],
  [92, 31, 0.3],
  [78, 41, 2.5],
  [95, 47, 1.3],
  [84, 52, 0.8],
  [68, 50, 2],
];

export function NewYearScenery() {
  return (
    <>
      {SPARKS.map(([left, top, delay]) => (
        <Box
          key={left}
          sx={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            width: 7,
            height: 7,
            animation: `${twinkle} 3s ease-in-out ${delay}s infinite`,
            ...still,
          }}
        >
          <Sparkle />
        </Box>
      ))}

      {/* Fireworks in the open sky at each side */}
      {inSky({ top: { xs: 190, sm: 150 }, left: { xs: "1%", sm: "6%" }, width: { xs: 48, sm: 96 }, height: { xs: 48, sm: 96 } }, <Burst color="burst-blue" tip="burst-tip" />, "burst-1", { animation: `${bloom} 4.4s ease-in-out infinite`, ...still })}
      {inSky({ top: { xs: 176, sm: 136 }, right: { xs: "3%", sm: "8%" }, width: { xs: 62, sm: 112 }, height: { xs: 62, sm: 112 } }, <Burst color="burst-gold" tip="burst-tip" />, "burst-2", { animation: `${bloom} 5s ease-in-out 1.1s infinite`, ...still })}
      {inSky({ top: { xs: 280, sm: 290 }, right: { xs: "8%", sm: "20%" }, width: { xs: 36, sm: 60 }, height: { xs: 36, sm: 60 } }, <Burst color="burst-pink" tip="burst-tip" />, "burst-3", { animation: `${bloom} 3.8s ease-in-out 2s infinite`, ...still })}

      {/* The city, either side of the numbers */}
      {onGround("left", 0, { xs: 66, sm: 96 }, { xs: 40, sm: 58 }, <Skyline />, "city-1")}
      {onGround("right", 0, { xs: 66, sm: 96 }, { xs: 40, sm: 58 }, <Skyline />, "city-2")}
    </>
  );
}

// ---- The mark on the greeting ----

export const SparkMark = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M12 0 C12.7 7.6 16.4 11.3 24 12 C16.4 12.7 12.7 16.4 12 24 C11.3 16.4 7.6 12.7 0 12 C7.6 11.3 11.3 7.6 12 0 Z" style={{ fill: "var(--el-season-ball-deep)" }} />
  </svg>
);

export default function NewYear() {
  return <Drift kinds={FALLING} count={16} phoneCount={8} />;
}
