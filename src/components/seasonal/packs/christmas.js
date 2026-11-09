import { createElement as h } from "react";
import defineSeason, { lightColors } from "../defineSeason";
import tokens from "../../../theme/seasons/christmas";
import Effects, { Ornament, PineTree, Snowman, Present, SnowSparkles, HollySprig, HollyMark, ChristmasScenery } from "../Christmas";

// Christmas: what loads when it is Christmas, and nothing loads for any other season.

export default defineSeason({
  name: "christmas",
  tokens,
  Effects,
  Scenery: ChristmasScenery,
  Mark: HollyMark,
  garland: {
    lights: lightColors(),
    string: "var(--el-season-string)",
    fitsSmallScreens: true,
    charms: () =>
      Array.from({ length: 8 }, (_, i) => ({
        width: 16,
        height: 20,
        thread: i % 2 === 0 ? 8 : 16,
        node: h(Ornament, { color: `var(--el-season-ornaments-${(i % 4) + 1})` }),
      })),
  },
  footer: {
    edge: "var(--el-season-snow-edge)",
    pieces: [
      { left: 5, width: 34, height: 48, node: h(PineTree) },
      { left: 15, width: 26, height: 22, node: h(Present, { color: "present-red", ribbon: "ribbon-gold" }), extra: true },
      { left: 27, width: 40, height: 56, node: h(PineTree, { star: true }) },
      { left: 40, width: 22, height: 19, node: h(Present, { color: "present-green", ribbon: "ribbon-light" }), extra: true },
      { left: 52, width: 34, height: 48, node: h(Snowman) },
      { left: 65, width: 30, height: 42, node: h(PineTree), extra: true },
      { left: 76, width: 24, height: 21, node: h(Present, { color: "present-blue", ribbon: "berry" }) },
      { left: 90, width: 40, height: 56, node: h(PineTree, { star: true }) },
    ],
  },
  balloon: {
    body: "var(--el-season-snow)",
    trim: "var(--el-season-snow-edge)",
    inside: h(SnowSparkles),
    topper: { node: h(HollySprig), sx: { right: "2%", top: "2%", width: "34%", height: "25%", transform: "rotate(18deg)" } },
  },
});
