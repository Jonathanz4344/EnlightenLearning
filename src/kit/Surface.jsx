import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { radius as radiusTokens } from "../theme/tokens";

// A plain card surface: a tone, a hairline and a radius. No shadow.
export default function Surface({ children, tone = "paper", radius = "lg", padding = 3, border = true, component = "div", sx, ...rest }) {
  return (
    <Box
      component={component}
      sx={[
        (theme) => ({
          position: "relative",
          backgroundColor: theme.vars.palette.surface[tone] || theme.vars.palette.surface.paper,
          ...(tone === "ink" && { color: theme.vars.palette.inkText.primary }),
          borderRadius: `${radiusTokens[radius]}px`,
          border: border ? `1px solid ${tone === "ink" ? theme.vars.palette.hairline.strong : theme.vars.palette.hairline.main}` : "none",
          p: padding,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Box>
  );
}

Surface.propTypes = {
  children: PropTypes.node,
  tone: PropTypes.oneOf(["paper", "tint", "sunken", "canvas", "ink"]),
  radius: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.string]),
  border: PropTypes.bool,
  component: PropTypes.elementType,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
