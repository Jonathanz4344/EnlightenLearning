import { motion } from "framer-motion";
import Box from "@mui/material/Box";

// A MUI Box that framer-motion can animate, so motion pieces keep `sx`.
const MotionBox = motion.create(Box);

export default MotionBox;
