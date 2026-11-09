import { createElement as h } from "react";
import defineSeason, { hang, flagColors } from "../defineSeason";
import tokens from "../../../theme/seasons/thanksgiving";
import Effects, { MapleLeaf, OakLeaf, Acorn, Gourd, WheatSheaf, Corn, Turkey, TurkeyBody, TurkeyHead, LeafMark, ThanksgivingScenery } from "../Thanksgiving";

// Thanksgiving: what loads when it is Thanksgiving, and nothing loads for any other season.

const maple = (tone) => ({ width: 20, height: 22, node: h(MapleLeaf, { tone }) });
const oak = (tone) => ({ width: 20, height: 20, node: h(OakLeaf, { tone }) });
const acorn = { width: 12, height: 16, node: h(Acorn) };
const gourd = { width: 24, height: 20, node: h(Gourd) };

export default defineSeason({
  name: "thanksgiving",
  tokens,
  Effects,
  Scenery: ThanksgivingScenery,
  Mark: LeafMark,
  garland: {
    flags: flagColors("leaves-1", "leaves-3", "leaves-2"),
    shine: "var(--el-season-shine)",
    string: "var(--el-season-string)",
    fitsSmallScreens: true,
    charms: () => hang([maple(1), acorn, oak(2), gourd, maple(3), acorn, oak(4), maple(2)], 8, 18),
  },
  footer: {
    edge: "none",
    pieces: [
      { left: 6, width: 30, height: 42, node: h(WheatSheaf) },
      { left: 15, width: 34, height: 29, node: h(Gourd), extra: true },
      { left: 28, width: 48, height: 48, node: h(Turkey) },
      { left: 41, width: 20, height: 42, node: h(Corn), extra: true },
      { left: 54, width: 30, height: 26, node: h(Gourd, { golden: true }) },
      { left: 67, width: 30, height: 42, node: h(WheatSheaf), extra: true },
      { left: 79, width: 34, height: 29, node: h(Gourd), extra: true },
      { left: 92, width: 22, height: 46, node: h(Corn) },
    ],
  },
  balloon: {
    bare: true,
    behind: h(TurkeyBody),
    topper: { node: h(TurkeyHead), sx: { inset: 0 } },
    tie: false,
  },
});
