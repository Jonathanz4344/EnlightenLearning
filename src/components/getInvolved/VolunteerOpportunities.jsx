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
    Today as ExpirationIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";

// Simplified volunteer data - single array with all opportunities
const volunteerData = [
    {
        id: 1,
        title: "The Art of Winter Crafts Event",
        date: "2025-01-10",
        time: "4:00 PM - 6:00 PM",
        location: "Shelter Rock Library",
        description: "Assist the children in creating winter crafts to celebrate the season. We will be making a 3D snowman and paper snowflakes.",
        formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSda9fa92M-4Q0x_8q6c1xc5yBhtGfei78FHhauze_CrSkcztQ/viewform?usp=dialog",
        category: "Arts and Craft",
        volunteersNeeded: 10,
        totalParticipants: 30,
        duration: "2 hours",
        coordinator: "Enlighten Learning",
        registrationStartDate: "2025-01-01",
        expirationDate: "2025-01-10", // Past event
    },
    {
        id: 2,
        title: "Easter Fun Fest",
        date: "2025-04-18",
        time: "4:00 PM - 6:00 PM",
        location: "Ridder's Pond Park",
        description: "Guide a scavenger hunt for the community children to celebrate Easter! Volunteers will also help run exciting field games and competitions.",
        formUrl: "https://forms.gle/vAF6viqg8trKTs4Z8",
        category: "Scavenger Hunt",
        volunteersNeeded: 10,
        totalParticipants: 30,
        duration: "2 hours",
        coordinator: "Enlighten Learning",
        registrationStartDate: "2025-04-01",
        expirationDate: "2025-04-18", // Past event
    },
    {
        id: 3,
        title: "Veterans Day Card Marking",
        date: "",
        time: "",
        location: "",
        description: "Join us in creating heartfelt cards for veterans. We will be giving these cards to veterans to express our gratitude for their service. This is a wonderful opportunity to honor those who have served our country.",
        formUrl: "",
        category: "Literature",
        volunteersNeeded: 30,
        totalParticipants: 30,
        duration: "",
        coordinator: "Enlighten Learning",
        registrationStartDate: "22023-07-01",
        expirationDate: "",
    },
    {
        id: 4,
        title: "Summer Volleyball Clinic",
        date: "2025-07-21 - 2025-08-25",
        time: "10:30 AM - 12:00 PM",
        location: "Park Circle",
        description: "Need an athletic summer schedule? Help coach the community kids at our introductory volleyball clinic.",
        formUrl: "",
        category: "Volleyball",
        volunteersNeeded: 30,
        totalParticipants: 30,
        duration: "1.5 hours",
        coordinator: "Enlighten Learning",
        registrationStartDate: "2025-07-01",
        expirationDate: "2025-08-25",
    },


];

// Helper function to get today's date without time
const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
};

// Helper function to parse date string to Date object
const parseDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
};

// Function to determine the status of a volunteer opportunity
const getVolunteerStatus = (volunteer) => {
    const today = getTodayDate();
    const expirationDate = parseDate(volunteer.expirationDate);
    const registrationStartDate = parseDate(volunteer.registrationStartDate);

    // If expiration date has passed, it's a past event
    if (expirationDate && expirationDate < today) {
        return 'past';
    }

    // If there's a registration start date and it hasn't arrived yet, it's upcoming
    if (registrationStartDate && registrationStartDate > today) {
        return 'upcoming';
    }

    // Otherwise, it's open for registration
    return 'open';
};

// Function to categorize volunteers based on their status
const categorizeVolunteers = () => {
    const categorized = {
        open: [],
        upcoming: [],
        past: []
    };

    volunteerData.forEach(volunteer => {
        const status = getVolunteerStatus(volunteer);
        categorized[status].push(volunteer);
    });

    return categorized;
};

const getCategoryColor = (category) => {
    const colors = {
        Environment: "success",
        Education: "primary",
        "Community Service": "secondary",
        "Animal Care": "warning",
        Healthcare: "info",
        "Youth Programs": "error",
        Volleyball: "primary",
        "Arts and Craft": "secondary",
        "Scavenger Hunt": "warning",
        Literature: "info",
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
            borderColor: '#4caf50',
            statusBgColor: '#4caf50',
            statusText: 'OPEN NOW',
            buttonColor: '#4caf50',
            buttonHoverColor: '#45a049',
            titleColor: '#4caf50',
            buttonText: 'Sign Up Now',
            statsColor: '#4caf50'
        },
        upcoming: {
            borderColor: '#ff9800',
            statusBgColor: '#ff9800',
            statusText: 'UPCOMING',
            buttonColor: '#ff9800',
            buttonHoverColor: '#f57c00',
            titleColor: '#ff9800',
            buttonText: 'Registration Opens Soon',
            statsColor: '#ff9800'
        },
        past: {
            borderColor: '#2196f3',
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
        if (volunteer.formUrl) {
            window.open(volunteer.formUrl, '_blank');
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Check if expiration is soon (within 7 days)
    const isExpiringSoon = (dateString) => {
        if (!dateString) return false;
        const expirationDate = parseDate(dateString);
        const today = getTodayDate();
        const sevenDaysFromNow = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));
        return expirationDate <= sevenDaysFromNow && expirationDate >= today;
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

            {/* Expiring Soon Warning */}
            {section === 'open' && volunteer.expirationDate && isExpiringSoon(volunteer.expirationDate) && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: -12,
                        left: 16,
                        backgroundColor: '#ff5722',
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        zIndex: 1,
                        boxShadow: theme.shadows[4]
                    }}
                >
                    EXPIRING SOON!
                </Box>
            )}

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
                        {(section === 'open' || section === 'upcoming') && volunteer.skillLevel && (
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

                    {/* Registration Opens Date for Upcoming Events */}
                    {/* {section === 'upcoming' && volunteer.registrationStartDate && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ExpirationIcon fontSize="small" sx={{ color: config.titleColor }} />
                            <Typography variant="body2" color="text.secondary">
                                Registration Opens: {formatDate(volunteer.registrationStartDate)}
                            </Typography>
                        </Box>
                    )} */}

                    {/* Expiration Date for Open Events */}
                    {section === 'open' && volunteer.expirationDate && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ExpirationIcon fontSize="small" sx={{
                                color: isExpiringSoon(volunteer.expirationDate) ? '#ff5722' : config.titleColor
                            }} />
                            <Typography
                                variant="body2"
                                sx={{
                                    color: isExpiringSoon(volunteer.expirationDate) ? '#ff5722' : 'text.secondary',
                                    fontWeight: isExpiringSoon(volunteer.expirationDate) ? 600 : 400
                                }}
                            >
                                Registration Closes: {formatDate(volunteer.expirationDate)}
                            </Typography>
                        </Box>
                    )}
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
                                            {volunteer.totalParticipants || volunteer.volunteersNeeded}
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
                    onClick={section === 'open' ? handleFormClick : undefined}
                    endIcon={<LaunchIcon />}
                    disabled={section === 'upcoming' || section === 'past' || !volunteer.formUrl}
                    sx={{
                        backgroundColor: (section === 'upcoming' || section === 'past' || !volunteer.formUrl) ? '#e0e0e0' : config.buttonColor,
                        color: (section === 'upcoming' || section === 'past' || !volunteer.formUrl) ? '#9e9e9e' : 'white',
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        cursor: (section === 'upcoming' || section === 'past' || !volunteer.formUrl) ? 'not-allowed' : 'pointer',
                        '&:hover': {
                            backgroundColor: (section === 'upcoming' || section === 'past' || !volunteer.formUrl) ? '#e0e0e0' : config.buttonHoverColor,
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
                                borderColor: index === currentIndex ? config.titleColor
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

const VolunteerOpportunities = () => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const categorizedData = categorizeVolunteers();

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
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px',
                        }}
                    >
                        Volunteer Opportunities
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            maxWidth: '700px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontSize: { xs: '1rem', sm: '1.2rem' }
                        }}
                    >
                        Join us in making a difference! Explore current, upcoming, and past volunteer
                        opportunities to get involved and contribute to your community.
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
                                {categorizedData.current.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Current Events
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#ff9800' }} fontWeight="bold">
                                {categorizedData.future.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Upcoming Events
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" color="secondary.main" fontWeight="bold">
                                100+
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Lives Impacted
                            </Typography>
                        </Box>
                    </Box>

                </Box>



                {/* Open Opportunities */}
                <VolunteerCarousel
                    volunteers={categorizedData.open}
                    section="open"
                    title="Open Opportunities"
                    subtitle="These events are currently open for registration. Sign up today to reserve your spot and make an impact!"
                    icon={VolunteerIcon}
                />

                <Divider sx={{ my: { xs: 6, sm: 8, md: 10 } }} />

                {/* Upcoming Opportunities */}
                <VolunteerCarousel
                    volunteers={categorizedData.upcoming}
                    section="upcoming"
                    title="Upcoming Opportunities"
                    subtitle="Get a sneak peek at the exciting volunteer opportunities coming soon. Mark your calendars and stay ready!"
                    icon={UpcomingIcon}
                />

                <Divider sx={{ my: { xs: 6, sm: 8, md: 10 } }} />

                {/* Past Opportunities */}
                <VolunteerCarousel
                    volunteers={categorizedData.past}
                    section="past"
                    title="Past Events"
                    subtitle="Take a look back at the amazing events and initiatives we’ve completed together."
                    icon={CompletedIcon}
                />
            </Container>
        </Box>
    );
};

export default VolunteerOpportunities;
