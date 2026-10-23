import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { SEASONS } from "../../constants/season";
import { useSeason } from "../../theme/SeasonContext";
import { seasonVar } from "./shared";
import { Pumpkin } from "./Halloween";

// A small scene standing on the top edge of the footer, so it shows on every
// page: a dark hill with tombstones and lit jack-o'-lanterns at Halloween, and
// snowy ground with pine trees, a snowman and presents for the holidays.
// Every color is a season CSS variable, so the scene follows the mode.

const SCENE_HEIGHT = 76;
const GROUND_HEIGHT = 20;
// How far the scene reaches up above the footer's top edge
const RISE = 56;

const HILLS =
  "M0 12 C120 4 240 4 360 10 C480 16 600 5 720 9 C840 13 960 4 1080 8 C1140 10 1180 8 1200 7 L1200 20 L0 20 Z";

// ---- Halloween pieces ----

export const Tombstone = ({ cross }) =>
  cross ? (
    <svg viewBox="0 0 22 32" width="100%" height="100%">
      <path d="M8 1 H14 V9 H21 V15 H14 V31 H8 V15 H1 V9 H8 Z" style={{ fill: seasonVar("stone"), stroke: seasonVar("stone-edge") }} strokeWidth="1" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 30" width="100%" height="100%">
      <path d="M2 29 V11 C2 5 6.5 1 12 1 C17.5 1 22 5 22 11 V29 Z" style={{ fill: seasonVar("stone"), stroke: seasonVar("stone-edge") }} strokeWidth="1" />
      <path d="M7.5 12 H16.5 M7.5 16 H16.5 M7.5 20 H13" style={{ stroke: seasonVar("stone-edge") }} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );

Tombstone.propTypes = { cross: PropTypes.bool };

const DeadTree = () => (
  <svg viewBox="0 0 60 70" width="100%" height="100%">
    <path
      d="M28 70 L29 46 C24 40 16 38 9 30 M24 41 C20 37 18 31 19 25 M29 46 C30 34 27 22 31 10 M30 26 C36 22 42 21 48 14 M41 20 C44 22 49 22 53 20 M31 36 C37 34 43 36 47 33"
      fill="none"
      style={{ stroke: seasonVar("night") }}
      strokeWidth="3.4"
      strokeLinecap="round"
    />
    <path d="M24 70 L28 46 L32 70 Z" style={{ fill: seasonVar("night") }} />
  </svg>
);

// ---- Holiday pieces ----

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

const Present = ({ color, ribbon }) => (
  <svg viewBox="0 0 30 26" width="100%" height="100%">
    <rect x="2" y="8" width="26" height="17" rx="1.5" style={{ fill: seasonVar(color) }} />
    <rect x="0" y="5" width="30" height="5" rx="1.2" style={{ fill: seasonVar(color), stroke: seasonVar("coal") }} strokeOpacity="0.15" strokeWidth="0.6" />
    <rect x="13" y="5" width="4" height="20" style={{ fill: seasonVar(ribbon) }} />
    <path d="M15 5 C11 0 6 1 8 4 C9 5.5 12 5 15 5 C18 5 21 5.5 22 4 C24 1 19 0 15 5 Z" style={{ fill: seasonVar(ribbon) }} />
  </svg>
);

Present.propTypes = { color: PropTypes.string.isRequired, ribbon: PropTypes.string.isRequired };

// Each piece: where it stands (share of the width), its size, and whether
// it is dropped on phones to keep the scene uncluttered
const halloweenPieces = [
  { left: 5, width: 34, height: 32, node: <Pumpkin face /> },
  { left: 14, width: 20, height: 26, node: <Tombstone />, extra: true },
  { left: 24, width: 54, height: 64, node: <DeadTree />, extra: true },
  { left: 36, width: 28, height: 27, node: <Pumpkin face={false} /> },
  { left: 49, width: 22, height: 30, node: <Tombstone cross /> },
  { left: 60, width: 38, height: 36, node: <Pumpkin face /> },
  { left: 72, width: 22, height: 28, node: <Tombstone />, extra: true },
  { left: 84, width: 30, height: 29, node: <Pumpkin face /> },
  { left: 94, width: 20, height: 26, node: <Tombstone />, extra: true },
];

const christmasPieces = [
  { left: 5, width: 34, height: 48, node: <PineTree /> },
  { left: 15, width: 26, height: 22, node: <Present color="present-red" ribbon="ribbon-gold" />, extra: true },
  { left: 27, width: 40, height: 56, node: <PineTree star /> },
  { left: 40, width: 22, height: 19, node: <Present color="present-green" ribbon="ribbon-light" />, extra: true },
  { left: 52, width: 34, height: 48, node: <Snowman /> },
  { left: 65, width: 30, height: 42, node: <PineTree />, extra: true },
  { left: 76, width: 24, height: 21, node: <Present color="present-blue" ribbon="berry" /> },
  { left: 90, width: 40, height: 56, node: <PineTree star /> },
];

export default function FooterScene() {
  const { season } = useSeason();
  if (season !== SEASONS.HALLOWEEN && season !== SEASONS.CHRISTMAS) return null;

  const isHalloween = season === SEASONS.HALLOWEEN;
  const pieces = isHalloween ? halloweenPieces : christmasPieces;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        top: -RISE,
        height: SCENE_HEIGHT,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 2,
        "@media print": { display: "none" },
        "@media (max-width: 600px)": {
          "& .scene-extra": { display: "none" },
        },
      }}
    >
      {pieces.map((piece) => (
        <Box
          key={piece.left}
          className={piece.extra ? "scene-extra" : undefined}
          sx={{
            position: "absolute",
            left: `${piece.left}%`,
            // Stand on the hills, sinking in a little so nothing floats
            bottom: GROUND_HEIGHT - 9,
            width: piece.width,
            height: piece.height,
            transform: "translateX(-50%)",
          }}
        >
          {piece.node}
        </Box>
      ))}

      <svg
        viewBox="0 0 1200 20"
        preserveAspectRatio="none"
        width="100%"
        height={GROUND_HEIGHT}
        style={{ position: "absolute", left: 0, bottom: 0, display: "block" }}
      >
        <path
          d={HILLS}
          style={{ fill: seasonVar("ground"), stroke: isHalloween ? "none" : seasonVar("snow-edge") }}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Box>
  );
}
