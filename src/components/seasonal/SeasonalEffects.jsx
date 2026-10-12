import PropTypes from "prop-types";
import { SEASONS } from "../../constants/season";
import Halloween from "./Halloween";
import Christmas from "./Christmas";
import CardDecorations from "./CardDecorations";

// Full-screen seasonal decorations plus the touches on every card. The navbar's
// hanging garland lives in NavbarGarland and the footer's scene in FooterScene.
// Pick the season in src/constants/season.js.

export default function SeasonalEffects({ season, mode }) {
  if (season === SEASONS.NORMAL) return null;
  return (
    <>
      {season === SEASONS.HALLOWEEN ? <Halloween mode={mode} /> : <Christmas />}
      <CardDecorations season={season} mode={mode} />
    </>
  );
}

SeasonalEffects.propTypes = {
  season: PropTypes.oneOf(Object.values(SEASONS)).isRequired,
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
};
