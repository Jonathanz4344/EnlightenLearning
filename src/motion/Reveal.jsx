import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import MotionBox from "./MotionBox";
import useMotionOk from "./useMotionOk";
import { duration, easing } from "../theme/tokens";

// Rise in when scrolled into view. One job: reveal. Under reduced motion the
// children render exactly as they are, with no hidden state at all.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  blur = false,
  once = true,
  amount = 0.2,
  component = "div",
  sx,
  ...rest
}) {
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
      initial={{ opacity: 0, y, ...(blur && { filter: "blur(10px)" }) }}
      whileInView={{ opacity: 1, y: 0, ...(blur && { filter: "blur(0px)" }) }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: duration.reveal / 1000, ease: easing.enterArray, delay }}
      sx={sx}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}

Reveal.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  y: PropTypes.number,
  blur: PropTypes.bool,
  once: PropTypes.bool,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(["some", "all"])]),
  component: PropTypes.elementType,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
