import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";
import { useSeason } from "../../theme/SeasonContext";
import { flapWings, seasonVar } from "./shared";

// A string draped along the bottom edge of the header with small charms
// swinging from it. Each season brings party flags or twinkling lights, and
// its own charms (see its pack in ./packs). Purely decorative, so it ignores
// clicks. Colors are season CSS variables.

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

// theme: the season's flags or lights, the string's color and its charms
export default function NavbarGarland({ theme }) {
  const { zodiac } = useSeason();

  const stringColor = theme.string;
  const charms = theme.charms({ zodiac });

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
        // Once the page scrolls, text passes under the header, so the garland fades out of its way
        transition: "opacity 200ms ease",
        "header[data-scrolled] &": { opacity: 0 },
        // Hold still for visitors who ask for reduced motion
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "& *": { animation: "none !important" },
        },
        "html[data-motion='off'] &": {
          transition: "none",
          "& *": { animation: "none !important" },
        },
        [muiTheme.breakpoints.down("md")]: {
          // Half the charms on small screens so they don't crowd
          "& .garland-charm:nth-of-type(even)": { display: "none" },
          // The newer seasons stop above the page title, which starts 36 pixels under the header here
          ...(theme.fitsSmallScreens && {
            "& .garland-thread": { height: 6 },
            "& .garland-art": { top: 4, transform: "scale(0.72)", transformOrigin: "top center" },
          }),
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
            <path d="M0 0 L13 0 L6.5 15 Z" style={{ fill: theme.flags[i % theme.flags.length], stroke: theme.flagEdge }} strokeWidth={theme.flagEdge ? 0.5 : undefined} />
            <path d="M1.5 0 L4 0 L6.5 11 Z" style={{ fill: theme.shine ?? seasonVar("ghost") }} fillOpacity="0.18" />
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
              className="garland-thread"
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
              className="garland-art"
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

NavbarGarland.propTypes = {
  theme: PropTypes.shape({
    flags: PropTypes.arrayOf(PropTypes.string),
    lights: PropTypes.arrayOf(PropTypes.string),
    string: PropTypes.string.isRequired,
    flagEdge: PropTypes.string,
    shine: PropTypes.string,
    fitsSmallScreens: PropTypes.bool,
    charms: PropTypes.func.isRequired,
  }).isRequired,
};
