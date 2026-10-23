import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Surface from "./Surface";
import IconWell from "./IconWell";
import { radius } from "../theme/tokens";

// A team member: a framed portrait (or an icon when there is no photo), the
// name and their roles.
export default function PersonCard({ name, roles = [], image, imageAlt, icon, children, sx }) {
  return (
    <Surface padding={2.5} sx={[{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 2, height: "100%", width: "100%" }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {image ? (
        <Box
          sx={(theme) => ({
            width: "100%",
            maxWidth: 220,
            aspectRatio: "1 / 1",
            borderRadius: `${radius.lg}px`,
            overflow: "hidden",
            border: `1px solid ${theme.vars.palette.hairline.main}`,
            backgroundColor: theme.vars.palette.surface.sunken,
          })}
        >
          <Box component="img" src={image} alt={imageAlt || name} loading="lazy" decoding="async" sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </Box>
      ) : (
        <IconWell size="lg" tone="tint" round>
          {icon}
        </IconWell>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, alignItems: "center" }}>
        <Typography variant="h5" component="h3">
          {name}
        </Typography>
        {roles.map((role) => (
          <Typography key={role} variant="body2" sx={(theme) => ({ color: theme.vars.palette.text.secondary })}>
            {role}
          </Typography>
        ))}
      </Box>
      {children}
    </Surface>
  );
}

PersonCard.propTypes = {
  name: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.node),
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
