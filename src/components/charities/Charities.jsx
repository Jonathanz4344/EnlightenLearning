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
        name: "Local Food Bank",
        description: "Providing nutritious meals to families in need across our community.",
        amountDonated: 500,
        logo: "/images/donate/charity-placeholder.png", // Replace with actual logo
        image: "/images/donate/charity1.jpg", // Replace with actual photo
        website: "https://example.com",
        category: "Food Security",
    },
    {
        id: 2,
        name: "Children's Education Fund",
        description: "Supporting underprivileged children with educational resources and school supplies.",
        amountDonated: 750,
        logo: "/images/donate/charity-placeholder.png",
        image: "/images/donate/charity2.jpg",
        website: "https://example.com",
        category: "Education",
    },
    {
        id: 3,
        name: "Youth Mentorship Program",
        description: "Connecting young people with mentors to guide them toward success.",
        amountDonated: 300,
        logo: "/images/donate/charity-placeholder.png",
        image: "/images/donate/charity3.jpg",
        website: "https://example.com",
        category: "Youth Development",
    },
    // Add more charities as needed
];

// Placeholder testimonials - replace with real quotes
const testimonials = [
    {
        id: 1,
        quote: "Thanks to Enlighten Learning's generous donation, we were able to provide school supplies to over 100 students this year.",
        author: "Sarah Johnson",
        role: "Director",
        organization: "Children's Education Fund",
        avatar: "/images/donate/avatar1.jpg",
    },
    {
        id: 2,
        quote: "The support from this amazing organization has helped us serve 50% more families in our community food program.",
        author: "Michael Chen",
        role: "Program Coordinator",
        organization: "Local Food Bank",
        avatar: "/images/donate/avatar2.jpg",
    },
    {
        id: 3,
        quote: "Enlighten Learning truly understands the importance of investing in our youth. Their contribution made a real difference.",
        author: "Emily Rodriguez",
        role: "Founder",
        organization: "Youth Mentorship Program",
        avatar: "/images/donate/avatar3.jpg",
    },
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
                        See where your donations go and the impact we're making in our community through our charitable partnerships.
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
                                    Partner Charities
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
                                    Transparency
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

// Photo Carousel Component
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
                    Browse through photos of the charities and causes we've supported
                </Typography>

                {/* Carousel */}
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
                            background: isDarkMode
                                ? 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)'
                                : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                        }}
                    >
                        {/* Placeholder for actual image */}
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 4,
                            }}
                        >
                            <VolunteerIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                {charitiesData[currentIndex].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                {charitiesData[currentIndex].description}
                            </Typography>
                            <Chip
                                label={`$${charitiesData[currentIndex].amountDonated} Donated`}
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            />
                        </Box>

                        {/* Overlay Info */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                p: 3,
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                color: 'white',
                            }}
                        >
                            <Chip
                                label={charitiesData[currentIndex].category}
                                size="small"
                                sx={{
                                    mb: 1,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                }}
                            />
                        </Box>
                    </Paper>

                    {/* Navigation Buttons */}
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

                    {/* Dots Indicator */}
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
                </Box>
            </Container>
        </Box>
    );
};

// Partner Charities Grid Component
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
                    Our Partner Charities
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
                    These are the organizations we've proudly supported. Your donations help us continue this mission.
                </Typography>

                <Grid container spacing={3}>
                    {charitiesData.map((charity) => (
                        <Grid item xs={12} sm={6} md={4} key={charity.id}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    border: '1px solid',
                                    borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: isDarkMode
                                            ? '0 20px 40px rgba(0,0,0,0.4)'
                                            : '0 20px 40px rgba(0,0,0,0.1)',
                                        borderColor: '#667eea',
                                    },
                                }}
                            >
                                {/* Card Header with gradient */}
                                <Box
                                    sx={{
                                        height: 120,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            backgroundColor: 'white',
                                            border: '4px solid rgba(255,255,255,0.3)',
                                        }}
                                    >
                                        <VolunteerIcon sx={{ fontSize: 40, color: '#667eea' }} />
                                    </Avatar>
                                    <Chip
                                        label={charity.category}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            backgroundColor: 'rgba(255,255,255,0.2)',
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
                                        sx={{ mb: 2, minHeight: 60 }}
                                    >
                                        {charity.description}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mt: 2,
                                            pt: 2,
                                            borderTop: '1px solid',
                                            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontWeight: 800, color: '#4caf50' }}
                                            >
                                                ${charity.amountDonated.toLocaleString()}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Donated
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            sx={{
                                                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                            }}
                                        >
                                            <LaunchIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

// Testimonial Wall Component
const TestimonialWall = () => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

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
                    Words of Gratitude
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
                    Hear from the organizations we've had the privilege to support
                </Typography>

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
