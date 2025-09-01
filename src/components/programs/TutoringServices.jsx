import * as React from "react";
import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    Typography,
    IconButton,
    Chip,
    useTheme,
    useMediaQuery,
    Grid,
    Divider,
    Avatar,
    Paper,
} from "@mui/material";
import {
    ArrowBackIos as ArrowBackIcon,
    ArrowForwardIos as ArrowForwardIcon,
    School as TutorIcon,
    MenuBook as EnglishIcon,
    Calculate as MathIcon,
    Science as ScienceIcon,
    Language as LanguageIcon,
    Quiz as TestPrepIcon,
    Assignment as RegentsIcon,
    BookOnline as BookIcon,
    Launch as LaunchIcon,
    Schedule as ScheduleIcon,
    Favorite as HeartIcon,
    EmojiEvents as AwardIcon,
    Groups as GroupsIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";

// Subject Areas Data
const subjectAreas = [
    {
        id: 1,
        title: "NYS Test Prep",
        subtitle: "Grades 3-8",
        description: "Help your child excel on New York State standardized tests with focused test-taking strategies, comprehensive content review, and confidence-building techniques for academic success.",
        icon: TestPrepIcon,
        color: "#4caf50",
        category: "Test Preparation",
        grades: ["3rd", "4th", "5th", "6th", "7th", "8th"],
        // commitment: ""
    },
    {
        id: 2,
        title: "Regents Prep",
        subtitle: "Middle School & High School",
        description: "Comprehensive preparation for New York State Regents examinations across various subjects. Our tutors provide intensive review sessions and proven exam strategies.",
        icon: RegentsIcon,
        color: "#2196f3",
        category: "Test Preparation",
        grades: ["8th", "9th", "10th", "11th", "12th"],
        commitment: "Intensive review sessions"
    },
    {
        id: 3,
        title: "English",
        subtitle: "Elementary, Middle & High School",
        description: "Expert guidance in reading comprehension, writing skills, grammar, literature analysis, and essay composition across all grade levels.",
        icon: EnglishIcon,
        color: "#e91e63",
        category: "Core Subject",
        grades: ["Elementary", "Middle School", "High School"],
        commitment: "Weekly sessions"
    },
    {
        id: 4,
        title: "Mathematics",
        subtitle: "Elementary through Geometry",
        description: "Build strong mathematical foundations and problem-solving skills with support in fundamental math concepts, algebra, and geometry.",
        icon: MathIcon,
        color: "#ff9800",
        category: "Core Subject",
        grades: ["Elementary", "Middle School", "High School"],
        commitment: "Regular practice sessions"
    },
    {
        id: 5,
        title: "Science",
        subtitle: "Earth Science, Biology, Chemistry",
        description: "Develop understanding of scientific concepts, conduct experiments, and build critical thinking skills across various science disciplines.",
        icon: ScienceIcon,
        color: "#9c27b0",
        category: "Core Subject",
        grades: ["Elementary", "Middle School", "High School"],
        commitment: "Lab and theory sessions"
    },
    {
        id: 6,
        title: "World Languages",
        subtitle: "Spanish, Mandarin, French",
        description: "Develop language proficiency through conversation practice, grammar instruction, and cultural immersion activities with native and fluent speakers.",
        icon: LanguageIcon,
        color: "#00bcd4",
        category: "Language",
        grades: ["Spanish", "Mandarin Chinese", "French"],
        commitment: "Conversational sessions"
    }
];

// Helper function to get category color
const getCategoryColor = (category) => {
    const colors = {
        "Test Preparation": "#4caf50",
        "Core Subject": "#2196f3",
        "Language": "#ff9800"
    };
    return colors[category] || "#757575";
};

const SubjectCard = ({ subject }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const IconComponent = subject.icon;

    const handleBookClick = () => {
        window.open("https://forms.gle/yBkAste1jFLEVqLw9", '_blank');
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                border: `3px solid ${subject.color}`,
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[12],
                }
            }}
        >
            {/* Header Badge */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -12,
                    right: 16,
                    backgroundColor: subject.color,
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    zIndex: 1,
                    boxShadow: theme.shadows[4]
                }}
            >
                AVAILABLE NOW
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 3, pt: 4, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Box>
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                    fontWeight: 700,
                                    color: isDarkMode ? '#fff' : '#333',
                                    lineHeight: 1.3,
                                    pr: 1
                                }}
                            >
                                {subject.title}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: subject.color,
                                    fontWeight: 600,
                                    fontSize: '0.9rem'
                                }}
                            >
                                {subject.subtitle}
                            </Typography>
                        </Box>
                        <IconComponent sx={{ color: subject.color, fontSize: 32 }} />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        <Chip
                            label={subject.category}
                            sx={{
                                backgroundColor: `${getCategoryColor(subject.category)}20`,
                                color: getCategoryColor(subject.category),
                                fontWeight: 600
                            }}
                            size="small"
                        />
                        {/* <Chip
                            label={subject.commitment}
                            color="primary"
                            size="small"
                            variant="outlined"
                        /> */}
                    </Box>
                </Box>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ lineHeight: 1.6, mb: 2 }}
                >
                    {subject.description}
                </Typography>

                {/* Grade Levels/Areas */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: subject.color
                        }}
                    >
                        Areas of Focus:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {subject.grades.map((grade, index) => (
                            <Chip
                                key={index}
                                label={grade}
                                size="small"
                                sx={{
                                    backgroundColor: `${subject.color}15`,
                                    color: subject.color,
                                    border: `1px solid ${subject.color}40`,
                                    fontSize: '0.7rem'
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Book Session Section */}
                <Box sx={{ mt: 'auto' }}>
                    <Box sx={{
                        backgroundColor: `${subject.color}15`,
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                        border: `2px dashed ${subject.color}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                mb: 1,
                                backgroundColor: subject.color,
                                fontSize: '1rem'
                            }}
                        >
                            <BookIcon />
                        </Avatar>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: subject.color,
                                fontWeight: 600,
                                mb: 0.5,
                                fontSize: '0.9rem'
                            }}
                        >
                            Book Your Session Today!
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            Expert tutoring available now
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.7rem',
                                fontStyle: 'italic',
                                color: 'text.secondary',
                                mt: 0.5
                            }}
                        >
                            *per tutor availability
                        </Typography>
                    </Box>
                </Box>
            </CardContent>

            {/* Action Button */}
            <Box sx={{ p: 3, pt: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleBookClick}
                    endIcon={<LaunchIcon />}
                    sx={{
                        backgroundColor: subject.color,
                        color: 'white',
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        '&:hover': {
                            backgroundColor: subject.color,
                            opacity: 0.9,
                        }
                    }}
                >
                    Book {subject.title} Session
                </Button>
            </Box>
        </Card>
    );
};

const SubjectCarousel = ({ subjects, title, subtitle, icon: Icon, colorTheme }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const theme = useTheme();
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const getItemsPerSlide = () => {
        if (isMobile) return 1;
        if (isTablet) return 2;
        return 3;
    };

    const itemsPerSlide = getItemsPerSlide();
    const maxIndex = Math.max(0, Math.ceil(subjects.length / itemsPerSlide) - 1);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const getVisibleSubjects = () => {
        const startIndex = currentIndex * itemsPerSlide;
        return subjects.slice(startIndex, startIndex + itemsPerSlide);
    };

    return (
        <Box sx={{ mb: 8 }}>
            {/* Section Header */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Icon sx={{ fontSize: { xs: 40, sm: 50 }, color: colorTheme }} />
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 800,
                            color: colorTheme,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                        maxWidth: '600px',
                        mx: 'auto',
                        lineHeight: 1.6
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            {/* Navigation Controls */}
            {subjects.length > itemsPerSlide && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            sx={{
                                border: '2px solid',
                                borderColor: colorTheme,
                                color: colorTheme,
                                '&:hover': {
                                    backgroundColor: colorTheme,
                                    color: 'white'
                                },
                                '&:disabled': {
                                    borderColor: 'text.disabled',
                                    color: 'text.disabled'
                                }
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton
                            onClick={nextSlide}
                            disabled={currentIndex === maxIndex}
                            sx={{
                                border: '2px solid',
                                borderColor: colorTheme,
                                color: colorTheme,
                                '&:hover': {
                                    backgroundColor: colorTheme,
                                    color: 'white'
                                },
                                '&:disabled': {
                                    borderColor: 'text.disabled',
                                    color: 'text.disabled'
                                }
                            }}
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>
            )}

            {/* Cards Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    },
                    gap: 4,
                    alignItems: 'stretch'
                }}
            >
                {getVisibleSubjects().map((subject) => (
                    <SubjectCard
                        key={subject.id}
                        subject={subject}
                    />
                ))}
            </Box>

            {/* Pagination Dots */}
            {subjects.length > itemsPerSlide && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
                    {Array.from({ length: maxIndex + 1 }, (_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                backgroundColor: index === currentIndex
                                    ? colorTheme
                                    : 'text.disabled',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '2px solid',
                                borderColor: index === currentIndex
                                    ? colorTheme
                                    : 'transparent',
                                '&:hover': {
                                    transform: 'scale(1.2)',
                                    backgroundColor: colorTheme,
                                }
                            }}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default function TutoringServices() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

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
            <Container maxWidth="lg">
                {/* Page Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8, md: 10 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <TutorIcon
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
                        Enlighten Learning Tutoring Services
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{
                            maxWidth: '800px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontSize: { xs: '1.1rem', sm: '1.3rem' },
                            mb: 4
                        }}
                    >
                        Excel in your studies and make a difference. Our expert tutoring services are designed to help students achieve their academic goals and build confidence. And with every lesson, you're helping us fundraise for charities that provide hope, care, and support to those in need.
                    </Typography>

                    {/* Quick Stats */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 4,
                        mt: 6
                    }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#4caf50' }} fontWeight="bold">
                                {subjectAreas.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Subject Areas
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#2196f3' }} fontWeight="bold">
                                K-12
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Grade Levels
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" color="secondary.main" fontWeight="bold">
                                15+
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Dedicated Tutors
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#ff9800' }} fontWeight="bold">
                                130+
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Tutoring Sessions
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: { xs: 4, sm: 6, md: 8 }, opacity: 0.3 }} />

                {/* Subject Areas Section */}
                <SubjectCarousel
                    subjects={subjectAreas}
                    title="Our Tutoring Services"
                    subtitle="Choose the subject area where your child needs support and watch them excel"
                    icon={TutorIcon}
                    colorTheme="#1976d2"
                />

                {/* Why Choose Us Section */}
                <Box sx={{ mb: 8 }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 6,
                            color: isDarkMode ? '#fff' : '#333'
                        }}
                    >
                        Why Choose Enlighten Learning?
                    </Typography>

                    <Container maxWidth="md">
                        <Grid container spacing={4} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <Paper
                                    elevation={6}
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        height: '100%',
                                        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                                        transition: 'all 0.3s ease',
                                        borderRadius: 3,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 40px rgba(76, 175, 80, 0.3)'
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: 4,
                                            background: 'linear-gradient(90deg, #4caf50, #66bb6a)',
                                        }
                                    }}
                                >
                                    <Box sx={{ mb: 3 }}>
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mx: 'auto',
                                                backgroundColor: '#4caf50',
                                                background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
                                                boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)',
                                                mb: 2
                                            }}
                                        >
                                            <GroupsIcon sx={{ fontSize: 40 }} />
                                        </Avatar>
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        fontWeight="700"
                                        sx={{
                                            mb: 3,
                                            color: '#4caf50',
                                            fontSize: '1.4rem'
                                        }}
                                    >
                                        Expert Tutors
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            lineHeight: 1.7,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Our qualified tutors are passionate about education and dedicated to student success.
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Paper
                                    elevation={6}
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        height: '100%',
                                        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                                        transition: 'all 0.3s ease',
                                        borderRadius: 3,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 40px rgba(33, 150, 243, 0.3)'
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: 4,
                                            background: 'linear-gradient(90deg, #2196f3, #42a5f5)',
                                        }
                                    }}
                                >
                                    <Box sx={{ mb: 3 }}>
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mx: 'auto',
                                                backgroundColor: '#2196f3',
                                                background: 'linear-gradient(135deg, #2196f3, #42a5f5)',
                                                boxShadow: '0 8px 20px rgba(33, 150, 243, 0.4)',
                                                mb: 2
                                            }}
                                        >
                                            <ScheduleIcon sx={{ fontSize: 40 }} />
                                        </Avatar>
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        fontWeight="700"
                                        sx={{
                                            mb: 3,
                                            color: '#2196f3',
                                            fontSize: '1.4rem'
                                        }}
                                    >
                                        Flexible Scheduling
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            lineHeight: 1.7,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Sessions scheduled around your family's busy schedule with convenient timing options.
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Paper
                                    elevation={6}
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        height: '100%',
                                        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                                        transition: 'all 0.3s ease',
                                        borderRadius: 3,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 40px rgba(255, 152, 0, 0.3)'
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: 4,
                                            background: 'linear-gradient(90deg, #ff9800, #ffb74d)',
                                        }
                                    }}
                                >
                                    <Box sx={{ mb: 3 }}>
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mx: 'auto',
                                                backgroundColor: '#ff9800',
                                                background: 'linear-gradient(135deg, #ff9800, #ffb74d)',
                                                boxShadow: '0 8px 20px rgba(255, 152, 0, 0.4)',
                                                mb: 2
                                            }}
                                        >
                                            <AwardIcon sx={{ fontSize: 40 }} />
                                        </Avatar>
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        fontWeight="700"
                                        sx={{
                                            mb: 3,
                                            color: '#ff9800',
                                            fontSize: '1.4rem'
                                        }}
                                    >
                                        Proven Results
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            lineHeight: 1.7,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Track record of helping students improve grades and build academic confidence.
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Container>
        </Box>
    );
}