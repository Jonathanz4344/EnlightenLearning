import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";
import useMotionOk from "./useMotionOk";
import { duration } from "../theme/tokens";

// An endless row for logos or short reviews. The content is drawn twice so
// the loop is seamless; the copy is read once by assistive technology. Under
// reduced motion it becomes a plain row that scrolls by hand.

const slide = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`;

export default function Marquee({ children, speed = duration.marquee, gap = 48, reverse = false, pauseOnHover = true, sx, ...rest }) {
  const ok = useMotionOk();
  const track = (hidden) => (
    <Box
      aria-hidden={hidden ? "true" : undefined}
      sx={{ display: "flex", alignItems: "center", flexShrink: 0, gap: `${gap}px`, paddingRight: `${gap}px` }}
    >
      {children}
    </Box>
  );

  if (!ok) {
    return (
      <Box sx={{ overflowX: "auto", scrollbarWidth: "thin", ...sx }} {...rest}>
        {track(false)}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        overflow: "hidden",
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        ...sx,
      }}
      {...rest}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: `${slide} ${speed}ms linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          ...(pauseOnHover && { "@media (hover: hover)": { "&:hover": { animationPlayState: "paused" } } }),
        }}
      >
        {track(false)}
        {track(true)}
      </Box>
    </Box>
  );
}

Marquee.propTypes = {
  children: PropTypes.node,
  speed: PropTypes.number,
  gap: PropTypes.number,
  reverse: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
