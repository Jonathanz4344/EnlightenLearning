import IconButton from "@mui/material/IconButton";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import useThemeMode from "../theme/useThemeMode";
import { duration, easing } from "../theme/tokens";

// Switches between light and dark. The choice is remembered per browser.
export default function ToggleColorMode() {
  const { isDark, toggle } = useThemeMode();
  return (
    <IconButton
      onClick={toggle}
      size="small"
      aria-label="button to toggle theme"
      aria-pressed={isDark}
      sx={{
        width: 40,
        height: 40,
        "& svg": { fontSize: 20, transition: `transform ${duration.slow}ms ${easing.standard}` },
        "@media (hover: hover)": { "&:hover svg": { transform: "rotate(20deg)" } },
      }}
    >
      {isDark ? <WbSunnyRoundedIcon /> : <ModeNightRoundedIcon />}
    </IconButton>
  );
}
