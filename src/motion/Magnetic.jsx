import { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useMotionValue, useSpring } from "framer-motion";
import Box from "@mui/material/Box";
import MotionBox from "./MotionBox";
import useMotionOk from "./useMotionOk";

// Primary buttons lean gently toward the pointer and spring back. Only with a
// real pointer (no touch) and only when motion is allowed.
export default function Magnetic({ children, strength = 0.28, sx, ...rest }) {
  const ok = useMotionOk();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx1 = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy1 = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onPointerMove = useCallback(
    (event) => {
      if (event.pointerType !== "mouse") return;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [strength, x, y]
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (!ok) {
    return (
      <Box sx={{ display: "inline-flex", ...sx }} {...rest}>
        {children}
      </Box>
    );
  }
  return (
    <MotionBox
      ref={ref}
      style={{ x: sx1, y: sy1 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      sx={{ display: "inline-flex", ...sx }}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}

Magnetic.propTypes = {
  children: PropTypes.node,
  strength: PropTypes.number,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
