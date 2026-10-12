import { useId, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";
import { fall, sway, spin, flapWings, buildWebPath, random, layerSx, motionOnly, fewerOnPhones } from "./shared";

// Halloween: a faint purple and orange glow at the screen edges, spider webs in
// the top corners with a dangling spider, bats flapping across the screen,
// glowing jack-o'-lanterns and candy corn falling, and little ghosts floating up.

const TREAT_COUNT = 14;
const PHONE_TREAT_COUNT = 7;
const GHOST_COUNT = 5;
const PHONE_GHOST_COUNT = 3;
const BAT_COUNT = 6;
const PHONE_BAT_COUNT = 3;

// ---- Motion ----

const flyAcross = keyframes`
  from { transform: translate3d(-12vw, 0, 0); }
  to { transform: translate3d(112vw, 0, 0); }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(calc(var(--bob) * -1)) rotate(-6deg); }
  50% { transform: translateY(var(--bob)) rotate(6deg); }
`;

const rise = keyframes`
  0% { transform: translate3d(0, 110vh, 0); opacity: 0; }
  12% { opacity: 0.9; }
  80% { opacity: 0.9; }
  100% { transform: translate3d(0, -15vh, 0); opacity: 0; }
`;

const dangle = keyframes`
  0%, 100% { transform: translateY(var(--dangle-top)); }
  50% { transform: translateY(var(--dangle-bottom)); }
`;

// ---- Shapes ----

const WEB_SIZE = 170;

const WEB_PATH = buildWebPath(WEB_SIZE);

const CornerWeb = ({ side, color }) => (
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
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </Box>
);

CornerWeb.propTypes = {
  side: PropTypes.oneOf(["left", "right"]).isRequired,
  color: PropTypes.string.isRequired,
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

export const SpiderShape = ({ color }) => (
  <svg viewBox="0 0 40 40" width="100%" height="100%">
    <g stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none">
      {SPIDER_LEGS.map((leg) => (
        <path key={leg} d={leg} />
      ))}
    </g>
    <ellipse cx="20" cy="25" rx="6" ry="7.5" fill={color} />
    <circle cx="20" cy="16" r="4.2" fill={color} />
    <ellipse cx="18" cy="22.5" rx="1.6" ry="2.4" fill="rgba(255, 255, 255, 0.18)" />
    <circle cx="18.4" cy="15.6" r="1" fill="#ff9f1c" />
    <circle cx="21.6" cy="15.6" r="1" fill="#ff9f1c" />
  </svg>
);

SpiderShape.propTypes = { color: PropTypes.string.isRequired };

const Spider = ({ color, threadColor }) => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 104,
      width: 30,
      height: 30,
      "--dangle-top": "96px",
      "--dangle-bottom": "176px",
      animation: `${dangle} 6s ease-in-out infinite`,
      "@media (max-width: 600px)": {
        left: 58,
        width: 22,
        height: 22,
        "--dangle-top": "70px",
        "--dangle-bottom": "118px",
      },
      // Hang still for visitors who ask for reduced motion
      "@media (prefers-reduced-motion: reduce)": {
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
        backgroundColor: threadColor,
      }}
    />
    <SpiderShape color={color} />
  </Box>
);

Spider.propTypes = {
  color: PropTypes.string.isRequired,
  threadColor: PropTypes.string.isRequired,
};

const BAT_WING =
  "M46 22 C40 12 26 8 8 12 C12 16 14 20 13 25 C18 22 23 23 26 28 C30 24 35 25 38 30 C41 26 44 26 46 28 Z";

// Wings carry the "bat-wing" class; a parent with `flapWings` from ./shared animates them
export const FlyingBat = ({ color }) => (
  <svg viewBox="0 0 100 50" width="100%" height="100%" fill={color}>
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
    <circle cx="48.3" cy="18" r="0.9" fill="#ffb84d" />
    <circle cx="51.7" cy="18" r="0.9" fill="#ffb84d" />
  </svg>
);

FlyingBat.propTypes = { color: PropTypes.string.isRequired };

export const Pumpkin = ({ face }) => {
  // Each pumpkin needs its own gradient id; React's ids contain colons, so strip them
  const glowId = `pumpkin-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg viewBox="-6 -4 44 42" width="100%" height="100%">
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor="#ffb347" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="19" r="21" fill={`url(#${glowId})`} />
      <path d="M15 8 C15 5 16 3 19 2 L20 4 C18 4.5 17.5 6 17.5 8 Z" fill="#4e6b22" />
      <path d="M17.5 6 C20 6 22 4.5 23 3" stroke="#6b8e23" strokeWidth="1" fill="none" strokeLinecap="round" />
      <ellipse cx="10" cy="19" rx="7.5" ry="10" fill="#e0650a" />
      <ellipse cx="22" cy="19" rx="7.5" ry="10" fill="#e0650a" />
      <ellipse cx="16" cy="19" rx="7" ry="11" fill="#ff8a1c" />
      <path
        d="M12.5 9.5 C10.5 14 10.5 24 12.5 28.8 M19.5 9.5 C21.5 14 21.5 24 19.5 28.8"
        stroke="#c4540a"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      {face && (
        // A lit face, as if there is a candle inside
        <g fill="#ffd34d">
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
    <path d="M5.9 15 L18.1 15 L19.6 18.5 C20.4 21.5 3.6 21.5 4.4 18.5 Z" fill="#ffc21a" />
    <path d="M9.2 8 L14.8 8 L18.1 15 L5.9 15 Z" fill="#f47b20" />
    <path d="M12 2 C12.8 2 13.6 3.6 14.8 8 L9.2 8 C10.4 3.6 11.2 2 12 2 Z" fill="#fff8e7" />
    <path
      d="M12 2 C12.8 2 13.6 3.6 14.8 8 L19.6 18.5 C20.4 21.5 3.6 21.5 4.4 18.5 L9.2 8 C10.4 3.6 11.2 2 12 2 Z"
      fill="none"
      stroke="rgba(120, 60, 0, 0.35)"
      strokeWidth="0.8"
    />
  </svg>
);

export const Ghost = () => (
  <svg viewBox="0 0 30 34" width="100%" height="100%">
    {/* A faint outline keeps the white ghost visible on white sections */}
    <g fill="#ffffff" stroke="rgba(90, 90, 130, 0.45)" strokeWidth="1" strokeLinejoin="round">
      <path d="M4.8 15.5 C2.2 16.2 1.2 18.8 2.6 20.2 C3.5 19.6 4.2 18.8 4.8 18.4 Z" />
      <path d="M25.2 15.5 C27.8 16.2 28.8 18.8 27.4 20.2 C26.5 19.6 25.8 18.8 25.2 18.4 Z" />
      <path d="M15 2 C8 2 4.5 7 4.5 13 L4.5 27 C4.5 29 6 30.5 7.5 29 C9 27.5 10.5 27.5 11.5 29.5 C12.5 31.5 14 31.5 15 29.5 C16 27.5 17.5 27.5 18.5 29.5 C19.5 31.5 21 31.5 22.5 29.5 C24 27.5 25.5 29 25.5 27 L25.5 13 C25.5 7 22 2 15 2 Z" />
    </g>
    <ellipse cx="11.5" cy="13" rx="1.5" ry="2.1" fill="#2d2d3a" />
    <ellipse cx="18.5" cy="13" rx="1.5" ry="2.1" fill="#2d2d3a" />
    <ellipse cx="15" cy="18.5" rx="1.4" ry="1.9" fill="#2d2d3a" />
    <circle cx="9.3" cy="16.4" r="1.3" fill="rgba(255, 140, 170, 0.55)" />
    <circle cx="20.7" cy="16.4" r="1.3" fill="rgba(255, 140, 170, 0.55)" />
  </svg>
);

// ---- Placement ----

function makeTreats() {
  return Array.from({ length: TREAT_COUNT }, (_, id) => {
    const kind = id % 2 === 0 ? "pumpkin" : "candy";
    const duration = random(10, 17);
    const swayDuration = random(3, 6);
    return {
      id,
      kind,
      size: kind === "pumpkin" ? random(28, 40) : random(18, 26),
      face: Math.random() < 0.75,
      style: {
        left: `${random(0, 100)}%`,
        opacity: random(0.75, 1),
        "--duration": `${duration}s`,
        // A negative delay starts each piece partway along, so the screen is filled right away
        "--delay": `${-random(0, duration)}s`,
      },
      swayStyle: {
        "--sway": `${random(10, 35)}px`,
        "--tilt": `${random(10, 30)}deg`,
        "--sway-duration": `${swayDuration}s`,
        "--sway-delay": `${-random(0, swayDuration)}s`,
      },
      spinStyle: { "--spin-duration": `${random(5, 10)}s` },
    };
  });
}

function makeGhosts() {
  return Array.from({ length: GHOST_COUNT }, (_, id) => {
    const duration = random(18, 28);
    const swayDuration = random(3, 5);
    return {
      id,
      size: random(30, 44),
      style: {
        left: `${random(3, 95)}%`,
        "--duration": `${duration}s`,
        "--delay": `${-random(0, duration)}s`,
      },
      swayStyle: {
        "--sway": `${random(15, 35)}px`,
        "--tilt": `${random(4, 10)}deg`,
        "--sway-duration": `${swayDuration}s`,
        "--sway-delay": `${-random(0, swayDuration)}s`,
      },
    };
  });
}

function makeBats() {
  return Array.from({ length: BAT_COUNT }, (_, id) => {
    const duration = random(13, 22);
    const bobDuration = random(1.6, 2.8);
    return {
      id,
      width: random(44, 72),
      style: {
        top: `${random(10, 72)}%`,
        "--fly-duration": `${duration}s`,
        "--fly-delay": `${-random(0, duration)}s`,
        // Half the bats fly left to right, the other half right to left
        "--fly-direction": id % 2 === 0 ? "normal" : "reverse",
      },
      bobStyle: {
        "--bob": `${random(12, 28)}px`,
        "--bob-duration": `${bobDuration}s`,
        "--bob-delay": `${-random(0, bobDuration)}s`,
      },
      wingStyle: { "--flap": `${random(0.16, 0.24)}s` },
    };
  });
}

const fill = { width: "100%", height: "100%" };

// ---- Scene ----

export default function Halloween({ mode }) {
  const treats = useMemo(makeTreats, []);
  const ghosts = useMemo(makeGhosts, []);
  const bats = useMemo(makeBats, []);

  const isDark = mode === "dark";
  const batColor = isDark ? "#b79ce0" : "#2b1d3a";
  const webColor = isDark ? "rgba(230, 225, 245, 0.4)" : "rgba(80, 70, 100, 0.4)";
  const spiderColor = isDark ? "#cbb6e6" : "#2a2230";
  const purple = isDark ? 0.28 : 0.12;
  const orange = isDark ? 0.2 : 0.12;

  return (
    <>
      {/* Faint purple glow in the top corners and an orange glow along the bottom */}
      <Box
        aria-hidden="true"
        sx={{
          ...layerSx(1040),
          background: [
            `radial-gradient(circle at 0% 0%, rgba(106, 27, 154, ${purple}) 0%, transparent 38%)`,
            `radial-gradient(circle at 100% 0%, rgba(106, 27, 154, ${purple}) 0%, transparent 38%)`,
            `radial-gradient(ellipse at 50% 115%, rgba(255, 115, 0, ${orange}) 0%, transparent 50%)`,
          ].join(", "),
        }}
      />

      <Box aria-hidden="true" sx={layerSx(1060)}>
        <CornerWeb side="left" color={webColor} />
        <CornerWeb side="right" color={webColor} />
        <Spider color={spiderColor} threadColor={webColor} />
      </Box>

      {/* Jack-o'-lanterns and candy corn falling */}
      <Box aria-hidden="true" sx={{ ...layerSx(1080), ...motionOnly, ...fewerOnPhones(PHONE_TREAT_COUNT) }}>
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

      {/* Ghosts floating up and fading away */}
      <Box aria-hidden="true" sx={{ ...layerSx(1080), ...motionOnly, ...fewerOnPhones(PHONE_GHOST_COUNT) }}>
        {ghosts.map((ghost) => (
          <Box
            key={ghost.id}
            style={ghost.style}
            sx={{
              position: "absolute",
              top: 0,
              width: ghost.size,
              height: ghost.size * (34 / 30),
              willChange: "transform, opacity",
              animation: `${rise} var(--duration) linear var(--delay) infinite`,
            }}
          >
            <Box
              style={ghost.swayStyle}
              sx={{ ...fill, animation: `${sway} var(--sway-duration) ease-in-out var(--sway-delay) infinite` }}
            >
              <Ghost />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Bats flapping across the screen */}
      <Box aria-hidden="true" sx={{ ...layerSx(1080), ...motionOnly, ...fewerOnPhones(PHONE_BAT_COUNT) }}>
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
                <FlyingBat color={batColor} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

Halloween.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
};
