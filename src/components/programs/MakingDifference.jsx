import * as React from "react";
import {
    Box,
    Container,
    Card,
    CardContent,
    Typography,
    useMediaQuery,
    Grid,
    Avatar,
    Paper,
    Fade,
    Zoom,
    Rating,
} from "@mui/material";
import {
    Reviews as ReviewsIcon,
    FormatQuote as QuoteIcon,
    Star as StarIcon,
    People as PeopleIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";

const ReviewCard = ({ review, index }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

    // Generate a consistent color based on the reviewer's name
    const getAvatarColor = (name) => {
        const colors = [
            '#1976d2', '#388e3c', '#f57c00', '#d32f2f', 
            '#7b1fa2', '#0097a7', '#5d4037', '#616161'
        ];
        const charCode = name.charCodeAt(0);
        return colors[charCode % colors.length];
    };

    const avatarColor = getAvatarColor(review.author);
    const getInitials = (name) => name.charAt(0).toUpperCase();

    return (
        <Zoom in timeout={800 + (index * 100)}>
            <Card
                elevation={8}
                sx={{
                    height: '100%',
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${avatarColor}, ${avatarColor}cc)`,
                    }
                }}
            >
                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Quote Icon */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                        <QuoteIcon 
                            sx={{ 
                                fontSize: 32, 
                                color: avatarColor,
                                opacity: 0.7,
                                transform: 'rotate(180deg)'
                            }} 
                        />
                    </Box>

                    {/* Review Text */}
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            lineHeight: 1.7,
                            fontSize: '1rem',
                            fontStyle: 'italic',
                            color: isDarkMode ? '#e0e0e0' : '#555',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        "{review.text}"
                    </Typography>

                    {/* Rating */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Rating 
                            value={5} 
                            readOnly 
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#ffc107',
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: '#e0e0e0',
                                }
                            }}
                        />
                    </Box>

                    {/* Author */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            sx={{
                                width: 50,
                                height: 50,
                                backgroundColor: avatarColor,
                                background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}cc)`,
                                boxShadow: `0 4px 12px ${avatarColor}40`,
                                fontWeight: 600,
                                fontSize: '1.2rem'
                            }}
                        >
                            {getInitials(review.author)}
                        </Avatar>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: avatarColor,
                                    mb: 0.5
                                }}
                            >
                                {review.author}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.85rem' }}
                            >
                                Verified Reviewer
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Zoom>
    );
};

const StatsCard = ({ icon: Icon, title, value, color }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

    return (
        <Paper
            elevation={6}
            sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 28px ${color}30`,
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                }
            }}
        >
            <Icon sx={{ fontSize: 40, color: color, mb: 1 }} />
            <Typography variant="h4" fontWeight="700" sx={{ color: color, mb: 1 }}>
                {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>
        </Paper>
    );
};

export default function Reviews() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const isMobile = useMediaQuery('(max-width:900px)');

    // Mixed reviews from different categories
    const reviews = [
        {
            text: "Kingsley has been tutoring with Tiffany for about 12 weeks. I totally understand it is not a long period of time, but I still do see improvements from it. His reading comprehension and answering multiple choices are much better than before. I appreciated Tiffany and Brianna who are very responsive and addressed Kingsley's reading problems. I am very satisfied with the pairing process and will definitely consider coming back. I would also recommend others to this program.",
            author: "Iris"
        },
        {
            text: "I loved being able to teach other people the basics on how to play volleyball! it was a fun experience, and was a great way to be active and helpful!",
            author: "Sonali"
        },
        {
            text: "My kid loves Tiffany's teaching very much. She knows how to teach kids and how to make them be very interested to learn knowledge. Anna always be very happy after tutoring and cannot wait for next lesson. She also has patient and acts as Anna's friend too. Easy communicate with me. I believe she definitely improved her English. Overall highly recommended.",
            author: "Eugena"
        },
        {
            text: "The experience helped me develop patience and communication skills, also helping me find new ways to present different concepts to children.",
            author: "Alison"
        },
        {
            text: "Very fun and enjoyable to be able to share my expertise and help younger kids practice and play volleyball.",
            author: "Abigail"
        },
        {
            text: "This was a great program and I love how it was set up!",
            author: "Ayana"
        },
        {
            text: "I had lots of fun with this clinic.",
            author: "Juhee"
        }
    ];

    return (
        <Box
            component="section"
            sx={{
                backgroundColor: isDarkMode ? "#121212" : "#f9f9f9",
                color: isDarkMode ? "#fff" : "#333",
                minHeight: "100vh",
                py: { xs: 4, sm: 6, md: 8 },
                transition: "background-color 0.3s, color 0.3s",
            }}
        >
            <Container maxWidth="xl">
                {/* Page Header */}
                <Fade in timeout={1000}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8, md: 10 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <ReviewsIcon
                                sx={{
                                    fontSize: { xs: 60, sm: 80, md: 100 },
                                    color: 'primary.main'
                                }}
                            />
                        </Box>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontWeight: 900,
                                mb: 3,
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            What People Say
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{
                                maxWidth: '700px',
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                                mb: 2
                            }}
                        >
                            Hear from our amazing community of learners, educators, and supporters
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                maxWidth: '600px',
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontSize: '1rem'
                            }}
                        >
                            Real stories from real people who have experienced the impact of our programs
                        </Typography>
                    </Box>
                </Fade>

                {/* Stats Section */}
                <Fade in timeout={1200}>
                    <Grid container spacing={4} sx={{ mb: 8 }}>
                        <Grid item xs={6} sm={3}>
                            <StatsCard
                                icon={PeopleIcon}
                                title="Students Helped"
                                value="60+"
                                color="#9c27b0"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <StatsCard
                                icon={PeopleIcon}
                                title="Tutoring Sessions"
                                value="130+"
                                color="#4caf50"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <StatsCard
                                icon={ReviewsIcon}
                                title="Total Reviews"
                                value={reviews.length}
                                color="#2196f3"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <StatsCard
                                icon={PeopleIcon}
                                title="Active Volunteers"
                                value="20+"
                                color="#ff9800"
                            />
                        </Grid>
                    </Grid>
                </Fade>

                {/* Reviews Grid */}
                <Grid container spacing={4}>
                    {reviews.map((review, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index}>
                            <ReviewCard review={review} index={index} />
                        </Grid>
                    ))}
                </Grid>

                {/* Call to Action */}
                <Fade in timeout={2000}>
                    <Box 
                        sx={{ 
                            textAlign: 'center', 
                            mt: { xs: 6, sm: 8, md: 10 },
                            p: 4,
                            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                            borderRadius: 4,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: '#1976d2',
                                fontSize: { xs: '1.8rem', sm: '2.5rem' }
                            }}
                        >
                            Join Our Community
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                maxWidth: '600px',
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontSize: '1.1rem'
                            }}
                        >
                            Ready to be part of something special? Whether you're looking for tutoring, 
                            want to volunteer, or support our mission, we'd love to hear from you.
                        </Typography>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
}