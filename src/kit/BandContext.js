import { createContext, useContext } from "react";

// Which kind of band a component sits on. Pieces like Eyebrow and
// SectionHeading pick lighter colors on an ink band.
const BandContext = createContext("page");

export const useBand = () => useContext(BandContext);

export default BandContext;
