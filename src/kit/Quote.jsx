import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Surface from "./Surface";
import { fonts } from "../theme/tokens";

// A testimonial or review. The quotation mark is set in the display face.
export default function Quote({ text, author, role, organization, avatar, avatarAlt, tone = "paper", size = "md", children, sx }) {
  return (
    <Surface tone={tone} padding={size === "lg" ? { xs: 3, md: 5 } : 3} sx={[{ display: "flex", flexDirection: "column", gap: 2.5, height: "100%" }, ...(Array.isArray(sx) ? sx : [sx])]} component="figure">
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          fontFamily: fonts.display,
          fontSize: size === "lg" ? "4rem" : "3rem",
          lineHeight: 0.6,
          height: size === "lg" ? "1.6rem" : "1.2rem",
          color: theme.vars.palette.metallic.main,
          fontStyle: "italic",
          userSelect: "none",
        })}
      >
        &ldquo;
      </Box>
      <Typography
        component="blockquote"
        variant={size === "lg" ? "subtitle1" : "body1"}
        sx={{ m: 0, textWrap: "pretty", ...(size === "lg" && { fontFamily: fonts.display, fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", lineHeight: 1.45 }) }}
      >
        {text}
      </Typography>
      {children}
      {(author || organization) && (
        <Box component="figcaption" sx={{ mt: "auto", display: "flex", alignItems: "center", gap: 1.5 }}>
          {avatar && <Avatar src={avatar} alt={avatarAlt || ""} sx={{ width: 44, height: 44 }} />}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {author && (
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {author}
              </Typography>
            )}
            {(role || organization) && (
              <Typography variant="caption" sx={(theme) => ({ color: theme.vars.palette.text.secondary })}>
                {[role, organization].filter(Boolean).join(", ")}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Surface>
  );
}

Quote.propTypes = {
  text: PropTypes.node.isRequired,
  author: PropTypes.node,
  role: PropTypes.node,
  organization: PropTypes.node,
  avatar: PropTypes.string,
  avatarAlt: PropTypes.string,
  tone: PropTypes.oneOf(["paper", "tint", "sunken", "canvas"]),
  size: PropTypes.oneOf(["md", "lg"]),
  children: PropTypes.node,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
