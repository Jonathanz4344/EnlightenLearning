// Design tokens for the whole site. This is the only file that may hold a
// color literal. The MUI theme, the CSS variables injected into index.html,
// the seasonal decor and the motion kit all read from here.
//
// Accent: the violet of the jar in the logo. Metallic: the gold of the bulb,
// kept for stars and badges. Ink: a near-black with a faint violet cast.
// Paper: warm off-white. Each mode gets its own canvas, paper and text.

export const accent = {
  50: "#F4F0FB",
  100: "#E8E0F6",
  200: "#D1C2EC",
  300: "#B49BDF",
  400: "#9578CF",
  500: "#7B5BBF",
  600: "#6547A8",
  700: "#513889",
  800: "#3C2A66",
  900: "#2A1D48",
};

// Seasonal scales used only when a season is shown in "full" style, where the
// season palette replaces the brand accent.
export const pumpkin = {
  50: "#FCF3EC",
  100: "#F8E4D6",
  200: "#F2C8AC",
  300: "#EBA57A",
  400: "#E3844D",
  500: "#D4682B",
  600: "#B8521C",
  700: "#8F3F16",
  800: "#672D11",
  900: "#461E0B",
};

export const evergreen = {
  50: "#EEF6F0",
  100: "#DDEFE3",
  200: "#B9DFC6",
  300: "#8CC9A3",
  400: "#5FAE80",
  500: "#3C9162",
  600: "#2C744E",
  700: "#1F5A3C",
  800: "#17412C",
  900: "#0F2B1D",
};

export const gold = {
  100: "#FBF1C9",
  200: "#F6E39A",
  300: "#F0D262",
  400: "#E2BC3C",
  500: "#C9A227",
  600: "#A6841F",
  700: "#7E6418",
};

export const ink = {
  50: "#F3F1F6",
  100: "#E8E5ED",
  200: "#D4D0DB",
  300: "#B3AEBE",
  400: "#8E889B",
  500: "#6F697D",
  600: "#555063",
  700: "#3A3545",
  800: "#26222F",
  900: "#17141F",
  950: "#120F1A",
};

export const paper = {
  0: "#FFFFFF",
  50: "#FDFCFA",
  100: "#FAF8F4",
  200: "#F2EFE9",
  300: "#E9E5DD",
  400: "#DDD8CE",
};

// Status colors for form states and the odd alert. Muted on purpose.
export const status = {
  light: {
    success: "#2E7D4F",
    successSoft: "#E3F2E8",
    warning: "#9A6B12",
    warningSoft: "#FBF1D6",
    error: "#B23A3A",
    errorSoft: "#F9E5E5",
    info: "#2F5F9E",
    infoSoft: "#E4ECF8",
  },
  dark: {
    success: "#8FD3A8",
    successSoft: "#17301F",
    warning: "#F0CF6F",
    warningSoft: "#33280E",
    error: "#F09A9A",
    errorSoft: "#3A1A1A",
    info: "#9CBDF0",
    infoSoft: "#15233A",
  },
};

// Everything that changes between light and dark mode.
export const modes = {
  light: {
    canvas: paper[100],
    paper: paper[0],
    sunken: paper[200],
    tint: accent[50],
    ink: ink[900],
    inkText: paper[50],
    inkTextSecondary: ink[300],
    text: ink[900],
    textSecondary: ink[600],
    textMuted: ink[500],
    hairline: "#E6E2DA",
    hairlineStrong: "#D5D0C6",
    accentText: accent[700],
    accentStrong: accent[600],
    accentHover: accent[700],
    onAccent: paper[0],
    accentSoft: accent[100],
    accentSofter: accent[50],
    focusRing: "rgba(149, 120, 207, 0.55)",
    metallic: gold[500],
    metallicSoft: gold[100],
    metallicText: gold[700],
    frost: "rgba(250, 248, 244, 0.72)",
    frostBorder: "rgba(23, 20, 31, 0.08)",
    scrim: "rgba(23, 20, 31, 0.5)",
    shadowTint: "rgba(23, 20, 31, 0.08)",
    spotlight: "rgba(149, 120, 207, 0.16)",
    skeleton: paper[300],
  },
  dark: {
    canvas: "#121018",
    paper: "#1A1722",
    sunken: "#0C0A11",
    tint: "#221B33",
    ink: "#0E0C14",
    inkText: "#F1EEE8",
    inkTextSecondary: ink[300],
    text: "#F1EEE8",
    textSecondary: "#B0AABB",
    textMuted: "#857F92",
    hairline: "#2A2534",
    hairlineStrong: "#3A3447",
    accentText: accent[300],
    accentStrong: accent[300],
    accentHover: accent[200],
    onAccent: ink[900],
    accentSoft: "#2E2544",
    accentSofter: "#221B33",
    focusRing: "rgba(180, 155, 223, 0.6)",
    metallic: gold[300],
    metallicSoft: "#3A3114",
    metallicText: gold[300],
    frost: "rgba(18, 16, 24, 0.7)",
    frostBorder: "rgba(241, 238, 232, 0.08)",
    scrim: "rgba(0, 0, 0, 0.6)",
    shadowTint: "rgba(0, 0, 0, 0.35)",
    spotlight: "rgba(180, 155, 223, 0.14)",
    skeleton: "#26212F",
  },
};

// Seasonal accents and decor colors. Each mode keeps text-safe shades: no
// palette is inverted, so dark mode gets light accents and light decor.
export const seasons = {
  halloween: {
    label: "Halloween",
    scale: pumpkin,
    light: {
      accent: pumpkin[600],
      accentSoft: pumpkin[100],
      tint: pumpkin[50],
      onAccent: paper[0],
      decor: {
        pumpkin: "#E8762B",
        pumpkinDeep: "#C4540A",
        pumpkinLight: "#FFB069",
        stem: "#5D7A2A",
        leaf: "#6B8E23",
        night: "#2B1D3A",
        bat: "#2B1D3A",
        ghost: "#FFFFFF",
        ghostEdge: "rgba(90, 90, 130, 0.45)",
        web: "rgba(80, 70, 100, 0.35)",
        spider: "#2A2230",
        candle: "#FFD34D",
        glowPurple: "rgba(106, 27, 154, 0.10)",
        glowOrange: "rgba(255, 115, 0, 0.10)",
        stone: "#9A96A8",
        stoneEdge: "#6F6A80",
        ground: "#2F2240",
        moon: "#FFE9A8",
        star: "#FFF6D6",
      },
    },
    dark: {
      accent: pumpkin[300],
      accentSoft: "#3A2415",
      tint: "#1E1620",
      onAccent: ink[900],
      decor: {
        pumpkin: "#F08A3C",
        pumpkinDeep: "#C4540A",
        pumpkinLight: "#FFC28A",
        stem: "#8FA84B",
        leaf: "#9FB84F",
        night: "#120B24",
        bat: "#C9B5E6",
        ghost: "#FFFFFF",
        ghostEdge: "rgba(200, 200, 230, 0.45)",
        web: "rgba(230, 225, 245, 0.35)",
        spider: "#CBB6E6",
        candle: "#FFD34D",
        glowPurple: "rgba(130, 70, 190, 0.22)",
        glowOrange: "rgba(255, 140, 30, 0.16)",
        stone: "#B5B0C4",
        stoneEdge: "#8A849C",
        ground: "#2A1F38",
        moon: "#FFE9A8",
        star: "#FFF6D6",
      },
    },
  },
  christmas: {
    label: "Holidays",
    scale: evergreen,
    light: {
      accent: evergreen[700],
      accentSoft: evergreen[100],
      tint: evergreen[50],
      onAccent: paper[0],
      decor: {
        pine: "#2E7D32",
        pineDeep: "#1B5E20",
        trunk: "#6D4C41",
        snow: "#FFFFFF",
        snowEdge: "rgba(110, 150, 200, 0.45)",
        flakeEdge: "rgba(52, 120, 205, 0.55)",
        berry: "#C62828",
        berryLight: "#E53935",
        holly: "#2E7D32",
        hollyDeep: "#1B5E20",
        star: "#F4B400",
        ribbonGold: "#D4AF37",
        ribbonGoldDeep: "#B8932A",
        ornaments: ["#C62828", "#F4B400", "#2A9D4B", "#2F6FDE"],
        lights: ["#FF4D4D", "#FFD166", "#4CD964", "#4DA3FF"],
        string: "#1F5130",
        sky: "#CFE6FB",
        skyDeep: "#E8F3FE",
        ground: "#FFFFFF",
        presentRed: "#D32F2F",
        presentGreen: "#2E7D32",
        presentBlue: "#1E63C7",
        ribbonLight: "#F5F5F5",
        coal: "#263238",
        carrot: "#FF8A1C",
      },
    },
    dark: {
      accent: evergreen[300],
      accentSoft: "#16301F",
      tint: "#141D18",
      onAccent: ink[900],
      decor: {
        pine: "#3E9A45",
        pineDeep: "#2B7A30",
        trunk: "#8D6E63",
        snow: "#FFFFFF",
        snowEdge: "rgba(110, 150, 200, 0.45)",
        flakeEdge: "rgba(120, 170, 220, 0.6)",
        berry: "#E8707A",
        berryLight: "#F28B93",
        holly: "#3E9A45",
        hollyDeep: "#2B7A30",
        star: "#FFD54F",
        ribbonGold: "#E6C65C",
        ribbonGoldDeep: "#C9A227",
        ornaments: ["#E8707A", "#FFD166", "#7FC69A", "#8DB8FF"],
        lights: ["#FF6B6B", "#FFD166", "#7CE38B", "#7FB8FF"],
        string: "#6F9F7A",
        sky: "#0D1B33",
        skyDeep: "#1A2F52",
        ground: "#E6EEF8",
        presentRed: "#E8707A",
        presentGreen: "#7FC69A",
        presentBlue: "#8DB8FF",
        ribbonLight: "#F5F5F5",
        coal: "#263238",
        carrot: "#FF8A1C",
      },
    },
  },
};

// Brand colors for third-party marks. Used only on the icons of those services.
export const brands = {
  instagram: "#E4405F",
  facebook: "#1877F2",
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 22,
  xl: 32,
  pill: 999,
};

export const easing = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  enter: "cubic-bezier(0, 0, 0.2, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
  // Same curves as arrays for framer-motion
  standardArray: [0.2, 0, 0, 1],
  enterArray: [0, 0, 0.2, 1],
  exitArray: [0.4, 0, 1, 1],
};

// Milliseconds
export const duration = {
  fast: 120,
  base: 220,
  slow: 420,
  reveal: 720,
  stagger: 70,
  marquee: 40000,
  kenBurns: 22000,
  countUp: 1600,
};

// Generic families are left unquoted on purpose: a quoted generic family is
// treated as a (missing) named font and the browser falls back to Times.
export const fonts = {
  display: "Fraunces, Georgia, 'Times New Roman', serif",
  text: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
};

// A strict type scale. Display sizes are fluid between phone and desktop.
export const type = {
  display: { size: "clamp(2.5rem, 1.9rem + 2.6vw, 4.25rem)", weight: 500, lineHeight: 1.04, letterSpacing: "-0.02em" },
  h1: { size: "clamp(2.25rem, 1.75rem + 2vw, 3.5rem)", weight: 500, lineHeight: 1.06, letterSpacing: "-0.018em" },
  h2: { size: "clamp(1.75rem, 1.45rem + 1.2vw, 2.5rem)", weight: 500, lineHeight: 1.12, letterSpacing: "-0.014em" },
  h3: { size: "clamp(1.375rem, 1.25rem + 0.5vw, 1.75rem)", weight: 500, lineHeight: 1.2, letterSpacing: "-0.01em" },
  h4: { size: "1.25rem", weight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" },
  h5: { size: "1.125rem", weight: 600, lineHeight: 1.35, letterSpacing: "0" },
  h6: { size: "1rem", weight: 600, lineHeight: 1.4, letterSpacing: "0" },
  lead: { size: "clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)", weight: 400, lineHeight: 1.55, letterSpacing: "0" },
  body1: { size: "1.0625rem", weight: 400, lineHeight: 1.6, letterSpacing: "0" },
  body2: { size: "0.9375rem", weight: 400, lineHeight: 1.55, letterSpacing: "0" },
  caption: { size: "0.8125rem", weight: 400, lineHeight: 1.45, letterSpacing: "0.005em" },
  eyebrow: { size: "0.8125rem", weight: 600, lineHeight: 1.4, letterSpacing: "0.04em" },
  stat: { size: "clamp(2rem, 1.6rem + 1.4vw, 3rem)", weight: 500, lineHeight: 1, letterSpacing: "-0.02em" },
  button: { size: "0.9375rem", weight: 600, lineHeight: 1.2, letterSpacing: "0" },
};

export const layout = {
  container: 1200,
  prose: 68, // ch
  gutter: { phone: 16, tablet: 24, desktop: 32 },
  headerHeight: { phone: 60, desktop: 72 },
  section: { phone: 56, tablet: 72, desktop: 104 }, // vertical padding in px
};

export const zIndex = {
  decor: 1040,
  decorMotion: 1080,
  header: 1100,
  menu: 1300,
};

// Names of the CSS custom properties written into the document so plain CSS,
// the pre-paint style and the seasonal decor can read the same values.
export function cssVariables(mode) {
  const m = modes[mode];
  const vars = {};
  Object.entries(m).forEach(([key, value]) => {
    vars[`--el-${camelToKebab(key)}`] = value;
  });
  Object.entries(accent).forEach(([step, value]) => {
    vars[`--el-accent-${step}`] = value;
  });
  Object.entries(gold).forEach(([step, value]) => {
    vars[`--el-gold-${step}`] = value;
  });
  Object.entries(status[mode]).forEach(([key, value]) => {
    vars[`--el-${camelToKebab(key)}`] = value;
  });
  Object.entries(radius).forEach(([key, value]) => {
    vars[`--el-radius-${key}`] = `${value}px`;
  });
  vars["--el-ease-standard"] = easing.standard;
  vars["--el-ease-enter"] = easing.enter;
  vars["--el-ease-exit"] = easing.exit;
  vars["--el-duration-fast"] = `${duration.fast}ms`;
  vars["--el-duration-base"] = `${duration.base}ms`;
  vars["--el-duration-slow"] = `${duration.slow}ms`;
  vars["--el-font-display"] = fonts.display;
  vars["--el-font-text"] = fonts.text;
  return vars;
}

export function camelToKebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function cssVariablesBlock(mode) {
  return Object.entries(cssVariables(mode))
    .map(([name, value]) => `${name}:${value};`)
    .join("");
}
