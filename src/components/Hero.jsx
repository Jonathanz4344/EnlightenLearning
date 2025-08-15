import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { useMode } from "./Layout";
import { useNavigate } from "react-router-dom";
import {
  ArrowForward as ArrowForwardIcon,
  Instagram as InstagramIcon,
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerIcon,
  School as LearnIcon,
  Public as WorldIcon,
  AutoAwesome as SparkleIcon,
} from "@mui/icons-material";

// Instagram Embed Component
const InstagramEmbed = ({ url, isLatest = false }) => {
  return (
    <Fade in timeout={1400}>
      <Box sx={{ position: 'relative' }}>
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={`${url}/?utm_source=ig_embed&utm_campaign=loading`}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '540px',
            minWidth: '326px',
            padding: 0,
            width: '99.375%'
          }}
        />
      </Box>
    </Fade>
  );
};

export default function Hero() {
  const navigate = useNavigate();
  const { mode = 'light' } = useMode() || {};
  const isDarkMode = mode === "dark";

  // Instagram post URLs - Easy to manage!
  const instagramPosts = [
    {
      url: "https://www.instagram.com/p/DNY6nGsvjRr",
      isLatest: true
    },
    {
      url: "https://www.instagram.com/p/DIugjbzvqa0",
      isLatest: false
    },
    {
      url: "https://www.instagram.com/p/DEvT6yEvrEh",
      isLatest: false
    },
  ];

  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);

    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

    return () => {
      const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Enlighten Learning - Learn with Joy, Give with Passion, Change the World</title>
        <meta name="description" content="Join our mission to learn with joy, give with passion, and change the world through community service and education." />
      </Helmet>

      <Box
        component="header"
        id="hero"
        sx={{
          width: "100%",
          pt: { xs: 8, sm: 10, md: 12 },
          pb: { xs: 6, md: 8 },
          overflow: "hidden",
          background: isDarkMode
            ? 'radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
            : 'radial-gradient(ellipse at top, #f8faff 0%, #e3f2fd 50%, #ffffff 100%)',
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Background decorative elements */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 20%, #4CAF50 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, #E91E63 0%, transparent 50%),
            radial-gradient(circle at 40% 90%, #2196F3 0%, transparent 50%)
          `,
          zIndex: 0
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Hero Section */}
          <Fade in timeout={800}>
            <Box sx={{
              textAlign: 'center',
              mb: { xs: 8, md: 12 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 4, md: 6 }
            }}>

              {/* Floating badge */}
              <Card sx={{
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(255, 183, 77, 0.15), rgba(255, 193, 7, 0.15))'
                  : 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1))',
                backdropFilter: 'blur(10px)',
                border: isDarkMode ? '1px solid rgba(255, 183, 77, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                borderRadius: 8,
                boxShadow: isDarkMode
                  ? '0 8px 32px rgba(255, 183, 77, 0.1)'
                  : '0 8px 32px rgba(255, 193, 7, 0.1)',
              }}>
                <CardContent sx={{ py: 2, px: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SparkleIcon sx={{ color: '#FFB74D', fontSize: 24 }} />
                  <Typography sx={{
                    fontWeight: 600,
                    color: isDarkMode ? '#FFB74D' : '#F57C00',
                    fontSize: '1.1rem'
                  }}>
                    Fundraising for a Good Cause
                  </Typography>
                  <SparkleIcon sx={{ color: '#FFB74D', fontSize: 24 }} />
                </CardContent>
              </Card>

              {/* Main heading with better hierarchy */}
              <Box sx={{ maxWidth: '900px' }}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem', lg: '6rem' },
                    lineHeight: 1,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                    textShadow: 'none',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Learn • Give • Change
                </Typography>

                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 400,
                    color: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                    mb: 5,
                    lineHeight: 1.4,
                    maxWidth: '700px',
                    mx: 'auto',
                  }}
                >
                  Join our community of learners and changemakers creating positive impact through education and compassionate action.
                </Typography>
              </Box>

              {/* Mission pillars */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: { xs: 3, sm: 4 },
                maxWidth: '800px',
                width: '100%',
                mb: 6
              }}>
                {[
                  { icon: LearnIcon, title: 'Learn with Joy', color: '#4CAF50', desc: 'Discover knowledge that inspires' },
                  { icon: FavoriteIcon, title: 'Give with Passion', color: '#E91E63', desc: 'Share your heart with others' },
                  { icon: WorldIcon, title: 'Change the World', color: '#2196F3', desc: 'Create lasting positive impact' }
                ].map((pillar, index) => (
                  <Card key={index} sx={{
                    background: isDarkMode
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    border: isDarkMode ? 'none' : '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 4,
                    p: 3,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${pillar.color}20`,
                    }
                  }}>
                    <pillar.icon sx={{
                      fontSize: 48,
                      color: pillar.color,
                      mb: 2,
                      filter: `drop-shadow(0 4px 8px ${pillar.color}40)`
                    }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: pillar.color }}>
                      {pillar.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pillar.desc}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </Box>
          </Fade>

          <Divider sx={{
            my: { xs: 8, md: 12 },
            opacity: 0.2,
            background: isDarkMode
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)'
          }} />

          {/* Instagram Posts Section */}
          <Fade in timeout={1200}>
            <Box sx={{ textAlign: 'center' }}>
              {/* Section Header */}
              <Box sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
                  <InstagramIcon sx={{
                    fontSize: { xs: 40, md: 50 },
                    color: '#E4405F',
                    filter: 'drop-shadow(0 4px 8px rgba(228, 64, 95, 0.3))'
                  }} />
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontWeight: 800,
                      color: '#E4405F',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                    }}
                  >
                    Follow Our Journey
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    mb: 4
                  }}
                >
                  Stay connected with our latest updates, events, and community impact stories on Instagram!
                </Typography>
              </Box>

              {/* Instagram Embeds */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                maxWidth: '600px',
                mx: 'auto',
                '& .instagram-media': {
                  margin: '0 auto !important',
                  borderRadius: '12px !important',
                  overflow: 'hidden',
                  boxShadow: isDarkMode
                    ? '0 20px 60px rgba(228, 64, 95, 0.2)'
                    : '0 10px 40px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: isDarkMode
                      ? '0 30px 80px rgba(228, 64, 95, 0.3)'
                      : '0 20px 60px rgba(0,0,0,0.15)',
                  }
                }
              }}>
                {/* Render Instagram Posts */}
                {instagramPosts.map((post, index) => (
                  <InstagramEmbed
                    key={index}
                    url={post.url}
                    isLatest={post.isLatest}
                  />
                ))}
              </Box>

              {/* Follow Button */}
              <Box sx={{ mt: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<InstagramIcon />}
                  href="https://www.instagram.com/enlighten_learning/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #E4405F 30%, #F56040 90%)',
                    boxShadow: '0 8px 32px rgba(228, 64, 95, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #C13584 30%, #E4405F 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(228, 64, 95, 0.4)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Follow @enlighten_learning
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
    </React.Fragment>
  );
} 