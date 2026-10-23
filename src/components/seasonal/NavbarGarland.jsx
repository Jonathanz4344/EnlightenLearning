import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";
import { SEASONS } from "../../constants/season";
import { useSeason } from "../../theme/SeasonContext";
import { flapWings, seasonVar } from "./shared";
import { Pumpkin, FlyingBat, Ghost, SpiderShape } from "./Halloween";

// A string draped along the bottom edge of the header with small charms
// swinging from it. Halloween gets party flags with jack-o'-lanterns, bats,
// ghosts and a spider. The holidays get twinkling lights and glass ornaments.
// Purely decorative, so it ignores clicks. Colors are season CSS variables.

const SWAGS = 8;
const DROP = 12; // how far each swag dips below the header, in pixels
// Where the lights or flags sit along each swag. The middle of each swag is left
// clear for its hanging charm.
const LIGHT_SPOTS = [0.2, 0.5, 0.8];
const FLAG_SPOTS = [0.13, 0.32, 0.68, 0.87];

const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

const swing = keyframes`
  0%, 100% { transform: rotate(-7deg); }
  50% { transform: rotate(7deg); }
`;

// A point on swag `index` at position t from 0 to 1: x as a share of the width, y in pixels
const swagPoint = (index, t) => ({
  x: ((index + t) / SWAGS) * 100,
  y: 2 + 4 * (DROP - 2) * t * (1 - t),
});

const STRING_PATH = Array.from(
  { length: SWAGS },
  (_, i) => `M${i * 100} 2 Q${i * 100 + 50} ${2 * DROP - 2} ${(i + 1) * 100} 2`
).join(" ");

const Ornament = ({ color }) => (
  <svg viewBox="0 0 24 30" width="100%" height="100%">
    <circle cx="12" cy="2.6" r="1.6" fill="none" style={{ stroke: seasonVar("ribbon-gold-deep") }} strokeWidth="1" />
    <rect x="8.5" y="3.8" width="7" height="4" rx="1" style={{ fill: seasonVar("ribbon-gold") }} />
    <circle cx="12" cy="18" r="10" style={{ fill: color }} />
    <path d="M2.4 18 Q12 22.5 21.6 18" style={{ stroke: seasonVar("snow") }} strokeOpacity="0.55" strokeWidth="1.4" fill="none" />
    <ellipse cx="8.2" cy="13.5" rx="2.2" ry="3.4" style={{ fill: seasonVar("snow") }} fillOpacity="0.45" transform="rotate(-30 8.2 13.5)" />
  </svg>
);

Ornament.propTypes = { color: PropTypes.string.isRequired };

// Each charm: what to draw, its size in pixels, and how long its thread is.
// Halloween threads are longer so the charms hang below the flags.
function halloweenCharms() {
  const bat = { width: 30, height: 15, node: <FlyingBat /> };
  const pumpkin = { width: 24, height: 23, node: <Pumpkin face /> };
  const ghost = { width: 18, height: 20, node: <Ghost /> };
  const spider = { width: 16, height: 16, node: <SpiderShape /> };
  return [pumpkin, bat, ghost, spider, pumpkin, ghost, bat, pumpkin].map((charm, i) => ({
    ...charm,
    thread: i % 2 === 0 ? 14 : 22,
  }));
}

function christmasCharms() {
  return Array.from({ length: SWAGS }, (_, i) => ({
    width: 16,
    height: 20,
    thread: i % 2 === 0 ? 8 : 16,
    node: <Ornament color={seasonVar(`ornaments-${(i % 4) + 1}`)} />,
  }));
}

const THEMES = {
  [SEASONS.HALLOWEEN]: {
    flags: ["pumpkin", "night", "bat"].map(seasonVar),
    string: seasonVar("night"),
    charms: halloweenCharms,
  },
  [SEASONS.CHRISTMAS]: {
    lights: [1, 2, 3, 4].map((i) => seasonVar(`lights-${i}`)),
    string: seasonVar("string"),
    charms: christmasCharms,
  },
};

export default function NavbarGarland() {
  const { season } = useSeason();
  const theme = THEMES[season];
  if (!theme) return null;

  const stringColor = theme.string;
  const charms = theme.charms();

  const spotsAlongString = (spots) => {
    const points = [];
    for (let swag = 0; swag < SWAGS; swag++) {
      spots.forEach((t) => points.push(swagPoint(swag, t)));
    }
    return points;
  };
  const lights = theme.lights ? spotsAlongString(LIGHT_SPOTS) : [];
  const flags = theme.flags ? spotsAlongString(FLAG_SPOTS) : [];

  return (
    <Box
      aria-hidden="true"
      sx={(muiTheme) => ({
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        height: DROP + 4,
        pointerEvents: "none",
        "@media print": { display: "none" },
        // Hold still for visitors who ask for reduced motion
        "@media (prefers-reduced-motion: reduce)": {
          "& *": { animation: "none !important" },
        },
        "html[data-motion='off'] &": {
          "& *": { animation: "none !important" },
        },
        [muiTheme.breakpoints.down("md")]: {
          // Half the charms on small screens so they don't crowd
          "& .garland-charm:nth-of-type(even)": { display: "none" },
        },
      })}
    >
      <svg
        viewBox={`0 0 ${SWAGS * 100} ${DROP + 4}`}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <path d={STRING_PATH} fill="none" style={{ stroke: stringColor }} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      {lights.map((point, i) => {
        const color = theme.lights[i % theme.lights.length];
        return (
          <Box
            key={`light-${i}`}
            sx={{
              position: "absolute",
              left: `${point.x}%`,
              top: point.y,
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Socket */}
            <Box sx={{ width: 4, height: 3, borderRadius: "1px", backgroundColor: stringColor }} />
            {/* Bulb */}
            <Box
              sx={{
                width: 6,
                height: 9,
                borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                backgroundColor: color,
                boxShadow: `0 0 6px 2px ${color}`,
                animation: `${twinkle} 2.4s ease-in-out infinite`,
                // Stagger the twinkle so neighboring bulbs never blink together
                animationDelay: `${-((i * 0.83) % 2.4)}s`,
              }}
            />
          </Box>
        );
      })}

      {flags.map((point, i) => (
        // Party flag hanging from the string, with a faint shine down one side
        <Box
          key={`flag-${i}`}
          sx={{
            position: "absolute",
            left: `${point.x}%`,
            top: point.y - 1,
            width: 13,
            height: 15,
            transform: "translateX(-50%)",
            "@media (max-width: 600px)": { width: 9, height: 11 },
          }}
        >
          <svg viewBox="0 0 13 15" width="100%" height="100%">
            <path d="M0 0 L13 0 L6.5 15 Z" style={{ fill: theme.flags[i % theme.flags.length] }} />
            <path d="M1.5 0 L4 0 L6.5 11 Z" style={{ fill: seasonVar("ghost") }} fillOpacity="0.18" />
          </svg>
        </Box>
      ))}

      {charms.map((charm, i) => {
        const point = swagPoint(i, 0.5);
        return (
          <Box
            key={`charm-${i}`}
            className="garland-charm"
            sx={{
              position: "absolute",
              left: `${point.x}%`,
              top: point.y,
              width: 0,
              height: charm.thread + charm.height,
              transformOrigin: "top center",
              animation: `${swing} ${3 + (i % 3) * 0.4}s ease-in-out infinite`,
              animationDelay: `${-i * 0.7}s`,
            }}
          >
            {/* Thread */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "-0.5px",
                width: "1px",
                height: charm.thread + 2,
                backgroundColor: stringColor,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: charm.thread,
                left: -charm.width / 2,
                width: charm.width,
                height: charm.height,
                ...flapWings,
                "--flap": "0.35s",
              }}
            >
              {charm.node}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
