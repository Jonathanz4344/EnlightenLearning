import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { resolveSeason } from "./constants/season";
import { seasonReady } from "./components/seasonal/loadSeason";
import "./styles/fonts.css";
import "./styles/global.css";
import "./index.css";

// On a season day the first paint waits for that season's colors and art (up
// to a second), so nothing changes color once the page is up. A plain day
// starts at once.
seasonReady(resolveSeason(window.location.search).season).then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
});
