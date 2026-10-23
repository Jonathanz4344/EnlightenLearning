import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { KenBurns } from "../motion";
import { radius as radiusTokens } from "../theme/tokens";

// A framed picture. Photos use `cover`; brochures, covers, QR codes and
// diagrams use `contain` on a sunken surface so nothing is cropped. Every
// figure shares the same radius and hairline.
export default function Figure({
  src,
  alt,
  caption,
  fit = "cover",
  ratio = "4 / 3",
  radius = "lg",
  priority = false,
  kenBurns = false,
  sizes,
  srcSet,
  width,
  height,
  sx,
  imgSx,
  ...rest
}) {
  const frame = (theme) => ({
    position: "relative",
    overflow: "hidden",
    borderRadius: `${radiusTokens[radius]}px`,
    border: `1px solid ${theme.vars.palette.hairline.main}`,
    backgroundColor: fit === "contain" ? theme.vars.palette.surface.sunken : theme.vars.palette.surface.sunken,
    aspectRatio: ratio,
    width: "100%",
  });

  const picture = kenBurns ? (
    <KenBurns src={src} alt={alt} priority={priority} sizes={sizes} srcSet={srcSet} sx={frame} imgSx={imgSx} />
  ) : (
    <Box sx={frame}>
      <Box
        component="img"
        src={src}
        alt={alt}
        sizes={sizes}
        srcSet={srcSet}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        sx={[
          {
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: fit,
            ...(fit === "contain" && { padding: "6%", boxSizing: "border-box" }),
          },
          ...(Array.isArray(imgSx) ? imgSx : [imgSx]),
        ]}
      />
    </Box>
  );

  if (!caption) {
    return (
      <Box sx={sx} {...rest}>
        {picture}
      </Box>
    );
  }
  return (
    <Box component="figure" sx={[{ m: 0 }, ...(Array.isArray(sx) ? sx : [sx])]} {...rest}>
      {picture}
      <Typography variant="caption" component="figcaption" sx={(theme) => ({ display: "block", mt: 1.5, color: theme.vars.palette.text.secondary })}>
        {caption}
      </Typography>
    </Box>
  );
}

Figure.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  caption: PropTypes.node,
  fit: PropTypes.oneOf(["cover", "contain"]),
  ratio: PropTypes.string,
  radius: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  priority: PropTypes.bool,
  kenBurns: PropTypes.bool,
  sizes: PropTypes.string,
  srcSet: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
  imgSx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
