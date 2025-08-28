import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    Typography,
    useTheme,
    Grid,
    Divider,
    Paper,
    Fade,
    Grow,
} from "@mui/material";
import {
    School as LearnIcon,
    Favorite as GiveIcon,
    Public as ChangeIcon,
    MonetizationOn as FundraisingIcon,
    EmojiEvents as JoyIcon,
    VolunteerActivism as PassionIcon,
    Group as CommunityIcon,
    AutoStories as EducationIcon,
    Lightbulb as InnovationIcon,
    FavoriteRounded as HeartIcon,

    MonetizationOn,
    TrendingUp,
    VolunteerActivism,
    Event as EventIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PathConstants from "../../routes/pathConstants";

// Mission pillars data
const missionPillars = [
    {
        id: 1,
        title: "Learn with Joy",
        subtitle: "Discover the wonder in every lesson",
        description: "We believe learning should be an adventure filled with excitement and curiosity. Our approach transforms education from a chore into a celebration, where every student discovers the joy in knowledge and develops a lifelong love for learning.",
        icon: JoyIcon,
        color: '#4caf50',
        bgGradient: 'linear-gradient(135deg, #4caf50, #66bb6a)',
        stats: { value: "60+", label: "Childrens Impacted" },
        features: [
            "Interactive learning experiences",
            "Gamified educational content",
            "Personalized learning paths",
            "Celebration of achievements"
        ]
    },
    {
        id: 2,
        title: "Give with Passion",
        subtitle: "Service from the heart",
        description: "Our commitment goes beyond teaching - we pour our hearts into every interaction. Every tutor, volunteer, and board member brings genuine passion to their role, creating meaningful connections that inspire both students and educators.",
        icon: PassionIcon,
        color: '#e91e63',
        bgGradient: 'linear-gradient(135deg, #e91e63, #f06292)',
        stats: { value: "3+", label: "Events and Programs" },
        features: [
            "Dedicated volunteer tutors",
            "Mentorship programs",
            "Community outreach initiatives",
            "Personal growth support"
        ]
    },
    {
        id: 3,
        title: "Change the World",
        subtitle: "Creating ripples of positive impact",
        description: "Every student we reach has the potential to create lasting change. By providing quality education and fostering leadership skills, we're not just teaching subjects - we're empowering the next generation of world-changers.",
        icon: ChangeIcon,
        color: '#2196f3',
        bgGradient: 'linear-gradient(135deg, #2196f3, #42a5f5)',
        stats: { value: "20+", label: "Active Volunteers" },
        features: [
            "Global educational access",
            "Leadership development",
            "Social impact projects",
            "Future innovator training"
        ]
    },
    {
        id: 4,
        title: "Fundraising for Good",
        subtitle: "Supporting causes that matter",
        description: "Our fundraising efforts extend beyond our organization to support various charitable causes. We believe in giving back to the community and using our platform to raise awareness and funds for important social issues.",
        icon: FundraisingIcon,
        color: '#ff9800',
        bgGradient: 'linear-gradient(135deg, #ff9800, #ffb74d)',
        stats: { value: "$2K+", label: "Funds Raised" },
        features: [
            "Charitable fundraising campaigns",
            "Community partnership events",
            "Social cause awareness",
            "Transparent fund allocation"
        ]
    }
];

// Impact metrics data
const impactMetrics = [
    { icon: EducationIcon, value: "60+", label: "Children Impacted", color: "#4caf50" },
    { icon: CommunityIcon, value: "20+", label: "Active Volunteers", color: "#2196f3" },
    { icon: EventIcon, value: "130", label: "Sessions Taught", color: "#e91e63" },
    { icon: FundraisingIcon, value: "$2K+", label: "Raised for Charity", color: "#ff9800" }
];

// Values data
const coreValues = [
    {
        icon: InnovationIcon,
        title: "Innovation",
        description: "We constantly seek creative solutions to educational challenges, embracing new technologies and methodologies.",
        color: "#9c27b0"
    },
    {
        icon: HeartIcon,
        title: "Compassion",
        description: "Every interaction is guided by empathy and genuine care for our students' wellbeing and success.",
        color: "#f44336"
    },
    {
        icon: TrendingUp,
        title: "Excellence",
        description: "We strive for the highest quality in everything we do, from curriculum design to student support.",
        color: "#3f51b5"
    },
    {
        icon: CommunityIcon,
        title: "Community",
        description: "Together we're stronger - building connections that create lasting positive change in society.",
        color: "#00bcd4"
    }
];

const MissionPillarCard = ({ pillar, index }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const IconComponent = pillar.icon;

    return (
        <Grow in={true} timeout={800 + index * 200}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    border: `3px solid ${pillar.color}`,
                    borderRadius: 4,
                    overflow: 'visible',
                    position: 'relative',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: theme.shadows[20],
                        '& .pillar-icon': {
                            transform: 'scale(1.1) rotate(5deg)',
                        },
                        '& .stats-chip': {
                            transform: 'scale(1.05)',
                        }
                    }
                }}
            >
                {/* Decorative top gradient */}
                <Box
                    sx={{
                        height: 8,
                        background: pillar.bgGradient,
                        borderRadius: '4px 4px 0 0'
                    }}
                />

                {/* Stats chip */}
                <Box
                    className="stats-chip"
                    sx={{
                        position: 'absolute',
                        top: -16,
                        right: 20,
                        background: pillar.bgGradient,
                        color: 'white',
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        boxShadow: theme.shadows[8],
                        transition: 'transform 0.3s ease',
                        zIndex: 2
                    }}
                >
                    {pillar.stats.value} {pillar.stats.label}
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 4, pt: 5 }}>
                    {/* Header */}
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Box
                            className="pillar-icon"
                            sx={{
                                display: 'inline-flex',
                                p: 2,
                                borderRadius: '50%',
                                background: `${pillar.color}20`,
                                mb: 3,
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <IconComponent
                                sx={{
                                    fontSize: 48,
                                    color: pillar.color
                                }}
                            />
                        </Box>

                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 1,
                                background: pillar.bgGradient,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {pillar.title}
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: pillar.color,
                                fontWeight: 600,
                                fontStyle: 'italic'
                            }}
                        >
                            {pillar.subtitle}
                        </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{
                            lineHeight: 1.7,
                            mb: 4,
                            fontSize: '1.05rem'
                        }}
                    >
                        {pillar.description}
                    </Typography>

                    {/* Features */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                color: pillar.color
                            }}
                        >
                            Key Features:
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {pillar.features.map((feature, featureIndex) => (
                                <Box
                                    key={featureIndex}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 1,
                                        borderRadius: 2,
                                        backgroundColor: `${pillar.color}08`,
                                        border: `1px solid ${pillar.color}20`,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: `${pillar.color}15`,
                                            transform: 'translateX(8px)'
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: pillar.color
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {feature}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grow>
    );
};

const ImpactMetric = ({ metric, index }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const IconComponent = metric.icon;

    return (
        <Fade in={true} timeout={600 + index * 150}>
            <Paper
                sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    border: `2px solid ${metric.color}30`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme => theme.shadows[12],
                        borderColor: metric.color,
                        '& .metric-icon': {
                            transform: 'scale(1.2) rotate(-5deg)',
                            color: metric.color
                        }
                    }
                }}
            >
                <IconComponent
                    className="metric-icon"
                    sx={{
                        fontSize: 56,
                        color: `${metric.color}80`,
                        mb: 2,
                        transition: 'all 0.3s ease'
                    }}
                />
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 900,
                        color: metric.color,
                        mb: 1
                    }}
                >
                    {metric.value}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontWeight: 600 }}
                >
                    {metric.label}
                </Typography>
            </Paper>
        </Fade>
    );
};

const ValueCard = ({ value, index }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const IconComponent = value.icon;

    return (
        <Grow in={true} timeout={1000 + index * 100}>
            <Box
                sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                    borderRadius: 3,
                    border: `2px solid ${value.color}30`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: `${value.color}10`,
                        borderColor: value.color,
                        transform: 'translateY(-4px)',
                        '& .value-icon': {
                            color: value.color,
                            transform: 'scale(1.1)'
                        }
                    }
                }}
            >
                <IconComponent
                    className="value-icon"
                    sx={{
                        fontSize: 40,
                        color: `${value.color}70`,
                        mb: 2,
                        transition: 'all 0.3s ease'
                    }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: value.color
                    }}
                >
                    {value.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                >
                    {value.description}
                </Typography>
            </Box>
        </Grow>
    );
};

export default function Mission() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const navigate = useNavigate(); // Add useNavigate hook

    // Replace window.location.href with navigate
    const handleVolunteerClick = () => {
        navigate(PathConstants.VOLUNTEER_OPPORTUNITIES);
    };

    const handleGetInvolvedClick = () => {
        navigate(PathConstants.DONATE_NOW);
    };

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
                <Box sx={{ textAlign: 'center', mb: { xs: 8, sm: 10, md: 12 } }}>
                    <Fade in={true} timeout={800}>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        p: 3,
                                        borderRadius: 4,
                                        background: isDarkMode
                                            ? 'linear-gradient(135deg, #1a1a1a, #2d2d2d)'
                                            : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                                        boxShadow: theme.shadows[12],
                                        border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`
                                    }}
                                >
                                    <LearnIcon sx={{ fontSize: 60, color: '#4caf50' }} />
                                    <GiveIcon sx={{ fontSize: 60, color: '#e91e63' }} />
                                    <ChangeIcon sx={{ fontSize: 60, color: '#2196f3' }} />
                                    <FundraisingIcon sx={{ fontSize: 60, color: '#ff9800' }} />
                                </Box>
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
                                Our Mission
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                                    color: 'primary.main',
                                    lineHeight: 1.3
                                }}
                            >
                                Learn with joy, give with passion, change the world!
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                                    color: 'primary.main',
                                    lineHeight: 1.3
                                }}
                            >
                                Fundraising for a good cause!
                            </Typography>

                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{
                                    maxWidth: '800px',
                                    mx: 'auto',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '1rem', sm: '1.2rem' },
                                    mb: 6
                                }}
                            >
                                At Enlighten Learning, we're a passionate team of high school students working together to make a difference in our community through collaborative leadership, impactful service, and positive change, driven by a vision to do something bigger than ourselves.
                            </Typography>
                        </Box>
                    </Fade>
                </Box>

                {/* Impact Metrics */}
                <Box sx={{ mb: { xs: 8, sm: 10, md: 12 } }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 800,
                            mb: 6,
                            background: 'linear-gradient(45deg, #2196f3, #42a5f5)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Our Impact by the Numbers
                    </Typography>

                    <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                        {impactMetrics.map((metric, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <ImpactMetric metric={metric} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ my: { xs: 6, sm: 8, md: 10 }, opacity: 0.3 }} />

                {/* Mission Pillars */}
                <Box sx={{ mb: { xs: 8, sm: 10, md: 12 } }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 800,
                            mb: 3,
                            background: 'linear-gradient(45deg, #4caf50, #e91e63, #2196f3, #ff9800)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        The Four Pillars of Our Mission
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            textAlign: 'center',
                            maxWidth: '600px',
                            mx: 'auto',
                            mb: 8,
                            lineHeight: 1.6
                        }}
                    >
                        Each pillar represents our commitment to creating lasting positive change through education and community service
                    </Typography>

                    <Grid container spacing={4} sx={{ mb: 6 }}>
                        {missionPillars.map((pillar, index) => (
                            <Grid item xs={12} lg={6} key={pillar.id}>
                                <MissionPillarCard pillar={pillar} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ my: { xs: 6, sm: 8, md: 10 }, opacity: 0.3 }} />

                {/* Core Values */}
                <Box sx={{ mb: { xs: 8, sm: 10, md: 12 } }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 800,
                            mb: 3,
                            background: 'linear-gradient(45deg, #9c27b0, #f44336)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Our Core Values
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            textAlign: 'center',
                            maxWidth: '600px',
                            mx: 'auto',
                            mb: 6,
                            lineHeight: 1.6
                        }}
                    >
                        These values guide everything we do and shape how we interact with our community
                    </Typography>

                    <Grid container spacing={4}>
                        {coreValues.map((value, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <ValueCard value={value} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Call to Action */}
                <Box
                    sx={{
                        textAlign: 'center',
                        p: { xs: 4, sm: 6, md: 8 },
                        borderRadius: 4,
                        background: isDarkMode
                            ? 'linear-gradient(135deg, #1e1e1e, #2d2d2d, #1a1a1a)'
                            : 'linear-gradient(135deg, #ffffff, #f8f9fa, #e3f2fd)',
                        border: `2px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
                        boxShadow: theme.shadows[12],
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Decorative background elements */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -50,
                            right: -50,
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #4caf5020, #2196f320)',
                            zIndex: 0
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -50,
                            left: -50,
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #e91e6320, #ff980020)',
                            zIndex: 0
                        }}
                    />

                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 800,
                                mb: 3,
                                background: 'linear-gradient(45deg, #4caf50, #2196f3)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Ready to Make a Difference?
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                mb: 6,
                                maxWidth: '700px',
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontSize: '1.1rem'
                            }}
                        >
                            Whether you're a student looking to learn, a volunteer ready to give, or someone
                            passionate about creating positive change, there's a place for you in our mission.
                            Join us in building a brighter, more educated world - one student at a time.
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleVolunteerClick}
                                endIcon={<VolunteerActivism />}
                                sx={{
                                    py: 2,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #45a049, #5cb85c)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Volunteer With Us
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleGetInvolvedClick}
                                endIcon={<MonetizationOn />}
                                sx={{
                                    py: 2,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    borderColor: '#ff9800',
                                    color: '#ff9800',
                                    borderWidth: 2,
                                    '&:hover': {
                                        backgroundColor: '#ff9800',
                                        color: 'white',
                                        transform: 'translateY(-2px)',
                                        borderColor: '#ff9800',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Support Our Cause
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}