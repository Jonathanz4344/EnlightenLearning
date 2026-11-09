import PropTypes from "prop-types";
import { fillVar, strokeVar } from "./shared";

// A firework: rays from the middle, each with a bright tip. Takes the names of
// two season colors, so the Fourth of July can use it too.
const RAYS = Array.from({ length: 14 }, (_, i) => (i / 14) * Math.PI * 2);

export const Burst = ({ color, tip }) => (
  <svg viewBox="-50 -50 100 100" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
    {RAYS.map((angle, i) => {
      const reach = i % 2 === 0 ? 44 : 34;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      return (
        <g key={angle}>
          <line x1={x * 10} y1={y * 10} x2={x * reach} y2={y * reach} style={strokeVar(color)} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx={x * (reach + 4)} cy={y * (reach + 4)} r="2.6" style={fillVar(tip)} />
        </g>
      );
    })}
  </svg>
);

Burst.propTypes = { color: PropTypes.string.isRequired, tip: PropTypes.string.isRequired };
