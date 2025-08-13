import React from "react";
import { Helmet } from "react-helmet-async";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Fade,
} from "@mui/material";
import { useMode } from "./Layout";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Hero() {
  const navigate = useNavigate();
  // Add fallback for when context is not available
  const { mode = 'light' } = useMode() || {};

  const carouselItems = [
    // {
    //   image: OrthoKHome,
    //   alt: "Orthokeratology treatment - overnight vision correction",
    //   title: "Ortho-K",
    //   subtitle: "Overnight Vision Correction",
    //   description:
    //     "Experience clear vision without daytime contacts or glasses. Ortho-K gently reshapes your eyes overnight, offering freedom and comfort all day long.",
    //   buttonText: "Learn More",
    //   link: "/orthok",
    // },

    // {
    //   image: RfHome,
    //   alt: "Radiofrequency treatment for skin rejuvenation",
    //   title: "RF Treatment",
    //   subtitle: "Advanced Skin Rejuvenation",
    //   description:
    //     "Rejuvenate your skin and eye area with advanced radiofrequency treatment, reducing fine lines and improving skin texture.",
    //   buttonText: "Discover RF",
    //   link: "/rf",
    // },
    // {
    //   image: IplHome,
    //   alt: "Intense Pulsed Light therapy for dry eye treatment",
    //   title: "IPL Therapy",
    //   subtitle: "Dry Eye Relief",
    //   description:
    //     "Effective relief for chronic dry eyes with cutting-edge Intense Pulsed Light therapy, addressing the root cause of your symptoms.",
    //   buttonText: "See IPL Benefits",
    //   link: "/ipl",
    // },
    // {
    //   image: VtHome,
    //   alt: "Vision Therapy programs for improved visual performance",
    //   title: "Vision Therapy",
    //   subtitle: "Visual Performance Enhancement",
    //   description: "Customized programs to enhance vision skills, eye coordination, and visual processing for both children and adults.",
    //   buttonText: "Find Out More",
    //   link: "/visiontherapy",
    // },
  ];

  // Generate structured data for carousel
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": carouselItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": item.title,
        "description": item.description,
        "url": `https://citywideeyecare.com${item.link}`,
        "image": `https://citywideeyecare.com${item.image}`
      }
    }))
  };

  return (
    <React.Fragment>


      <Box
        component="header"
        id="hero"
        sx={{
          width: "100%",
          pt: { xs: 11, sm: 10, md: 12 },
          pb: { xs: 3, md: 0 },
          overflow: "hidden",
          backgroundColor: mode === "dark" ? "#121212" : "#FFFFFF",
        }}
      >

      </Box>
    </React.Fragment>
  );
}