import { createElement as h } from "react";
import defineSeason, { hang, flagColors } from "../defineSeason";
import tokens from "../../../theme/seasons/stpatricks";
import Effects, { Clover, Coin, LeprechaunHat, CloverPatch, PotOfGold, CloverLeaves, CloverMark, StPatricksScenery } from "../StPatricks";

// St. Patrick's: what loads when it is St. Patrick's, and nothing loads for any other season.

const clover = { width: 22, height: 22, node: h(Clover) };
const coin = { width: 14, height: 14, node: h(Coin) };
const hat = { width: 24, height: 20, node: h(LeprechaunHat) };

export default defineSeason({
  name: "stpatricks",
  tokens,
  Effects,
  Scenery: StPatricksScenery,
  Mark: CloverMark,
  garland: {
    flags: flagColors("flag-green", "flag-white", "flag-gold"),
    flagEdge: "var(--el-season-clover-deep)",
    shine: "var(--el-season-shine)",
    string: "var(--el-season-string)",
    fitsSmallScreens: true,
    charms: () => hang([clover, coin, hat, clover, coin, clover, hat, clover], 8, 18),
  },
  footer: {
    edge: "none",
    pieces: [
      { left: 6, width: 56, height: 34, node: h(CloverPatch) },
      { left: 18, width: 44, height: 37, node: h(LeprechaunHat), extra: true },
      { left: 31, width: 56, height: 34, node: h(CloverPatch), extra: true },
      { left: 46, width: 52, height: 45, node: h(PotOfGold) },
      { left: 60, width: 56, height: 34, node: h(CloverPatch), extra: true },
      { left: 74, width: 44, height: 37, node: h(LeprechaunHat) },
      { left: 90, width: 56, height: 34, node: h(CloverPatch) },
    ],
  },
  balloon: {
    bare: true,
    behind: h(CloverLeaves),
    topper: { node: h(LeprechaunHat), sx: { right: "-6%", top: "-10%", width: "42%", height: "35%", transform: "rotate(16deg)" } },
    tie: false,
  },
});
