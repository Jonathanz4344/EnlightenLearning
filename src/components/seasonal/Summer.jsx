import { Drift, Crossing } from "./Drift";
import { flapWings, fillVar, strokeVar, seasonVar } from "./shared";
import { glide, onGround, inSky, SKY_TOP, still } from "./sceneryKit";
import Box from "@mui/material/Box";

// Summer, dressed: bubbles going up, a gull crossing now and then, and the
// fundraising balloon as a beach ball. Colors are the season's CSS variables.

export const Bubble = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <circle cx="12" cy="12" r="10.5" style={{ ...fillVar("bubble"), ...strokeVar("bubble-edge") }} strokeWidth="1.2" />
    <path d="M6.6 9.4 C7.4 7.2 9 5.8 11 5.4" fill="none" style={strokeVar("bubble-shine")} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="16.4" cy="16.6" r="1.1" style={fillVar("bubble-shine")} />
  </svg>
);

const GULL_WING = "M50 20 C42 8 26 4 4 10 C16 12 26 16 32 24 C38 20 44 20 50 24 Z";

// Wings carry the "bat-wing" class, which flapWings from ./shared works. Seen
// from the front, so it looks right going either way.
export const Gull = () => (
  <svg viewBox="0 0 100 36" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
    <g className="bat-wing">
      <path d={GULL_WING} style={{ ...fillVar("gull"), ...strokeVar("gull-edge") }} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M4 10 C9 9 14 9 19 10 C14 11 10 11 4 10 Z" style={fillVar("gull-tip")} />
    </g>
    <g transform="translate(100 0) scale(-1 1)">
      <g className="bat-wing">
        <path d={GULL_WING} style={{ ...fillVar("gull"), ...strokeVar("gull-edge") }} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M4 10 C9 9 14 9 19 10 C14 11 10 11 4 10 Z" style={fillVar("gull-tip")} />
      </g>
    </g>
    <ellipse cx="50" cy="24" rx="5.4" ry="8.5" style={{ ...fillVar("gull"), ...strokeVar("gull-edge") }} strokeWidth="1.2" />
    <path d="M47.6 28 L50 33 L52.4 28 Z" style={fillVar("beak")} />
  </svg>
);

const SUN_RAYS = Array.from({ length: 12 }, (_, i) => i * 30);

export const Sun = () => (
  <svg viewBox="-34 -34 68 68" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
    <g style={strokeVar("sun-deep")} strokeWidth="3" strokeLinecap="round">
      {SUN_RAYS.map((angle, i) => (
        <line key={angle} y1="-22" y2={i % 2 === 0 ? -31 : -27} transform={`rotate(${angle})`} />
      ))}
    </g>
    <circle r="17" style={{ ...fillVar("sun"), ...strokeVar("sun-deep") }} strokeWidth="1.4" />
  </svg>
);

export const Umbrella = () => (
  <svg viewBox="0 0 76 80" width="100%" height="100%">
    <path d="M38 8 L40 80" style={strokeVar("wood")} strokeWidth="3" strokeLinecap="round" />
    <g style={strokeVar("umbrella-edge")} strokeWidth="0.8" strokeLinejoin="round">
      <path d="M38 38 L0 38 A38 38 0 0 1 7.3 15.7 Z" style={{ ...fillVar("umbrella-coral"), ...strokeVar("umbrella-edge") }} />
      <path d="M38 38 L7.3 15.7 A38 38 0 0 1 26.3 1.9 Z" style={{ ...fillVar("umbrella-white"), ...strokeVar("umbrella-edge") }} />
      <path d="M38 38 L26.3 1.9 A38 38 0 0 1 49.7 1.9 Z" style={{ ...fillVar("umbrella-sea"), ...strokeVar("umbrella-edge") }} />
      <path d="M38 38 L49.7 1.9 A38 38 0 0 1 68.7 15.7 Z" style={{ ...fillVar("umbrella-white"), ...strokeVar("umbrella-edge") }} />
      <path d="M38 38 L68.7 15.7 A38 38 0 0 1 76 38 Z" style={{ ...fillVar("umbrella-coral"), ...strokeVar("umbrella-edge") }} />
    </g>
  </svg>
);

const STARFISH = "M12 1.5 L14.9 8.6 L22.6 9.1 L16.7 14.1 L18.5 21.6 L12 17.6 L5.5 21.6 L7.3 14.1 L1.4 9.1 L9.1 8.6 Z";

export const Starfish = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path d={STARFISH} style={{ ...fillVar("starfish"), ...strokeVar("starfish-deep") }} strokeWidth="1.8" strokeLinejoin="round" />
    <g style={fillVar("starfish-deep")}>
      <circle cx="12" cy="8" r="0.9" />
      <circle cx="12" cy="12.5" r="0.9" />
      <circle cx="16" cy="11" r="0.8" />
      <circle cx="8" cy="11" r="0.8" />
    </g>
  </svg>
);

export const Shell = () => (
  <svg viewBox="0 0 22 20" width="100%" height="100%">
    <path d="M11 19 L2 8.5 A10.5 10.5 0 0 1 20 8.5 Z" style={{ ...fillVar("shell"), ...strokeVar("shell-edge") }} strokeWidth="1" strokeLinejoin="round" />
    <path d="M11 19 L4.6 5.6 M11 19 L7.6 3.9 M11 19 L11 3.4 M11 19 L14.4 3.9 M11 19 L17.4 5.6" style={strokeVar("shell-edge")} strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
  </svg>
);

export const PalmTree = () => (
  <svg viewBox="0 0 70 80" width="100%" height="100%">
    <path d="M36 80 C34 60 36 42 42 26" fill="none" style={strokeVar("wood")} strokeWidth="5" strokeLinecap="round" />
    <g>
      <path d="M42 26 C32 14 18 14 6 24 C18 22 30 24 42 26 Z" style={fillVar("palm")} />
      <path d="M42 26 C36 12 26 4 12 4 C24 10 34 16 42 26 Z" style={fillVar("palm-deep")} />
      <path d="M42 26 C46 12 54 4 66 6 C56 10 48 16 42 26 Z" style={fillVar("palm")} />
      <path d="M42 26 C52 18 62 20 68 30 C58 26 50 26 42 26 Z" style={fillVar("palm-deep")} />
      <path d="M42 26 C34 28 24 36 22 46 C30 38 36 32 42 26 Z" style={fillVar("palm")} />
    </g>
  </svg>
);

export const Sandcastle = () => (
  <svg viewBox="0 0 60 44" width="100%" height="100%">
    <path d="M4 44 V24 H8 V20 H12 V24 H16 V20 H20 V24 H24 V14 H28 V10 H32 V14 H36 V24 H40 V20 H44 V24 H48 V20 H52 V24 H56 V44 Z" style={{ ...fillVar("ground"), ...strokeVar("sand-deep") }} strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M30 44 V34 A4.4 4.4 0 0 0 21.2 34 V44 Z" transform="translate(4.4 0)" style={fillVar("sand-deep")} />
    <path d="M30 10 V2" style={strokeVar("wood")} strokeWidth="1.2" />
    <path d="M30 2 L39 5 L30 8 Z" style={fillVar("flag-coral")} />
  </svg>
);

export const Pail = () => (
  <svg viewBox="0 0 30 32" width="100%" height="100%">
    <path d="M4 12 C4 2 26 2 26 12" fill="none" style={strokeVar("pail-deep")} strokeWidth="1.8" />
    <path d="M3 12 H27 L24 31 H6 Z" style={fillVar("pail")} />
    <rect x="2" y="10" width="26" height="4" rx="1.6" style={fillVar("pail-deep")} />
  </svg>
);

export const Sailboat = () => (
  <svg viewBox="0 0 40 44" width="100%" height="100%">
    <path d="M20 2 V30" style={strokeVar("wood")} strokeWidth="1.6" />
    <path d="M21.5 4 L36 30 H21.5 Z" style={{ ...fillVar("sail"), ...strokeVar("umbrella-edge") }} strokeWidth="0.8" />
    <path d="M18.5 10 L6 30 H18.5 Z" style={fillVar("sail-stripe")} />
    <path d="M4 32 H36 L31 42 H9 Z" style={fillVar("hull")} />
  </svg>
);

export const Wave = () => (
  <svg viewBox="0 0 120 20" width="100%" height="100%" preserveAspectRatio="none" style={{ display: "block" }}>
    <path d="M0 8 Q10 0 20 8 T40 8 T60 8 T80 8 T100 8 T120 8 V20 H0 Z" style={fillVar("wave")} />
    <path d="M0 8 Q10 0 20 8 T40 8 T60 8 T80 8 T100 8 T120 8" fill="none" style={strokeVar("foam")} strokeWidth="1.4" />
  </svg>
);

// ---- The balloon ----

// Six panels from the pole out to past the rim, each edge curving the same way
// as it goes round the ball
const PANEL_COLORS = ["ball-coral", "ball-white", "ball-sun", "ball-white", "ball-sea", "ball-white"];

const ballPoint = (degrees, radius) => {
  const angle = (degrees * Math.PI) / 180;
  return `${(50 + radius * Math.sin(angle)).toFixed(2)} ${(50 - radius * Math.cos(angle)).toFixed(2)}`;
};

const ballEdge = (degrees) => `${ballPoint(degrees + 34, 30)} ${ballPoint(degrees, 58)}`;

const PANELS = PANEL_COLORS.map((fill, i) => {
  const from = i * 60;
  const to = from + 60;
  return {
    d: `M50 50 Q${ballEdge(from)} A58 58 0 0 1 ${ballPoint(to, 58)} Q${ballPoint(to + 34, 30)} 50 50 Z`,
    edge: `M50 50 Q${ballEdge(from)}`,
    fill,
  };
});

// The six panels of a beach ball, painted on the body of the balloon
export const BallPanels = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
    {PANELS.map((panel) => (
      <path key={panel.d} d={panel.d} style={fillVar(panel.fill)} />
    ))}
    <g fill="none" style={strokeVar("ball-edge")} strokeWidth="0.6" opacity="0.45">
      {PANELS.map((panel) => (
        <path key={panel.edge} d={panel.edge} />
      ))}
    </g>
  </svg>
);

// A small one for the garland and the footer
export const BeachBall = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: "block" }}>
    <defs>
      <clipPath id="el-beach-ball">
        <circle cx="50" cy="50" r="48" />
      </clipPath>
    </defs>
    <g clipPath="url(#el-beach-ball)">
      {PANELS.map((panel) => (
        <path key={panel.d} d={panel.d} style={fillVar(panel.fill)} />
      ))}
    </g>
    <circle cx="50" cy="50" r="48" fill="none" style={strokeVar("ball-edge")} strokeWidth="3" />
    <circle cx="50" cy="50" r="10" style={{ ...fillVar("ball-white"), ...strokeVar("ball-edge") }} strokeWidth="2" />
  </svg>
);

const RISING = [{ node: <Bubble />, size: [14, 28], spins: false }];

// ---- Scenery on the donate page ----

export function SummerScenery() {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: SKY_TOP,
          right: { xs: "3%", sm: "8%" },
          width: { xs: 56, sm: 92 },
          height: { xs: 56, sm: 92 },
          filter: `drop-shadow(0 0 16px ${seasonVar("sun-glow")})`,
        }}
      >
        <Sun />
      </Box>
      {inSky({ top: { xs: 256, sm: 180 }, left: { xs: "2%", sm: "9%" }, width: { xs: 44, sm: 70 }, height: { xs: 16, sm: 25 } }, <Gull />, "gull-1", { animation: `${glide} 7s ease-in-out infinite`, "--flap": "0.6s", ...flapWings, ...still })}
      {inSky({ top: { xs: 320, sm: 310 }, right: { xs: "4%", sm: "20%" }, width: { xs: 36, sm: 52 }, height: { xs: 13, sm: 19 } }, <Gull />, "gull-2", { animation: `${glide} 9s ease-in-out 1.4s infinite`, "--flap": "0.7s", ...flapWings, ...still })}

      {/* The water behind the sand, and a boat out on it on wider screens */}
      {inSky({ bottom: 44, left: 0, right: 0, height: 24 }, <Wave />, "wave")}
      {inSky({ bottom: 62, left: "8%", width: 44, height: 48, display: { xs: "none", sm: "block" } }, <Sailboat />, "boat")}

      {onGround("left", "3%", { xs: 22, sm: 28 }, { xs: 22, sm: 28 }, <Starfish />, "starfish")}
      {onGround("left", "12%", { xs: 20, sm: 24 }, { xs: 18, sm: 22 }, <Shell />, "shell")}
      {onGround("left", "20%", 24, 26, <Pail />, "pail", { display: { xs: "none", sm: "block" } })}
      {onGround("right", "3%", { xs: 40, sm: 70 }, { xs: 42, sm: 74 }, <Umbrella />, "umbrella")}
    </>
  );
}

// ---- The mark on the greeting ----

export const SunMark = () => (
  <svg viewBox="-12 -12 24 24" width="16" height="16" aria-hidden="true">
    <path d="M0 -11 V-8.4 M0 11 V8.4 M-11 0 H-8.4 M11 0 H8.4 M-7.8 -7.8 L-6 -6 M7.8 7.8 L6 6 M-7.8 7.8 L-6 6 M7.8 -7.8 L6 -6" strokeWidth="2" strokeLinecap="round" style={{ stroke: "var(--el-season-sun-deep)" }} />
    <circle r="6" style={{ fill: "var(--el-season-sun)", stroke: "var(--el-season-sun-deep)" }} strokeWidth="1" />
  </svg>
);

export default function Summer() {
  return (
    <>
      <Drift kinds={RISING} count={14} phoneCount={7} rising />
      <Crossing node={<Gull />} count={2} phoneCount={1} width={[46, 60]} ratio={100 / 36} sx={{ ...flapWings, "--flap": "0.5s" }} />
    </>
  );
}
