import { SEASONS } from "../../constants/season";
import { useSeason } from "../../theme/SeasonContext";
import Halloween from "./Halloween";
import Christmas from "./Christmas";

// Full-screen seasonal decorations. The header's hanging garland lives in
// NavbarGarland, the footer's scene in FooterScene and the donate page's
// scenery in FundraisingScenery. The season comes from the date or from
// ?season= in the address (see src/constants/season.js).

export default function SeasonalEffects() {
  const { season } = useSeason();
  if (season === SEASONS.HALLOWEEN) return <Halloween />;
  if (season === SEASONS.CHRISTMAS) return <Christmas />;
  return null;
}
