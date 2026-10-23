import { forwardRef } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Magnetic } from "../motion";
import { duration, easing } from "../theme/tokens";

// A button that is a router link (`to`), an external link (`href`) or a
// plain button (`onClick`). `arrow` adds the forward arrow that nudges on
// hover. `magnetic` makes it lean toward the pointer (primary calls to action).
const ActionButton = forwardRef(function ActionButton(
  { to, href, external = false, arrow = false, magnetic = false, children, variant = "contained", color = "primary", endIcon, sx, ...rest },
  ref
) {
  const linkProps = to
    ? { component: RouterLink, to }
    : href
      ? { component: "a", href, ...(external && { target: "_blank", rel: "noopener noreferrer" }) }
      : {};
  const button = (
    <Button
      ref={ref}
      variant={variant}
      color={color}
      endIcon={arrow ? <ArrowForwardRoundedIcon className="el-arrow" /> : endIcon}
      sx={[
        {
          "& .el-arrow": { transition: `transform ${duration.base}ms ${easing.standard}` },
          "@media (hover: hover)": { "&:hover .el-arrow": { transform: "translateX(3px)" } },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...linkProps}
      {...rest}
    >
      {children}
    </Button>
  );
  return magnetic ? <Magnetic>{button}</Magnetic> : button;
});

ActionButton.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  external: PropTypes.bool,
  arrow: PropTypes.bool,
  magnetic: PropTypes.bool,
  children: PropTypes.node,
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  color: PropTypes.string,
  endIcon: PropTypes.node,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default ActionButton;
