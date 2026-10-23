import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { useBand } from "./BandContext";

// A small label above a heading. Sentence case, a touch of tracking, in the
// accent (or the season's accent, or the metallic gold for honors).
export default function Eyebrow({ children, icon, tone = "accent", component = "p", align, sx, ...rest }) {
  const band = useBand();
  return (
    <Typography
      variant="subtitle2"
      component={component}
      sx={[
        (theme) => ({
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          margin: 0,
          color:
            tone === "muted"
              ? band === "ink"
                ? theme.vars.palette.inkText.secondary
                : theme.vars.palette.text.secondary
              : tone === "metallic"
                ? theme.vars.palette.metallic.text
                : tone === "season"
                  ? theme.vars.palette.season.accent
                  : band === "ink"
                    ? theme.vars.palette.primary.light
                    : theme.vars.palette.accentText.main,
          ...(align === "center" && { justifyContent: "center", width: "100%" }),
          "& > svg": { fontSize: 18 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {icon}
      {children}
    </Typography>
  );
}

Eyebrow.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  tone: PropTypes.oneOf(["accent", "season", "metallic", "muted"]),
  component: PropTypes.elementType,
  align: PropTypes.oneOf(["left", "center"]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
