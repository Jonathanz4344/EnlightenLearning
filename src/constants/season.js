// Seasonal decorations for the whole site.
//
// With SEASON_OVERRIDE set to "auto", the season follows today's date:
//   October 1 to October 31    Halloween
//   December 1 to December 31  Christmas
//   Every other day            Normal, with no decorations
//
// To force a season regardless of the date, change SEASON_OVERRIDE to
// SEASONS.NORMAL, SEASONS.HALLOWEEN or SEASONS.CHRISTMAS.

export const SEASONS = {
  NORMAL: "normal",
  HALLOWEEN: "halloween",
  CHRISTMAS: "christmas",
};

export const SEASON_OVERRIDE = "auto"; // <-- change this to force a season

export function getCurrentSeason(date = new Date()) {
  if (SEASON_OVERRIDE !== "auto") {
    if (Object.values(SEASONS).includes(SEASON_OVERRIDE)) {
      return SEASON_OVERRIDE;
    }
    console.warn(`Unknown SEASON_OVERRIDE "${SEASON_OVERRIDE}", using the normal season.`);
    return SEASONS.NORMAL;
  }

  const month = date.getMonth(); // 0 is January
  if (month === 9) return SEASONS.HALLOWEEN; // October
  if (month === 11) return SEASONS.CHRISTMAS; // December
  return SEASONS.NORMAL;
}
