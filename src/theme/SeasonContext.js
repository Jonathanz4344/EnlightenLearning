import { createContext, useContext } from "react";
import { SEASONS, SEASON_STYLES } from "../constants/season";

// The season being shown (a name in SEASONS) and its style ("dressed" or
// "full"), with the year on the New Year's decor, the animal on the Lunar New
// Year decor, and the season's loaded pack (null on a plain day, while it
// loads, or if it could not load). Provided by Layout.
const SeasonContext = createContext({ season: SEASONS.NORMAL, style: SEASON_STYLES.DRESSED, newYear: null, zodiac: null, pack: null, pending: false });

export const useSeason = () => useContext(SeasonContext);

export default SeasonContext;
