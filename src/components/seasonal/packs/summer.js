import { createElement as h } from "react";
import defineSeason, { hang, flagColors } from "../defineSeason";
import tokens from "../../../theme/seasons/summer";
import Effects, { Sun, BeachBall, Starfish, Shell, Umbrella, PalmTree, Sandcastle, Pail, BallPanels, SunMark, SummerScenery } from "../Summer";

// Summer: what loads when it is Summer, and nothing loads for any other season.

const sun = { width: 24, height: 24, node: h(Sun) };
const ball = { width: 20, height: 20, node: h(BeachBall) };
const starfish = { width: 18, height: 18, node: h(Starfish) };
const shell = { width: 18, height: 16, node: h(Shell) };

export default defineSeason({
  name: "summer",
  tokens,
  Effects,
  Scenery: SummerScenery,
  Mark: SunMark,
  garland: {
    flags: flagColors("flag-sea", "flag-coral", "flag-sun"),
    shine: "var(--el-season-shine)",
    string: "var(--el-season-string)",
    fitsSmallScreens: true,
    charms: () => hang([sun, shell, ball, starfish, shell, ball, starfish, sun], 8, 18),
  },
  footer: {
    edge: "var(--el-season-ground-edge)",
    pieces: [
      { left: 5, width: 50, height: 58, node: h(PalmTree) },
      { left: 16, width: 22, height: 22, node: h(BeachBall), extra: true },
      { left: 28, width: 54, height: 56, node: h(Umbrella) },
      { left: 40, width: 18, height: 18, node: h(Starfish), extra: true },
      { left: 52, width: 44, height: 32, node: h(Sandcastle) },
      { left: 63, width: 20, height: 21, node: h(Pail), extra: true },
      { left: 74, width: 18, height: 16, node: h(Shell) },
      { left: 92, width: 50, height: 58, node: h(PalmTree) },
    ],
  },
  balloon: {
    body: "var(--el-season-ball-white)",
    trim: "var(--el-season-ball-edge)",
    inside: h(BallPanels),
  },
});
