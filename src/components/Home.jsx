import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Hero from "./Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        <Divider />

      </Box>
    </>
  );
}
