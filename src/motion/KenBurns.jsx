import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";
import useMotionOk from "./useMotionOk";
import { duration } from "../theme/tokens";

// A slow drift and zoom on a hero photo. The photo fills its frame with
// object-fit: cover; the frame clips the movement.

const drift = keyframes`
  from { transform: scale(1) translate3d(0, 0, 0); }
  to { transform: scale(1.1) translate3d(-1.5%, 1%, 0); }
`;

const driftReverse = keyframes`
  from { transform: scale(1.1) translate3d(1.5%, -1%, 0); }
  to { transform: scale(1) translate3d(0, 0, 0); }
`;

export default function KenBurns({ src, alt, reverse = false, length = duration.kenBurns, priority = false, sizes, srcSet, sx, imgSx, ...rest }) {
  const ok = useMotionOk();
  return (
    <Box sx={{ position: "relative", overflow: "hidden", ...sx }} {...rest}>
      <Box
        component="img"
        src={src}
        alt={alt}
        sizes={sizes}
        srcSet={srcSet}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: "center",
          ...(ok && { animation: `${reverse ? driftReverse : drift} ${length}ms ease-in-out infinite alternate`, willChange: "transform" }),
          ...imgSx,
        }}
      />
    </Box>
  );
}

KenBurns.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
  length: PropTypes.number,
  priority: PropTypes.bool,
  sizes: PropTypes.string,
  srcSet: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
  imgSx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
