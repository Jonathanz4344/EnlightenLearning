import PropTypes from "prop-types";
import { useSeason } from "../../theme/SeasonContext";

// A place on the page for one part of today's season. Renders nothing on a
// plain day, while the season is loading, or if it could not load.
export default function SeasonSlot({ part }) {
  const { pack } = useSeason();
  const Part = pack?.[part];
  return Part ? <Part /> : null;
}

SeasonSlot.propTypes = {
  part: PropTypes.oneOf(["Effects", "Garland", "FooterScene", "Scenery"]).isRequired,
};
