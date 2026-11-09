import PropTypes from "prop-types";
import { Drift, Crossing } from "./Drift";
import { flutterWings, fillVar, strokeVar, seasonVar } from "./shared";
import { glide, onGround, inSky, falling, SKY_TOP, still } from "./sceneryKit";
import Box from "@mui/material/Box";

// Spring, dressed: blossom petals coming down, a couple of butterflies crossing,
// and the fundraising balloon as a flower in bloom. Colors are the season's CSS
// variables.

export const Petal = ({ pale }) => (
  <svg viewBox="0 0 20 24" width="100%" height="100%">
    <path d="M10 1 C16 5 19 11 16.5 17 C14.8 21 12 23 10 23 C8 23 5.2 21 3.5 17 C1 11 4 5 10 1 Z" style={{ ...fillVar(pale ? "petal-pale" : "petal"), ...strokeVar("petal-deep") }} strokeWidth="0.7" />
  </svg>
);

Petal.propTypes = { pale: PropTypes.bool };

const WING = "M-1 -2 C-8 -14 -22 -14 -23 -5 C-24 2 -14 6 -6 4 C-13 8 -13 16 -7 16 C-3 16 0 8 -1 -2 Z";

export const Butterfly = () => (
  <svg viewBox="-26 -18 52 40" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
    <g className="butterfly-wing">
      <path d={WING} style={fillVar("wing-orange")} />
      <circle cx="-14" cy="-6" r="2.4" style={fillVar("wing-pink")} />
    </g>
    <g transform="scale(-1 1)">
      <g className="butterfly-wing">
        <path d={WING} style={fillVar("wing-orange")} />
        <circle cx="-14" cy="-6" r="2.4" style={fillVar("wing-pink")} />
      </g>
    </g>
    <ellipse cx="0" cy="3" rx="1.8" ry="9" style={fillVar("insect")} />
    <path d="M-1 -5 Q-4 -11 -6 -12 M1 -5 Q4 -11 6 -12" fill="none" style={strokeVar("insect")} strokeWidth="0.9" strokeLinecap="round" />
  </svg>
);

export const Bee = () => (
  <svg viewBox="0 0 36 28" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
    <ellipse cx="17" cy="7" rx="5.5" ry="8" transform="rotate(-18 17 7)" style={fillVar("bee-wing")} />
    <ellipse cx="24" cy="7" rx="4.6" ry="7" transform="rotate(16 24 7)" style={fillVar("bee-wing")} />
    <ellipse cx="18" cy="17" rx="13" ry="9" style={fillVar("heart")} />
    <path d="M12 8.8 C10 13 10 21 12 25.2 M20 8 C18 13 18 21 20 26" fill="none" style={strokeVar("insect")} strokeWidth="3.6" />
    <circle cx="29" cy="15" r="1.4" style={fillVar("insect")} />
  </svg>
);

export const Tulip = ({ tone }) => {
  const main = tone === "purple" ? "tulip-purple" : tone === "pink" ? "petal" : "tulip-red";
  const edge = tone === "purple" ? "tulip-purple-edge" : tone === "pink" ? "petal-deep" : "tulip-red-edge";
  return (
    <svg viewBox="-16 -60 32 60" width="100%" height="100%">
      <path d="M0 0 C0 -10 0 -20 0 -31" style={strokeVar("stem")} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M0 -6 C-7 -9 -13 -17 -11 -25 C-5 -23 -1 -15 0 -6 Z" style={fillVar("leaf")} />
      <path d="M0 -6 C7 -9 13 -17 11 -25 C5 -23 1 -15 0 -6 Z" style={fillVar("leaf")} />
      <path d="M-9 -44 L-7 -55 L-3 -47 L0 -57 L3 -47 L7 -55 L9 -44 C9 -36 5 -30 0 -30 C-5 -30 -9 -36 -9 -44 Z" style={{ ...fillVar(main), ...strokeVar(edge) }} strokeWidth="0.9" strokeLinejoin="round" />
    </svg>
  );
};

Tulip.propTypes = { tone: PropTypes.oneOf(["red", "purple", "pink"]).isRequired };

export const Daffodil = () => (
  <svg viewBox="-16 -56 32 56" width="100%" height="100%">
    <path d="M0 0 C0 -10 0 -20 0 -32" style={strokeVar("stem")} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M0 -4 C6 -8 11 -16 9 -26 C4 -22 1 -14 0 -4 Z" style={fillVar("leaf")} />
    <g transform="translate(0 -38)">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cy="-8" rx="4.2" ry="8.5" transform={`rotate(${angle})`} style={{ ...fillVar("daffodil"), ...strokeVar("daffodil-edge") }} strokeWidth="0.8" />
      ))}
      <circle r="5.5" style={fillVar("daffodil-cup")} />
    </g>
  </svg>
);

export const PaintedEgg = ({ tone }) => (
  <svg viewBox="-11 -13 22 26" width="100%" height="100%">
    <path d="M0 -12 C6.5 -12 10 -5 10 2 C10 8 5.5 12 0 12 C-5.5 12 -10 8 -10 2 C-10 -5 -6.5 -12 0 -12 Z" style={{ ...fillVar(`egg-${tone}`), ...strokeVar("egg-trim") }} strokeWidth="0.9" />
    <path d="M-9.5 1 L-6.5 -2.5 L-3.5 1 L-0.5 -2.5 L2.5 1 L5.5 -2.5 L8.5 1" style={strokeVar("egg-trim")} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <g style={fillVar("egg-trim")}>
      <circle cx="-4" cy="6.5" r="1.2" />
      <circle cx="2" cy="7.5" r="1.2" />
      <circle cx="-1" cy="-7" r="1.2" />
    </g>
  </svg>
);

PaintedEgg.propTypes = { tone: PropTypes.oneOf(["blue", "pink", "yellow"]).isRequired };

const BUNNY = { ...fillVar("bunny"), ...strokeVar("bunny-edge") };

export const Bunny = () => (
  <svg viewBox="0 0 100 120" width="100%" height="100%">
    <g transform="rotate(-12 38 46)">
      <ellipse cx="38" cy="25" rx="11" ry="24" style={BUNNY} strokeWidth="1.6" />
      <ellipse cx="38" cy="27" rx="6" ry="17" style={fillVar("bunny-ear")} />
    </g>
    <g transform="rotate(12 66 46)">
      <ellipse cx="66" cy="24" rx="11" ry="24" style={BUNNY} strokeWidth="1.6" />
      <ellipse cx="66" cy="26" rx="6" ry="17" style={fillVar("bunny-ear")} />
    </g>
    <ellipse cx="52" cy="92" rx="33" ry="27" style={BUNNY} strokeWidth="1.6" />
    <ellipse cx="33" cy="113" rx="17" ry="7" style={BUNNY} strokeWidth="1.4" />
    <ellipse cx="71" cy="113" rx="17" ry="7" style={BUNNY} strokeWidth="1.4" />
    <ellipse cx="52" cy="58" rx="29" ry="25" style={BUNNY} strokeWidth="1.6" />
    <circle cx="41" cy="57" r="3.6" style={fillVar("bunny-eye")} />
    <circle cx="63" cy="57" r="3.6" style={fillVar("bunny-eye")} />
    <path d="M47 64.5 Q52 62 57 64.5 Q56 69.5 52 71.5 Q48 69.5 47 64.5 Z" style={fillVar("bunny-nose")} />
    <path d="M52 71.5 V74.5 M52 74.5 Q48 78 45.5 75 M52 74.5 Q56 78 58.5 75" style={strokeVar("bunny-edge")} strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </svg>
);

// ---- The balloon ----

const PETALS = Array.from({ length: 12 }, (_, i) => (i / 12) * 360);

// Petals and the center of the flower, drawn behind the logo
export const FlowerBloom = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden="true">
    {PETALS.map((angle, i) => (
      <path
        key={angle}
        d="M0 -26 C-13 -34 -13 -50 0 -53.5 C13 -50 13 -34 0 -26 Z"
        transform={`translate(50 50) rotate(${angle})`}
        style={{ ...fillVar(i % 2 === 0 ? "petal" : "petal-pale"), ...strokeVar("petal-deep") }}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    ))}
    <circle cx="50" cy="50" r="35" style={{ ...fillVar("heart"), ...strokeVar("heart-deep") }} strokeWidth="1.4" />
  </svg>
);

// The stem and two leaves, in place of the balloon's tie
export const FlowerStem = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible", display: "block" }} aria-hidden="true">
    <path d="M50 92 C50 104 50 116 50 130" fill="none" style={strokeVar("stem-deep")} strokeWidth="4" strokeLinecap="round" />
    <path d="M50 124 C40 122 28 114 24 102 C36 102 46 110 50 124 Z" style={{ ...fillVar("leaf"), ...strokeVar("stem-deep") }} strokeWidth="1" />
    <path d="M50 120 C60 118 72 110 76 98 C64 98 54 106 50 120 Z" style={{ ...fillVar("leaf"), ...strokeVar("stem-deep") }} strokeWidth="1" />
  </svg>
);

const FALLING = [
  { node: <Petal />, size: [12, 20] },
  { node: <Petal pale />, size: [12, 18] },
  { node: <Petal />, size: [10, 16] },
];

// ---- Scenery on the donate page ----

const SKY_PETALS = [<Petal key="a" />, <Petal key="b" pale />];

export function SpringScenery() {
  return (
    <>
      {falling(SKY_PETALS)}

      {/* A soft sun, and a butterfly working its way past */}
      <Box
        sx={{
          position: "absolute",
          top: SKY_TOP,
          right: { xs: "4%", sm: "9%" },
          width: { xs: 44, sm: 68 },
          height: { xs: 44, sm: 68 },
          borderRadius: "50%",
          backgroundColor: seasonVar("sun"),
          boxShadow: `0 0 30px 10px ${seasonVar("sun")}`,
          opacity: 0.85,
        }}
      />
      {inSky({ top: { xs: 260, sm: 260 }, right: { xs: "5%", sm: "22%" }, width: { xs: 32, sm: 46 }, height: { xs: 25, sm: 35 } }, <Butterfly />, "butterfly-1", { animation: `${glide} 7s ease-in-out infinite`, ...flutterWings, ...still })}
      {inSky({ top: { xs: 330, sm: 210 }, left: { xs: "2%", sm: "12%" }, width: { xs: 22, sm: 34 }, height: { xs: 17, sm: 26 } }, <Butterfly />, "butterfly-2", { animation: `${glide} 9s ease-in-out 1s infinite`, ...flutterWings, ...still })}

      {onGround("left", "2%", { xs: 20, sm: 28 }, { xs: 38, sm: 52 }, <Tulip tone="red" />, "tulip-1")}
      {onGround("left", "9%", { xs: 20, sm: 28 }, { xs: 34, sm: 48 }, <Daffodil />, "daffodil-1")}
      {onGround("left", "16%", { xs: 18, sm: 26 }, { xs: 34, sm: 50 }, <Tulip tone="purple" />, "tulip-2")}
      {onGround("left", "24%", 16, 19, <PaintedEgg tone="blue" />, "egg-1", { display: { xs: "none", sm: "block" } })}
      {onGround("right", "24%", 16, 19, <PaintedEgg tone="yellow" />, "egg-2", { display: { xs: "none", sm: "block" } })}
      {onGround("right", "14%", { xs: 20, sm: 26 }, { xs: 34, sm: 48 }, <Tulip tone="pink" />, "tulip-3")}
      {onGround("right", "3%", { xs: 34, sm: 44 }, { xs: 40, sm: 54 }, <Bunny />, "bunny")}
    </>
  );
}

// ---- The mark on the greeting ----

export const BlossomMark = () => (
  <svg viewBox="-12 -12 24 24" width="16" height="16" aria-hidden="true">
    {[0, 72, 144, 216, 288].map((angle) => (
      <ellipse key={angle} cy="-6.4" rx="4.4" ry="5.4" transform={`rotate(${angle})`} style={{ fill: "var(--el-season-petal-deep)" }} />
    ))}
    <circle r="3" style={{ fill: "var(--el-season-heart)" }} />
  </svg>
);

export default function Spring() {
  return (
    <>
      <Drift kinds={FALLING} count={14} phoneCount={7} />
      <Crossing node={<Butterfly />} count={2} phoneCount={1} width={[28, 38]} ratio={1.3} sx={flutterWings} />
    </>
  );
}
