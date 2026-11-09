import PropTypes from "prop-types";
import { Drift } from "./Drift";
import { fillVar, strokeVar, seasonVar } from "./shared";
import { glide, onGround, falling, SKY_TOP, still } from "./sceneryKit";
import Box from "@mui/material/Box";

// Thanksgiving, dressed: autumn leaves and a few acorns coming down, and the
// fundraising balloon as a plump turkey. Colors are the season's CSS variables.

const MAPLE =
  "M11 1 L12.6 6.2 L16.4 3.6 L15 8.4 L20.4 8 L16.2 11.4 L20 15.2 L14.6 14.4 L15 19.6 L11 15.8 L7 19.6 L7.4 14.4 L2 15.2 L5.8 11.4 L1.6 8 L7 8.4 L5.6 3.6 L9.4 6.2 Z";

export const MapleLeaf = ({ tone }) => (
  <svg viewBox="0 0 22 24" width="100%" height="100%">
    <path d="M11 15 V23.5" style={strokeVar(`leaves-${tone}`)} strokeWidth="1.4" strokeLinecap="round" />
    <path d={MAPLE} style={fillVar(`leaves-${tone}`)} />
    <path d="M11 4 V16 M11 11 L6 8.6 M11 11 L16 8.6" style={strokeVar("leaf-vein")} strokeWidth="0.7" fill="none" strokeLinecap="round" />
  </svg>
);

MapleLeaf.propTypes = { tone: PropTypes.number.isRequired };

export const OakLeaf = ({ tone }) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path
      d="M12 1 C14 3 16 3 16 5 C18 5 19 7 17.5 8.5 C19.5 9 20 11 18 12 C20 13 19 15.5 17 15.5 C17.5 17.5 15 19 13 17.5 L12.6 23 L11.4 23 L11 17.5 C9 19 6.5 17.5 7 15.5 C5 15.5 4 13 6 12 C4 11 4.5 9 6.5 8.5 C5 7 6 5 8 5 C8 3 10 3 12 1 Z"
      style={fillVar(`leaves-${tone}`)}
    />
    <path d="M12 4 V19 M12 9 L8 7.5 M12 9 L16 7.5 M12 13 L7.5 12 M12 13 L16.5 12" style={strokeVar("leaf-vein")} strokeWidth="0.7" fill="none" strokeLinecap="round" />
  </svg>
);

OakLeaf.propTypes = { tone: PropTypes.number.isRequired };

export const Acorn = () => (
  <svg viewBox="0 0 16 22" width="100%" height="100%">
    <path d="M8 3 V0.8" style={strokeVar("acorn-cap")} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M2.6 9 Q2.6 20 8 21 Q13.4 20 13.4 9 Z" style={fillVar("acorn")} />
    <path d="M1.4 9.4 Q8 1.6 14.6 9.4 Z" style={fillVar("acorn-cap")} />
  </svg>
);

const WheatStalk = ({ x, turn }) => (
  <g transform={`translate(${x} 0) rotate(${turn} 10 60)`}>
    <path d="M10 60 V12" style={strokeVar("wheat-deep")} strokeWidth="1.8" strokeLinecap="round" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(0 ${6 + i * 6})`}>
        <ellipse cx="6.4" cy="5" rx="2.6" ry="5" transform="rotate(26 6.4 5)" style={fillVar("wheat")} />
        <ellipse cx="13.6" cy="5" rx="2.6" ry="5" transform="rotate(-26 13.6 5)" style={fillVar("wheat")} />
      </g>
    ))}
    <ellipse cx="10" cy="5" rx="2.6" ry="5" style={fillVar("wheat")} />
  </g>
);

WheatStalk.propTypes = { x: PropTypes.number.isRequired, turn: PropTypes.number.isRequired };

export const WheatSheaf = () => (
  <svg viewBox="0 0 44 60" width="100%" height="100%">
    <WheatStalk x={2} turn={-12} />
    <WheatStalk x={22} turn={12} />
    <WheatStalk x={12} turn={0} />
    <rect x="14" y="42" width="16" height="5" rx="2" style={fillVar("wheat-deep")} />
  </svg>
);

export const Corn = () => (
  <svg viewBox="0 0 28 60" width="100%" height="100%">
    <path d="M14 56 Q2 42 6 16 Q10 3 14 3 Q18 3 22 16 Q26 42 14 56 Z" style={fillVar("corn")} />
    <g style={fillVar("corn-deep")}>
      {[12, 19, 26, 33, 40].flatMap((y) => [<circle key={`a${y}`} cx="11" cy={y} r="1.9" />, <circle key={`b${y}`} cx="17" cy={y} r="1.9" />])}
    </g>
    <path d="M14 58 Q20 38 27 30 Q26 50 14 60 Z" style={fillVar("husk")} />
    <path d="M14 58 Q8 38 1 30 Q2 50 14 60 Z" style={fillVar("husk-deep")} />
  </svg>
);

export const Gourd = ({ golden }) => {
  const main = golden ? "gourd-gold" : "gourd";
  const deep = golden ? "gourd-gold-deep" : "gourd-deep";
  return (
    <svg viewBox="0 0 40 34" width="100%" height="100%">
      <path d="M20 8 C20 4 22 2 25 1.5" style={strokeVar("stem")} strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="10.5" cy="21" rx="9.5" ry="12" style={fillVar(deep)} />
      <ellipse cx="29.5" cy="21" rx="9.5" ry="12" style={fillVar(deep)} />
      <ellipse cx="20" cy="21" rx="10" ry="13" style={fillVar(main)} />
    </svg>
  );
};

Gourd.propTypes = { golden: PropTypes.bool };

export const Flock = () => (
  <svg viewBox="0 0 80 40" width="100%" height="100%">
    <g fill="none" style={strokeVar("goose")} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {[
        [34, 4],
        [20, 14],
        [46, 14],
        [6, 24],
        [58, 24],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y + 3} Q${x + 4} ${y - 2} ${x + 8} ${y + 3} Q${x + 12} ${y - 2} ${x + 16} ${y + 3}`} />
      ))}
    </g>
  </svg>
);

const FEATHERS = [
  { angle: -86, length: 53, fill: "feather-rust" },
  { angle: 86, length: 53, fill: "feather-rust" },
  { angle: -64, length: 57, fill: "feather-orange" },
  { angle: 64, length: 57, fill: "feather-orange" },
  { angle: -42, length: 62, fill: "feather-gold" },
  { angle: 42, length: 62, fill: "feather-gold" },
  { angle: -21, length: 66, fill: "feather-rust" },
  { angle: 21, length: 66, fill: "feather-rust" },
  { angle: 0, length: 66, fill: "feather-orange" },
];

const CHEST = [-68, -44, -22, 22, 44, 68, 112, 136, 158, 180, 202, 224, 248];

// The tail fan, the legs and the round body, drawn behind the logo
export const TurkeyBody = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden="true">
    {FEATHERS.map((feather) => {
      const l = feather.length;
      return (
        <g key={feather.angle} transform={`translate(50 50) rotate(${feather.angle})`}>
          <path
            d={`M0 0 C-15 ${-l * 0.45} -15 ${-l * 0.84} 0 ${-l} C15 ${-l * 0.84} 15 ${-l * 0.45} 0 0 Z`}
            style={{ ...fillVar(feather.fill), ...strokeVar("feather-edge") }}
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <path d={`M-7.5 ${-l * 0.84} C-3 ${-l * 0.9} 3 ${-l * 0.9} 7.5 ${-l * 0.84}`} style={strokeVar("feather-tip")} strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </g>
      );
    })}
    <g fill="none" style={strokeVar("beak")} strokeWidth="3" strokeLinecap="round">
      <path d="M38 86 L36 104 M36 104 L29 107 M36 104 L36 109 M36 104 L43 107" />
      <path d="M62 86 L64 104 M64 104 L57 107 M64 104 L64 109 M64 104 L71 107" />
    </g>
    <circle cx="50" cy="50" r="42" style={{ ...fillVar("turkey"), ...strokeVar("turkey-deep") }} strokeWidth="1.8" />
    <g fill="none" style={strokeVar("turkey-light")} strokeWidth="1.8" strokeLinecap="round" opacity="0.85">
      {CHEST.map((angle) => (
        <path key={angle} d="M-5 -36 Q0 -31 5 -36" transform={`translate(50 50) rotate(${angle})`} />
      ))}
    </g>
    <path d="M44 91 L56 91 L50 101 Z" style={fillVar("turkey-deep")} />
  </svg>
);

// Neck and head, looking off to the right where the milestones are not
export const TurkeyHead = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible", display: "block" }} aria-hidden="true">
    <path d="M70 22 C76 16 82 10 85 2" style={strokeVar("turkey-deep")} strokeWidth="12" strokeLinecap="round" fill="none" />
    <circle cx="86" cy="-3" r="10.5" style={fillVar("turkey-deep")} />
    <path d="M95 -6 L106 -2 L95 2 Z" style={fillVar("beak")} />
    <path d="M94 1 Q97 11 91 14 Q88 7 94 1 Z" style={fillVar("wattle")} />
    <circle cx="89" cy="-6" r="2.6" style={fillVar("eye-shine")} />
    <circle cx="90" cy="-5.6" r="1.4" style={fillVar("eye")} />
  </svg>
);

// The whole bird, small, for the footer and the fundraising ground
export const Turkey = () => (
  <svg viewBox="0 0 110 110" width="100%" height="100%">
    {[-62, 62, -42, 42, -21, 21, 0].map((angle, i) => (
      <path
        key={angle}
        d="M0 0 C-9 -18 -9 -38 0 -52 C9 -38 9 -18 0 0 Z"
        transform={`translate(52 76) rotate(${angle})`}
        style={{ ...fillVar(["feather-rust", "feather-orange", "feather-gold"][i % 3]), ...strokeVar("feather-edge") }}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    ))}
    <g style={strokeVar("beak")} strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M50 96 L48 108 M48 108 L41 110 M48 108 L52 110" />
      <path d="M64 96 L66 108 M66 108 L59 110 M66 108 L70 110" />
    </g>
    <ellipse cx="56" cy="80" rx="26" ry="20" style={fillVar("turkey")} />
    <path d="M38 78 C44 68 60 68 70 76 C62 80 50 86 38 78 Z" style={fillVar("turkey-deep")} />
    <path d="M72 76 C78 68 84 58 86 46" style={strokeVar("turkey")} strokeWidth="10" strokeLinecap="round" fill="none" />
    <circle cx="88" cy="42" r="10" style={fillVar("turkey")} />
    <path d="M97 40 L108 44 L97 47 Z" style={fillVar("beak")} />
    <path d="M96 46 Q98 56 93 58 Q91 51 96 46 Z" style={fillVar("wattle")} />
    <circle cx="90" cy="39" r="2.2" style={fillVar("eye-shine")} />
    <circle cx="90.8" cy="39.4" r="1.2" style={fillVar("eye")} />
  </svg>
);

const FALLING = [
  { node: <MapleLeaf tone={1} />, size: [18, 28] },
  { node: <OakLeaf tone={2} />, size: [18, 26] },
  { node: <MapleLeaf tone={3} />, size: [16, 26] },
  { node: <Acorn />, size: [12, 16] },
  { node: <OakLeaf tone={4} />, size: [18, 26] },
  { node: <MapleLeaf tone={2} />, size: [18, 28] },
];

// ---- Scenery on the donate page ----

const LEAVES = [<MapleLeaf key="a" tone={1} />, <MapleLeaf key="b" tone={2} />, <MapleLeaf key="c" tone={3} />, <MapleLeaf key="d" tone={4} />];

export function ThanksgivingScenery() {
  return (
    <>
      {falling(LEAVES)}

      {/* A low harvest sun with geese going south past it */}
      <Box
        sx={{
          position: "absolute",
          top: SKY_TOP,
          right: { xs: "4%", sm: "9%" },
          width: { xs: 48, sm: 76 },
          height: { xs: 48, sm: 76 },
          borderRadius: "50%",
          backgroundColor: seasonVar("sun"),
          boxShadow: `0 0 40px 14px ${seasonVar("sun-glow")}`,
        }}
      >
        <Box sx={{ position: "absolute", top: "78%", left: "-54%", width: { xs: 56, sm: 84 }, height: { xs: 28, sm: 42 }, animation: `${glide} 8s ease-in-out infinite`, ...still }}>
          <Flock />
        </Box>
      </Box>

      {onGround("left", "3%", { xs: 26, sm: 34 }, { xs: 36, sm: 46 }, <WheatSheaf />, "wheat")}
      {onGround("left", "12%", { xs: 26, sm: 34 }, { xs: 22, sm: 29 }, <Gourd />, "gourd")}
      {onGround("right", "13%", { xs: 16, sm: 20 }, { xs: 34, sm: 42 }, <Corn />, "corn")}
      {onGround("right", "3%", { xs: 40, sm: 52 }, { xs: 40, sm: 52 }, <Turkey />, "turkey")}
    </>
  );
}

// ---- The mark on the greeting ----

export const LeafMark = () => (
  <svg viewBox="0 0 22 22" width="16" height="16" aria-hidden="true">
    <path
      d="M11 1 L12.6 6.2 L16.4 3.6 L15 8.4 L20.4 8 L16.2 11.4 L20 15.2 L14.6 14.4 L15 19.6 L11 15.8 L7 19.6 L7.4 14.4 L2 15.2 L5.8 11.4 L1.6 8 L7 8.4 L5.6 3.6 L9.4 6.2 Z"
      style={{ fill: "var(--el-season-leaves-1)" }}
    />
  </svg>
);

export default function Thanksgiving() {
  return <Drift kinds={FALLING} count={12} phoneCount={6} />;
}
