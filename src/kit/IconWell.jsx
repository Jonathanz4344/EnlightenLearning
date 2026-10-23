import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { radius } from "../theme/tokens";

// A rounded well that holds one icon on a soft tinted surface.
const SIZES = { sm: { box: 40, icon: 20 }, md: { box: 52, icon: 26 }, lg: { box: 64, icon: 32 } };

const tones = (theme, tone) => {
  switch (tone) {
    case "accent":
      return { backgroundColor: theme.vars.palette.primary.main, color: theme.vars.palette.primary.contrastText };
    case "metallic":
      return { backgroundColor: theme.vars.palette.metallic.soft, color: theme.vars.palette.metallic.text };
    case "season":
      return { backgroundColor: theme.vars.palette.season.accentSoft, color: theme.vars.palette.season.accent };
    case "sunken":
      return { backgroundColor: theme.vars.palette.surface.sunken, color: theme.vars.palette.text.primary };
    case "ink":
      return { backgroundColor: theme.vars.palette.surface.ink, color: theme.vars.palette.inkText.primary };
    case "paper":
      return { backgroundColor: theme.vars.palette.surface.paper, color: theme.vars.palette.accentText.main, border: `1px solid ${theme.vars.palette.hairline.main}` };
    default:
      return { backgroundColor: theme.vars.palette.accentText.softer, color: theme.vars.palette.accentText.main };
  }
};

export default function IconWell({ children, size = "md", tone = "tint", round = false, sx, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  return (
    <Box
      aria-hidden="true"
      sx={[
        (theme) => ({
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          width: s.box,
          height: s.box,
          borderRadius: round ? "50%" : `${radius.md}px`,
          ...tones(theme, tone),
          "& > svg": { fontSize: s.icon },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Box>
  );
}

IconWell.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  tone: PropTypes.oneOf(["tint", "accent", "metallic", "season", "sunken", "ink", "paper"]),
  round: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
