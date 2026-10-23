import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Small facts about an item: a date, a time, a place, a coordinator. Each row
// is an icon and a value; a label, when given, is read by assistive
// technology and shown as a prefix.
export default function MetaList({ items, dense = false, columns = 1, sx }) {
  return (
    <Box
      component="dl"
      sx={[
        {
          m: 0,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: `repeat(${columns}, minmax(0, 1fr))` },
          columnGap: 3,
          rowGap: dense ? 0.75 : 1.25,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {items.filter(Boolean).map((item, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25, minWidth: 0 }}>
          <Box
            component="dt"
            aria-label={item.label}
            sx={(theme) => ({ display: "inline-flex", flexShrink: 0, mt: "2px", color: theme.vars.palette.accentText.main, "& > svg": { fontSize: 18 } })}
          >
            {item.icon}
          </Box>
          <Typography component="dd" variant="body2" sx={{ m: 0, minWidth: 0, overflowWrap: "anywhere", fontVariantNumeric: "tabular-nums" }}>
            {item.label && !item.hideLabel ? (
              <Box component="span" sx={(theme) => ({ color: theme.vars.palette.text.secondary })}>
                {item.label}{" "}
              </Box>
            ) : null}
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

MetaList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      label: PropTypes.string,
      hideLabel: PropTypes.bool,
      value: PropTypes.node,
    })
  ).isRequired,
  dense: PropTypes.bool,
  columns: PropTypes.oneOf([1, 2]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
