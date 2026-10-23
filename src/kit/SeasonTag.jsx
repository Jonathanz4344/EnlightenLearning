import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useSeason } from "../theme/SeasonContext";
import { SEASONS } from "../constants/season";
import { radius } from "../theme/tokens";

// A small greeting pill shown only while a season is on. The words are the
// only seasonal copy on the site.
const GREETINGS = {
  [SEASONS.HALLOWEEN]: "Happy Halloween",
  [SEASONS.CHRISTMAS]: "Happy holidays",
};

const PumpkinMark = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M12 6c.2-1.4.9-2.4 2.3-3" fill="none" stroke="var(--el-season-stem)" strokeWidth="1.6" strokeLinecap="round" />
    <ellipse cx="8" cy="14" rx="5.5" ry="7" style={{ fill: "var(--el-season-pumpkin-deep)" }} />
    <ellipse cx="16" cy="14" rx="5.5" ry="7" style={{ fill: "var(--el-season-pumpkin-deep)" }} />
    <ellipse cx="12" cy="14" rx="5" ry="7.5" style={{ fill: "var(--el-season-pumpkin)" }} />
  </svg>
);

const HollyMark = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <ellipse cx="8" cy="10" rx="6" ry="3" transform="rotate(-25 8 10)" style={{ fill: "var(--el-season-holly)" }} />
    <ellipse cx="16" cy="10" rx="6" ry="3" transform="rotate(25 16 10)" style={{ fill: "var(--el-season-holly-deep)" }} />
    <circle cx="10.5" cy="14.5" r="2" style={{ fill: "var(--el-season-berry)" }} />
    <circle cx="13.5" cy="14.5" r="2" style={{ fill: "var(--el-season-berry-light)" }} />
    <circle cx="12" cy="17.2" r="2" style={{ fill: "var(--el-season-berry)" }} />
  </svg>
);

export default function SeasonTag({ sx }) {
  const { season } = useSeason();
  const greeting = GREETINGS[season];
  if (!greeting) return null;
  return (
    <Box
      component="span"
      sx={[
        (theme) => ({
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.5,
          borderRadius: `${radius.pill}px`,
          backgroundColor: theme.vars.palette.season.accentSoft,
          color: theme.vars.palette.season.accent,
          border: `1px solid ${theme.vars.palette.hairline.main}`,
          fontSize: "0.8125rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          lineHeight: 1.4,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {season === SEASONS.HALLOWEEN ? <PumpkinMark /> : <HollyMark />}
      {greeting}
    </Box>
  );
}

SeasonTag.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
