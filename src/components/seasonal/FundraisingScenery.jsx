import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";
import { SEASONS } from "../../constants/season";
import { flapWings, seasonVar } from "./shared";
import { Pumpkin, FlyingBat } from "./Halloween";
import { Tombstone, PineTree, Snowman } from "./FooterScene";

// Seasonal scenery for the donate page's fundraising sky: a moon, stars, a bat
// and a spooky hilltop at Halloween, and falling snow with pine trees and a
// snowman for the holidays. Sits behind the balloon and the numbers. Colors
// are the season's CSS variables.

const twinkle = keyframes`
  0%, 100% { opacity: 0.9; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.7); }
`;

const snowDrift = keyframes`
  from { transform: translate3d(0, -20px, 0); }
  to { transform: translate3d(14px, 620px, 0); }
`;

const glide = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(-4deg); }
  50% { transform: translate(-26px, 10px) rotate(4deg); }
`;

const still = {
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
  "html[data-motion='off'] &": { animation: "none" },
};

// Fixed, scattered spots so the stars look random but stay put between visits
const STARS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 94,
  top: (i * 23 + 7) % 55,
  size: i % 4 === 0 ? 3 : 2,
  delay: (i * 0.45) % 3,
}));

const FLAKES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 29 + 5) % 98,
  size: 3 + (i % 3),
  duration: 7 + (i % 5) * 1.6,
  delay: -((i * 1.3) % 9),
}));

// Props standing on the ground, at the edges so they stay clear of the numbers
const onGround = (side, offset, width, height, node, key) => (
  <Box
    key={key}
    sx={{
      position: "absolute",
      [side]: offset,
      bottom: { xs: 30, sm: 34 },
      width,
      height,
      zIndex: 1,
    }}
  >
    {node}
  </Box>
);

function HalloweenScenery() {
  return (
    <>
      {STARS.map((star, i) => (
        <Box
          key={`star-${i}`}
          sx={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: seasonVar("star"),
            boxShadow: `0 0 4px ${seasonVar("star")}`,
            animation: `${twinkle} 3s ease-in-out ${star.delay}s infinite`,
            ...still,
          }}
        />
      ))}

      {/* Moon with a bat gliding past */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "5%", sm: "7%" },
          right: { xs: "6%", sm: "9%" },
          width: { xs: 52, sm: 76 },
          height: { xs: 52, sm: 76 },
          borderRadius: "50%",
          backgroundColor: seasonVar("moon"),
          boxShadow: `0 0 40px 12px ${seasonVar("glow-orange")}`,
        }}
      >
        <Box sx={{ position: "absolute", top: "28%", left: "52%", width: "16%", height: "16%", borderRadius: "50%", backgroundColor: seasonVar("pumpkin-light"), opacity: 0.35 }} />
        <Box sx={{ position: "absolute", top: "58%", left: "30%", width: "11%", height: "11%", borderRadius: "50%", backgroundColor: seasonVar("pumpkin-light"), opacity: 0.3 }} />
        <Box
          sx={{
            position: "absolute",
            top: "38%",
            left: "-30%",
            width: { xs: 30, sm: 40 },
            height: { xs: 15, sm: 20 },
            animation: `${glide} 6s ease-in-out infinite`,
            "--flap": "0.25s",
            ...flapWings,
            ...still,
          }}
        >
          <FlyingBat />
        </Box>
      </Box>

      {onGround("left", "3%", 22, 28, <Tombstone />, "stone-1")}
      {onGround("left", "11%", 34, 33, <Pumpkin face />, "pumpkin-1")}
      {onGround("right", "12%", 20, 28, <Tombstone cross />, "stone-2")}
      {onGround("right", "3%", 30, 29, <Pumpkin face />, "pumpkin-2")}
    </>
  );
}

function ChristmasScenery() {
  return (
    <>
      {FLAKES.map((flake, i) => (
        <Box
          key={`flake-${i}`}
          sx={{
            position: "absolute",
            top: 0,
            left: `${flake.left}%`,
            width: flake.size,
            height: flake.size,
            borderRadius: "50%",
            backgroundColor: seasonVar("snow"),
            boxShadow: `0 0 3px ${seasonVar("flake-edge")}`,
            animation: `${snowDrift} ${flake.duration}s linear ${flake.delay}s infinite`,
            "@media (prefers-reduced-motion: reduce)": { display: "none" },
            "html[data-motion='off'] &": { display: "none" },
          }}
        />
      ))}

      {onGround("left", "3%", 36, 50, <PineTree star />, "tree-1")}
      {onGround("left", "11%", 28, 39, <PineTree />, "tree-2")}
      {onGround("right", "11%", 30, 42, <PineTree />, "tree-3")}
      {onGround("right", "3%", 32, 45, <Snowman />, "snowman")}
    </>
  );
}

export default function FundraisingScenery({ season }) {
  if (season === SEASONS.HALLOWEEN) return <HalloweenScenery />;
  if (season === SEASONS.CHRISTMAS) return <ChristmasScenery />;
  return null;
}

FundraisingScenery.propTypes = {
  season: PropTypes.oneOf(Object.values(SEASONS)).isRequired,
};
