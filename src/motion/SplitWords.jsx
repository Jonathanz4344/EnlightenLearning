import PropTypes from "prop-types";
import { motion } from "framer-motion";
import useMotionOk from "./useMotionOk";
import { duration, easing } from "../theme/tokens";

// A title that blurs in one word at a time. The text content is unchanged:
// each word becomes an inline span, spaces are kept, and nothing is hidden
// under reduced motion.

const word = {
  hidden: { opacity: 0, y: "0.35em", filter: "blur(8px)" },
  show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: duration.reveal / 1000, ease: easing.enterArray } },
};

export default function SplitWords({ text, delay = 0, gap = 0.06 }) {
  const ok = useMotionOk();
  if (!ok) return text;
  const words = String(text).split(/(\s+)/);
  return (
    <motion.span
      style={{ display: "inline" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      initial="hidden"
      animate="show"
    >
      {words.map((part, i) =>
        /^\s+$/.test(part) ? (
          <span key={i}>{part}</span>
        ) : (
          <motion.span key={i} variants={word} style={{ display: "inline-block", willChange: "transform, opacity, filter" }}>
            {part}
          </motion.span>
        )
      )}
    </motion.span>
  );
}

SplitWords.propTypes = {
  text: PropTypes.string.isRequired,
  delay: PropTypes.number,
  gap: PropTypes.number,
};
