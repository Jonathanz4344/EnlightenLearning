import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Eyebrow from "./Eyebrow";
import { Reveal } from "../motion";
import { layout } from "../theme/tokens";
import { useBand } from "./BandContext";

// Eyebrow, heading and an optional lead paragraph for a section.
export default function SectionHeading({
  eyebrow,
  eyebrowIcon,
  eyebrowTone,
  title,
  lead,
  level = "h2",
  variant = "h2",
  align = "left",
  id,
  reveal = true,
  gutterBottom = true,
  maxWidth = 760,
  sx,
  children,
}) {
  const band = useBand();
  const content = (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          alignItems: align === "center" ? "center" : "flex-start",
          textAlign: align,
          gap: 1.5,
          mb: gutterBottom ? { xs: 4, md: 6 } : 0,
          maxWidth: align === "center" ? maxWidth : undefined,
          mx: align === "center" ? "auto" : undefined,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {eyebrow && (
        <Eyebrow icon={eyebrowIcon} tone={eyebrowTone}>
          {eyebrow}
        </Eyebrow>
      )}
      <Typography variant={variant} component={level} id={id} sx={{ textWrap: "balance" }}>
        {title}
      </Typography>
      {lead && (
        <Typography
          variant="subtitle1"
          component="p"
          sx={(theme) => ({
            color: band === "ink" ? theme.vars.palette.inkText.secondary : theme.vars.palette.text.secondary,
            maxWidth: `${layout.prose}ch`,
            textWrap: "pretty",
          })}
        >
          {lead}
        </Typography>
      )}
      {children}
    </Box>
  );
  return reveal ? <Reveal>{content}</Reveal> : content;
}

SectionHeading.propTypes = {
  eyebrow: PropTypes.node,
  eyebrowIcon: PropTypes.node,
  eyebrowTone: PropTypes.oneOf(["accent", "season", "metallic", "muted"]),
  title: PropTypes.node.isRequired,
  lead: PropTypes.node,
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4", "p", "div"]),
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5"]),
  align: PropTypes.oneOf(["left", "center"]),
  id: PropTypes.string,
  reveal: PropTypes.bool,
  gutterBottom: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
  children: PropTypes.node,
};
