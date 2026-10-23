import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { animate, useInView } from "framer-motion";
import useMotionOk from "./useMotionOk";
import splitNumber from "./splitNumber";
import { duration, easing } from "../theme/tokens";

// Counts a number up from zero when it scrolls into view. Pass the display
// string you would have written ("300+", "$8.5k", "200+") and it is split into
// prefix, number and suffix so the final text is exactly that string.

export default function CountUp({ value, length = duration.countUp, delay = 0, ...rest }) {
  const ok = useMotionOk();
  const parts = splitNumber(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [current, setCurrent] = useState(ok && parts ? 0 : parts ? parts.value : 0);

  useEffect(() => {
    if (!ok || !parts || !inView) return undefined;
    const controls = animate(0, parts.value, {
      duration: length / 1000,
      delay,
      ease: easing.enterArray,
      onUpdate: (v) => setCurrent(v),
    });
    return () => controls.stop();
    // The value string is the only input that should restart the count
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ok, inView, value]);

  if (!parts) return <span {...rest}>{value}</span>;
  const shown = ok ? current : parts.value;
  const formatted = parts.grouped
    ? shown.toLocaleString("en-US", { minimumFractionDigits: parts.decimals, maximumFractionDigits: parts.decimals })
    : shown.toFixed(parts.decimals);
  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }} {...rest}>
      {parts.prefix}
      {formatted}
      {parts.suffix}
    </span>
  );
}

CountUp.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  length: PropTypes.number,
  delay: PropTypes.number,
};
