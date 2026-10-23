// Seasonal decorations for the whole site.
//
// With SEASON_OVERRIDE set to "auto", the season follows today's date:
//   October 1 to October 31    Halloween
//   December 1 to December 31  Christmas
//   Every other day            Normal, with no decorations
//
// To force a season regardless of the date, change SEASON_OVERRIDE to
// SEASONS.NORMAL, SEASONS.HALLOWEEN or SEASONS.CHRISTMAS.
//
// Previews: add ?season=halloween or ?season=christmas (or ?season=normal) to
// any URL, and ?style=full to let the season palette replace the brand accent
// instead of the default "dressed" look where the brand stays and the season
// adds decor, accents and a greeting tag.

export const SEASONS = {
  NORMAL: "normal",
  HALLOWEEN: "halloween",
  CHRISTMAS: "christmas",
};

export const SEASON_STYLES = {
  DRESSED: "dressed",
  FULL: "full",
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

// The season and style to show, honoring a preview in the query string.
export function resolveSeason(search = typeof window !== "undefined" ? window.location.search : "", date = new Date()) {
  const params = new URLSearchParams(search);
  const requested = (params.get("season") || "").toLowerCase();
  const requestedStyle = (params.get("style") || "").toLowerCase();

  let season = getCurrentSeason(date);
  if (requested === "normal" || requested === "none" || requested === "off") season = SEASONS.NORMAL;
  else if (Object.values(SEASONS).includes(requested)) season = requested;

  const style = requestedStyle === SEASON_STYLES.FULL ? SEASON_STYLES.FULL : SEASON_STYLES.DRESSED;
  return { season, style };
}
