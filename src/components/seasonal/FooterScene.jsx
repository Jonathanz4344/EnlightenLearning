import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { seasonVar } from "./shared";

// A small scene standing on the top edge of the footer, so it shows on every
// page: a dark hill with tombstones and lit jack-o'-lanterns at Halloween,
// snowy ground with pine trees, a snowman and presents for the holidays, and
// each other season's own in the same way. Every color is a season CSS
// variable, so the scene follows the mode.

const SCENE_HEIGHT = 76;
const GROUND_HEIGHT = 20;
// How far the scene reaches up above the footer's top edge
const RISE = 56;

const HILLS =
  "M0 12 C120 4 240 4 360 10 C480 16 600 5 720 9 C840 13 960 4 1080 8 C1140 10 1180 8 1200 7 L1200 20 L0 20 Z";

// pieces: where each stands (share of the width), its size, its drawing, and
// whether phones drop it. edge: the line along the top of the ground, or "none".
export default function FooterScene({ pieces, edge }) {

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
          style={{ fill: seasonVar("ground"), stroke: edge }}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Box>
  );
}

FooterScene.propTypes = {
  pieces: PropTypes.arrayOf(
    PropTypes.shape({
      left: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      node: PropTypes.node.isRequired,
      extra: PropTypes.bool,
    })
  ).isRequired,
  edge: PropTypes.string.isRequired,
};
