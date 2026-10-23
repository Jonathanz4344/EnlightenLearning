import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Eyebrow from "./Eyebrow";
import SeasonTag from "./SeasonTag";
import { Reveal, SplitWords } from "../motion";
import { layout } from "../theme/tokens";

// The top of a page: eyebrow, the h1, a lead and optional actions, sitting on
// the canvas with the fixed header above. `display` turns on the word-by-word
// title (home page); content pages keep a quiet rise-in.
export default function PageIntro({
  id,
  eyebrow,
  eyebrowIcon,
  title,
  titleComponent = "h1",
  titleVariant = "h1",
  lead,
  leadComponent = "p",
  align = "center",
  actions,
  aside,
  display = false,
  seasonTag = false,
  children,
  maxWidth = "lg",
  sx,
}) {
  const centered = align === "center";
  const words = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: centered ? "center" : "flex-start",
        textAlign: align,
        gap: { xs: 2, md: 2.5 },
        maxWidth: centered ? 820 : 720,
        mx: centered ? "auto" : 0,
      }}
    >
      {(seasonTag || eyebrow) && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center", justifyContent: centered ? "center" : "flex-start" }}>
          {seasonTag && <SeasonTag />}
          {eyebrow && (
            <Reveal y={10}>
              <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
            </Reveal>
          )}
        </Box>
      )}
      <Typography variant={titleVariant} component={titleComponent} sx={{ textWrap: "balance" }}>
        {display ? <SplitWords text={title} /> : <Reveal component="span" sx={{ display: "block" }}>{title}</Reveal>}
      </Typography>
      {lead && (
        <Reveal delay={display ? 0.35 : 0.08} y={16}>
          <Typography
            variant="subtitle1"
            component={leadComponent}
            sx={(theme) => ({ color: theme.vars.palette.text.secondary, maxWidth: `${layout.prose}ch`, textWrap: "pretty", m: 0 })}
          >
            {lead}
          </Typography>
        </Reveal>
      )}
      {actions && (
        <Reveal delay={display ? 0.5 : 0.14} y={12}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: centered ? "center" : "flex-start", pt: 1 }}>
            {actions}
          </Box>
        </Reveal>
      )}
      {children}
    </Box>
  );

  return (
    <Box
      component="header"
      id={id}
      sx={[
        {
          pt: { xs: `${layout.headerHeight.phone + 40}px`, md: `${layout.headerHeight.desktop + 64}px` },
          pb: { xs: 5, md: 8 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container maxWidth={maxWidth}>
        {aside ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 7fr) minmax(0, 5fr)" },
              gap: { xs: 4, md: 8 },
              alignItems: "center",
            }}
          >
            {words}
            <Reveal delay={0.2}>{aside}</Reveal>
          </Box>
        ) : (
          words
        )}
      </Container>
    </Box>
  );
}

PageIntro.propTypes = {
  id: PropTypes.string,
  eyebrow: PropTypes.node,
  eyebrowIcon: PropTypes.node,
  title: PropTypes.string.isRequired,
  titleComponent: PropTypes.elementType,
  titleVariant: PropTypes.oneOf(["h1", "h2"]),
  lead: PropTypes.node,
  leadComponent: PropTypes.elementType,
  align: PropTypes.oneOf(["left", "center"]),
  actions: PropTypes.node,
  aside: PropTypes.node,
  display: PropTypes.bool,
  seasonTag: PropTypes.bool,
  children: PropTypes.node,
  maxWidth: PropTypes.oneOfType([PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]), PropTypes.bool]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
