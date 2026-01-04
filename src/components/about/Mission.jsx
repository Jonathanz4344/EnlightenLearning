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
    Handshake as HandshakeIcon,
    LocalHospital as CareIcon,
    FamilyRestroom as FamilyIcon,
    Favorite as FavoriteIcon, // Add this line
    Stars as StarsIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../routes/pathConstants";

// Mission pillars data - updated to reflect charitable focus
const missionPillars = [
    {
        id: 1,
        title: "Learn with Joy",
        subtitle: "Discover the wonder in every lesson",
        description: "We believe learning should be an exciting journey of curiosity and discovery. Our wish is for every student to find the joy in knowledge, cultivate a lifelong passion for learning, and grow into thoughtful individuals who'll make a difference in the world. Every lesson is a step towards our mission of helping those in need.",
        icon: JoyIcon,
        color: '#4caf50',
        bgGradient: 'linear-gradient(135deg, #4caf50, #66bb6a)',
        stats: { value: "30+", label: "Active Volunteers" },
        features: [
            "Personalized learning paths",
            "Interactive learning experience",
            "Mentorship from passionate tutors",
            "Learning that gives back to charity"
        ]
    },
    {
        id: 2,
        title: "Give with Passion",
        subtitle: "Service from the heart",
        description: "Our commitment goes beyond teaching—we are dedicated to building a brighter future for the next generation. We pour our hearts into every interaction and charitable cause, creating meaningful connections that inspire the children in our community to learn and grow. Together we are making a tangible difference in countless lives.",
        icon: PassionIcon,
        color: '#e91e63',
        bgGradient: 'linear-gradient(135deg, #e91e63, #f06292)',
        stats: { value: "180+", label: "Sessions Taught" },
        features: [
            "Dedicated volunteer tutors",
            "Charitable tutoring programs",
            "Community events and initiatives",
            "Giving back to those in need"
        ]
    },
    {
        id: 3,
        title: "Change the World",
        subtitle: "Creating ripples of positive impact",
        description: "Every individual we reach has the potential to create lasting change. By providing quality education, and fostering compassion for others, we are empowering the next generation to be world changers. Each step, each individual, all working towards creating a brighter tomorrow. ",
        icon: ChangeIcon,
        color: '#2196f3',
        bgGradient: 'linear-gradient(135deg, #2196f3, #42a5f5)',
        stats: { value: "200+", label: "Lives Impacted" },
        features: [
            "Youth empowerment",
            "Purpose driven learning",
            "Fostering community",
            "Charitable mission"
        ]
    },
    {
        id: 4,
        title: "Fundraising for Good",
        subtitle: "Supporting causes that matter",
        description: "Our fundraising efforts are at the heart of our mission. We're passionate about raising funds for multiple charities that provide hope, support, and care to children and families in need. When you learn with us or support our mission with a donation, you're directly contributing to life changing causes. ",
        icon: FundraisingIcon,
        color: '#ff9800',
        bgGradient: 'linear-gradient(135deg, #ff9800, #ffb74d)',
        stats: { value: "$2K+", label: "Funds Raised" },
        features: [
            "Multiple charity partnerships",
            "Supporting families in need ",
            "Driving meaningful change",
            "Life changing donations"
        ]
    }
];

// Impact metrics data
const impactMetrics = [
    { icon: EducationIcon, value: "200+", label: "Lives Impacted", color: "#4caf50" },
    { icon: CommunityIcon, value: "30+", label: "Active Volunteers", color: "#2196f3" },
    { icon: EventIcon, value: "180+", label: "Sessions Taught", color: "#e91e63" },
    { icon: FundraisingIcon, value: "$2K+", label: "Raised for Charity", color: "#ff9800" }
];

// Values data - updated to include charitable commitment
const coreValues = [
    {
        icon: InnovationIcon,
        title: "Innovation",
        description: "We constantly seek creative solutions to educational challenges while finding new ways to support charitable causes.",
        color: "#9c27b0"
    },
    {
        icon: HeartIcon,
        title: "Compassion",
        description: "Every interaction is guided by empathy and genuine care for our students' wellbeing and for those in need in our community.",
        color: "#f44336"
    },
    {
        icon: TrendingUp,
        title: "Excellence",
        description: "We strive for the highest quality in education and charitable impact, ensuring every donation makes a meaningful difference.",
        color: "#3f51b5"
    },
    {
        icon: CommunityIcon,
        title: "Community",
        description: "Together we're stronger - building connections that create lasting positive change while supporting families in need.",
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

const CharitableCommitmentCard = ({ commitment, index }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const IconComponent = commitment.icon;

    return (
        <Grow in={true} timeout={1200 + index * 150}>
            <Card
                sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                    border: `2px solid ${commitment.color}40`,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: `${commitment.color}05`,
                        borderColor: commitment.color,
                        transform: 'translateY(-8px)',
                        boxShadow: theme => theme.shadows[16],
                        '& .commitment-icon': {
                            color: commitment.color,
                            transform: 'scale(1.2) rotate(10deg)'
                        }
                    }
                }}
            >
                <IconComponent
                    className="commitment-icon"
                    sx={{
                        fontSize: 48,
                        color: `${commitment.color}70`,
                        mb: 3,
                        transition: 'all 0.3s ease'
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: commitment.color
                    }}
                >
                    {commitment.title}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                >
                    {commitment.description}
                </Typography>
            </Card>
        </Grow>
    );
};

export default function Mission() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const navigate = useNavigate();

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
                                Who We Are
                            </Typography>

                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{
                                    maxWidth: '900px',
                                    mx: 'auto',
                                    lineHeight: 1.8,
                                    fontSize: { xs: '1rem', sm: '1.2rem' },
                                    mb: 6
                                }}
                            >
                                Enlighten Learning is more than an educational platform—it's a movement to create a brighter future through knowledge and compassion. We believe education should empower minds and inspire action, which is why giving back to those in need is at the heart of everything we do.
                            </Typography>

                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                                    color: 'primary.main',
                                    lineHeight: 1.3
                                }}
                            >
                                Learn. Grow. Give Back.
                            </Typography>
                        </Box>
                    </Fade>
                </Box>

                {/* Mission Section */}
                <Box sx={{ mb: { xs: 8, sm: 10, md: 12 } }}>

                    <Grid container spacing={6}>
                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    background: isDarkMode
                                        ? 'linear-gradient(135deg, #1e1e1e, #2d2d2d)'
                                        : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                                    border: '2px solid #4caf50',
                                    borderRadius: 4
                                }}

                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,
                                        color: '#2196f3'
                                    }}
                                >
                                    Our Mission
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                                    We're on a mission to give back, supporting charities that bring hope, care, and opportunities to those in need. Our proceeds support multiple charities to help children and families in need.
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem', mt: 3 }}>
                                    To foster bright minds while making a meaningful difference in the world. We strive to empower the next generation by providing high quality learning experiences while supporting life-changing causes.
                                </Typography>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    background: isDarkMode
                                        ? 'linear-gradient(135deg, #1e1e1e, #2d2d2d)'
                                        : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                                    border: '2px solid #2196f3',
                                    borderRadius: 4
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,
                                        color: '#2196f3'
                                    }}
                                >
                                    Our Vision
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                                    To create a world where education and compassion work hand in hand—guiding young learners to reach their fullest potential and improving lives locally.
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem', mt: 3 }}>
                                    Our fundraising initiative is fueled by a passion for education and a commitment to helping those in need.
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
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

                {/* Charitable Commitment Section */}
                {/* Enhanced Charitable Commitment Section */}
                <Box sx={{
                    mb: { xs: 8, sm: 10, md: 12 },
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Background enhancement */}
                    <Box sx={{
                        position: 'absolute',
                        top: -50,
                        left: -50,
                        right: -50,
                        bottom: -50,
                        background: isDarkMode
                            ? 'radial-gradient(ellipse at center, rgba(233, 30, 99, 0.1) 0%, rgba(255, 152, 0, 0.05) 50%, transparent 100%)'
                            : 'radial-gradient(ellipse at center, rgba(233, 30, 99, 0.05) 0%, rgba(255, 152, 0, 0.03) 50%, transparent 100%)',
                        zIndex: 0
                    }} />

                    {/* Main content container */}
                    <Card sx={{
                        position: 'relative',
                        zIndex: 1,
                        p: { xs: 4, sm: 6, md: 8 },
                        background: isDarkMode
                            ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.95), rgba(40, 40, 40, 0.95))'
                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 249, 250, 0.95))',
                        backdropFilter: 'blur(20px)',
                        border: `3px solid`,
                        borderImage: 'linear-gradient(45deg, #e91e63, #ff9800, #e91e63) 1',
                        borderRadius: 6,
                        boxShadow: isDarkMode
                            ? '0 20px 60px rgba(233, 30, 99, 0.2), 0 8px 32px rgba(255, 152, 0, 0.1)'
                            : '0 20px 60px rgba(233, 30, 99, 0.15), 0 8px 32px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: isDarkMode
                                ? '0 30px 80px rgba(233, 30, 99, 0.3), 0 12px 40px rgba(255, 152, 0, 0.15)'
                                : '0 30px 80px rgba(233, 30, 99, 0.2), 0 12px 40px rgba(0, 0, 0, 0.12)',
                        }
                    }}>
                        {/* Decorative icon cluster */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                            gap: 2
                        }}>
                            <FavoriteIcon sx={{
                                fontSize: { xs: 48, md: 64 },
                                color: '#e91e63',
                                animation: 'heartbeat 2s infinite',
                                '@keyframes heartbeat': {
                                    '0%, 100%': { transform: 'scale(1)' },
                                    '50%': { transform: 'scale(1.1)' }
                                }
                            }} />
                            <HandshakeIcon sx={{
                                fontSize: { xs: 48, md: 64 },
                                color: '#ff9800',
                                animation: 'shake 3s infinite',
                                '@keyframes shake': {
                                    '0%, 100%': { transform: 'rotate(0deg)' },
                                    '25%': { transform: 'rotate(5deg)' },
                                    '75%': { transform: 'rotate(-5deg)' }
                                }
                            }} />
                            <CareIcon sx={{
                                fontSize: { xs: 48, md: 64 },
                                color: '#4caf50',
                                animation: 'pulse 2.5s infinite',
                                '@keyframes pulse': {
                                    '0%, 100%': { opacity: 1 },
                                    '50%': { opacity: 0.7 }
                                }
                            }} />
                        </Box>

                        <Typography
                            variant="h2" // Increased from h3
                            component="h2"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 900, // Increased from 800
                                mb: 4, // Increased from 3
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, // Much larger
                                background: 'linear-gradient(45deg, #e91e63, #ff9800, #e91e63)',
                                backgroundSize: '200% 200%',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'gradientShift 3s ease infinite',
                                '@keyframes gradientShift': {
                                    '0%': { backgroundPosition: '0% 50%' },
                                    '50%': { backgroundPosition: '100% 50%' },
                                    '100%': { backgroundPosition: '0% 50%' }
                                },
                                textShadow: 'none',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.1
                            }}
                        >
                            Our Charitable Commitment
                        </Typography>

                        <Typography
                            variant="h4" // Increased from h6
                            color="text.secondary"
                            sx={{
                                textAlign: 'center',
                                maxWidth: '900px', // Increased from 800px
                                mx: 'auto',
                                mb: 4, // Increased from 3
                                lineHeight: 1.7, // Increased from 1.6
                                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }, // Much larger
                                fontWeight: 500
                            }}
                        >
                            We're on a mission to raise as much as we can for as many institutions as possible. Enlighten Learning proudly supports charities that provide hope, support and care to those in need.
                        </Typography>

                        {/* Featured callout box */}
                        <Card sx={{
                            p: { xs: 3, md: 4 },
                            mb: 6,
                            background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(255, 152, 0, 0.1))',
                            border: '2px solid',
                            borderImage: 'linear-gradient(45deg, #e91e63, #ff9800) 1',
                            borderRadius: 4,
                            textAlign: 'center'
                        }}>
                            <Typography
                                variant="h3" // Increased from body1
                                color="primary.main"
                                sx={{
                                    fontWeight: 700, // Increased from 600
                                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Much larger
                                    mb: 2,
                                    fontStyle: 'italic',
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                🌟 When you learn with us, you're also helping children and families in need 🌟
                            </Typography>

                            <Typography
                                variant="h5" // Added additional emphasis text
                                sx={{
                                    fontWeight: 600,
                                    color: '#e91e63',
                                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
                                }}
                            >
                                Together, we can change lives and make a positive impact on as many lives as possible.
                            </Typography>
                        </Card>

                        {/* Impact statistics showcase */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 6
                        }}>
                            <Card sx={{
                                p: 3,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #e91e63, #f06292)',
                                color: 'white',
                                borderRadius: 3,
                                minWidth: { xs: '100%', sm: '200px' },
                                transform: 'rotate(-2deg)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'rotate(0deg) scale(1.05)',
                                }
                            }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
                                    $2K+
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Raised for Charity
                                </Typography>
                            </Card>

                            <Card sx={{
                                p: 3,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #ff9800, #ffb74d)',
                                color: 'white',
                                borderRadius: 3,
                                minWidth: { xs: '100%', sm: '200px' },
                                transform: 'rotate(2deg)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'rotate(0deg) scale(1.05)',
                                }
                            }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
                                    200+
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Lives Impacted
                                </Typography>
                            </Card>
                        </Box>
                    </Card>
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
                            mb: 6,
                            lineHeight: 1.6
                        }}
                    >
                        These four pillars guide everything we do, from our educational approach to our commitment to charitable giving.
                    </Typography>

                    <Grid container spacing={4}>
                        {missionPillars.map((pillar, index) => (
                            <Grid item xs={12} lg={6} key={pillar.id}>
                                <MissionPillarCard pillar={pillar} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ my: { xs: 6, sm: 8, md: 10 }, opacity: 0.3 }} />

                {/* Call to Action Section */}
                <Box
                    sx={{
                        textAlign: 'center',
                        p: { xs: 4, sm: 6, md: 8 },
                        borderRadius: 4,
                        background: isDarkMode
                            ? 'linear-gradient(135deg, #1a1a1a, #2d2d2d)'
                            : 'linear-gradient(135deg, #f8f9fa, #ffffff)',
                        border: `2px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
                        boxShadow: theme.shadows[12]
                    }}
                >
                    <StarsIcon
                        sx={{
                            fontSize: 64,
                            color: '#ff9800',
                            mb: 3
                        }}
                    />

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 3,
                            background: 'linear-gradient(45deg, #4caf50, #2196f3)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Join Our Mission
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            maxWidth: '700px',
                            mx: 'auto',
                            mb: 4,
                            lineHeight: 1.7
                        }}
                    >
                        Together, we can create a brighter future through education and fundraising. Whether you volunteer your time, make a donation, or simply spread the word—every action makes a difference.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 4
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleVolunteerClick}
                            startIcon={<VolunteerActivism />}
                            sx={{
                                py: 2,
                                px: 4,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: theme.shadows[8]
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
                            startIcon={<MonetizationOn />}
                            sx={{
                                py: 2,
                                px: 4,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderColor: '#2196f3',
                                color: '#2196f3',
                                '&:hover': {
                                    borderColor: '#1976d2',
                                    backgroundColor: '#2196f310',
                                    transform: 'translateY(-2px)',
                                    boxShadow: theme.shadows[8]
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Support Our Cause
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}