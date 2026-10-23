import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { radius } from "../theme/tokens";

// A small status pill: Open, Upcoming, Past, Filled, and the like.
const tones = (theme, tone) => {
  switch (tone) {
    case "accent":
      return { backgroundColor: theme.vars.palette.accentText.softer, color: theme.vars.palette.accentText.main };
    case "season":
      return { backgroundColor: theme.vars.palette.season.accentSoft, color: theme.vars.palette.season.accent };
    case "metallic":
      return { backgroundColor: theme.vars.palette.metallic.soft, color: theme.vars.palette.metallic.text };
    case "success":
      return { backgroundColor: theme.vars.palette.success.light, color: theme.vars.palette.success.main };
    case "warning":
      return { backgroundColor: theme.vars.palette.warning.light, color: theme.vars.palette.warning.main };
    case "error":
      return { backgroundColor: theme.vars.palette.error.light, color: theme.vars.palette.error.main };
    case "info":
      return { backgroundColor: theme.vars.palette.info.light, color: theme.vars.palette.info.main };
    case "ink":
      return { backgroundColor: theme.vars.palette.surface.ink, color: theme.vars.palette.inkText.primary };
    default:
      return { backgroundColor: theme.vars.palette.surface.sunken, color: theme.vars.palette.text.secondary };
  }
};

export default function Badge({ children, tone = "neutral", icon, size = "md", component = "span", sx, ...rest }) {
  return (
    <Box
      component={component}
      sx={[
        (theme) => ({
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          px: size === "sm" ? 1 : 1.25,
          py: size === "sm" ? 0.25 : 0.5,
          borderRadius: `${radius.pill}px`,
          border: `1px solid ${theme.vars.palette.hairline.main}`,
          fontSize: size === "sm" ? "0.75rem" : "0.8125rem",
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          fontVariantNumeric: "tabular-nums",
          ...tones(theme, tone),
          "& > svg": { fontSize: size === "sm" ? 14 : 16 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {icon}
      {children}
    </Box>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  tone: PropTypes.oneOf(["neutral", "accent", "season", "metallic", "success", "warning", "error", "info", "ink"]),
  icon: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md"]),
  component: PropTypes.elementType,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
