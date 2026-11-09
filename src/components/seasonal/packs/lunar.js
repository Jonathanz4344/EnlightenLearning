import { createElement as h } from "react";
import defineSeason, { hang, lightColors } from "../defineSeason";
import tokens from "../../../theme/seasons/lunar";
import Effects, { PaperLantern, GoldCoin, PlumBlossom, PlumTree, LanternOnPost, Orange, RedEnvelope, LanternRibs, LanternCap, LanternTassel, LanternMark, LunarScenery } from "../LunarNewYear";
import ZodiacFace from "../ZodiacFace";

// Lunar New Year: what loads when it is Lunar New Year, and nothing loads for any other season.

const lantern = { width: 16, height: 25, node: h(PaperLantern) };
const coin = { width: 14, height: 14, node: h(GoldCoin) };
const blossom = { width: 16, height: 16, node: h(PlumBlossom) };

export default defineSeason({
  name: "lunar",
  tokens,
  Effects,
  Scenery: LunarScenery,
  Mark: LanternMark,
  garland: {
    lights: lightColors(),
    string: "var(--el-season-string)",
    fitsSmallScreens: true,
    charms: ({ zodiac }) => {
      const animal = { width: 26, height: 26, node: h(ZodiacFace, { animal: zodiac }) };
      return hang([lantern, coin, blossom, animal, lantern, blossom, coin, lantern], 8, 14);
    },
  },
  footer: {
    edge: "none",
    pieces: [
      { left: 5, width: 50, height: 58, node: h(PlumTree) },
      { left: 15, width: 24, height: 56, node: h(LanternOnPost), extra: true },
      { left: 27, width: 20, height: 22, node: h(Orange) },
      { left: 32, width: 18, height: 20, node: h(Orange), extra: true },
      { left: 45, width: 22, height: 30, node: h(RedEnvelope), extra: true },
      { left: 55, width: 24, height: 56, node: h(LanternOnPost) },
      { left: 68, width: 20, height: 22, node: h(Orange), extra: true },
      { left: 80, width: 24, height: 56, node: h(LanternOnPost), extra: true },
      { left: 92, width: 50, height: 58, node: h(PlumTree) },
    ],
  },
  balloon: {
    body: "var(--el-season-lantern)",
    trim: "var(--el-season-gold-deep)",
    inside: h(LanternRibs),
    topper: { node: h(LanternCap), sx: { inset: 0 } },
    tie: h(LanternTassel),
  },
});
