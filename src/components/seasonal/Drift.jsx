import { useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";
import { fall, sway, spin, random, layerSx, motionOnly, fewerOnPhones } from "./shared";
import { zIndex } from "../../theme/tokens";

// The moving layers of the newer seasons: the motion the snow and the treats
// use, for any small drawing. Few pieces, slow, gone under reduced motion and
// the site's own stop-animations setting, and they ignore clicks.

const fill = { width: "100%", height: "100%" };

const flyAcross = keyframes`
  from { transform: translate3d(-12vw, 0, 0); }
  to { transform: translate3d(112vw, 0, 0); }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(calc(var(--bob) * -1)) rotate(-5deg); }
  50% { transform: translateY(var(--bob)) rotate(5deg); }
`;

function makePieces(kinds, count) {
  return Array.from({ length: count }, (_, id) => {
    const kind = kinds[id % kinds.length];
    const duration = random(20, 32);
    const swayDuration = random(4, 7);
    return {
      id,
      node: kind.node,
      spins: kind.spins !== false,
      size: random(kind.size[0], kind.size[1]),
      style: {
        left: `${random(0, 100)}%`,
        opacity: random(0.55, 0.85),
        "--duration": `${duration}s`,
        // A negative delay starts each piece partway along, so the screen is filled right away
        "--delay": `${-random(0, duration)}s`,
      },
      swayStyle: {
        "--sway": `${random(8, 26)}px`,
        "--tilt": `${random(6, 22)}deg`,
        "--sway-duration": `${swayDuration}s`,
        "--sway-delay": `${-random(0, swayDuration)}s`,
      },
      spinStyle: { "--spin-duration": `${random(8, 16)}s` },
    };
  });
}

// Small things falling down the screen, or going up it with `rising`
export function Drift({ kinds, count, phoneCount, rising = false }) {
  const pieces = useMemo(() => makePieces(kinds, count), [kinds, count]);

  return (
    <Box aria-hidden="true" sx={{ ...layerSx(zIndex.decorMotion), ...motionOnly, ...fewerOnPhones(phoneCount) }}>
      {pieces.map((piece) => (
        <Box
          key={piece.id}
          style={piece.style}
          sx={{
            position: "absolute",
            top: 0,
            width: piece.size,
            height: piece.size,
            willChange: "transform",
            animation: `${fall} var(--duration) linear var(--delay) infinite ${rising ? "reverse" : "normal"}`,
          }}
        >
          <Box style={piece.swayStyle} sx={{ ...fill, animation: `${sway} var(--sway-duration) ease-in-out var(--sway-delay) infinite` }}>
            {piece.spins ? (
              <Box style={piece.spinStyle} sx={{ ...fill, animation: `${spin} var(--spin-duration) linear infinite` }}>
                {piece.node}
              </Box>
            ) : (
              piece.node
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

Drift.propTypes = {
  kinds: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.node.isRequired,
      size: PropTypes.arrayOf(PropTypes.number).isRequired,
      spins: PropTypes.bool,
    })
  ).isRequired,
  count: PropTypes.number.isRequired,
  phoneCount: PropTypes.number.isRequired,
  rising: PropTypes.bool,
};

function makeCrossers(count, width) {
  return Array.from({ length: count }, (_, id) => {
    const duration = random(28, 42);
    const bobDuration = random(2.4, 3.6);
    return {
      id,
      width: random(width[0], width[1]),
      style: {
        top: `${random(14, 60)}%`,
        opacity: 0.85,
        "--fly-duration": `${duration}s`,
        "--fly-delay": `${-random(0, duration)}s`,
        // Half go left to right, the other half right to left
        "--fly-direction": id % 2 === 0 ? "normal" : "reverse",
      },
      bobStyle: {
        "--bob": `${random(8, 18)}px`,
        "--bob-duration": `${bobDuration}s`,
        "--bob-delay": `${-random(0, bobDuration)}s`,
      },
    };
  });
}

// A few things crossing the screen, bobbing as they go. `ratio` is width over
// height. The drawing should look the same either way round.
export function Crossing({ node, count, phoneCount, width, ratio, sx }) {
  const crossers = useMemo(() => makeCrossers(count, width), [count, width]);

  return (
    <Box aria-hidden="true" sx={{ ...layerSx(zIndex.decorMotion), ...motionOnly, ...fewerOnPhones(phoneCount) }}>
      {crossers.map((crosser) => (
        <Box
          key={crosser.id}
          style={crosser.style}
          sx={{
            position: "absolute",
            left: 0,
            width: crosser.width,
            height: crosser.width / ratio,
            willChange: "transform",
            animation: `${flyAcross} var(--fly-duration) linear var(--fly-delay) infinite var(--fly-direction)`,
          }}
        >
          <Box style={crosser.bobStyle} sx={{ ...fill, ...sx, animation: `${bob} var(--bob-duration) ease-in-out var(--bob-delay) infinite` }}>
            {node}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

Crossing.propTypes = {
  node: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
  phoneCount: PropTypes.number.isRequired,
  width: PropTypes.arrayOf(PropTypes.number).isRequired,
  ratio: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
