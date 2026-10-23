import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { layout, type } from "../theme/tokens";

// Running text at a comfortable measure, with spacing for paragraphs and lists.
export default function Prose({ children, size = "body1", component = "div", sx, ...rest }) {
  const face = type[size];
  return (
    <Box
      component={component}
      sx={[
        (theme) => ({
          maxWidth: `${layout.prose}ch`,
          fontSize: face.size,
          lineHeight: face.lineHeight,
          textWrap: "pretty",
          "& p": { m: 0 },
          "& p + p": { mt: "1em" },
          "& ul, & ol": { m: "1em 0 0", pl: "1.25em" },
          "& li + li": { mt: "0.4em" },
          "& a": { color: theme.vars.palette.accentText.main },
          "& strong": { fontWeight: 600 },
          "& h2, & h3, & h4": { mt: "1.6em", mb: "0.5em" },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Box>
  );
}

Prose.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(["body1", "body2", "lead"]),
  component: PropTypes.elementType,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
