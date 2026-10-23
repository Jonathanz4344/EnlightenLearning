import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconWell from "./IconWell";
import Eyebrow from "./Eyebrow";
import Surface from "./Surface";
import ActionButton from "./ActionButton";
import { Stagger, StaggerItem, SpotlightCard } from "../motion";

// FeatureGrid lays out FeatureCards in a responsive grid, revealing them one
// after another. FeatureCard is a surface with an icon well, a title, a short
// description and an optional link.

export function FeatureGrid({ children, columns = { xs: 1, sm: 2, md: 3 }, gap = 3, stagger = true, component = "div", itemComponent = "div", sx }) {
  const gridSx = [
    {
      display: "grid",
      gridTemplateColumns: Object.fromEntries(Object.entries(columns).map(([bp, n]) => [bp, `repeat(${n}, minmax(0, 1fr))`])),
      gap,
      listStyle: "none",
      p: 0,
      m: 0,
    },
    ...(Array.isArray(sx) ? sx : [sx]),
  ];
  const items = Array.isArray(children) ? children.flat().filter(Boolean) : [children];
  if (!stagger) {
    return (
      <Box component={component} sx={gridSx}>
        {items.map((child, i) => (
          <Box key={child?.key ?? i} component={itemComponent} sx={{ display: "flex", minWidth: 0 }}>
            {child}
          </Box>
        ))}
      </Box>
    );
  }
  return (
    <Stagger component={component} sx={gridSx}>
      {items.map((child, i) => (
        <StaggerItem key={child?.key ?? i} component={itemComponent} sx={{ display: "flex", minWidth: 0 }}>
          {child}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

FeatureGrid.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.object,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  stagger: PropTypes.bool,
  component: PropTypes.elementType,
  itemComponent: PropTypes.elementType,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export function FeatureCard({
  icon,
  iconTone = "tint",
  eyebrow,
  title,
  titleComponent = "h3",
  titleVariant = "h5",
  description,
  children,
  footer,
  badge,
  to,
  href,
  external = false,
  actionLabel,
  tone = "paper",
  spotlight = false,
  align = "left",
  padding = 3,
  sx,
}) {
  const body = (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "stretch", textAlign: align, gap: 2, height: "100%", width: "100%" }}>
      {(icon || badge) && (
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: align === "center" ? "center" : "space-between", gap: 2, width: "100%" }}>
          {icon && (
            <IconWell tone={iconTone} size="md">
              {icon}
            </IconWell>
          )}
          {badge}
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
        {eyebrow && <Eyebrow tone="muted">{eyebrow}</Eyebrow>}
        <Typography variant={titleVariant} component={titleComponent} sx={{ textWrap: "balance" }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" sx={(theme) => ({ color: tone === "ink" ? theme.vars.palette.inkText.secondary : theme.vars.palette.text.secondary, textWrap: "pretty" })}>
            {description}
          </Typography>
        )}
      </Box>
      {children}
      {(footer || actionLabel) && (
        <Box sx={{ mt: "auto", pt: 1, display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center", justifyContent: align === "center" ? "center" : "flex-start", width: "100%" }}>
          {footer}
          {actionLabel && (
            <ActionButton variant="text" size="small" to={to} href={href} external={external} arrow sx={{ ml: -1.5 }}>
              {actionLabel}
            </ActionButton>
          )}
        </Box>
      )}
    </Box>
  );
  const common = { sx: [{ width: "100%", display: "flex", p: padding }, ...(Array.isArray(sx) ? sx : [sx])] };
  return spotlight ? (
    <SpotlightCard tone={tone} {...common}>
      {body}
    </SpotlightCard>
  ) : (
    <Surface tone={tone} padding={padding} {...common}>
      {body}
    </Surface>
  );
}

FeatureCard.propTypes = {
  icon: PropTypes.node,
  iconTone: PropTypes.oneOf(["tint", "accent", "metallic", "season", "sunken", "ink", "paper"]),
  eyebrow: PropTypes.node,
  title: PropTypes.node.isRequired,
  titleComponent: PropTypes.elementType,
  titleVariant: PropTypes.oneOf(["h3", "h4", "h5", "h6"]),
  description: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  badge: PropTypes.node,
  to: PropTypes.string,
  href: PropTypes.string,
  external: PropTypes.bool,
  actionLabel: PropTypes.node,
  tone: PropTypes.oneOf(["paper", "tint", "sunken", "canvas", "ink"]),
  spotlight: PropTypes.bool,
  align: PropTypes.oneOf(["left", "center"]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default FeatureGrid;
