import { createElement as h } from "react";
import defineSeason, { hang, lightColors } from "../defineSeason";
import tokens from "../../../theme/seasons/newyear";
import Effects, { Sparkle, PartyHat, ClockTower, Skyline, BallOnPole, MirrorTiles, YearPlate, SparkMark, NewYearScenery } from "../NewYear";
import { Burst } from "../Burst";

// New Year's: what loads when it is New Year's, and nothing loads for any other season.

const spark = { width: 18, height: 18, node: h(Sparkle) };
const hat = { width: 16, height: 22, node: h(PartyHat) };
const burst = { width: 22, height: 22, node: h(Burst, { color: "burst-gold", tip: "burst-tip" }) };

export default defineSeason({
  name: "newyear",
  tokens,
  Effects,
  Scenery: NewYearScenery,
  Mark: SparkMark,
  garland: {
    lights: lightColors(),
    string: "var(--el-season-string)",
    fitsSmallScreens: true,
    charms: () => hang([spark, hat, burst, spark, hat, burst, spark, hat], 8, 16),
  },
  footer: {
    edge: "none",
    pieces: [
      { left: 5, width: 74, height: 44, node: h(Skyline) },
      { left: 16, width: 24, height: 60, node: h(BallOnPole), extra: true },
      { left: 28, width: 18, height: 24, node: h(PartyHat) },
      { left: 39, width: 40, height: 40, node: h(Burst, { color: "burst-gold", tip: "burst-tip" }), extra: true },
      { left: 52, width: 30, height: 62, node: h(ClockTower) },
      { left: 64, width: 18, height: 24, node: h(PartyHat), extra: true },
      { left: 75, width: 40, height: 40, node: h(Burst, { color: "burst-blue", tip: "burst-tip" }), extra: true },
      { left: 91, width: 74, height: 44, node: h(Skyline) },
    ],
  },
  balloon: {
    body: "var(--el-season-ball)",
    trim: "var(--el-season-ball-edge)",
    inside: h(MirrorTiles),
    topper: { node: ({ newYear }) => h(YearPlate, { year: newYear }), sx: { inset: 0 } },
  },
});
