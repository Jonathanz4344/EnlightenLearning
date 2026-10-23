import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "./Section";
import Eyebrow from "./Eyebrow";
import ActionButton from "./ActionButton";
import ContactPill from "./ContactPill";
import { Reveal } from "../motion";
import { layout } from "../theme/tokens";

// A band with one message and one or two actions. The ink variant is the
// strongest moment on a page, so use it once.
export default function CTABand({
  variant = "ink",
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  align = "center",
  contact = false,
  children,
  id,
  sx,
}) {
  const centered = align === "center";
  const renderAction = (action, kind) => {
    if (!action) return null;
    const { label, icon, ...rest } = action;
    return (
      <ActionButton
        variant={kind === "primary" ? "contained" : "outlined"}
        color={kind === "primary" ? "primary" : "inherit"}
        size="large"
        magnetic={kind === "primary"}
        arrow={kind === "primary" && !icon}
        startIcon={icon}
        sx={(theme) =>
          kind === "primary" && variant === "ink"
            ? {
                backgroundColor: theme.vars.palette.inkText.primary,
                color: theme.vars.palette.surface.ink,
                "&:hover": { backgroundColor: theme.vars.palette.primary.light, color: theme.vars.palette.surface.ink },
              }
            : kind === "secondary" && variant === "ink"
              ? {
                  color: theme.vars.palette.inkText.primary,
                  borderColor: theme.vars.palette.hairline.strong,
                  "&:hover": { borderColor: theme.vars.palette.inkText.primary, backgroundColor: "transparent" },
                }
              : {}
        }
        {...rest}
      >
        {label}
      </ActionButton>
    );
  };

  return (
    <Section variant={variant} size="md" id={id} sx={sx}>
      <Reveal>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: centered ? "center" : "flex-start",
            textAlign: align,
            gap: 2,
            maxWidth: centered ? 760 : 820,
            mx: centered ? "auto" : 0,
          }}
        >
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Typography variant="h2" component="h2" sx={{ textWrap: "balance" }}>
            {title}
          </Typography>
          {lead && (
            <Typography
              variant="subtitle1"
              component="p"
              sx={(theme) => ({
                color: variant === "ink" ? theme.vars.palette.inkText.secondary : theme.vars.palette.text.secondary,
                maxWidth: `${layout.prose}ch`,
                textWrap: "pretty",
              })}
            >
              {lead}
            </Typography>
          )}
          {(primary || secondary) && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: centered ? "center" : "flex-start", pt: 1.5 }}>
              {renderAction(primary, "primary")}
              {renderAction(secondary, "secondary")}
            </Box>
          )}
          {contact && <ContactPill sx={{ mt: 1 }} />}
          {children}
        </Box>
      </Reveal>
    </Section>
  );
}

const actionShape = PropTypes.shape({
  label: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  external: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.node,
});

CTABand.propTypes = {
  variant: PropTypes.oneOf(["ink", "tint", "paper", "sunken"]),
  eyebrow: PropTypes.node,
  title: PropTypes.node.isRequired,
  lead: PropTypes.node,
  primary: actionShape,
  secondary: actionShape,
  align: PropTypes.oneOf(["left", "center"]),
  contact: PropTypes.bool,
  children: PropTypes.node,
  id: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
