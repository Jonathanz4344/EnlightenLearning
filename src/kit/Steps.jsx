import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stagger, StaggerItem } from "../motion";

// Numbered steps with a hairline running between them.
export default function Steps({ items, direction = "column", sx }) {
  const horizontal = direction === "row";
  return (
    <Stagger
      component="ol"
      sx={[
        {
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gridTemplateColumns: horizontal ? { xs: "1fr", md: `repeat(${items.length}, minmax(0, 1fr))` } : "1fr",
          gap: horizontal ? { xs: 3, md: 4 } : 0,
          counterReset: "step",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {items.map((step, i) => (
        <StaggerItem
          key={step.title || i}
          component="li"
          sx={(theme) => ({
            position: "relative",
            display: "flex",
            gap: 2.5,
            pb: horizontal ? 0 : i === items.length - 1 ? 0 : 4,
            "&::before": horizontal
              ? undefined
              : {
                  content: '""',
                  position: "absolute",
                  left: 19,
                  top: 40,
                  bottom: 0,
                  width: "1px",
                  backgroundColor: i === items.length - 1 ? "transparent" : theme.vars.palette.hairline.strong,
                },
          })}
        >
          <Box
            aria-hidden="true"
            sx={(theme) => ({
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontVariantNumeric: "tabular-nums",
              fontWeight: 600,
              fontSize: "0.9375rem",
              backgroundColor: theme.vars.palette.surface.paper,
              border: `1px solid ${theme.vars.palette.hairline.strong}`,
              color: theme.vars.palette.accentText.main,
            })}
          >
            {step.icon || i + 1}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, pt: 0.75 }}>
            <Typography variant="h6" component="h3">
              {step.title}
            </Typography>
            {step.description && (
              <Typography variant="body2" sx={(theme) => ({ color: theme.vars.palette.text.secondary, textWrap: "pretty" })}>
                {step.description}
              </Typography>
            )}
            {step.children}
          </Box>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

Steps.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      description: PropTypes.node,
      icon: PropTypes.node,
      children: PropTypes.node,
    })
  ).isRequired,
  direction: PropTypes.oneOf(["column", "row"]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
