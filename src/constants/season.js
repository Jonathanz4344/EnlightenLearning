// Seasonal decorations for the whole site.
//
// With SEASON_OVERRIDE set to "auto", the season follows today's date in New
// York, wherever the visitor is, so it changes for everyone at the same moment
// and on the same day as the practice's other sites:
//   October 1 to October 31    Halloween
//   November 1 to November 30  Thanksgiving
//   December 1 to December 31  Christmas
//   January 1 to January 14    New Year's
//   Two weeks either side of Lunar New Year's day, never before January 15
//                              Lunar New Year
//   March 10 to March 17       St. Patrick's
//   March 18 to April 30       Spring
//   June 28 to July 7          July 4th
//   July 8 to August 31        Summer
//   Every other day            Normal, with no decorations
//
// To force a season regardless of the date, change SEASON_OVERRIDE to one of
// the SEASONS below.
//
// Previews: add ?season=thanksgiving (or any name in SEASONS, or ?season=normal)
// to any URL, and ?style=full to let the season palette replace the brand
// accent instead of the default "dressed" look where the brand stays and the
// season adds decor, accents and a greeting tag. Add &year=2028 to see that
// year's number at New Year's or that year's animal at Lunar New Year.

export const SEASONS = {
  NORMAL: "normal",
  HALLOWEEN: "halloween",
  THANKSGIVING: "thanksgiving",
  CHRISTMAS: "christmas",
  NEW_YEAR: "newyear",
  LUNAR: "lunar",
  ST_PATRICKS: "stpatricks",
  SPRING: "spring",
  JULY_4: "july4",
  SUMMER: "summer",
};

export const SEASON_STYLES = {
  DRESSED: "dressed",
  FULL: "full",
};

export const SEASON_OVERRIDE = "auto"; // <-- change this to force a season

// The twelve animals in order, from the Year of the Rat (2020)
const ZODIAC = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"];

// Lunar New Year's day in each year, as [month, day]. It follows the moon, so
// it moves every year; a table and not a formula, because the formula is an
// astronomy library. The same table as the other sites. A year past its end
// simply has no season until a line is added for it.
const LUNAR_NEW_YEAR = {
  2025: [1, 29], 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13], 2030: [2, 3],
  2031: [1, 23], 2032: [2, 11], 2033: [1, 31], 2034: [2, 19], 2035: [2, 8], 2036: [1, 28],
  2037: [2, 15], 2038: [2, 4], 2039: [1, 24], 2040: [2, 12], 2041: [2, 1], 2042: [1, 22],
  2043: [2, 10], 2044: [1, 30], 2045: [2, 17], 2046: [2, 6], 2047: [1, 26], 2048: [2, 14],
  2049: [2, 2], 2050: [1, 23],
};

const LUNAR_DAYS_EITHER_SIDE = 14;
const NEW_YEAR_LAST = "01-14";

const newYorkParts = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// A moment as that day in New York, YYYY-MM-DD
export function newYorkDay(date = new Date()) {
  const parts = Object.fromEntries(newYorkParts.formatToParts(date).map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

// A day some days from a date, as YYYY-MM-DD. In UTC, so no clock change can move it.
const dayFrom = (year, month, day, offset = 0) => new Date(Date.UTC(year, month - 1, day + offset)).toISOString().slice(0, 10);

// The first and last day of the Lunar New Year season. In a year when the day
// comes early (2028, 2031) the two weeks before it would start inside New
// Year's, so New Year's keeps its fourteen days and this starts the day after.
function lunarSeason(year) {
  const at = LUNAR_NEW_YEAR[year];
  if (!at) return null;
  const first = dayFrom(year, at[0], at[1], -LUNAR_DAYS_EITHER_SIDE);
  const afterNewYear = dayFrom(year, 1, 15);
  return [first < afterNewYear ? afterNewYear : first, dayFrom(year, at[0], at[1], LUNAR_DAYS_EITHER_SIDE)];
}

// The animal of a lunar year, by the calendar year it begins in
export const zodiacOf = (year) => ZODIAC[(((year - 2020) % 12) + 12) % 12];

// The animal a day belongs to. The decorations go up two weeks before the
// lunar year turns and show the animal that is coming.
export function zodiacFor(day) {
  const year = Number(day.slice(0, 4));
  const season = lunarSeason(year);
  // Past the table: early February is where the year turns, near enough
  const turns = season ? season[0] : `${year}-02-05`;
  return zodiacOf(day >= turns ? year : year - 1);
}

// The year New Year's is for: the one that has just begun, or looked at ahead
// of time, the one that is coming.
export function newYearFor(day) {
  const year = Number(day.slice(0, 4));
  return day.slice(5) <= NEW_YEAR_LAST ? year : year + 1;
}

// The season of a YYYY-MM-DD day
export function seasonFor(day) {
  const monthDay = day.slice(5);
  if (monthDay >= "10-01" && monthDay <= "10-31") return SEASONS.HALLOWEEN;
  if (monthDay >= "11-01" && monthDay <= "11-30") return SEASONS.THANKSGIVING;
  if (monthDay >= "12-01" && monthDay <= "12-31") return SEASONS.CHRISTMAS;
  if (monthDay <= NEW_YEAR_LAST) return SEASONS.NEW_YEAR;
  const lunar = lunarSeason(Number(day.slice(0, 4)));
  if (lunar && day >= lunar[0] && day <= lunar[1]) return SEASONS.LUNAR;
  if (monthDay >= "03-10" && monthDay <= "03-17") return SEASONS.ST_PATRICKS;
  if (monthDay >= "03-18" && monthDay <= "04-30") return SEASONS.SPRING;
  if (monthDay >= "06-28" && monthDay <= "07-07") return SEASONS.JULY_4;
  if (monthDay >= "07-08" && monthDay <= "08-31") return SEASONS.SUMMER;
  return SEASONS.NORMAL;
}

export function getCurrentSeason(date = new Date()) {
  if (SEASON_OVERRIDE !== "auto") {
    if (Object.values(SEASONS).includes(SEASON_OVERRIDE)) {
      return SEASON_OVERRIDE;
    }
    console.warn(`Unknown SEASON_OVERRIDE "${SEASON_OVERRIDE}", using the normal season.`);
    return SEASONS.NORMAL;
  }

  return seasonFor(newYorkDay(date));
}

// The season and style to show, honoring a preview in the query string, with
// the number on the New Year's decor and the animal on the Lunar New Year decor.
export function resolveSeason(search = typeof window !== "undefined" ? window.location.search : "", date = new Date()) {
  const params = new URLSearchParams(search);
  const requested = (params.get("season") || "").toLowerCase();
  const requestedStyle = (params.get("style") || "").toLowerCase();
  const requestedYear = Number(params.get("year"));

  let season = getCurrentSeason(date);
  if (requested === "normal" || requested === "none" || requested === "off") season = SEASONS.NORMAL;
  else if (Object.values(SEASONS).includes(requested)) season = requested;

  const style = requestedStyle === SEASON_STYLES.FULL ? SEASON_STYLES.FULL : SEASON_STYLES.DRESSED;
  const today = newYorkDay(date);
  const previewYear = Number.isInteger(requestedYear) && requestedYear > 0;
  const newYear = previewYear ? requestedYear : newYearFor(today);
  const zodiac = previewYear ? zodiacOf(requestedYear) : zodiacFor(today);
  return { season, style, newYear, zodiac };
}
