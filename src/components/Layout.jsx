import { Outlet, ScrollRestoration } from "react-router-dom";
import { Suspense } from "react";
import * as React from "react";
import Footer from "./footer/Footer";
import Header from "./navBar/Header";
import PropTypes from "prop-types";

import getLPTheme from "./getLPTheme";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const ModeContext = React.createContext();

export const useMode = () => React.useContext(ModeContext);

export default function Layout() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme] = React.useState(true);

  // DEVELOPER SETTING: Change seasonal theme here
  // Options: "normal", "halloween", "christmas"
  const seasonalTheme = "normal"; // <-- Change this value to switch themes

  // Create appropriate theme based on mode and seasonal selection
  let themeConfig;
  switch (seasonalTheme) {
    case "halloween":
      themeConfig = getHalloweenTheme(mode);
      break;
    case "christmas":
      themeConfig = getChristmasTheme(mode);
      break;
    default:
      themeConfig = getLPTheme(mode);
  }

  const LPtheme = createTheme(themeConfig);
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleColorMode }}>
      <ScrollRestoration />
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        <Header
          mode={mode}
          toggleColorMode={toggleColorMode}
        />
        <main>
          <Suspense fallback={<div>Loading ...</div>}>
            <Outlet />
          </Suspense>
        </main>
        <Divider />
        <div className="bg-slate-200">
          <Footer />
        </div>


      </ThemeProvider>
    </ModeContext.Provider>
  );
}
