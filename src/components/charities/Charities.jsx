import * as React from "react";
import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Chip,
    useTheme,
    useMediaQuery,
    Grid,
    Avatar,
    Paper,
    Stack,
} from "@mui/material";
import {
    Favorite as HeartIcon,
    ArrowForward as ArrowIcon,
    ArrowBack as ArrowBackIcon,
    FormatQuote as QuoteIcon,
    VolunteerActivism as VolunteerIcon,
    Handshake as HandshakeIcon,
    Groups as GroupsIcon,
    Launch as LaunchIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useMode } from "../Layout";
import PathConstants from "../../routes/pathConstants";

// Placeholder charity data - replace with your actual charities
const charitiesData = [
    {
        id: 1,
        name: "Adventures in Learning",
        description: "Adventures in Learning is a nonprofit organization dedicated to providing educational enrichment programs for children. They offer tutoring, mentorship, and creative learning experiences to help students reach their full potential.",
        amountDonated: 1000,
        logo: "/images/charity/charity1.jpg",
        image: "/images/charity/charity1.jpg",
        website: "https://www.adventuresinlearning.org",
        category: "Education",
    },
    
    // Add more charities as you make donations!
];

// Placeholder testimonials - replace with real quotes
const testimonials = [
    // {
    //     id: 1,
    //     quote: "We are incredibly grateful for Enlighten Learning's generous $1,000 donation. Their support helps us continue providing educational enrichment programs for children in our community.",
    //     author: "Adventures in Learning",
    //     role: "Charity Organization",
    //     organization: "Adventures in Learning",
    //     avatar: "/images/charity/charity1.jpg",
    // },
];

// Hero Section Component
const HeroSection = () => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    
    const totalDonated = charitiesData.reduce((sum, charity) => sum + charity.amountDonated, 0);
    const totalCharities = charitiesData.length;

    return (
        <Box
            sx={{
                position: 'relative',
                py: { xs: 8, md: 12 },
                overflow: 'hidden',
                background: isDarkMode
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            }}
        >
            {/* Animated background shapes */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    filter: 'blur(60px)',
                    animation: 'float 6s ease-in-out infinite',
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-20px)' },
                    },
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    filter: 'blur(40px)',
                    animation: 'float 8s ease-in-out infinite reverse',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            mb: 3,
                        }}
                    >
                        <HandshakeIcon sx={{ fontSize: 40 }} />
                    </Box>
                    
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                    >
                        Making a Difference Together
                    </Typography>
                    
                    <Typography
                        variant="h6"
                        sx={{
                            maxWidth: 600,
                            mx: 'auto',
                            mb: 5,
                            opacity: 0.9,
                            fontWeight: 400,
                            lineHeight: 1.6,
                        }}
                    >
                        See where your donations go and the impact we're making in our community through our charitable efforts.
                    </Typography>

                    {/* Impact Stats */}
                    <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 800, mx: 'auto' }}>
                        <Grid item xs={6} sm={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 4,
                                    border: '1px solid rgba(255,255,255,0.2)',
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{ fontWeight: 800, color: 'white', mb: 0.5 }}
                                >
                                    ${totalDonated.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Total Donated
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 4,
                                    border: '1px solid rgba(255,255,255,0.2)',
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{ fontWeight: 800, color: 'white', mb: 0.5 }}
                                >
                                    {totalCharities}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                   Charities Supported
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 4,
                                    border: '1px solid rgba(255,255,255,0.2)',
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{ fontWeight: 800, color: 'white', mb: 0.5 }}
                                >
                                    100%
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                   Charitable Commitment
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

// Photo Carousel Component - Optimized for single/few charities
const PhotoCarousel = () => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? charitiesData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === charitiesData.length - 1 ? 0 : prev + 1));
    };

    const currentCharity = charitiesData[currentIndex];

    return (
        <Box sx={{ py: { xs: 6, md: 10 } }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 2,
                    }}
                >
                    Our Impact in Action
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        color: 'text.secondary',
                        mb: 5,
                        maxWidth: 600,
                        mx: 'auto',
                    }}
                >
                    See the charities and causes we've proudly supported
                </Typography>

                {/* Featured Charity Display */}
                <Box
                    sx={{
                        position: 'relative',
                        maxWidth: 900,
                        mx: 'auto',
                    }}
                >
                    {/* Main Image */}
                    <Paper
                        elevation={8}
                        sx={{
                            position: 'relative',
                            borderRadius: 4,
                            overflow: 'hidden',
                            aspectRatio: '16/9',
                        }}
                    >
                        <Box
                            component="img"
                            src={currentCharity.image}
                            alt={currentCharity.name}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />

                        {/* Overlay Info */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                p: 3,
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                                color: 'white',
                            }}
                        >
                            <Chip
                                label={currentCharity.category}
                                size="small"
                                sx={{
                                    mb: 1,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                }}
                            />
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                                {currentCharity.name}
                            </Typography>
                            <Chip
                                label={`$${currentCharity.amountDonated.toLocaleString()} Donated`}
                                sx={{
                                    mt: 1,
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            />
                        </Box>
                    </Paper>

                    {/* Navigation Buttons - Only show if more than one charity */}
                    {charitiesData.length > 1 && (
                        <>
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    position: 'absolute',
                                    left: { xs: 8, md: -24 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: isDarkMode ? 'grey.800' : 'white',
                                    boxShadow: 3,
                                    '&:hover': {
                                        backgroundColor: isDarkMode ? 'grey.700' : 'grey.100',
                                    },
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    right: { xs: 8, md: -24 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: isDarkMode ? 'grey.800' : 'white',
                                    boxShadow: 3,
                                    '&:hover': {
                                        backgroundColor: isDarkMode ? 'grey.700' : 'grey.100',
                                    },
                                }}
                            >
                                <ArrowIcon />
                            </IconButton>
                        </>
                    )}

                    {/* Dots Indicator - Only show if more than one charity */}
                    {charitiesData.length > 1 && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 1,
                                mt: 3,
                            }}
                        >
                            {charitiesData.map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    sx={{
                                        width: currentIndex === index ? 24 : 8,
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: currentIndex === index ? '#667eea' : (isDarkMode ? 'grey.600' : 'grey.300'),
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

// Charities Grid Component - Optimized for single/few charities
const CharitiesGrid = () => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

    return (
        <Box
            sx={{
                py: { xs: 6, md: 10 },
                backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)',
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 2,
                    }}
                >
                    {charitiesData.length === 1 ? 'Our First Charity' : 'Our Charities'}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        color: 'text.secondary',
                        mb: 5,
                        maxWidth: 600,
                        mx: 'auto',
                    }}
                >
                    {charitiesData.length === 1 
                        ? "We're proud to announce our first charitable donation! This marks the beginning of our mission to give back to the community."
                        : "These are the organizations we've proudly supported. Your donations help us continue this mission."
                    }
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {charitiesData.map((charity) => (
                        <Grid item xs={12} sm={6} md={4} key={charity.id}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    border: '2px solid',
                                    borderColor: charitiesData.length === 1 ? '#667eea' : (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'),
                                    transition: 'all 0.3s ease',
                                    overflow: 'hidden',
                                    background: charitiesData.length === 1 
                                        ? (isDarkMode
                                            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                                            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)')
                                        : 'transparent',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: isDarkMode
                                            ? '0 20px 40px rgba(0,0,0,0.4)'
                                            : '0 20px 40px rgba(0,0,0,0.1)',
                                        borderColor: '#667eea',
                                    },
                                }}
                            >
                                {/* Card Image - Full image display */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        backgroundColor: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={charity.image}
                                        alt={charity.name}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            display: 'flex',
                                            gap: 1,
                                        }}
                                    >
                                        {charity.id === 1 && charitiesData.length >= 1 && (
                                            <Chip
                                                icon={<HeartIcon sx={{ color: 'white !important', fontSize: 16 }} />}
                                                label="First Donation!"
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#e91e63',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <Chip
                                        label={charity.category}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            color: 'white',
                                            fontSize: '0.7rem',
                                        }}
                                    />
                                </Box>

                                <CardContent sx={{ p: 3 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, mb: 1 }}
                                    >
                                        {charity.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        {charity.description}
                                    </Typography>

                                    {/* Donation Amount */}
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            background: isDarkMode
                                                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(129, 199, 132, 0.2) 100%)'
                                                : 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%)',
                                            border: '1px solid',
                                            borderColor: isDarkMode ? 'rgba(76, 175, 80, 0.3)' : 'rgba(76, 175, 80, 0.2)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1 }}>
                                            AMOUNT DONATED
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 800,
                                                color: '#4caf50',
                                            }}
                                        >
                                            ${charity.amountDonated.toLocaleString()}
                                        </Typography>
                                    </Paper>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Future Charities Teaser - Only show when there's just 1 charity */}
                {charitiesData.length === 1 && (
                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                maxWidth: 600,
                                mx: 'auto',
                                borderRadius: 4,
                                border: '2px dashed',
                                borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                                backgroundColor: 'transparent',
                            }}
                        >
                            <GroupsIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                More Charities Coming Soon
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We're actively working to support more organizations. Stay tuned for future donations as we continue to grow our impact in the community!
                            </Typography>
                        </Paper>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

// Testimonial Wall Component - Optimized for single/few testimonials
const TestimonialWall = () => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

    // Show "coming soon" message if no testimonials
    if (testimonials.length === 0) {
        return (
            <Box sx={{ py: { xs: 6, md: 10 } }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            textAlign: 'center',
                            mb: 2,
                        }}
                    >
                        Messages of Gratitude
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            mb: 5,
                            maxWidth: 600,
                            mx: 'auto',
                        }}
                    >
                        Hear from the organizations we support
                    </Typography>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            maxWidth: 600,
                            mx: 'auto',
                            borderRadius: 4,
                            border: '2px dashed',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                            backgroundColor: 'transparent',
                            textAlign: 'center',
                        }}
                    >
                        <QuoteIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            Testimonials Coming Soon
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            We're collecting messages of gratitude from the charities we support. Check back soon to hear how your donations are making a difference!
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ py: { xs: 6, md: 10 } }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 2,
                    }}
                >
                    {testimonials.length === 1 ? 'A Message of Gratitude' : 'Words of Gratitude'}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        color: 'text.secondary',
                        mb: 5,
                        maxWidth: 600,
                        mx: 'auto',
                    }}
                >
                    {testimonials.length === 1 
                        ? 'Hear from the organization we\'ve had the privilege to support'
                        : 'Hear from the organizations we\'ve had the privilege to support'
                    }
                </Typography>

                {/* Single testimonial - centered and larger */}
                {testimonials.length === 1 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 4, md: 6 },
                            maxWidth: 700,
                            mx: 'auto',
                            borderRadius: 4,
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                            position: 'relative',
                            overflow: 'hidden',
                            background: isDarkMode
                                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                                : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                            textAlign: 'center',
                        }}
                    >
                        {/* Large Quote Icon */}
                        <QuoteIcon
                            sx={{
                                fontSize: 80,
                                color: isDarkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)',
                                mb: 2,
                            }}
                        />

                        <Typography
                            variant="h5"
                            sx={{
                                fontStyle: 'italic',
                                mb: 4,
                                lineHeight: 1.8,
                                fontWeight: 400,
                            }}
                        >
                            "{testimonials[0].quote}"
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                            <Avatar
                                src={testimonials[0].avatar}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                }}
                            >
                                {testimonials[0].author.charAt(0)}
                            </Avatar>
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {testimonials[0].author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {testimonials[0].role}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                ) : (
                    // Multiple testimonials grid
                    <Grid container spacing={3}>
                        {testimonials.map((testimonial) => (
                            <Grid item xs={12} md={4} key={testimonial.id}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        borderRadius: 4,
                                        border: '1px solid',
                                        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: isDarkMode
                                                ? '0 12px 30px rgba(0,0,0,0.3)'
                                                : '0 12px 30px rgba(0,0,0,0.08)',
                                        },
                                    }}
                                >
                                    {/* Quote Icon */}
                                    <QuoteIcon
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            fontSize: 48,
                                            color: isDarkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)',
                                        }}
                                    />

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontStyle: 'italic',
                                            mb: 3,
                                            lineHeight: 1.8,
                                            position: 'relative',
                                            zIndex: 1,
                                        }}
                                    >
                                        "{testimonial.quote}"
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            src={testimonial.avatar}
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            }}
                                        >
                                            {testimonial.author.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                {testimonial.author}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {testimonial.role}, {testimonial.organization}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

// CTA Section Component
const CTASection = () => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                background: isDarkMode
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
        >
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <HeartIcon sx={{ fontSize: 64, mb: 3, opacity: 0.9 }} />
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                        }}
                    >
                        Help Us Support More Causes
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4,
                            opacity: 0.9,
                            fontWeight: 400,
                            maxWidth: 500,
                            mx: 'auto',
                        }}
                    >
                        Your donation directly supports these charities and helps us expand our impact in the community.
                    </Typography>
                    <Button
                        component={Link}
                        to={PathConstants.DONATE_NOW}
                        variant="contained"
                        size="large"
                        endIcon={<ArrowIcon />}
                        sx={{
                            px: 5,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            borderRadius: 3,
                            backgroundColor: 'white',
                            color: '#667eea',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        Donate Now
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

// Main Charities Page Component
const Charities = () => {
    return (
        <Box>
            <HeroSection />
            <PhotoCarousel />
            <CharitiesGrid />
            <TestimonialWall />
            <CTASection />
        </Box>
    );
};

export default Charities;
