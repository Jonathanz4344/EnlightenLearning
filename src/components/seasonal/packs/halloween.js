import { createElement as h } from "react";
import defineSeason, { flagColors } from "../defineSeason";
import tokens from "../../../theme/seasons/halloween";
import Effects, { Pumpkin, FlyingBat, Ghost, SpiderShape, Tombstone, DeadTree, PumpkinRibs, PumpkinStem, PumpkinMark, HalloweenScenery } from "../Halloween";

// Halloween: what loads when it is Halloween, and nothing loads for any other season.

const bat = { width: 30, height: 15, node: h(FlyingBat) };
const pumpkin = { width: 24, height: 23, node: h(Pumpkin, { face: true }) };
const ghost = { width: 18, height: 20, node: h(Ghost) };
const spider = { width: 16, height: 16, node: h(SpiderShape) };

export default defineSeason({
  name: "halloween",
  tokens,
  Effects,
  Scenery: HalloweenScenery,
  Mark: PumpkinMark,
  garland: {
    flags: flagColors("pumpkin", "night", "bat"),
    string: "var(--el-season-night)",
    fitsSmallScreens: true,
    // Longer threads so the charms hang below the flags
    charms: () => [pumpkin, bat, ghost, spider, pumpkin, ghost, bat, pumpkin].map((charm, i) => ({ ...charm, thread: i % 2 === 0 ? 14 : 22 })),
  },
  footer: {
    edge: "none",
    pieces: [
      { left: 5, width: 34, height: 32, node: h(Pumpkin, { face: true }) },
      { left: 14, width: 20, height: 26, node: h(Tombstone), extra: true },
      { left: 24, width: 54, height: 64, node: h(DeadTree), extra: true },
      { left: 36, width: 28, height: 27, node: h(Pumpkin, { face: false }) },
      { left: 49, width: 22, height: 30, node: h(Tombstone, { cross: true }) },
      { left: 60, width: 38, height: 36, node: h(Pumpkin, { face: true }) },
      { left: 72, width: 22, height: 28, node: h(Tombstone), extra: true },
      { left: 84, width: 30, height: 29, node: h(Pumpkin, { face: true }) },
      { left: 94, width: 20, height: 26, node: h(Tombstone), extra: true },
    ],
  },
  balloon: {
    body: "var(--el-season-pumpkin)",
    trim: "var(--el-season-pumpkin-deep)",
    inside: h(PumpkinRibs),
    topper: { node: h(PumpkinStem), sx: { left: "24%", top: "-12%", width: "24%", height: "24%", transform: "rotate(-18deg)" } },
  },
});
