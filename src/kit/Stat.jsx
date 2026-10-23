import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconWell from "./IconWell";
import { CountUp, Stagger, StaggerItem } from "../motion";
import { fonts, type } from "../theme/tokens";
import { useBand } from "./BandContext";

// One number with its label. Tabular numerals, counted up when it scrolls in.
export function Stat({ value, label, caption, icon, countUp = true, size = "md", align = "left", tone = "text", sx }) {
  const band = useBand();
  return (
    <Box
      sx={[
        { display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", textAlign: align, gap: 0.75 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {icon && (
        <IconWell size="sm" tone={band === "ink" ? "ink" : "tint"} sx={{ mb: 0.5 }}>
          {icon}
        </IconWell>
      )}
      <Typography
        component="p"
        sx={(theme) => ({
          fontFamily: fonts.display,
          fontSize: size === "lg" ? type.display.size : type.stat.size,
          fontWeight: type.stat.weight,
          lineHeight: type.stat.lineHeight,
          letterSpacing: type.stat.letterSpacing,
          fontVariantNumeric: "tabular-nums",
          color:
            tone === "accent"
              ? band === "ink"
                ? theme.vars.palette.primary.light
                : theme.vars.palette.accentText.main
              : tone === "metallic"
                ? theme.vars.palette.metallic.text
                : "inherit",
          m: 0,
        })}
      >
        {countUp ? <CountUp value={value} /> : value}
      </Typography>
      <Typography variant="body2" component="p" sx={{ fontWeight: 500, m: 0 }}>
        {label}
      </Typography>
      {caption && (
        <Typography variant="caption" component="p" sx={(theme) => ({ color: band === "ink" ? theme.vars.palette.inkText.secondary : theme.vars.palette.text.secondary, m: 0 })}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}

Stat.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.node.isRequired,
  caption: PropTypes.node,
  icon: PropTypes.node,
  countUp: PropTypes.bool,
  size: PropTypes.oneOf(["md", "lg"]),
  align: PropTypes.oneOf(["left", "center"]),
  tone: PropTypes.oneOf(["text", "accent", "metallic"]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

// A row of stats divided by hairlines.
export function StatRow({ items, columns, align = "left", divided = true, size = "md", tone = "text", sx }) {
  const count = items.length;
  const cols = columns || { xs: count > 2 ? 2 : count, md: count };
  return (
    <Stagger
      component="dl"
      sx={[
        (theme) => ({
          display: "grid",
          gridTemplateColumns: Object.fromEntries(Object.entries(cols).map(([bp, n]) => [bp, `repeat(${n}, minmax(0, 1fr))`])),
          gap: { xs: 3, md: 0 },
          m: 0,
          "& > *": {
            px: { md: 3 },
            "&:first-of-type": { pl: { md: 0 } },
            ...(divided && {
              borderLeft: { md: `1px solid ${theme.vars.palette.hairline.strong}` },
              "&:first-of-type": { borderLeft: "none", pl: { md: 0 } },
            }),
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {items.map((item) => (
        <StaggerItem key={item.label}>
          <Stat value={item.value} label={item.label} caption={item.caption} icon={item.icon} align={align} size={size} tone={item.tone || tone} countUp={item.countUp !== false} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

StatRow.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.node.isRequired,
      caption: PropTypes.node,
      icon: PropTypes.node,
      tone: PropTypes.string,
      countUp: PropTypes.bool,
    })
  ).isRequired,
  columns: PropTypes.object,
  align: PropTypes.oneOf(["left", "center"]),
  divided: PropTypes.bool,
  size: PropTypes.oneOf(["md", "lg"]),
  tone: PropTypes.oneOf(["text", "accent", "metallic"]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Stat;
