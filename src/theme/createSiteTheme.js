import { createTheme } from "@mui/material/styles";
import {
  accent as brandAccent,
  gold,
  ink,
  paper,
  modes,
  seasons,
  status,
  brands,
  radius,
  easing,
  duration,
  fonts,
  type,
  layout,
  zIndex,
} from "./tokens";

// The MUI theme is built from tokens.js and nothing else. It uses MUI's CSS
// variables, so switching between light and dark only flips an attribute on
// the html element: no re-render, no layout shift.
//
// season: "normal" | "halloween" | "christmas"
// style: "dressed" (brand accent stays, season adds a palette for decor) or
//        "full" (the season scale replaces the brand accent)

const normalSeason = (mode) => {
  const m = modes[mode];
  return { accent: m.accentText, accentSoft: m.accentSoft, tint: m.tint, onAccent: m.onAccent };
};

function buildPalette(mode, season, style) {
  const m = modes[mode];
  const s = status[mode];
  const isLight = mode === "light";
  const seasonDef = season && seasons[season];
  const full = style === "full" && seasonDef;
  const scale = full ? seasonDef.scale : brandAccent;
  const sea = seasonDef ? seasonDef[mode] : normalSeason(mode);

  const accentStrong = full ? (isLight ? scale[600] : scale[300]) : m.accentStrong;
  const accentText = full ? (isLight ? scale[700] : scale[300]) : m.accentText;
  const accentHover = full ? (isLight ? scale[700] : scale[200]) : m.accentHover;
  const accentSoft = full ? (isLight ? scale[100] : sea.accentSoft) : m.accentSoft;
  const accentSofter = full ? (isLight ? scale[50] : sea.tint) : m.accentSofter;
  const tint = full ? sea.tint : m.tint;

  return {
    mode,
    primary: {
      main: accentStrong,
      light: isLight ? scale[400] : scale[200],
      dark: isLight ? scale[700] : scale[400],
      contrastText: m.onAccent,
    },
    secondary: {
      main: m.metallic,
      light: gold[300],
      dark: gold[600],
      contrastText: ink[900],
    },
    success: { main: s.success, light: s.successSoft, dark: s.success, contrastText: isLight ? paper[0] : ink[900] },
    warning: { main: s.warning, light: s.warningSoft, dark: s.warning, contrastText: isLight ? paper[0] : ink[900] },
    error: { main: s.error, light: s.errorSoft, dark: s.error, contrastText: isLight ? paper[0] : ink[900] },
    info: { main: s.info, light: s.infoSoft, dark: s.info, contrastText: isLight ? paper[0] : ink[900] },
    text: { primary: m.text, secondary: m.textSecondary, disabled: m.textMuted },
    divider: m.hairline,
    background: { default: m.canvas, paper: m.paper },
    // Site tokens. MUI turns every leaf into a CSS variable, for example
    // var(--mui-palette-surface-sunken), reachable as theme.vars.palette.surface.sunken
    // or as the sx string "surface.sunken".
    surface: { canvas: m.canvas, paper: m.paper, sunken: m.sunken, tint, ink: m.ink },
    inkText: { primary: m.inkText, secondary: m.inkTextSecondary },
    hairline: { main: m.hairline, strong: m.hairlineStrong },
    accentText: { main: accentText, hover: accentHover, soft: accentSoft, softer: accentSofter },
    metallic: { main: m.metallic, soft: m.metallicSoft, text: m.metallicText },
    frost: { main: m.frost, border: m.frostBorder },
    effects: {
      focusRing: m.focusRing,
      scrim: m.scrim,
      shadowTint: m.shadowTint,
      spotlight: m.spotlight,
      skeleton: m.skeleton,
    },
    brand: brands,
    season: { accent: sea.accent, accentSoft: sea.accentSoft, tint: sea.tint, onAccent: sea.onAccent },
  };
}

const face = (entry, family) => ({
  fontFamily: family,
  fontSize: entry.size,
  fontWeight: entry.weight,
  lineHeight: entry.lineHeight,
  letterSpacing: entry.letterSpacing,
});

const typography = {
  fontFamily: fonts.text,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: face(type.h1, fonts.display),
  h2: face(type.h2, fonts.display),
  h3: face(type.h3, fonts.display),
  h4: face(type.h4, fonts.text),
  h5: face(type.h5, fonts.text),
  h6: face(type.h6, fonts.text),
  subtitle1: face(type.lead, fonts.text),
  subtitle2: face(type.eyebrow, fonts.text),
  body1: face(type.body1, fonts.text),
  body2: face(type.body2, fonts.text),
  caption: face(type.caption, fonts.text),
  overline: { ...face(type.eyebrow, fonts.text), textTransform: "none" },
  button: { ...face(type.button, fonts.text), textTransform: "none" },
};

const softShadow = (theme) => `0 18px 48px -20px ${theme.vars.palette.effects.shadowTint}`;
const menuShadow = (theme) => `0 12px 32px -8px ${theme.vars.palette.effects.shadowTint}, 0 0 0 1px ${theme.vars.palette.hairline.main}`;

export default function createSiteTheme({ season = "normal", style = "dressed" } = {}) {
  return createTheme({
    cssVariables: {
      colorSchemeSelector: "data-theme",
      cssVarPrefix: "mui",
    },
    colorSchemes: {
      light: { palette: buildPalette("light", season, style) },
      dark: { palette: buildPalette("dark", season, style) },
    },
    typography,
    shape: { borderRadius: radius.md },
    spacing: 8,
    custom: { radius, easing, duration, layout, zIndex, fonts, type, season, style },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            backgroundColor: theme.vars.palette.background.default,
            color: theme.vars.palette.text.primary,
            fontVariantNumeric: "tabular-nums",
          },
          "strong, b": { fontWeight: 600 },
        }),
      },
      MuiContainer: {
        defaultProps: { maxWidth: "lg" },
        styleOverrides: {
          root: ({ theme }) => ({
            paddingLeft: layout.gutter.phone,
            paddingRight: layout.gutter.phone,
            [theme.breakpoints.up("sm")]: { paddingLeft: layout.gutter.tablet, paddingRight: layout.gutter.tablet },
            [theme.breakpoints.up("md")]: { paddingLeft: layout.gutter.desktop, paddingRight: layout.gutter.desktop },
          }),
        },
      },
      MuiButtonBase: {
        defaultProps: { disableRipple: true, disableTouchRipple: true },
        styleOverrides: {
          root: ({ theme }) => ({
            "&.Mui-focusVisible": {
              outline: `3px solid ${theme.vars.palette.effects.focusRing}`,
              outlineOffset: 2,
            },
          }),
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: radius.pill,
            textTransform: "none",
            fontWeight: 600,
            fontSize: type.button.size,
            lineHeight: 1.2,
            padding: "11px 22px",
            minHeight: 44,
            boxShadow: "none",
            transition: `background-color ${duration.base}ms ${easing.standard}, color ${duration.base}ms ${easing.standard}, border-color ${duration.base}ms ${easing.standard}, transform ${duration.base}ms ${easing.standard}`,
            "&:active": { transform: "translateY(1px)" },
            "& .MuiButton-startIcon > *:nth-of-type(1), & .MuiButton-endIcon > *:nth-of-type(1)": { fontSize: 20 },
            [theme.breakpoints.down("sm")]: { width: "auto" },
          }),
          sizeSmall: { padding: "7px 16px", minHeight: 36, fontSize: "0.875rem" },
          sizeLarge: { padding: "14px 28px", minHeight: 52, fontSize: "1rem" },
          containedPrimary: ({ theme }) => ({
            backgroundColor: theme.vars.palette.primary.main,
            color: theme.vars.palette.primary.contrastText,
            "&:hover": { backgroundColor: theme.vars.palette.accentText.hover, boxShadow: "none" },
            "&.Mui-disabled": {
              backgroundColor: theme.vars.palette.surface.sunken,
              color: theme.vars.palette.text.disabled,
            },
          }),
          containedSecondary: ({ theme }) => ({
            backgroundColor: theme.vars.palette.surface.ink,
            color: theme.vars.palette.inkText.primary,
            "&:hover": { backgroundColor: theme.vars.palette.accentText.main, color: theme.vars.palette.primary.contrastText },
          }),
          outlined: ({ theme }) => ({
            borderColor: theme.vars.palette.hairline.strong,
            color: theme.vars.palette.text.primary,
            backgroundColor: "transparent",
            "&:hover": {
              borderColor: theme.vars.palette.text.secondary,
              backgroundColor: theme.vars.palette.surface.sunken,
            },
          }),
          outlinedPrimary: ({ theme }) => ({
            borderColor: theme.vars.palette.hairline.strong,
            color: theme.vars.palette.accentText.main,
            "&:hover": {
              borderColor: theme.vars.palette.accentText.main,
              backgroundColor: theme.vars.palette.accentText.softer,
            },
          }),
          text: ({ theme }) => ({
            color: theme.vars.palette.accentText.main,
            paddingLeft: 14,
            paddingRight: 14,
            "&:hover": { backgroundColor: theme.vars.palette.accentText.softer },
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.vars.palette.text.primary,
            borderRadius: radius.pill,
            transition: `background-color ${duration.base}ms ${easing.standard}`,
            "&:hover": { backgroundColor: theme.vars.palette.surface.sunken },
          }),
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            backgroundImage: "none",
            backgroundColor: theme.vars.palette.surface.paper,
            ...(ownerState.variant === "outlined" && { borderColor: theme.vars.palette.hairline.main }),
            ...(ownerState.variant !== "outlined" && ownerState.elevation > 0 && { boxShadow: softShadow(theme) }),
          }),
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.vars.palette.surface.paper,
            backgroundImage: "none",
            border: `1px solid ${theme.vars.palette.hairline.main}`,
            borderRadius: radius.lg,
            boxShadow: "none",
          }),
        },
      },
      MuiCardContent: {
        styleOverrides: { root: { padding: 24, "&:last-child": { paddingBottom: 24 } } },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: radius.pill,
            height: 30,
            fontWeight: 500,
            fontSize: "0.8125rem",
            backgroundColor: theme.vars.palette.accentText.softer,
            color: theme.vars.palette.accentText.main,
            border: `1px solid ${theme.vars.palette.hairline.main}`,
            "& .MuiChip-icon": { color: "inherit", fontSize: 16 },
            "& .MuiChip-deleteIcon": { color: "inherit" },
          }),
          outlined: ({ theme }) => ({
            backgroundColor: "transparent",
            borderColor: theme.vars.palette.hairline.strong,
            color: theme.vars.palette.text.primary,
          }),
          clickable: ({ theme }) => ({
            "&:hover": { backgroundColor: theme.vars.palette.accentText.soft },
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({ borderColor: theme.vars.palette.hairline.main }),
        },
      },
      MuiLink: {
        defaultProps: { underline: "hover" },
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.vars.palette.accentText.main,
            fontWeight: 500,
            textUnderlineOffset: "0.2em",
            textDecorationThickness: "1px",
            textDecorationColor: theme.vars.palette.hairline.strong,
            transition: `color ${duration.fast}ms ${easing.standard}`,
            "&:hover": { color: theme.vars.palette.accentText.hover, textDecorationColor: "currentColor" },
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.vars.palette.surface.paper,
            borderRadius: radius.md,
            transition: `box-shadow ${duration.fast}ms ${easing.standard}, border-color ${duration.fast}ms ${easing.standard}`,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: theme.vars.palette.hairline.strong, transition: "inherit" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.vars.palette.text.secondary },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.vars.palette.primary.main, borderWidth: 1 },
            "&.Mui-focused": { boxShadow: `0 0 0 3px ${theme.vars.palette.effects.focusRing}` },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: theme.vars.palette.error.main },
            "&.Mui-disabled": { backgroundColor: theme.vars.palette.surface.sunken },
          }),
          input: { padding: "14px 16px" },
          inputSizeSmall: { padding: "10px 14px" },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.vars.palette.text.secondary,
            "&.Mui-focused": { color: theme.vars.palette.accentText.main },
          }),
        },
      },
      MuiFormHelperText: {
        styleOverrides: { root: { marginLeft: 2, marginTop: 6 } },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: ({ theme }) => ({ color: theme.vars.palette.text.secondary }),
        },
      },
      MuiAccordion: {
        defaultProps: { elevation: 0, disableGutters: true, square: true },
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: "transparent",
            backgroundImage: "none",
            borderTop: `1px solid ${theme.vars.palette.hairline.main}`,
            "&:last-of-type": { borderBottom: `1px solid ${theme.vars.palette.hairline.main}` },
            "&::before": { display: "none" },
          }),
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: { padding: "6px 0", minHeight: 60 },
          content: { margin: "12px 0" },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: { root: { padding: "0 0 24px" } },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: ({ theme }) => ({
            backgroundColor: theme.vars.palette.surface.ink,
            color: theme.vars.palette.inkText.primary,
            fontSize: "0.8125rem",
            borderRadius: radius.sm,
            padding: "6px 10px",
          }),
          arrow: ({ theme }) => ({ color: theme.vars.palette.surface.ink }),
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: radius.md,
            boxShadow: menuShadow(theme),
            marginTop: 6,
          }),
          list: { padding: 6 },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: radius.sm,
            padding: "9px 12px",
            fontSize: "0.9375rem",
            "&:hover": { backgroundColor: theme.vars.palette.surface.sunken },
            "&.Mui-selected": { backgroundColor: theme.vars.palette.accentText.softer },
          }),
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: radius.sm,
            "&:hover": { backgroundColor: theme.vars.palette.surface.sunken },
            "&.Mui-selected": { backgroundColor: theme.vars.palette.accentText.softer },
          }),
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor: theme.vars.palette.surface.paper,
            backgroundImage: "none",
            borderRight: `1px solid ${theme.vars.palette.hairline.main}`,
          }),
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: "transparent" },
        styleOverrides: {
          root: { backgroundImage: "none", boxShadow: "none" },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.vars.palette.accentText.softer,
            color: theme.vars.palette.accentText.main,
            fontWeight: 600,
          }),
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: ({ theme }) => ({
            height: 8,
            borderRadius: radius.pill,
            backgroundColor: theme.vars.palette.surface.sunken,
          }),
          bar: ({ theme }) => ({ borderRadius: radius.pill, backgroundColor: theme.vars.palette.primary.main }),
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: radius.md, alignItems: "center" },
          standardSuccess: ({ theme }) => ({ backgroundColor: theme.vars.palette.success.light, color: theme.vars.palette.success.main }),
          standardError: ({ theme }) => ({ backgroundColor: theme.vars.palette.error.light, color: theme.vars.palette.error.main }),
          standardWarning: ({ theme }) => ({ backgroundColor: theme.vars.palette.warning.light, color: theme.vars.palette.warning.main }),
          standardInfo: ({ theme }) => ({ backgroundColor: theme.vars.palette.info.light, color: theme.vars.palette.info.main }),
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: ({ theme }) => ({ backgroundColor: theme.vars.palette.effects.skeleton }),
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${theme.vars.palette.hairline.main}`,
            fontVariantNumeric: "tabular-nums",
          }),
          head: ({ theme }) => ({
            color: theme.vars.palette.text.secondary,
            fontSize: type.eyebrow.size,
            fontWeight: 600,
            letterSpacing: type.eyebrow.letterSpacing,
          }),
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: { subtitle1: "p", subtitle2: "p", overline: "p" },
        },
      },
    },
  });
}
