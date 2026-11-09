import PropTypes from "prop-types";
import { fillVar, strokeVar } from "./shared";

// The twelve animals of the lunar calendar as paper-cut faces: gold on the red
// of a medallion, with the features cut out of the gold. One style for all
// twelve, drawn in the same 100 by 100 box, so a year's animal is told from the
// last by its ears, horns and muzzle. Which animal shows comes from the date
// (zodiacFor in src/constants/season.js).

const G = fillVar("gold");
const C = fillVar("cream");
const R = fillVar("red-deep");
const P = fillVar("pink");

const Eye = ({ x, y, r = 3.2 }) => (
  <>
    <circle cx={x} cy={y} r={r} style={R} />
    <circle cx={x + r * 0.34} cy={y - r * 0.36} r={r * 0.32} style={C} />
  </>
);

Eye.propTypes = { x: PropTypes.number.isRequired, y: PropTypes.number.isRequired, r: PropTypes.number };

const cut = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
const CUT = strokeVar("red-deep");
const GOLD_LINE = strokeVar("gold");
const CREAM_LINE = strokeVar("cream");
const DEEP_LINE = strokeVar("gold-deep");

const FACES = {
  rat: (
    <>
      <circle cx="29" cy="35" r="13.5" style={G} />
      <circle cx="71" cy="35" r="13.5" style={G} />
      <circle cx="29" cy="35" r="7.5" style={P} />
      <circle cx="71" cy="35" r="7.5" style={P} />
      <path d="M50 84C40 80 27 69 27 55C27 43 37 35 50 35C63 35 73 43 73 55C73 69 60 80 50 84Z" style={G} />
      <path d="M37 69L19 65M37 72L19 75M63 69L81 65M63 72L81 75" style={GOLD_LINE} strokeWidth="1.7" strokeLinecap="round" />
      <Eye x={41} y={55} />
      <Eye x={59} y={55} />
      <ellipse cx="50" cy="71" rx="3.8" ry="2.9" style={R} />
      <rect x="47.3" y="75.2" width="5.4" height="5.2" rx="1.2" style={C} />
      <path d="M50 75.4V80" style={CUT} strokeWidth="0.8" />
    </>
  ),
  ox: (
    <>
      <path d="M33 41C22 39 15 31 17 20C22 28 29 32 38 34Z" style={C} />
      <path d="M67 41C78 39 85 31 83 20C78 28 71 32 62 34Z" style={C} />
      <ellipse cx="24" cy="50" rx="9.5" ry="5" transform="rotate(-18 24 50)" style={G} />
      <ellipse cx="76" cy="50" rx="9.5" ry="5" transform="rotate(18 76 50)" style={G} />
      <path d="M50 85C36 85 28 75 28 61C28 45 36 36 50 36C64 36 72 45 72 61C72 75 64 85 50 85Z" style={G} />
      <path d="M43 39Q50 29 57 39Q50 44 43 39Z" style={G} />
      <ellipse cx="50" cy="70" rx="15.5" ry="11" style={C} />
      <ellipse cx="44" cy="69" rx="2.5" ry="3.3" style={R} />
      <ellipse cx="56" cy="69" rx="2.5" ry="3.3" style={R} />
      <path d="M45 76.5Q50 82 55 76.5" {...cut} style={DEEP_LINE} strokeWidth="2" />
      <Eye x={40} y={53} />
      <Eye x={60} y={53} />
    </>
  ),
  tiger: (
    <>
      <circle cx="30" cy="34" r="9.5" style={G} />
      <circle cx="70" cy="34" r="9.5" style={G} />
      <circle cx="30" cy="34" r="4.6" style={R} />
      <circle cx="70" cy="34" r="4.6" style={R} />
      <circle cx="50" cy="57" r="26.5" style={G} />
      <path d="M45 39H55M46 44.5H54M45 50H55M50 39V50" style={CUT} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M23.8 53L34 55.5L24.4 60Z" style={R} />
      <path d="M25.6 64L35 64.6L28.6 70.4Z" style={R} />
      <path d="M76.2 53L66 55.5L75.6 60Z" style={R} />
      <path d="M74.4 64L65 64.6L71.4 70.4Z" style={R} />
      <ellipse cx="50" cy="70" rx="13.5" ry="9.5" style={C} />
      <path d="M45.8 64.5H54.2L50 69Z" style={R} />
      <path d="M50 69V72.5M50 72.5Q46.3 76.4 43.2 73M50 72.5Q53.7 76.4 56.8 73" {...cut} style={CUT} strokeWidth="1.6" />
      <Eye x={40} y={56} r={3.4} />
      <Eye x={60} y={56} r={3.4} />
    </>
  ),
  rabbit: (
    <>
      <ellipse cx="39.5" cy="28" rx="7.6" ry="22" transform="rotate(-9 39.5 28)" style={G} />
      <ellipse cx="60.5" cy="28" rx="7.6" ry="22" transform="rotate(9 60.5 28)" style={G} />
      <ellipse cx="39.5" cy="29" rx="3.3" ry="15" transform="rotate(-9 39.5 29)" style={P} />
      <ellipse cx="60.5" cy="29" rx="3.3" ry="15" transform="rotate(9 60.5 29)" style={P} />
      <ellipse cx="50" cy="63" rx="23.5" ry="21" style={G} />
      <circle cx="33.5" cy="69" r="4.2" style={P} opacity="0.8" />
      <circle cx="66.5" cy="69" r="4.2" style={P} opacity="0.8" />
      <Eye x={40.5} y={60} r={3.4} />
      <Eye x={59.5} y={60} r={3.4} />
      <path d="M47.4 66.5H52.6L50 69.6Z" style={R} />
      <path d="M50 69.6V72M50 72Q47 75.2 44.4 72.6M50 72Q53 75.2 55.6 72.6" {...cut} style={CUT} strokeWidth="1.5" />
      <rect x="48.1" y="73.4" width="3.8" height="4.4" rx="1.1" style={C} />
    </>
  ),
  dragon: (
    <>
      <g fill="none" style={CREAM_LINE} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M41 38C37 30 35 24 31 17M36.5 28C32.5 27 29.5 25 26 25" />
        <path d="M59 38C63 30 65 24 69 17M63.5 28C67.5 27 70.5 25 74 25" />
      </g>
      <path d="M29 47L18 44L26 53L16 56L26 61L19 68L30 69Z" style={G} />
      <path d="M71 47L82 44L74 53L84 56L74 61L81 68L70 69Z" style={G} />
      <path d="M50 83C38 83 30 75 29 64C28 50 37 38 50 38C63 38 72 50 71 64C70 75 62 83 50 83Z" style={G} />
      <g fill="none" style={GOLD_LINE} strokeWidth="2.2" strokeLinecap="round">
        <path d="M37 71C29 72 24 76 23 83" />
        <path d="M63 71C71 72 76 76 77 83" />
      </g>
      <g fill="none" style={CREAM_LINE} strokeWidth="2.6" strokeLinecap="round">
        <path d="M35.5 50Q41 45 46.5 50" />
        <path d="M53.5 50Q59 45 64.5 50" />
      </g>
      <Eye x={41} y={55} />
      <Eye x={59} y={55} />
      <ellipse cx="50" cy="71" rx="14" ry="9.5" style={C} />
      <circle cx="45" cy="68.5" r="1.9" style={R} />
      <circle cx="55" cy="68.5" r="1.9" style={R} />
      <path d="M41 74.5Q50 80.5 59 74.5" {...cut} style={CUT} strokeWidth="1.6" />
      <path d="M44.5 76.3L46.4 79.6L48.2 77.2ZM55.5 76.3L53.6 79.6L51.8 77.2Z" style={G} />
    </>
  ),
  snake: (
    <>
      <path d="M52 84C30 86 19 74 24 63C28 54 42 53 54 57C66 61 73 67 68 75C64 81 55 80 53 76" fill="none" style={GOLD_LINE} strokeWidth="11.5" strokeLinecap="round" />
      <path d="M33 61C28 49 32 37 44 33" fill="none" style={GOLD_LINE} strokeWidth="10.5" strokeLinecap="round" />
      <g style={R}>
        <circle cx="31" cy="71" r="1.7" />
        <circle cx="42" cy="79.5" r="1.7" />
        <circle cx="55" cy="62" r="1.7" />
        <circle cx="33" cy="48" r="1.7" />
      </g>
      <ellipse cx="52" cy="30" rx="13" ry="10" transform="rotate(-8 52 30)" style={G} />
      <path d="M64 31L72 32L76 28.5M72 32L76 35.5" fill="none" style={CREAM_LINE} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <Eye x={48} y={27.5} r={2.5} />
      <Eye x={58} y={26.5} r={2.5} />
      <path d="M49 34.5Q54 37 59 34" {...cut} style={CUT} strokeWidth="1.3" />
    </>
  ),
  horse: (
    <>
      <path d="M38 30C25 33 21 50 25 68C27 59 30 52 35 48Z" style={C} />
      <path d="M38 35L34 17L47 28Z" style={{ ...G, ...GOLD_LINE }} strokeWidth="2" strokeLinejoin="round" />
      <path d="M62 35L66 17L53 28Z" style={{ ...G, ...GOLD_LINE }} strokeWidth="2" strokeLinejoin="round" />
      <path d="M38.6 30L37 22.5L42.5 27.2Z" style={R} />
      <path d="M61.4 30L63 22.5L57.5 27.2Z" style={R} />
      <path d="M50 87C42 87 38 81 38 73C38 65 34 59 34 49C34 36 41 28 50 28C59 28 66 36 66 49C66 59 62 65 62 73C62 81 58 87 50 87Z" style={G} />
      <path d="M44 30Q50 21 56 30Q54.5 40 50 45Q45.5 40 44 30Z" style={C} />
      <Eye x={40.5} y={52} r={3} />
      <Eye x={59.5} y={52} r={3} />
      <ellipse cx="45.3" cy="77" rx="2" ry="2.9" style={R} />
      <ellipse cx="54.7" cy="77" rx="2" ry="2.9" style={R} />
      <path d="M45.5 82.5Q50 85 54.5 82.5" {...cut} style={CUT} strokeWidth="1.4" />
    </>
  ),
  goat: (
    <>
      <path d="M41 37C35 25 26 20 16 26C24 27 31 33 35 43Z" style={C} />
      <path d="M59 37C65 25 74 20 84 26C76 27 69 33 65 43Z" style={C} />
      <ellipse cx="26" cy="51" rx="9.5" ry="4.6" transform="rotate(16 26 51)" style={G} />
      <ellipse cx="74" cy="51" rx="9.5" ry="4.6" transform="rotate(-16 74 51)" style={G} />
      <path d="M45 78Q50 93 55 78Z" style={C} />
      <path d="M50 81C42 81 38 73 36 63C34 50 38 38 50 38C62 38 66 50 64 63C62 73 58 81 50 81Z" style={G} />
      <Eye x={42} y={55} r={3} />
      <Eye x={58} y={55} r={3} />
      <path d="M47 68.5H53L50 72Z" style={R} />
      <path d="M50 72V74.4M46.5 75.4Q50 77.6 53.5 75.4" {...cut} style={CUT} strokeWidth="1.4" />
    </>
  ),
  monkey: (
    <>
      <circle cx="23" cy="56" r="9.8" style={G} />
      <circle cx="77" cy="56" r="9.8" style={G} />
      <circle cx="23" cy="56" r="5" style={C} />
      <circle cx="77" cy="56" r="5" style={C} />
      <path d="M46 30Q50 22 54 30Q50 34 46 30Z" style={G} />
      <circle cx="50" cy="55" r="26.5" style={G} />
      <path d="M50 44C46 38 34 38 33 49C32 58 38 60 38 65C38 73 44 78 50 78C56 78 62 73 62 65C62 60 68 58 67 49C66 38 54 38 50 44Z" style={C} />
      <Eye x={42} y={55} />
      <Eye x={58} y={55} />
      <circle cx="48" cy="63" r="1.2" style={R} />
      <circle cx="52" cy="63" r="1.2" style={R} />
      <path d="M43 68Q50 74.5 57 68" {...cut} style={CUT} strokeWidth="1.8" />
    </>
  ),
  rooster: (
    <>
      <path d="M30 66L34 81L40 72L44 85L50 75L56 85L60 72L66 81L70 66Z" style={{ ...G, ...GOLD_LINE }} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="41.5" cy="30" r="6.6" style={C} />
      <circle cx="50" cy="25.5" r="7.8" style={C} />
      <circle cx="58.5" cy="30" r="6.6" style={C} />
      <circle cx="50" cy="54" r="22.5" style={G} />
      <path d="M46.6 69C42.6 74 44.4 80.4 48.4 79.4C50.4 76.4 49.6 72 48.6 69Z" style={C} />
      <path d="M53.4 69C57.4 74 55.6 80.4 51.6 79.4C49.6 76.4 50.4 72 51.4 69Z" style={C} />
      <path d="M50 56L57.5 61.5L50 70L42.5 61.5Z" style={{ ...C, ...DEEP_LINE }} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M43.5 61.6H56.5" style={DEEP_LINE} strokeWidth="0.9" />
      <Eye x={40} y={50} />
      <Eye x={60} y={50} />
    </>
  ),
  dog: (
    <>
      <path d="M50 83C36 83 28 73 28 59C28 45 38 35 50 35C62 35 72 45 72 59C72 73 64 83 50 83Z" style={G} />
      <path d="M31 36C20 38 17 55 23 68C30 63 35 55 36 45Z" style={C} />
      <path d="M69 36C80 38 83 55 77 68C70 63 65 55 64 45Z" style={C} />
      <ellipse cx="50" cy="68" rx="13.5" ry="10.5" style={C} />
      <path d="M47 73.5Q50 82 53 73.5Z" style={P} />
      <path d="M45.4 62.2Q50 60 54.6 62.2Q54 66.8 50 67.8Q46 66.8 45.4 62.2Z" style={R} />
      <path d="M50 67.8V70.6M50 70.6Q46.5 74 43.6 71.4M50 70.6Q53.5 74 56.4 71.4" {...cut} style={CUT} strokeWidth="1.5" />
      <Eye x={40.5} y={53} />
      <Eye x={59.5} y={53} />
      <circle cx="40.5" cy="45.5" r="1.7" style={C} />
      <circle cx="59.5" cy="45.5" r="1.7" style={C} />
    </>
  ),
  pig: (
    <>
      <path d="M31 41L24 24L43 33Z" style={{ ...G, ...GOLD_LINE }} strokeWidth="4" strokeLinejoin="round" />
      <path d="M69 41L76 24L57 33Z" style={{ ...G, ...GOLD_LINE }} strokeWidth="4" strokeLinejoin="round" />
      <path d="M31.4 36L28.6 28.6L36.6 32.4Z" style={P} />
      <path d="M68.6 36L71.4 28.6L63.4 32.4Z" style={P} />
      <circle cx="50" cy="57" r="26.5" style={G} />
      <circle cx="31.5" cy="65" r="4.3" style={P} opacity="0.8" />
      <circle cx="68.5" cy="65" r="4.3" style={P} opacity="0.8" />
      <ellipse cx="50" cy="64" rx="13.5" ry="10" style={C} />
      <ellipse cx="45.4" cy="64" rx="2.3" ry="3.3" style={R} />
      <ellipse cx="54.6" cy="64" rx="2.3" ry="3.3" style={R} />
      <path d="M44 77Q50 81 56 77" {...cut} style={CUT} strokeWidth="1.6" />
      <Eye x={38.5} y={51} r={3} />
      <Eye x={61.5} y={51} r={3} />
    </>
  ),
};

// The year's animal in its medallion: a gold-rimmed red disc, the way a paper
// cutting is hung in a window. It fills the box it is put in.
export default function ZodiacFace({ animal }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
      <circle cx="50" cy="50" r="48.5" style={fillVar("gold-deep")} />
      <circle cx="50" cy="50" r="46.6" style={G} />
      <circle cx="50" cy="50" r="43.4" style={fillVar("lantern")} />
      <circle cx="50" cy="50" r="40.4" fill="none" style={GOLD_LINE} strokeWidth="0.9" strokeDasharray="1.2 3.1" strokeLinecap="round" opacity="0.85" />
      <g transform="translate(50 52) scale(0.86) translate(-50 -55)">{FACES[animal]}</g>
    </svg>
  );
}

ZodiacFace.propTypes = {
  animal: PropTypes.oneOf(Object.keys(FACES)).isRequired,
};
