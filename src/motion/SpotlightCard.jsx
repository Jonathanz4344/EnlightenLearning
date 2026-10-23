import { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import useMotionOk from "./useMotionOk";
import { radius as radiusTokens, duration, easing } from "../theme/tokens";

// A card lit by a soft spot that follows the pointer. The spot is drawn by a
// pseudo element, so the card's own content and borders are untouched.
export default function SpotlightCard({ children, radius = "lg", tone = "paper", component = "div", sx, ...rest }) {
  const ok = useMotionOk();
  const ref = useRef(null);

  const onPointerMove = useCallback((event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Box
      ref={ref}
      component={component}
      onPointerMove={ok ? onPointerMove : undefined}
      sx={[
        (theme) => ({
          position: "relative",
          overflow: "hidden",
          borderRadius: `${radiusTokens[radius]}px`,
          border: `1px solid ${theme.vars.palette.hairline.main}`,
          backgroundColor: theme.vars.palette.surface[tone],
          transition: `border-color ${duration.base}ms ${easing.standard}, transform ${duration.base}ms ${easing.standard}`,
          "--spot-x": "50%",
          "--spot-y": "0%",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(360px circle at var(--spot-x) var(--spot-y), ${theme.vars.palette.effects.spotlight}, transparent 65%)`,
            opacity: 0,
            transition: `opacity ${duration.slow}ms ${easing.standard}`,
          },
          "@media (hover: hover)": {
            "&:hover": { borderColor: theme.vars.palette.hairline.strong },
            "&:hover::before": { opacity: ok ? 1 : 0 },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Box>
  );
}

SpotlightCard.propTypes = {
  children: PropTypes.node,
  radius: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  tone: PropTypes.oneOf(["paper", "tint", "sunken", "canvas"]),
  component: PropTypes.elementType,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
