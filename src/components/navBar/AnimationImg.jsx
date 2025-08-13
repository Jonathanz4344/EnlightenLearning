import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";

const AnimationImg = (props) => {
  const { ref: ref, inView: inView } = useInView();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "auto",
      }}
    >
      <Box
        component="img"
        src={props.imgURL} // Replace with your image URL
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          opacity: inView ? 1 : 0,
          transform: inView
            ? props.left
              ? "translate(-15px, -15px)"
              : "translate(15px, -15px)"
            : "translate(0, 0)",
          transition: "opacity 1s ease, transform 1s ease",
          zIndex: 2,
          position: "relative",
        }}
        ref={ref}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "calc(100% - 5px)", // Adjust according to the border width
          height: "calc(100% - 10px)", // Adjust according to the border width
          borderRadius: "8px",
          border: inView ? "5px solid #48D1CC" : "5px solid rgba(0, 0, 0, 0)",
          transition: "border 1s ease",
          pointerEvents: "none",
          zIndex: 1,
          margin: "5px",
        }}
      />
    </Box>
  );
};

export default AnimationImg;
