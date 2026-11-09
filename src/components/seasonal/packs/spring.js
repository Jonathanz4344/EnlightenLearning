import { createElement as h } from "react";
import defineSeason, { hang, flagColors } from "../defineSeason";
import tokens from "../../../theme/seasons/spring";
import Effects, { PaintedEgg, Butterfly, Bee, Tulip, Daffodil, Bunny, FlowerBloom, FlowerStem, BlossomMark, SpringScenery } from "../Spring";

// Spring: what loads when it is Spring, and nothing loads for any other season.

const egg = (tone) => ({ width: 15, height: 18, node: h(PaintedEgg, { tone }) });
const butterfly = { width: 22, height: 17, node: h(Butterfly) };
const bee = { width: 20, height: 16, node: h(Bee) };

export default defineSeason({
  name: "spring",
  tokens,
  Effects,
  Scenery: SpringScenery,
  Mark: BlossomMark,
  garland: {
    flags: flagColors("flag-pink", "flag-yellow", "flag-mint"),
    shine: "var(--el-season-shine)",
    string: "var(--el-season-string)",
    fitsSmallScreens: true,
    charms: () => hang([egg("blue"), butterfly, egg("pink"), bee, egg("yellow"), butterfly, egg("blue"), bee], 8, 18),
  },
  footer: {
    edge: "var(--el-season-ground-edge)",
    pieces: [
      { left: 5, width: 24, height: 45, node: h(Tulip, { tone: "red" }) },
      { left: 10, width: 24, height: 42, node: h(Daffodil), extra: true },
      { left: 22, width: 16, height: 19, node: h(PaintedEgg, { tone: "blue" }) },
      { left: 33, width: 38, height: 46, node: h(Bunny) },
      { left: 45, width: 24, height: 45, node: h(Tulip, { tone: "purple" }), extra: true },
      { left: 57, width: 16, height: 19, node: h(PaintedEgg, { tone: "pink" }) },
      { left: 68, width: 24, height: 42, node: h(Daffodil), extra: true },
      { left: 80, width: 24, height: 45, node: h(Tulip, { tone: "pink" }), extra: true },
      { left: 92, width: 24, height: 45, node: h(Tulip, { tone: "red" }) },
    ],
  },
  balloon: {
    bare: true,
    behind: h(FlowerBloom),
    topper: { node: h(Bee), sx: { right: "-4%", top: "-2%", width: "28%", height: "22%", transform: "rotate(-10deg)" } },
    tie: h(FlowerStem),
  },
});
