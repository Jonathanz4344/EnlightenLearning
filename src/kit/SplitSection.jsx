import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Reveal } from "../motion";

// A picture beside words. The picture goes first in the markup unless
// `reverse` is set; on phones the picture always sits above the words.
export default function SplitSection({ media, children, reverse = false, align = "center", mediaSpan = 6, gap, sx }) {
  const wordsSpan = 12 - mediaSpan;
  return (
    <Box
      sx={[
        {
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(12, minmax(0, 1fr))" },
          gap: gap || { xs: 4, md: 8 },
          alignItems: align === "center" ? "center" : "start",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Reveal
        sx={{
          gridColumn: { xs: "1 / -1", md: reverse ? `${wordsSpan + 1} / span ${mediaSpan}` : `1 / span ${mediaSpan}` },
          gridRow: { xs: 1, md: 1 },
        }}
      >
        {media}
      </Reveal>
      <Reveal
        delay={0.1}
        sx={{
          gridColumn: { xs: "1 / -1", md: reverse ? `1 / span ${wordsSpan}` : `${mediaSpan + 1} / span ${wordsSpan}` },
          gridRow: { xs: 2, md: 1 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </Reveal>
    </Box>
  );
}

SplitSection.propTypes = {
  media: PropTypes.node.isRequired,
  children: PropTypes.node,
  reverse: PropTypes.bool,
  align: PropTypes.oneOf(["center", "start"]),
  mediaSpan: PropTypes.oneOf([4, 5, 6, 7, 8]),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
