import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BandContext from "./BandContext";
import { layout } from "../theme/tokens";

// A full-width band of the page. Variants are surfaces, never gradients:
//   page    the canvas itself
//   sunken  a slightly deeper surface with hairlines
//   paper   the brightest surface with hairlines
//   tint    a soft accent-tinted surface
//   ink     the dark band with light text

const SIZES = {
  sm: { xs: 5, sm: 6, md: 8 },
  md: { xs: `${layout.section.phone}px`, sm: `${layout.section.tablet}px`, md: `${layout.section.desktop}px` },
  lg: { xs: 9, sm: 12, md: 17 },
};

const surfaces = (theme, variant) => {
  switch (variant) {
    case "sunken":
      return {
        backgroundColor: theme.vars.palette.surface.sunken,
        borderTop: `1px solid ${theme.vars.palette.hairline.main}`,
        borderBottom: `1px solid ${theme.vars.palette.hairline.main}`,
      };
    case "paper":
      return {
        backgroundColor: theme.vars.palette.surface.paper,
        borderTop: `1px solid ${theme.vars.palette.hairline.main}`,
        borderBottom: `1px solid ${theme.vars.palette.hairline.main}`,
      };
    case "tint":
      return {
        backgroundColor: theme.vars.palette.surface.tint,
        borderTop: `1px solid ${theme.vars.palette.hairline.main}`,
        borderBottom: `1px solid ${theme.vars.palette.hairline.main}`,
      };
    case "ink":
      return {
        backgroundColor: theme.vars.palette.surface.ink,
        color: theme.vars.palette.inkText.primary,
        borderTop: `1px solid ${theme.vars.palette.hairline.main}`,
        borderBottom: `1px solid ${theme.vars.palette.hairline.main}`,
      };
    default:
      return { backgroundColor: theme.vars.palette.surface.canvas };
  }
};

export default function Section({
  children,
  variant = "page",
  size = "md",
  component = "section",
  maxWidth = "lg",
  disableContainer = false,
  id,
  sx,
  containerSx,
  ...rest
}) {
  const padding = SIZES[size] || SIZES.md;
  return (
    <BandContext.Provider value={variant}>
      <Box
        component={component}
        id={id}
        data-band={variant}
        sx={[
          (theme) => ({ position: "relative", py: padding, ...surfaces(theme, variant) }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
      >
        {disableContainer ? children : (
          <Container maxWidth={maxWidth} sx={containerSx}>
            {children}
          </Container>
        )}
      </Box>
    </BandContext.Provider>
  );
}

Section.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["page", "sunken", "paper", "tint", "ink"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  component: PropTypes.elementType,
  maxWidth: PropTypes.oneOfType([PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]), PropTypes.bool]),
  disableContainer: PropTypes.bool,
  id: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
  containerSx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
