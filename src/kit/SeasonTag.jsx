import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useSeason } from "../theme/SeasonContext";
import { SEASONS } from "../constants/season";
import { radius } from "../theme/tokens";

// A small greeting pill shown only while a season is on. The words are the
// only seasonal copy on the site; the mark comes with the season's chunk.
const GREETINGS = {
  [SEASONS.HALLOWEEN]: "Happy Halloween",
  [SEASONS.CHRISTMAS]: "Happy holidays",
  [SEASONS.THANKSGIVING]: "Happy Thanksgiving",
  [SEASONS.NEW_YEAR]: "Happy New Year",
  [SEASONS.LUNAR]: "Happy Lunar New Year",
  [SEASONS.ST_PATRICKS]: "Happy St. Patrick's Day",
  [SEASONS.SPRING]: "Happy spring",
  [SEASONS.JULY_4]: "Happy Fourth of July",
  [SEASONS.SUMMER]: "Happy summer",
};

export default function SeasonTag({ sx }) {
  const { season, pack, pending } = useSeason();
  const greeting = GREETINGS[season];
  // Shown while the season loads, so nothing moves when it arrives; gone if it could not load
  if (!greeting || (!pack && !pending)) return null;
  const Mark = pack?.Mark;
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
      {Mark ? <Mark /> : <Box component="span" sx={{ width: 16, height: 16, flexShrink: 0 }} />}
      {greeting}
    </Box>
  );
}

SeasonTag.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
