import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import MotionBox from "./MotionBox";
import useMotionOk from "./useMotionOk";
import { duration, easing } from "../theme/tokens";

// A list whose items rise in one after another. Wrap the list in <Stagger>
// and each item in <StaggerItem>. Under reduced motion both render plain.

const container = (gap, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow / 1000, ease: easing.enterArray } },
};

export function Stagger({ children, gap = duration.stagger / 1000, delay = 0, amount = 0.15, once = true, component = "div", sx, ...rest }) {
  const ok = useMotionOk();
  if (!ok) {
    return (
      <Box component={component} sx={sx} {...rest}>
        {children}
      </Box>
    );
  }
  return (
    <MotionBox
      component={component}
      variants={container(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      sx={sx}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}

Stagger.propTypes = {
  children: PropTypes.node,
  gap: PropTypes.number,
  delay: PropTypes.number,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(["some", "all"])]),
  once: PropTypes.bool,
  component: PropTypes.elementType,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export function StaggerItem({ children, component = "div", sx, ...rest }) {
  const ok = useMotionOk();
  if (!ok) {
    return (
      <Box component={component} sx={sx} {...rest}>
        {children}
      </Box>
    );
  }
  return (
    <MotionBox component={component} variants={item} sx={sx} {...rest}>
      {children}
    </MotionBox>
  );
}

StaggerItem.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Stagger;
