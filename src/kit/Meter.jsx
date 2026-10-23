import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

// A progress meter with tabular figures. Pass the already formatted strings
// for the start and end labels so the words stay exactly as written.
export default function Meter({ value, max, label, startText, endText, tone = "accent", height = 10, sx }) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <Box sx={[{ display: "flex", flexDirection: "column", gap: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <LinearProgress
        variant="determinate"
        value={percent}
        aria-label={label}
        aria-valuetext={`${Math.round(percent)}%`}
        sx={(theme) => ({
          height,
          "& .MuiLinearProgress-bar": {
            backgroundColor:
              tone === "season" ? theme.vars.palette.season.accent : tone === "metallic" ? theme.vars.palette.metallic.main : theme.vars.palette.primary.main,
          },
        })}
      />
      {(startText || endText) && (
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Typography variant="caption" sx={(theme) => ({ color: theme.vars.palette.text.secondary, fontVariantNumeric: "tabular-nums" })}>
            {startText}
          </Typography>
          <Typography variant="caption" sx={(theme) => ({ color: theme.vars.palette.text.secondary, fontVariantNumeric: "tabular-nums" })}>
            {endText}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

Meter.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  startText: PropTypes.node,
  endText: PropTypes.node,
  tone: PropTypes.oneOf(["accent", "season", "metallic"]),
  height: PropTypes.number,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
