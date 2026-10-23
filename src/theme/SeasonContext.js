import { createContext, useContext } from "react";
import { SEASONS, SEASON_STYLES } from "../constants/season";

// The season being shown ("normal", "halloween", "christmas") and its style
// ("dressed" or "full"). Provided by Layout, read by the seasonal decor and
// the SeasonTag.
const SeasonContext = createContext({ season: SEASONS.NORMAL, style: SEASON_STYLES.DRESSED });

export const useSeason = () => useContext(SeasonContext);

export default SeasonContext;
