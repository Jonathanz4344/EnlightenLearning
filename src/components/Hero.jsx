import React, { useEffect, useState } from "react";
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
  Grid,
} from "@mui/material";
import { useMode } from "./Layout";
import { useNavigate } from "react-router-dom";
import {
  ArrowForward as ArrowForwardIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerIcon,
  School as LearnIcon,
  Public as WorldIcon,
  AutoAwesome as SparkleIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

// Instagram Embed Component
const InstagramEmbed = ({ url }) => {
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

// Facebook Embed Component
const FacebookEmbed = ({ src }) => {
  return (
    <Fade in timeout={1400}>
      <Box sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        mb: 4
      }}>
        <iframe
          src={src}
          width="500"
          height="645"
          style={{
            border: 'none',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </Box>
    </Fade>
  );
};

export default function Hero() {
  const navigate = useNavigate();
  const { mode = 'light' } = useMode() || {};
  const isDarkMode = mode === "dark";

  // State for controlling visibility of posts
  const [showAllInstagram, setShowAllInstagram] = useState(false);
  const [showAllFacebook, setShowAllFacebook] = useState(false);

  // Instagram post URLs - Easy to manage! (first one shows first)
  const instagramPosts = [
    "https://www.instagram.com/reel/DST6NLvDvD1",
    "https://www.instagram.com/p/DEvT6yEvrEh",
  ];

  // Facebook post URLs - Easy to manage! (first one shows first)
  const facebookPosts = [
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D122148676226892427%26set%3Da.122095675754892427%26type%3D3&show_text=true&width=500",
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D122130023210892427%26set%3Da.122096130290892427%26type%3D3&show_text=true&width=500",
  ];


  // Get visible posts based on state
  const visibleInstagramPosts = showAllInstagram ? instagramPosts : instagramPosts.slice(0, 3);
  const visibleFacebookPosts = showAllFacebook ? facebookPosts : facebookPosts.slice(0, 3);

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
  }, [instagramPosts.length]);

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

              {/* Enhanced Floating badge - Make this bigger and more prominent */}
              <Card sx={{
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(255, 183, 77, 0.25), rgba(255, 193, 7, 0.25))'
                  : 'linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.2))',
                backdropFilter: 'blur(15px)',
                border: isDarkMode ? '2px solid rgba(255, 183, 77, 0.4)' : '2px solid rgba(255, 193, 7, 0.4)',
                borderRadius: 16, // Increased from 8
                boxShadow: isDarkMode
                  ? '0 16px 48px rgba(255, 183, 77, 0.2), 0 4px 16px rgba(255, 183, 77, 0.1)'
                  : '0 16px 48px rgba(255, 193, 7, 0.2), 0 4px 16px rgba(255, 193, 7, 0.1)',
                transform: 'scale(1)', // Add hover effect
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05) translateY(-2px)',
                  boxShadow: isDarkMode
                    ? '0 20px 60px rgba(255, 183, 77, 0.3), 0 8px 24px rgba(255, 183, 77, 0.15)'
                    : '0 20px 60px rgba(255, 193, 7, 0.3), 0 8px 24px rgba(255, 193, 7, 0.15)',
                }
              }}>
                <CardContent sx={{
                  py: 3, // Increased from 2
                  px: 6, // Increased from 4
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3 // Increased from 2
                }}>
                  <SparkleIcon sx={{
                    color: '#FFB74D',
                    fontSize: 32, // Increased from 24
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.1)' },
                      '100%': { transform: 'scale(1)' }
                    }
                  }} />
                  <Typography sx={{
                    fontWeight: 700, // Increased from 600
                    color: isDarkMode ? '#FFB74D' : '#F57C00',
                    fontSize: '1.4rem', // Increased from '1.1rem'
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    letterSpacing: '0.5px'
                  }}>
                    Fundraising for a Good Cause
                  </Typography>
                  <SparkleIcon sx={{
                    color: '#FFB74D',
                    fontSize: 32, // Increased from 24
                    animation: 'pulse 2s infinite 0.5s', // Slight delay for alternating effect
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.1)' },
                      '100%': { transform: 'scale(1)' }
                    }
                  }} />
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
                  { icon: FavoriteIcon, title: 'Give with Passion', color: '#E91E63', desc: 'Support our charitable mission' },
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

          {/* Social Media Section Header */}
          <Fade in timeout={1200}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  background: 'linear-gradient(45deg, #E4405F, #1877F2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}
              >
                Follow Our Journey
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Stay connected with our latest updates, events, and community impact stories across our social media platforms!
              </Typography>
            </Box>
          </Fade>

          {/* Side-by-Side Social Media Posts */}
          <Fade in timeout={1400}>
            <Grid container spacing={4}>
              {/* Instagram Column */}
              <Grid item xs={12} lg={6}>
                <Box sx={{ textAlign: 'center' }}>
                  {/* Instagram Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
                    <InstagramIcon sx={{
                      fontSize: { xs: 35, md: 45 },
                      color: '#E4405F',
                      filter: 'drop-shadow(0 4px 8px rgba(228, 64, 95, 0.3))'
                    }} />
                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: '#E4405F',
                        fontSize: { xs: '1.8rem', md: '2.2rem' }
                      }}
                    >
                      Instagram
                    </Typography>
                  </Box>

                  {/* Instagram Posts */}
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    maxWidth: '550px',
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
                    {visibleInstagramPosts.map((url) => (
                      <InstagramEmbed
                        key={url}
                        url={url}
                      />
                    ))}
                  </Box>

                  {/* See More Button for Instagram */}
                  {!showAllInstagram && instagramPosts.length > 3 && (
                    <Box sx={{ mt: 4 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<ExpandMoreIcon />}
                        onClick={() => setShowAllInstagram(true)}
                        sx={{
                          py: 1.5,
                          px: 3,
                          fontSize: '1rem',
                          fontWeight: 600,
                          borderRadius: 3,
                          borderColor: '#E4405F',
                          color: '#E4405F',
                          '&:hover': {
                            borderColor: '#C13584',
                            backgroundColor: 'rgba(228, 64, 95, 0.05)',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        See More Posts
                      </Button>
                    </Box>
                  )}

                  {/* Follow Button for Instagram */}
                  <Box sx={{ mt: 4 }}>
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
              </Grid>

              {/* Facebook Column */}
              <Grid item xs={12} lg={6}>
                <Box sx={{ textAlign: 'center' }}>
                  {/* Facebook Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
                    <FacebookIcon sx={{
                      fontSize: { xs: 35, md: 45 },
                      color: '#1877F2',
                      filter: 'drop-shadow(0 4px 8px rgba(24, 119, 242, 0.3))'
                    }} />
                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: '#1877F2',
                        fontSize: { xs: '1.8rem', md: '2.2rem' }
                      }}
                    >
                      Facebook
                    </Typography>
                  </Box>

                  {/* Facebook Posts */}
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    maxWidth: '550px',
                    mx: 'auto',
                    '& iframe': {
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: isDarkMode
                          ? '0 30px 80px rgba(24, 119, 242, 0.3) !important'
                          : '0 20px 60px rgba(0,0,0,0.15) !important',
                      }
                    }
                  }}>
                    {visibleFacebookPosts.map((src, index) => (
                      <FacebookEmbed
                        key={index}
                        src={src}
                      />
                    ))}
                  </Box>

                  {/* See More Button for Facebook */}
                  {!showAllFacebook && facebookPosts.length > 3 && (
                    <Box sx={{ mt: 4 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<ExpandMoreIcon />}
                        onClick={() => setShowAllFacebook(true)}
                        sx={{
                          py: 1.5,
                          px: 3,
                          fontSize: '1rem',
                          fontWeight: 600,
                          borderRadius: 3,
                          borderColor: '#1877F2',
                          color: '#1877F2',
                          '&:hover': {
                            borderColor: '#166FE5',
                            backgroundColor: 'rgba(24, 119, 242, 0.05)',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        See More Posts
                      </Button>
                    </Box>
                  )}

                  {/* Follow Button for Facebook */}
                  <Box sx={{ mt: 4 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<FacebookIcon />}
                      href="https://www.facebook.com/share/16yVvBdfyz/?mibextid=wwXIfr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        py: 2,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #1877F2 30%, #42A5F5 90%)',
                        boxShadow: '0 8px 32px rgba(24, 119, 242, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #166FE5 30%, #1877F2 90%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px rgba(24, 119, 242, 0.4)',
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Follow @Enlighten Learning
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>
    </React.Fragment>
  );
}