import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useBand } from "./BandContext";

// A list of short points with a check mark. Items are rendered exactly as given.
export default function CheckList({ items, columns = 1, icon, tone = "accent", dense = false, variant = "body2", sx }) {
  const band = useBand();
  return (
    <Box
      component="ul"
      sx={[
        {
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: `repeat(${columns}, minmax(0, 1fr))` },
          columnGap: 3,
          rowGap: dense ? 1 : 1.5,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {items.map((item, i) => (
        <Box key={typeof item === "string" ? item : i} component="li" sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
          <Box
            aria-hidden="true"
            sx={(theme) => ({
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: 22,
              height: 22,
              mt: "1px",
              borderRadius: "50%",
              backgroundColor:
                tone === "season"
                  ? theme.vars.palette.season.accentSoft
                  : tone === "metallic"
                    ? theme.vars.palette.metallic.soft
                    : band === "ink"
                      ? theme.vars.palette.hairline.strong
                      : theme.vars.palette.accentText.softer,
              color:
                tone === "season"
                  ? theme.vars.palette.season.accent
                  : tone === "metallic"
                    ? theme.vars.palette.metallic.text
                    : band === "ink"
                      ? theme.vars.palette.inkText.primary
                      : theme.vars.palette.accentText.main,
              "& > svg": { fontSize: 15 },
            })}
          >
            {icon || <CheckRoundedIcon />}
          </Box>
          <Typography variant={variant} component="span" sx={{ textWrap: "pretty" }}>
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

CheckList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  columns: PropTypes.oneOf([1, 2, 3]),
  icon: PropTypes.node,
  tone: PropTypes.oneOf(["accent", "season", "metallic"]),
  dense: PropTypes.bool,
  variant: PropTypes.oneOf(["body1", "body2"]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
