// Splits a display string such as "300+", "$8.5k" or "1,000" into the prefix,
// the number and the suffix, so a count-up can end on exactly that string.
// Strings that are not really a number ("K-12", "24/7", "A+") return null
// and are shown as they are.
const PREFIX = /^[$€£]?$/;
const SUFFIX = /^(\+|%|k|K|m|M|x|\+\s*%)?$/;

export default function splitNumber(text) {
  const match = String(text).trim().match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  if (!PREFIX.test(prefix.trim()) || !SUFFIX.test(suffix.trim())) return null;
  const decimals = (number.split(".")[1] || "").length;
  return { prefix, value: parseFloat(number.replace(/,/g, "")), suffix, decimals, grouped: number.includes(",") };
}
