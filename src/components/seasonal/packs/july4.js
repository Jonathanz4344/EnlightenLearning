import { createElement as h } from "react";
import defineSeason, { hang, flagColors } from "../defineSeason";
import tokens from "../../../theme/seasons/july4";
import Effects, { Star, FlagOnPole, Rocket, PicketFence, Watermelon, FlagPaint, StarTopper, StarMark, July4Scenery } from "../July4";
import { Burst } from "../Burst";

// July 4th: what loads when it is July 4th, and nothing loads for any other season.

const star = (tone) => ({ width: 18, height: 18, node: h(Star, { tone }) });
const burst = { width: 24, height: 24, node: h(Burst, { color: "burst-red", tip: "burst-blue" }) };

export default defineSeason({
  name: "july4",
  tokens,
  Effects,
  Scenery: July4Scenery,
  Mark: StarMark,
  garland: {
    flags: flagColors("flag-red", "flag-white", "flag-blue"),
    flagEdge: "var(--el-season-flag-edge)",
    shine: "var(--el-season-shine)",
    string: "var(--el-season-string)",
    fitsSmallScreens: true,
    charms: () => hang([star("star-red"), star("star-blue"), burst, star("star-red"), star("star-white"), burst, star("star-blue"), star("star-red")], 8, 18),
  },
  footer: {
    edge: "none",
    pieces: [
      { left: 6, width: 62, height: 44, node: h(FlagOnPole) },
      { left: 19, width: 18, height: 40, node: h(Rocket), extra: true },
      { left: 31, width: 72, height: 30, node: h(PicketFence) },
      { left: 46, width: 40, height: 40, node: h(Burst, { color: "burst-red", tip: "burst-gold" }), extra: true },
      { left: 56, width: 34, height: 18, node: h(Watermelon) },
      { left: 68, width: 72, height: 30, node: h(PicketFence), extra: true },
      { left: 81, width: 18, height: 40, node: h(Rocket) },
      { left: 93, width: 62, height: 44, node: h(FlagOnPole), extra: true },
    ],
  },
  balloon: {
    body: "var(--el-season-flag-white)",
    trim: "var(--el-season-flag-edge)",
    inside: h(FlagPaint),
    topper: { node: h(StarTopper), sx: { inset: 0 } },
  },
});
