import { useMemo } from "react";
import Box from "@mui/material/Box";
import { fall, sway, spin, random, layerSx, motionOnly, fewerOnPhones, seasonVar } from "./shared";
import { zIndex } from "../../theme/tokens";

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
