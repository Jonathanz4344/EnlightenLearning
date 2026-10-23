import { useId, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";
import { fall, sway, spin, flapWings, buildWebPath, random, layerSx, motionOnly, fewerOnPhones, seasonVar } from "./shared";
import { zIndex } from "../../theme/tokens";

// Halloween, dressed: a faint glow at the screen edges, a spider web in one
// top corner with a dangling spider, a few bats, and a handful of small
// jack-o'-lanterns and candy corn drifting down. Calm by design: few pieces,
// slow, and every color from the season's CSS variables.

const TREAT_COUNT = 8;
const PHONE_TREAT_COUNT = 4;
const BAT_COUNT = 3;
const PHONE_BAT_COUNT = 2;

// ---- Motion ----

const flyAcross = keyframes`
  from { transform: translate3d(-12vw, 0, 0); }
  to { transform: translate3d(112vw, 0, 0); }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(calc(var(--bob) * -1)) rotate(-6deg); }
  50% { transform: translateY(var(--bob)) rotate(6deg); }
`;

const dangle = keyframes`
  0%, 100% { transform: translateY(var(--dangle-top)); }
  50% { transform: translateY(var(--dangle-bottom)); }
`;

// ---- Shapes ----

const WEB_SIZE = 170;

const WEB_PATH = buildWebPath(WEB_SIZE);

const CornerWeb = ({ side }) => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      [side]: 0,
      width: WEB_SIZE,
      height: WEB_SIZE,
      transform: side === "right" ? "scaleX(-1)" : "none",
      "@media (max-width: 600px)": { width: 100, height: 100 },
    }}
  >
    <svg viewBox={`0 0 ${WEB_SIZE} ${WEB_SIZE}`} width="100%" height="100%">
      <path
        d={WEB_PATH}
        fill="none"
        style={{ stroke: seasonVar("web") }}
        strokeWidth="1.1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </Box>
);

CornerWeb.propTypes = {
  side: PropTypes.oneOf(["left", "right"]).isRequired,
};

const SPIDER_LEGS = [
  "M16 18 Q9 11 4 14",
  "M15 21 Q7 18 2 22",
  "M15 24 Q7 26 3 31",
  "M16 27 Q11 32 8 37",
  "M24 18 Q31 11 36 14",
  "M25 21 Q33 18 38 22",
  "M25 24 Q33 26 37 31",
  "M24 27 Q29 32 32 37",
];

export const SpiderShape = () => (
  <svg viewBox="0 0 40 40" width="100%" height="100%">
    <g style={{ stroke: seasonVar("spider") }} strokeWidth="1.6" strokeLinecap="round" fill="none">
      {SPIDER_LEGS.map((leg) => (
        <path key={leg} d={leg} />
      ))}
    </g>
    <ellipse cx="20" cy="25" rx="6" ry="7.5" style={{ fill: seasonVar("spider") }} />
    <circle cx="20" cy="16" r="4.2" style={{ fill: seasonVar("spider") }} />
    <circle cx="18.4" cy="15.6" r="1" style={{ fill: seasonVar("pumpkin-light") }} />
    <circle cx="21.6" cy="15.6" r="1" style={{ fill: seasonVar("pumpkin-light") }} />
  </svg>
);

const Spider = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 104,
      width: 30,
      height: 30,
      "--dangle-top": "96px",
      "--dangle-bottom": "150px",
      animation: `${dangle} 8s ease-in-out infinite`,
      "@media (max-width: 600px)": {
        left: 58,
        width: 22,
        height: 22,
        "--dangle-top": "70px",
        "--dangle-bottom": "104px",
      },
      // Hang still for visitors who ask for reduced motion
      "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
        transform: "translateY(var(--dangle-top))",
      },
      "html[data-motion='off'] &": {
        animation: "none",
        transform: "translateY(var(--dangle-top))",
      },
    }}
  >
    {/* Silk thread running up past the top of the screen */}
    <Box
      sx={{
        position: "absolute",
        bottom: "70%",
        left: "50%",
        width: "1px",
        height: "100vh",
        backgroundColor: seasonVar("web"),
      }}
    />
    <SpiderShape />
  </Box>
);

const BAT_WING =
  "M46 22 C40 12 26 8 8 12 C12 16 14 20 13 25 C18 22 23 23 26 28 C30 24 35 25 38 30 C41 26 44 26 46 28 Z";

// Wings carry the "bat-wing" class; a parent with `flapWings` from ./shared animates them
export const FlyingBat = () => (
  <svg viewBox="0 0 100 50" width="100%" height="100%" style={{ fill: seasonVar("bat") }}>
    <g className="bat-wing">
      <path d={BAT_WING} />
    </g>
    {/* The right wing is the left wing mirrored, so both flap together */}
    <g transform="translate(100 0) scale(-1 1)">
      <g className="bat-wing">
        <path d={BAT_WING} />
      </g>
    </g>
    <ellipse cx="50" cy="27" rx="5" ry="9" />
    <circle cx="50" cy="18" r="4.5" />
    <path d="M46.5 16 L47 9 L50 14 L53 9 L53.5 16 Z" />
    <circle cx="48.3" cy="18" r="0.9" style={{ fill: seasonVar("pumpkin-light") }} />
    <circle cx="51.7" cy="18" r="0.9" style={{ fill: seasonVar("pumpkin-light") }} />
  </svg>
);

export const Pumpkin = ({ face }) => {
  // Each pumpkin needs its own gradient id; React's ids contain colons, so strip them
  const glowId = `pumpkin-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg viewBox="-6 -4 44 42" width="100%" height="100%">
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" style={{ stopColor: seasonVar("pumpkin-light") }} stopOpacity="0.5" />
          <stop offset="100%" style={{ stopColor: seasonVar("pumpkin-light") }} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="19" r="21" fill={`url(#${glowId})`} />
      <path d="M15 8 C15 5 16 3 19 2 L20 4 C18 4.5 17.5 6 17.5 8 Z" style={{ fill: seasonVar("stem") }} />
      <path d="M17.5 6 C20 6 22 4.5 23 3" style={{ stroke: seasonVar("leaf") }} strokeWidth="1" fill="none" strokeLinecap="round" />
      <ellipse cx="10" cy="19" rx="7.5" ry="10" style={{ fill: seasonVar("pumpkin-deep") }} />
      <ellipse cx="22" cy="19" rx="7.5" ry="10" style={{ fill: seasonVar("pumpkin-deep") }} />
      <ellipse cx="16" cy="19" rx="7" ry="11" style={{ fill: seasonVar("pumpkin") }} />
      <path
        d="M12.5 9.5 C10.5 14 10.5 24 12.5 28.8 M19.5 9.5 C21.5 14 21.5 24 19.5 28.8"
        style={{ stroke: seasonVar("pumpkin-deep") }}
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      {face && (
        // A lit face, as if there is a candle inside
        <g style={{ fill: seasonVar("candle") }}>
          <path d="M9.5 16 L12.5 16 L11 12.8 Z" />
          <path d="M19.5 16 L22.5 16 L21 12.8 Z" />
          <path d="M15 18.6 L17 18.6 L16 17 Z" />
          <path d="M9 21 Q16 27.5 23 21 L21 22.6 L19.5 21.6 L17.5 23.2 L16 22 L14.5 23.2 L12.5 21.6 L11 22.6 Z" />
        </g>
      )}
    </svg>
  );
};

Pumpkin.propTypes = { face: PropTypes.bool.isRequired };

const CandyCorn = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path d="M5.9 15 L18.1 15 L19.6 18.5 C20.4 21.5 3.6 21.5 4.4 18.5 Z" style={{ fill: seasonVar("candle") }} />
    <path d="M9.2 8 L14.8 8 L18.1 15 L5.9 15 Z" style={{ fill: seasonVar("pumpkin") }} />
    <path d="M12 2 C12.8 2 13.6 3.6 14.8 8 L9.2 8 C10.4 3.6 11.2 2 12 2 Z" style={{ fill: seasonVar("ghost") }} />
    <path
      d="M12 2 C12.8 2 13.6 3.6 14.8 8 L19.6 18.5 C20.4 21.5 3.6 21.5 4.4 18.5 L9.2 8 C10.4 3.6 11.2 2 12 2 Z"
      fill="none"
      style={{ stroke: seasonVar("pumpkin-deep") }}
      strokeWidth="0.8"
      opacity="0.5"
    />
  </svg>
);

export const Ghost = () => (
  <svg viewBox="0 0 30 34" width="100%" height="100%">
    {/* A faint outline keeps the white ghost visible on light sections */}
    <g style={{ fill: seasonVar("ghost"), stroke: seasonVar("ghost-edge") }} strokeWidth="1" strokeLinejoin="round">
      <path d="M4.8 15.5 C2.2 16.2 1.2 18.8 2.6 20.2 C3.5 19.6 4.2 18.8 4.8 18.4 Z" />
      <path d="M25.2 15.5 C27.8 16.2 28.8 18.8 27.4 20.2 C26.5 19.6 25.8 18.8 25.2 18.4 Z" />
      <path d="M15 2 C8 2 4.5 7 4.5 13 L4.5 27 C4.5 29 6 30.5 7.5 29 C9 27.5 10.5 27.5 11.5 29.5 C12.5 31.5 14 31.5 15 29.5 C16 27.5 17.5 27.5 18.5 29.5 C19.5 31.5 21 31.5 22.5 29.5 C24 27.5 25.5 29 25.5 27 L25.5 13 C25.5 7 22 2 15 2 Z" />
    </g>
    <ellipse cx="11.5" cy="13" rx="1.5" ry="2.1" style={{ fill: seasonVar("night") }} />
    <ellipse cx="18.5" cy="13" rx="1.5" ry="2.1" style={{ fill: seasonVar("night") }} />
    <ellipse cx="15" cy="18.5" rx="1.4" ry="1.9" style={{ fill: seasonVar("night") }} />
  </svg>
);

// ---- Placement ----

function makeTreats() {
  return Array.from({ length: TREAT_COUNT }, (_, id) => {
    const kind = id % 2 === 0 ? "pumpkin" : "candy";
    const duration = random(22, 34);
    const swayDuration = random(4, 7);
    return {
      id,
      kind,
      size: kind === "pumpkin" ? random(22, 32) : random(14, 20),
      face: Math.random() < 0.75,
      style: {
        left: `${random(0, 100)}%`,
        opacity: random(0.55, 0.85),
        "--duration": `${duration}s`,
        // A negative delay starts each piece partway along, so the screen is filled right away
        "--delay": `${-random(0, duration)}s`,
      },
      swayStyle: {
        "--sway": `${random(8, 24)}px`,
        "--tilt": `${random(6, 18)}deg`,
        "--sway-duration": `${swayDuration}s`,
        "--sway-delay": `${-random(0, swayDuration)}s`,
      },
      spinStyle: { "--spin-duration": `${random(8, 14)}s` },
    };
  });
}

function makeBats() {
  return Array.from({ length: BAT_COUNT }, (_, id) => {
    const duration = random(26, 40);
    const bobDuration = random(2, 3.2);
    return {
      id,
      width: random(36, 56),
      style: {
        top: `${random(12, 60)}%`,
        opacity: 0.8,
        "--fly-duration": `${duration}s`,
        "--fly-delay": `${-random(0, duration)}s`,
        // Half the bats fly left to right, the other half right to left
        "--fly-direction": id % 2 === 0 ? "normal" : "reverse",
      },
      bobStyle: {
        "--bob": `${random(8, 18)}px`,
        "--bob-duration": `${bobDuration}s`,
        "--bob-delay": `${-random(0, bobDuration)}s`,
      },
      wingStyle: { "--flap": `${random(0.18, 0.26)}s` },
    };
  });
}

const fill = { width: "100%", height: "100%" };

// ---- Scene ----

export default function Halloween() {
  const treats = useMemo(makeTreats, []);
  const bats = useMemo(makeBats, []);

  return (
    <>
      {/* Faint purple glow in the top corners and an orange glow along the bottom */}
      <Box
        aria-hidden="true"
        sx={{
          ...layerSx(zIndex.decor),
          background: [
            `radial-gradient(circle at 0% 0%, ${seasonVar("glow-purple")} 0%, transparent 38%)`,
            `radial-gradient(circle at 100% 0%, ${seasonVar("glow-purple")} 0%, transparent 38%)`,
            `radial-gradient(ellipse at 50% 115%, ${seasonVar("glow-orange")} 0%, transparent 50%)`,
          ].join(", "),
        }}
      />

      <Box aria-hidden="true" sx={layerSx(zIndex.decor + 10)}>
        <CornerWeb side="left" />
        <Spider />
      </Box>

      {/* Jack-o'-lanterns and candy corn drifting down */}
      <Box aria-hidden="true" sx={{ ...layerSx(zIndex.decorMotion), ...motionOnly, ...fewerOnPhones(PHONE_TREAT_COUNT) }}>
        {treats.map((treat) => (
          <Box
            key={treat.id}
            style={treat.style}
            sx={{
              position: "absolute",
              top: 0,
              width: treat.size,
              height: treat.size,
              willChange: "transform",
              animation: `${fall} var(--duration) linear var(--delay) infinite`,
            }}
          >
            <Box
              style={treat.swayStyle}
              sx={{ ...fill, animation: `${sway} var(--sway-duration) ease-in-out var(--sway-delay) infinite` }}
            >
              {treat.kind === "pumpkin" ? (
                <Pumpkin face={treat.face} />
              ) : (
                <Box
                  style={treat.spinStyle}
                  sx={{ ...fill, animation: `${spin} var(--spin-duration) linear infinite` }}
                >
                  <CandyCorn />
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* A few bats crossing the screen */}
      <Box aria-hidden="true" sx={{ ...layerSx(zIndex.decorMotion), ...motionOnly, ...fewerOnPhones(PHONE_BAT_COUNT) }}>
        {bats.map((bat) => (
          <Box
            key={bat.id}
            style={bat.style}
            sx={{
              position: "absolute",
              left: 0,
              width: bat.width,
              height: bat.width / 2,
              willChange: "transform",
              animation: `${flyAcross} var(--fly-duration) linear var(--fly-delay) infinite var(--fly-direction)`,
            }}
          >
            <Box
              style={bat.bobStyle}
              sx={{ ...fill, animation: `${bob} var(--bob-duration) ease-in-out var(--bob-delay) infinite` }}
            >
              <Box style={bat.wingStyle} sx={{ ...fill, ...flapWings }}>
                <FlyingBat />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
