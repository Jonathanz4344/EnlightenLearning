import * as React from "react";
import {
    Box,
    Container,
    Card,
    CardContent,
    Typography,
    useMediaQuery,
    Avatar,
    Paper,
    Fade,
    Zoom,
    Rating,
    Button,
} from "@mui/material";
import {
    Reviews as ReviewsIcon,
    FormatQuote as QuoteIcon,
    Star as StarIcon,
    People as PeopleIcon,
    RateReview as RateReviewIcon,
    FamilyRestroom as ParentIcon,
    VolunteerActivism as VolunteerIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";

const ReviewCard = ({ review, index, priority }) => {
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

    // Dynamic sizing based on priority
    const getCardSize = () => {
        switch (priority) {
            case 'large': return {
                minHeight: '400px',
                fontSize: '1.1rem',
                avatarSize: 60,
                quoteSize: 40,
                titleSize: 'h5',
                padding: 5
            };
            case 'medium': return {
                minHeight: '320px',
                fontSize: '1rem',
                avatarSize: 50,
                quoteSize: 32,
                titleSize: 'h6',
                padding: 4
            };
            case 'small': return {
                minHeight: '250px',
                fontSize: '0.95rem',
                avatarSize: 45,
                quoteSize: 28,
                titleSize: 'body1',
                padding: 3.5
            };
            default: return {
                minHeight: '280px',
                fontSize: '1rem',
                avatarSize: 50,
                quoteSize: 32,
                titleSize: 'h6',
                padding: 4
            };
        }
    };

    const cardSize = getCardSize();

    return (
        <Zoom in timeout={800 + (index * 100)}>
            <Card
                elevation={priority === 'large' ? 12 : 8}
                sx={{
                    height: '100%',
                    minHeight: cardSize.minHeight,
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    borderRadius: priority === 'large' ? 6 : 4,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: priority === 'large' ? 'scale(1.02)' : 'scale(1)',
                    '&:hover': {
                        transform: priority === 'large' ? 'translateY(-12px) scale(1.02)' : 'translateY(-8px)',
                        boxShadow: priority === 'large'
                            ? '0 24px 48px rgba(0,0,0,0.2)'
                            : '0 20px 40px rgba(0,0,0,0.15)',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: priority === 'large' ? 6 : 4,
                        background: `linear-gradient(90deg, ${avatarColor}, ${avatarColor}cc)`,
                    },
                    // Add glow effect for high priority cards
                    ...(priority === 'large' && {
                        boxShadow: `0 8px 32px ${avatarColor}20, 0 0 0 1px ${avatarColor}10`,
                    })
                }}
            >
                <CardContent sx={{
                    p: cardSize.padding,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between'
                }}>
                    {/* Quote Icon */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                        <QuoteIcon
                            sx={{
                                fontSize: cardSize.quoteSize,
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
                            fontSize: cardSize.fontSize,
                            fontStyle: 'italic',
                            color: isDarkMode ? '#e0e0e0' : '#555',
                            flex: 1,
                            fontWeight: priority === 'large' ? 500 : 400,
                        }}
                    >
                        "{review.text}"
                    </Typography>

                    <Box>
                        {/* Rating */}
                        {/* <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Rating
                                value={5}
                                readOnly
                                size={priority === 'large' ? 'large' : 'medium'}
                                sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: '#ffc107',
                                    },
                                    '& .MuiRating-iconEmpty': {
                                        color: '#e0e0e0',
                                    }
                                }}
                            />
                        </Box> */}

                        {/* Author */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                sx={{
                                    width: cardSize.avatarSize,
                                    height: cardSize.avatarSize,
                                    backgroundColor: avatarColor,
                                    background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}cc)`,
                                    boxShadow: `0 4px 12px ${avatarColor}40`,
                                    fontWeight: 600,
                                    fontSize: priority === 'large' ? '1.4rem' : '1.2rem'
                                }}
                            >
                                {getInitials(review.author)}
                            </Avatar>
                            <Box>
                                <Typography
                                    variant={cardSize.titleSize}
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
                                    sx={{ fontSize: priority === 'large' ? '0.9rem' : '0.85rem' }}
                                >
                                    Verified Reviewer
                                </Typography>
                            </Box>
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
                position: 'relative',
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

    // Pagination state
    const [visibleCount, setVisibleCount] = React.useState(6); // Show 6 reviews initially
    const [isLoading, setIsLoading] = React.useState(false);

    // Enhanced reviews with priority scoring
    const reviews = [
        {
            text: "My experience as a tutor was very valuable and beneficial. It allowed me to gain strong communication skills, learn to be more patient, and how to adapt my teaching style to better suit the student I worked with. Additionally, watching the student make progress and become more confident was extremely fulfilling. Given the personal growth and positive impact, I would definitely participate again.",
            author: "Tiffany Z",
            priority: "large", 
        },
        {
            text: "As the Volunteer Coordinator of Enlighten Learning, I became more organized and efficient in managing schedules and resources. Being apart of the Enlighten Learning team taught me how to finish tasks effectively and collaborate with diverse stakeholders. Seeing the program run smoothly due to these efforts was incredibly rewarding. Would I participate again? Absolutely. The experience was fulfilling, and I'd love to contribute to help scale the program's impact.",
            author: "Eileen",
            priority: "large", 
        },
        {
            text: "My kid loves Tiffany's teaching very much. She knows how to teach kids and how to make them be very interested to learn knowledge. Anna always be very happy after tutoring and cannot wait for next lesson. She also has patient and acts as Anna's friend too. Easy communicate with me. I believe she definitely improved her English. Overall highly recommended.",
            author: "Eugena",
            priority: "large", 
        },
        {
            text: "Kingsley has been tutoring with Tiffany for about 12 weeks. I totally understand it is not a long period of time, but I still do see improvements from it. His reading comprehension and answering multiple choices are much better than before. I appreciated Tiffany and Brianna who are very responsive and addressed Kingsley's reading problems. I am very satisfied with the pairing process and will definitely consider coming back. I would also recommend others to this program.",
            author: "Iris",
            priority: "large", 
        },
        {
            text: "I had a great experience being a tutor. I really learned a lot about responsibility, time management, patience etc. These skills are very useful not only in the tutoring environment but also school, later work, and life. I would love to tutor again.",
            author: "Anna",
            priority: "large", 
        },
        {
            text: "I enjoyed being a board member and felt that my contributions were really helping Enlighten Learning grow. I gained the skills to develop events and ideas with the help of others, and actually act on those ideas.",
            author: "Aarini",
            priority: "medium", 
        },
        {
            text: "The experience helped me develop patience and communication skills, also helping me find new ways to present different concepts to children.",
            author: "Alison",
            priority: "medium", 
        },
        {
            text: "It was a good experience. I got to work with a lot of good people. I earned leadership skills and also learned how to collaborate with my team for a united goal.",
            author: "Veronica",
            priority: "medium", 
        },
        {
            text: "I loved being able to teach other people the basics on how to play volleyball! it was a fun experience, and was a great way to be active and helpful!",
            author: "Sonali",
            priority: "medium", 
        },
        {
            text: "Very fun and enjoyable to be able to share my expertise and help younger kids practice and play volleyball.",
            author: "Abigail",
            priority: "medium",
        },
        {
            text: "This was a great program and I love how it was set up!",
            author: "Ayana",
            priority: "small", 
        },
        {
            text: "I had lots of fun with this clinic.",
            author: "Juhee",
            priority: "small", 
        },
        {
            text: "Through Enlighten Learning I've developed my planning and organizational skills by helping plan our events. I'll continue to develop these skills and gain new experiences as a board member of this organization.",
            author: "Lauren",
            priority: "medium", 
        },
        {
            text: "Being a tutor at Enlighten Learning has allowed me to experience so many meaningful moments with the kids I work with. One of my students, Kingsley, has especially made the experience memorable. We’ve built such a strong connection that he has chosen to continue tutoring with me again this year, which feels both rewarding and encouraging. Through this opportunity, I’ve gained valuable skills such as learning how to effectively socialize with younger children, developing patience, working independently, and practicing negotiation when challenges arise. Tutoring has truly taught me how impactful small efforts can be in helping others grow. I would gladly participate again, and I’m excited to continue tutoring my student this year and create even more new memories together.",
            author: "Tiffany Q",
            priority: "large", 
        },
        {
            text: "My daughter was tutored in Algebra, I would recommend it to others.",
            author: "Sophie",
            priority: "medium", 
        },
        {
            text: "The classes were very good!",
            author: "Emma",
            priority: "small", 
        },
        {
            text: "Many athletes find that such clinics accelerate their skill development and build confidence.They emphasize skills like spiking, serving, blocking, packed into a short timeframe. Kids loved it .",
            author: "Harpreet",
            priority: "large", 
        },
        {
            text: "It was such a great experience. Very welcoming for beginners and kids enjoyed it! Very well run and appreciated that the structure accommodated for water breaks. My kids of different ages felt included and enjoyed it!",
            author: "Ruby",
            priority: "large", 
        },
        {
            text: "The clinic was a good environment for beginners.",
            author: "Himali",
            priority: "small", 
        },
    ];

    // Sort reviews by priority for better arrangement
    const sortedReviews = reviews.sort((a, b) => {
        const priorityOrder = { large: 3, medium: 2, small: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    // Get visible reviews based on current count
    const visibleReviews = sortedReviews.slice(0, visibleCount);
    const hasMoreReviews = visibleCount < sortedReviews.length;

    const handleLoadMore = () => {
        setIsLoading(true);
        // Simulate loading delay for smooth UX
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 6, sortedReviews.length));
            setIsLoading(false);
        }, 500);
    };

    const handleParentReviewClick = () => {
        window.open('https://forms.gle/V8LRoe4RJm3iUaXu5', '_blank');
    };

    const handleTutorVolunteerReviewClick = () => {
        window.open('https://forms.gle/V4ocU3f6RMxsDLM16', '_blank');
    };

    // Custom masonry layout function
    const createMasonryLayout = () => {
        const columns = isMobile ? 1 : 3;
        const columnArrays = Array.from({ length: columns }, () => []);

        visibleReviews.forEach((review, index) => {
            const shortestColumn = columnArrays.reduce((shortest, current) =>
                current.length < shortest.length ? current : shortest
            );
            shortestColumn.push({ ...review, index });
        });

        return columnArrays;
    };

    const masonryColumns = createMasonryLayout();

    return (
        <Box
            component="section"
            sx={{
                width: "100%",
                pt: { xs: 8, sm: 10, md: 12 },
                pb: { xs: 6, md: 8 },
                overflow: "hidden",
                background: isDarkMode
                    ? 'radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
                    : 'radial-gradient(ellipse at top, #f8faff 0%, #e3f2fd 50%, #ffffff 100%)',
                position: "relative",
                minHeight: "100vh",
                color: isDarkMode ? "#fff" : "#333",
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
                                fontSize: '1rem',
                                mb: 4
                            }}
                        >
                            Real stories from real people who have experienced the impact of our programs
                        </Typography>

                        {/* Review Buttons */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 3,
                                justifyContent: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center',
                                mt: 2
                            }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleParentReviewClick}
                                startIcon={<ParentIcon />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                                    transition: 'all 0.3s ease',
                                    minWidth: { xs: '250px', sm: '200px' },
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)',
                                        background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                                    }
                                }}
                            >
                                Parent Review
                            </Button>

                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleTutorVolunteerReviewClick}
                                startIcon={<VolunteerIcon />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    background: 'linear-gradient(45deg, #9c27b0, #ba68c8)',
                                    boxShadow: '0 8px 24px rgba(156, 39, 176, 0.3)',
                                    transition: 'all 0.3s ease',
                                    minWidth: { xs: '250px', sm: '200px' },
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 32px rgba(156, 39, 176, 0.4)',
                                        background: 'linear-gradient(45deg, #7b1fa2, #9c27b0)',
                                    }
                                }}
                            >
                                Tutor/Volunteer Review
                            </Button>
                        </Box>
                    </Box>
                </Fade>

                {/* Stats Section */}
                <Fade in timeout={1200}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                        gap: 4,
                        mb: 8
                    }}>
                        <StatsCard
                            icon={PeopleIcon}
                            title="Lives Impacted"
                            value="100+"
                            color="#9c27b0"
                        />
                        <StatsCard
                            icon={PeopleIcon}
                            title="Tutoring Sessions"
                            value="130+"
                            color="#4caf50"
                        />
                        <StatsCard
                            icon={ReviewsIcon}
                            title="Total Reviews"
                            value={sortedReviews.length}
                            color="#2196f3"
                        />
                        <StatsCard
                            icon={PeopleIcon}
                            title="Active Volunteers"
                            value="30+"
                            color="#ff9800"
                        />
                    </Box>
                </Fade>

                {/* Dynamic Masonry Reviews Layout */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: 3,
                    alignItems: 'start'
                }}>
                    {masonryColumns.map((column, columnIndex) => (
                        <Box key={columnIndex} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {column.map((review) => (
                                <ReviewCard
                                    key={review.index}
                                    review={review}
                                    index={review.index}
                                    priority={review.priority}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>

                {/* Load More Button */}
                {hasMoreReviews && (
                    <Fade in timeout={1000}>
                        <Box sx={{ textAlign: 'center', mt: 6 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                sx={{
                                    px: 5,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    background: isDarkMode
                                        ? 'linear-gradient(45deg, #424242, #616161)'
                                        : 'linear-gradient(45deg, #f5f5f5, #e0e0e0)',
                                    color: isDarkMode ? '#fff' : '#333',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                                        background: isDarkMode
                                            ? 'linear-gradient(45deg, #616161, #757575)'
                                            : 'linear-gradient(45deg, #e0e0e0, #d5d5d5)',
                                    },
                                    '&:disabled': {
                                        transform: 'none',
                                        opacity: 0.7,
                                    },
                                    '&::before': isLoading ? {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                        animation: 'shimmer 1.5s infinite',
                                    } : {},
                                    '@keyframes shimmer': {
                                        '0%': { left: '-100%' },
                                        '100%': { left: '100%' },
                                    }
                                }}
                            >
                                {isLoading ? 'Loading More Reviews...' : `More from the Community `}
                            </Button>

                            {/* Progress indicator */}
                            {/* <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ 
                                    display: 'block', 
                                    mt: 2,
                                    fontSize: '0.9rem'
                                }}
                            >
                                Showing {visibleCount} of {sortedReviews.length} reviews
                            </Typography> */}
                        </Box>
                    </Fade>
                )}

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
                                fontSize: '1.1rem',
                                mb: 4
                            }}
                        >
                            Ready to be part of something special? Whether you're a student, parent, volunteer, or executive member, our mission is made possible because of people like you. We'd love to hear your story
                        </Typography>

                        {/* Additional Review Buttons in CTA */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 3,
                                justifyContent: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center'
                            }}
                        >
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleParentReviewClick}
                                startIcon={<ParentIcon />}
                                sx={{
                                    px: 3,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    borderColor: '#1976d2',
                                    color: '#1976d2',
                                    transition: 'all 0.3s ease',
                                    minWidth: { xs: '200px', sm: '160px' },
                                    '&:hover': {
                                        borderColor: '#1976d2',
                                        backgroundColor: '#1976d2',
                                        color: 'white',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                                    }
                                }}
                            >
                                Parent Review
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleTutorVolunteerReviewClick}
                                startIcon={<VolunteerIcon />}
                                sx={{
                                    px: 3,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    borderColor: '#9c27b0',
                                    color: '#9c27b0',
                                    transition: 'all 0.3s ease',
                                    minWidth: { xs: '200px', sm: '160px' },
                                    '&:hover': {
                                        borderColor: '#9c27b0',
                                        backgroundColor: '#9c27b0',
                                        color: 'white',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 24px rgba(156, 39, 176, 0.3)',
                                    }
                                }}
                            >
                                Tutor/Volunteer
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
}