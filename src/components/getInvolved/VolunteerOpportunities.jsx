import * as React from "react";
import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Chip,
    useTheme,
    useMediaQuery,
    Grid,
    Divider,
    Avatar,
} from "@mui/material";
import {
    ArrowBackIos as ArrowBackIcon,
    ArrowForwardIos as ArrowForwardIcon,
    Event as EventIcon,
    Schedule as ScheduleIcon,
    LocationOn as LocationIcon,
    Launch as LaunchIcon,
    People as PeopleIcon,
    AccessTime as AccessTimeIcon,
    Star as StarIcon,
    VolunteerActivism as VolunteerIcon,
    HourglassTop as UpcomingIcon,
    CheckCircle as CompletedIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";

// Updated volunteer opportunities data with three categories
const volunteerData = {
    open: [

    ],
    upcoming: [
        {
            id: 4,
            title: "Sweet Literature Event",
            date: "",
            time: "",
            location: "",
            description: "",
            formUrl: "",
            category: "",
            volunteersNeeded: "",
            duration: "",
            skillLevel: "",
            coordinator: "Brianna Tam"
        },

    ],
    past: [
        {
            id: 1,
            title: "The Art of Winter Crafts Event",
            date: "2025-01-10",
            time: "4:00 PM - 6:00 PM",
            location: "Shelter Rock Library",
            description: "Get creative this winter at our fun-filled crafts event! We'll have all the materials you need to make a 3D snowman and snowflakes.",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSda9fa92M-4Q0x_8q6c1xc5yBhtGfei78FHhauze_CrSkcztQ/viewform?usp=dialog",
            category: "Arts and Craft",
            totalParticipants: 30,
            duration: "2 hours",
            coordinator: "Brianna Tam"
        },
        {
            id: 2,
            title: "Easter Fun Fest",
            date: "2025-04-18",
            time: "4:00 PM - 6:00 PM",
            location: "Ridder's Pond Park",
            description: "Come and join us for a day full of surprises! We will have a scavenger hunt, crafts and field game, there will be prizes!",
            formUrl: "https://forms.gle/vAF6viqg8trKTs4Z8",
            category: "Scavenger Hunt",
            totalParticipants: 35,
            duration: "2 hours",
            coordinator: "Brianna Tam"
        },
        {
            id: 3,
            title: "Summer Volleyball Program",
            date: "2025-07-21 - 2025-08-25",
            time: "1:00 PM - 2:00 PM",
            location: "Herricks Middle School Field",
            description: "Need an athletic summer schedule? Help coach beginner sports course to elementary students, and earn hours for it.",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe1bsWgjxfdHf3V9JNC-mPobgZkw_p_OUvr_IXg7H2j2Om8nw/viewform?usp=dialog",
            category: "Volleyball",
            totalParticipants: 45,
            duration: "1 hours",
            coordinator: "Brianna Tam"
        },
    ]
};

const getCategoryColor = (category) => {
    const colors = {
        Environment: "success",
        Education: "primary",
        "Community Service": "secondary",
        "Animal Care": "warning",
        Healthcare: "info",
        "Youth Programs": "error",
    };
    return colors[category] || "default";
};

const getSkillLevelColor = (skillLevel) => {
    const colors = {
        Beginner: "success",
        Intermediate: "warning",
        Advanced: "error",
    };
    return colors[skillLevel] || "default";
};

const getSectionConfig = (section) => {
    const configs = {
        open: {
            borderColor: '#4caf50', // Green border
            statusBgColor: '#4caf50',
            statusText: 'OPEN NOW',
            buttonColor: '#4caf50',
            buttonHoverColor: '#45a049',
            titleColor: '#4caf50',
            buttonText: 'Sign Up Now',
            statsColor: '#4caf50'
        },
        upcoming: {
            borderColor: '#ff9800', // Orange border
            statusBgColor: '#ff9800',
            statusText: 'UPCOMING',
            buttonColor: '#ff9800',
            buttonHoverColor: '#f57c00',
            titleColor: '#ff9800',
            buttonText: 'Registration Opens Soon',
            statsColor: '#ff9800'
        },
        past: {
            borderColor: '#2196f3', // Blue border
            statusBgColor: '#2196f3',
            statusText: 'COMPLETED',
            buttonColor: '#2196f3',
            buttonHoverColor: '#1976d2',
            titleColor: '#2196f3',
            buttonText: 'Event Details',
            statsColor: '#2196f3'
        }
    };
    return configs[section];
};

const VolunteerCard = ({ volunteer, section }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const config = getSectionConfig(section);

    const handleFormClick = () => {
        window.open(volunteer.formUrl, '_blank');
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                border: `3px solid ${config.borderColor}`,
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
            {/* Status Badge */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -12,
                    right: 16,
                    backgroundColor: config.statusBgColor,
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
                {config.statusText}
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 3, pt: 4 }}>
                {/* Header */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
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
                            {volunteer.title}
                        </Typography>
                        <VolunteerIcon sx={{ color: config.titleColor }} />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        <Chip
                            label={volunteer.category}
                            color={getCategoryColor(volunteer.category)}
                            size="small"
                        />
                        {(section === 'open' || section === 'upcoming') && (
                            <Chip
                                label={volunteer.skillLevel}
                                color={getSkillLevelColor(volunteer.skillLevel)}
                                size="small"
                                variant="outlined"
                            />
                        )}
                    </Box>
                </Box>

                {/* Event Details */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <EventIcon fontSize="small" sx={{ color: config.titleColor }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {volunteer.date}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <ScheduleIcon fontSize="small" sx={{ color: config.titleColor }} />
                        <Typography variant="body2" color="text.secondary">
                            {volunteer.time}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LocationIcon fontSize="small" sx={{ color: config.titleColor }} />
                        <Typography variant="body2" color="text.secondary">
                            {volunteer.location}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <AccessTimeIcon fontSize="small" sx={{ color: config.titleColor }} />
                        <Typography variant="body2" color="text.secondary">
                            Duration: {volunteer.duration}
                        </Typography>
                    </Box>
                </Box>

                {/* Stats */}
                <Box sx={{
                    backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                    borderRadius: 2,
                    p: 2,
                    mb: 2
                }}>
                    <Grid container spacing={2}>
                        {/* For open and upcoming events - show volunteers needed and coordinator */}
                        {(section === 'open' || section === 'upcoming') && (
                            <>
                                <Grid item xs={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <PeopleIcon sx={{ color: config.statsColor, mb: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Volunteers Needed
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: config.statsColor }} fontWeight="bold">
                                            {volunteer.volunteersNeeded}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <StarIcon color="secondary" sx={{ mb: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Coordinator
                                        </Typography>
                                        <Typography variant="body2" fontWeight="bold" color="text.primary">
                                            {volunteer.coordinator}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </>
                        )}

                        {/* For past events - show total participants and coordinator */}
                        {section === 'past' && (
                            <>
                                <Grid item xs={12}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <PeopleIcon sx={{ color: config.statsColor, mb: 0.5, fontSize: '2rem' }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Total Participants
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            sx={{ color: config.statsColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}
                                            fontWeight="bold"
                                        >
                                            {volunteer.totalParticipants}
                                            <Typography
                                                component="span"
                                                sx={{
                                                    fontSize: '1.5rem',
                                                    color: config.statsColor,
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                +
                                            </Typography>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>

                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ lineHeight: 1.6, mb: 2 }}
                >
                    {volunteer.description}
                </Typography>

                {section === 'past' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Coordinated by:
                        </Typography>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                            {volunteer.coordinator.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" fontWeight="600">
                            {volunteer.coordinator}
                        </Typography>
                    </Box>
                )}
            </CardContent>

            <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={section === 'upcoming' || section === 'past' ? undefined : handleFormClick}
                    endIcon={<LaunchIcon />}
                    disabled={section === 'upcoming' || section === 'past'}
                    sx={{
                        backgroundColor: (section === 'upcoming' || section === 'past') ? '#e0e0e0' : config.buttonColor,
                        color: (section === 'upcoming' || section === 'past') ? '#9e9e9e' : 'white',
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        cursor: (section === 'upcoming' || section === 'past') ? 'not-allowed' : 'pointer',
                        '&:hover': {
                            backgroundColor: (section === 'upcoming' || section === 'past') ? '#e0e0e0' : config.buttonHoverColor,
                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#e0e0e0',
                            color: '#9e9e9e',
                        }
                    }}
                >
                    {config.buttonText}
                </Button>
            </CardActions>
        </Card>
    );
};

const VolunteerCarousel = ({ volunteers, section, title, subtitle, icon: Icon }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const theme = useTheme();
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const config = getSectionConfig(section);

    const getItemsPerSlide = () => {
        if (isMobile) return 1;
        if (isTablet) return 2;
        return 3;
    };

    const itemsPerSlide = getItemsPerSlide();
    const maxIndex = Math.max(0, Math.ceil(volunteers.length / itemsPerSlide) - 1);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const getVisibleVolunteers = () => {
        const startIndex = currentIndex * itemsPerSlide;
        return volunteers.slice(startIndex, startIndex + itemsPerSlide);
    };

    if (volunteers.length === 0) {
        const emptyMessages = {
            open: {
                title: "No Open Opportunities Right Now",
                subtitle: "We're planning some amazing volunteer experiences! Please check back soon for new opportunities to make a difference in your community.",
                icon: VolunteerIcon
            },
            upcoming: {
                title: "No Upcoming Events Scheduled",
                subtitle: "New volunteer opportunities are in the works! Follow us on social media or check back regularly for exciting events on the horizon.",
                icon: UpcomingIcon
            },
            past: {
                title: "Building Our Impact History",
                subtitle: "This is where we'll showcase all the incredible work we've accomplished together. Stay tuned as we grow our community impact!",
                icon: CompletedIcon
            }
        };

        const message = emptyMessages[section];

        return (
            <Box sx={{
                textAlign: 'center',
                py: 8,
                backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa',
                borderRadius: 3,
                border: `2px dashed ${config.titleColor}`,
                mx: 2
            }}>
                <message.icon sx={{ fontSize: 80, color: config.titleColor, mb: 3, opacity: 0.7 }} />
                <Typography variant="h5" sx={{ color: config.titleColor, fontWeight: 600, mb: 2 }}>
                    {message.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{
                    mt: 1,
                    maxWidth: '500px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontSize: '1.1rem'
                }}>
                    {message.subtitle}
                </Typography>
                {section === 'open' && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            In the meantime, check out our upcoming events below! ⬇️
                        </Typography>
                    </Box>
                )}
            </Box>
        );
    }

    return (
        <Box sx={{ mb: 8 }}>
            {/* Section Header */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Icon sx={{ fontSize: { xs: 40, sm: 50 }, color: config.titleColor }} />
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 800,
                            color: config.titleColor,
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
            {volunteers.length > itemsPerSlide && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            sx={{
                                border: '2px solid',
                                borderColor: config.titleColor,
                                color: config.titleColor,
                                '&:hover': {
                                    backgroundColor: config.titleColor,
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
                                borderColor: config.titleColor,
                                color: config.titleColor,
                                '&:hover': {
                                    backgroundColor: config.titleColor,
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
                    minHeight: '500px'
                }}
            >
                {getVisibleVolunteers().map((volunteer) => (
                    <VolunteerCard
                        key={volunteer.id}
                        volunteer={volunteer}
                        section={section}
                    />
                ))}
            </Box>

            {/* Pagination Dots */}
            {volunteers.length > itemsPerSlide && (
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
                                    ? config.titleColor
                                    : 'text.disabled',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '2px solid',
                                borderColor: index === currentIndex
                                    ? config.titleColor
                                    : 'transparent',
                                '&:hover': {
                                    transform: 'scale(1.2)',
                                    backgroundColor: config.titleColor,
                                }
                            }}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default function VolunteerOpportunities() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

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
            <Container maxWidth="lg">
                {/* Page Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8, md: 10 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <VolunteerIcon
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
                        Volunteer Opportunities
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{
                            maxWidth: '700px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontSize: { xs: '1.1rem', sm: '1.3rem' },
                            mb: 4
                        }}
                    >
                        Make a difference in your community! Join our dedicated volunteers in creating positive change
                        through meaningful service opportunities.
                    </Typography>

                    {/* Stats Section */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 4,
                        mt: 4
                    }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#4caf50' }} fontWeight="bold">
                                {volunteerData.open.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Open Now
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#ff9800' }} fontWeight="bold">
                                {volunteerData.upcoming.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Upcoming Events
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" color="primary.main" fontWeight="bold">
                                {volunteerData.past.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Completed Projects
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" color="secondary.main" fontWeight="bold">
                                110+
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Lives Impacted
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Open Opportunities (Green) */}
                <VolunteerCarousel
                    volunteers={volunteerData.open}
                    section="open"
                    title="Open Now"
                    subtitle="Join these exciting volunteer opportunities happening soon! Registration is open and spots are available."
                    icon={VolunteerIcon}
                />

                <Divider sx={{ my: 8, borderColor: isDarkMode ? '#333' : '#ddd' }} />

                {/* Upcoming Opportunities (Orange) */}
                <VolunteerCarousel
                    volunteers={volunteerData.upcoming}
                    section="upcoming"
                    title="Coming Soon"
                    subtitle="Get ready for these amazing upcoming volunteer opportunities! "
                    icon={UpcomingIcon}
                />

                <Divider sx={{ my: 8, borderColor: isDarkMode ? '#333' : '#ddd' }} />

                {/* Past Opportunities (Blue) */}
                <VolunteerCarousel
                    volunteers={volunteerData.past}
                    section="past"
                    title="Our Impact Together"
                    subtitle="Celebrate the amazing work we've accomplished with our incredible volunteers! See the difference we've made in our community."
                    icon={CompletedIcon}
                />
            </Container>
        </Box>
    );
}