import { useMemo } from "react";
import Box from "@mui/material/Box";
import { fall, sway, spin, random, layerSx, motionOnly, fewerOnPhones, seasonVar } from "./shared";
import { zIndex } from "../../theme/tokens";
import { snowDrift, FLAKES, onGround } from "./sceneryKit";
import PropTypes from "prop-types";

// Holidays, dressed: a light snowfall drifting down over the page. Few flakes,
// slow, with colors from the season's CSS variables.

const FLAKE_COUNT = 16;
const PHONE_FLAKE_COUNT = 8;

const ARMS = [0, 60, 120];
const TIPS = [0, 60, 120, 180, 240, 300];

const drawFlake = (stroke, strokeWidth) => (
  <g style={{ stroke }} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
    {ARMS.map((angle) => (
      <line key={angle} x1="12" y1="2" x2="12" y2="22" transform={`rotate(${angle} 12 12)`} />
    ))}
    {TIPS.map((angle) => (
      <path key={angle} d="M9.5 4 L12 6.5 L14.5 4" transform={`rotate(${angle} 12 12)`} />
    ))}
  </g>
);

const Snowflake = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    {/* An icy outline keeps white flakes visible on light sections */}
    {drawFlake(seasonVar("flake-edge"), 3.4)}
    {drawFlake(seasonVar("snow"), 1.6)}
  </svg>
);

function makeFlakes() {
  return Array.from({ length: FLAKE_COUNT }, (_, id) => {
    const duration = random(18, 30);
    const swayDuration = random(4, 7);
    return {
      id,
      size: random(10, 24),
      style: {
        left: `${random(0, 100)}%`,
        opacity: random(0.5, 0.85),
        "--duration": `${duration}s`,
        // A negative delay starts each flake partway down, so the screen is filled right away
        "--delay": `${-random(0, duration)}s`,
      },
      swayStyle: {
        "--sway": `${random(8, 28)}px`,
        "--tilt": `${random(10, 30)}deg`,
        "--sway-duration": `${swayDuration}s`,
        "--sway-delay": `${-random(0, swayDuration)}s`,
      },
      spinStyle: { "--spin-duration": `${random(8, 16)}s` },
    };
  });
}

// ---- Scenery on the donate page ----

export function ChristmasScenery() {
  return (
    <>
      {FLAKES.map((flake, i) => (
        <Box
          key={`flake-${i}`}
          sx={{
            position: "absolute",
            top: 0,
            left: `${flake.left}%`,
            width: flake.size,
            height: flake.size,
            borderRadius: "50%",
            backgroundColor: seasonVar("snow"),
            boxShadow: `0 0 3px ${seasonVar("flake-edge")}`,
            animation: `${snowDrift} ${flake.duration}s linear ${flake.delay}s infinite`,
            "@media (prefers-reduced-motion: reduce)": { display: "none" },
            "html[data-motion='off'] &": { display: "none" },
          }}
        />
      ))}

      {onGround("left", "3%", 36, 50, <PineTree star />, "tree-1")}
      {onGround("left", "11%", 28, 39, <PineTree />, "tree-2")}
      {onGround("right", "11%", 30, 42, <PineTree />, "tree-3")}
      {onGround("right", "3%", 32, 45, <Snowman />, "snowman")}
    </>
  );
}

// ---- In the footer scene ----

export const PineTree = ({ star }) => (
  <svg viewBox="0 0 40 56" width="100%" height="100%">
    <rect x="17" y="46" width="6" height="10" style={{ fill: seasonVar("trunk") }} />
    <path d="M20 4 L35 26 H5 Z" style={{ fill: seasonVar("pine") }} />
    <path d="M20 14 L38 38 H2 Z" style={{ fill: seasonVar("pine") }} />
    <path d="M20 24 L40 48 H0 Z" style={{ fill: seasonVar("pine-deep") }} />
    {/* Snow resting on each layer */}
    <path d="M20 4 L25 11.5 C22 13 18 13 15 11.5 Z" style={{ fill: seasonVar("snow") }} />
    <path d="M9 38 C14 35 26 35 31 38 L33 40.5 C26 39 14 39 7 40.5 Z" style={{ fill: seasonVar("snow") }} opacity="0.9" />
    {star && <path d="M20 0 L21.4 3.2 L24.8 3.4 L22.2 5.6 L23 9 L20 7.2 L17 9 L17.8 5.6 L15.2 3.4 L18.6 3.2 Z" style={{ fill: seasonVar("star") }} />}
  </svg>
);

PineTree.propTypes = { star: PropTypes.bool };

export const Snowman = () => (
  <svg viewBox="0 0 40 56" width="100%" height="100%">
    <g style={{ fill: seasonVar("snow"), stroke: seasonVar("snow-edge") }} strokeWidth="1">
      <circle cx="20" cy="43" r="12" />
      <circle cx="20" cy="26" r="9" />
      <circle cx="20" cy="13" r="7" />
    </g>
    <rect x="13" y="1" width="14" height="7" rx="1" style={{ fill: seasonVar("coal") }} />
    <rect x="10" y="7" width="20" height="2.4" rx="1" style={{ fill: seasonVar("coal") }} />
    <circle cx="17.4" cy="12" r="1" style={{ fill: seasonVar("coal") }} />
    <circle cx="22.6" cy="12" r="1" style={{ fill: seasonVar("coal") }} />
    <path d="M20 14 L27 15.5 L20 16.4 Z" style={{ fill: seasonVar("carrot") }} />
    <path d="M12 19.5 C17 22 23 22 28 19.5 L28 22.5 C23 25 17 25 12 22.5 Z" style={{ fill: seasonVar("berry") }} />
    <path d="M24 22 L27 30 L24.5 30.5 L22 23 Z" style={{ fill: seasonVar("berry") }} />
    <circle cx="20" cy="27" r="1" style={{ fill: seasonVar("coal") }} />
    <circle cx="20" cy="31" r="1" style={{ fill: seasonVar("coal") }} />
  </svg>
);

export const Present = ({ color, ribbon }) => (
  <svg viewBox="0 0 30 26" width="100%" height="100%">
    <rect x="2" y="8" width="26" height="17" rx="1.5" style={{ fill: seasonVar(color) }} />
    <rect x="0" y="5" width="30" height="5" rx="1.2" style={{ fill: seasonVar(color), stroke: seasonVar("coal") }} strokeOpacity="0.15" strokeWidth="0.6" />
    <rect x="13" y="5" width="4" height="20" style={{ fill: seasonVar(ribbon) }} />
    <path d="M15 5 C11 0 6 1 8 4 C9 5.5 12 5 15 5 C18 5 21 5.5 22 4 C24 1 19 0 15 5 Z" style={{ fill: seasonVar(ribbon) }} />
  </svg>
);

Present.propTypes = { color: PropTypes.string.isRequired, ribbon: PropTypes.string.isRequired };

// ---- On the garland ----

export const Ornament = ({ color }) => (
  <svg viewBox="0 0 24 30" width="100%" height="100%">
    <circle cx="12" cy="2.6" r="1.6" fill="none" style={{ stroke: seasonVar("ribbon-gold-deep") }} strokeWidth="1" />
    <rect x="8.5" y="3.8" width="7" height="4" rx="1" style={{ fill: seasonVar("ribbon-gold") }} />
    <circle cx="12" cy="18" r="10" style={{ fill: color }} />
    <path d="M2.4 18 Q12 22.5 21.6 18" style={{ stroke: seasonVar("snow") }} strokeOpacity="0.55" strokeWidth="1.4" fill="none" />
    <ellipse cx="8.2" cy="13.5" rx="2.2" ry="3.4" style={{ fill: seasonVar("snow") }} fillOpacity="0.45" transform="rotate(-30 8.2 13.5)" />
  </svg>
);

Ornament.propTypes = { color: PropTypes.string.isRequired };

// ---- The fundraising balloon ----

export const SnowSparkles = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
    <g style={{ fill: "var(--el-season-flake-edge)" }}>
      <circle cx="22" cy="62" r="2.2" />
      <circle cx="78" cy="30" r="1.8" />
      <circle cx="70" cy="78" r="2.4" />
      <circle cx="30" cy="20" r="1.5" />
      <circle cx="85" cy="58" r="1.6" />
      <circle cx="15" cy="40" r="1.4" />
    </g>
    <g style={{ fill: "var(--el-season-snow-edge)" }}>
      <path d="M80 70 L81.2 73.8 L85 75 L81.2 76.2 L80 80 L78.8 76.2 L75 75 L78.8 73.8 Z" />
      <path d="M24 28 L25 31 L28 32 L25 33 L24 36 L23 33 L20 32 L23 31 Z" />
    </g>
  </svg>
);

export const HollySprig = () => (
  <svg viewBox="0 0 36 26" width="100%" height="100%" aria-hidden="true">
    <ellipse cx="11" cy="11" rx="9.5" ry="4.4" transform="rotate(-22 11 11)" style={{ fill: "var(--el-season-holly)" }} />
    <ellipse cx="25" cy="11" rx="9.5" ry="4.4" transform="rotate(22 25 11)" style={{ fill: "var(--el-season-holly-deep)" }} />
    <path d="M3 14 L17 8 M33 14 L19 8" strokeWidth="0.8" style={{ fill: "none", stroke: "var(--el-season-holly-deep)" }} />
    <circle cx="15.5" cy="15" r="2.8" style={{ fill: "var(--el-season-berry)" }} />
    <circle cx="20.5" cy="15" r="2.8" style={{ fill: "var(--el-season-berry)" }} />
    <circle cx="18" cy="19.2" r="2.8" style={{ fill: "var(--el-season-berry-light)" }} />
    <circle cx="14.6" cy="14.1" r="0.8" style={{ fill: "var(--el-season-snow)", opacity: 0.7 }} />
  </svg>
);

// ---- The mark on the greeting ----

export const HollyMark = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <ellipse cx="8" cy="10" rx="6" ry="3" transform="rotate(-25 8 10)" style={{ fill: "var(--el-season-holly)" }} />
    <ellipse cx="16" cy="10" rx="6" ry="3" transform="rotate(25 16 10)" style={{ fill: "var(--el-season-holly-deep)" }} />
    <circle cx="10.5" cy="14.5" r="2" style={{ fill: "var(--el-season-berry)" }} />
    <circle cx="13.5" cy="14.5" r="2" style={{ fill: "var(--el-season-berry-light)" }} />
    <circle cx="12" cy="17.2" r="2" style={{ fill: "var(--el-season-berry)" }} />
  </svg>
);

export default function Christmas() {
  const flakes = useMemo(makeFlakes, []);

  return (
    <Box aria-hidden="true" sx={{ ...layerSx(zIndex.decorMotion), ...motionOnly, ...fewerOnPhones(PHONE_FLAKE_COUNT) }}>
      {flakes.map((flake) => (
        <Box
          key={flake.id}
          style={flake.style}
          sx={{
            position: "absolute",
            top: 0,
            width: flake.size,
            height: flake.size,
            willChange: "transform",
            animation: `${fall} var(--duration) linear var(--delay) infinite`,
          }}
        >
          <Box
            style={flake.swayStyle}
            sx={{
              width: "100%",
              height: "100%",
              animation: `${sway} var(--sway-duration) ease-in-out var(--sway-delay) infinite`,
            }}
          >
            <Box
              style={flake.spinStyle}
              sx={{ width: "100%", height: "100%", animation: `${spin} var(--spin-duration) linear infinite` }}
            >
              <Snowflake />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
