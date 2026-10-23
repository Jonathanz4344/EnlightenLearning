import { useCallback } from "react";
import { useColorScheme } from "@mui/material/styles";

// The resolved color mode ("light" or "dark") plus a toggle. Components that
// only style themselves should prefer theme.vars and theme.applyStyles; this
// hook is for the few places that must branch in JavaScript, such as the
// mode switch and the seasonal scenes.
export default function useThemeMode() {
  const { mode, systemMode, setMode } = useColorScheme();
  const resolved = (mode === "system" ? systemMode : mode) || "light";
  const toggle = useCallback(() => {
    setMode(resolved === "dark" ? "light" : "dark");
  }, [resolved, setMode]);
  return { mode: resolved, isDark: resolved === "dark", setMode, toggle };
}
