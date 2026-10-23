import * as React from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Footer from "./footer/Footer";
import Header from "./navBar/Header";
import SeasonalEffects from "./seasonal/SeasonalEffects";
import createSiteTheme from "../theme/createSiteTheme";
import SeasonContext from "../theme/SeasonContext";
import { resolveSeason } from "../constants/season";

function PageFallback() {
  return (
    // Taller than the viewport so neither the footer nor the seasonal scene on its
    // top edge sits in view and then jumps when the page arrives
    <Box role="status" aria-live="polite" sx={{ minHeight: "calc(100vh + 80px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="body2" sx={(theme) => ({ color: theme.vars.palette.text.secondary })}>
        Loading ...
      </Typography>
    </Box>
  );
}

export default function Layout() {
  const location = useLocation();
  const { season, style } = React.useMemo(() => resolveSeason(location.search), [location.search]);
  const theme = React.useMemo(() => createSiteTheme({ season, style }), [season, style]);

  // The seasonal CSS variables and decor hang off this attribute
  React.useEffect(() => {
    const root = document.documentElement;
    if (season === "normal") root.removeAttribute("data-season");
    else root.setAttribute("data-season", season);
    root.setAttribute("data-season-style", style);
  }, [season, style]);

  return (
    <SeasonContext.Provider value={{ season, style }}>
      <ThemeProvider theme={theme} defaultMode="light" modeStorageKey="el-mode" noSsr disableTransitionOnChange>
        <CssBaseline />
        <ScrollRestoration />
        <a className="el-skip-link" href="#main-content">
          Skip to content
        </a>
        <SeasonalEffects />
        <Header />
        <Box component="main" id="main-content" sx={{ position: "relative", zIndex: 1 }}>
          <React.Suspense fallback={<PageFallback />}>
            <Outlet />
          </React.Suspense>
        </Box>
        <Footer />
      </ThemeProvider>
    </SeasonContext.Provider>
  );
}
