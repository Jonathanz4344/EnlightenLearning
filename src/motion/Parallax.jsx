import { useRef } from "react";
import PropTypes from "prop-types";
import { useScroll, useTransform } from "framer-motion";
import Box from "@mui/material/Box";
import MotionBox from "./MotionBox";
import useMotionOk from "./useMotionOk";

// Moves its children a little slower than the page as it scrolls past.
// `strength` is the total travel in pixels across the element's visit to the
// viewport. For hero imagery.
export default function Parallax({ children, strength = 80, sx, ...rest }) {
  const ok = useMotionOk();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength / 2, strength / 2]);
  if (!ok) {
    return (
      <Box ref={ref} sx={{ position: "relative", ...sx }} {...rest}>
        {children}
      </Box>
    );
  }
  return (
    <MotionBox ref={ref} style={{ y }} sx={{ position: "relative", willChange: "transform", ...sx }} {...rest}>
      {children}
    </MotionBox>
  );
}

Parallax.propTypes = {
  children: PropTypes.node,
  strength: PropTypes.number,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
