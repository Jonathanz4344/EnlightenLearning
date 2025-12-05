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
    PlayCircleFilled as CurrentIcon,
    HourglassTop as UpcomingIcon,
    CheckCircle as CompletedIcon,
    Today as ExpirationIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";

// Sample events data with expiration dates and registration start dates
const eventsData = [
    {
        id: 5,
        title: "Snowy Literature",
        date: "2025-12-12 ",
        time: "4:00 PM - 5:30 PM",
        location: "Shelter Rock Library",
        description: "Calling all young storytellers! Join us at our cozy winter literature workshop to learn the components of a story and turn your ideas into stories worth saving.",
        formUrl: "https://forms.gle/xr8DBYPEGybZbYxN7",
        category: "Literature",
        volunteersNeeded: 30,
        totalParticipants: 30,
        duration: "1.5 hours",
        coordinator: "Enlighten Learning",
        registrationStartDate: "2025-12-05",
        expirationDate: "2025-12-12",
    },
    {
        id: 1,
        title: "The Art of Winter Crafts Event",
        date: "2025-01-10",
        time: "4:00 PM - 5:30 PM",
        location: "Shelter Rock Library",
        description: "Get creative this winter at our fun-filled crafts event! We'll have all the materials you need to make a 3D snowman and snowflakes.",
        formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf6FGGIfX3Xe7yK-MwdC-Y2wm2ysWjRbzxxIxid-oIF-WWDzw/viewform?usp=dialog",
        category: "Arts and Craft",
        totalParticipants: 30,
        duration: "1.5 hours",
        coordinator: "Enlighten Learning",
        registrationStartDate: "2025-01-01",
        expirationDate: "2025-01-10", // Past event
    },
    {
        id: 2,
        title: "Easter Fun Fest",
        date: "2025-04-18",
        time: "4:00 PM - 5:30 PM",
        location: "Ridder's Pond Park",
        description: "Come and join us for a day full of surprises! We will have an educational scavenger hunt and fun field game, there will be prizes!",
        formUrl: "https://forms.gle/KzTLV8EsQaMccSmdA",
        category: "Scavenger Hunt",
        totalParticipants: 30,
        duration: "1.5 hours",
        coordinator: "Enlighten Learning",
        registrationStartDate: "2025-04-01",
        expirationDate: "2025-04-18", // Past event
    },
    {
        id: 3,
        title: "Summer Volleyball Clinic",
        date: "2025-07-21 - 2025-08-25",
        time: "10:30 AM - 12:00 PM",
        location: "Park Circle",
        description: "Looking to stay active this summer? Join our volleyball clinic! Whether you're a beginner or need to brush up on your skills, you'll learn fundamentals and play games in a fun environment.",
        formUrl: "https://forms.gle/gUzvfJNfhUzqJrxp7",
        category: "Volleyball",
        totalParticipants: 20,
        duration: "1.5 hours",
        coordinator: "Enlighten Learning",
        registrationStartDate: "2025-07-01",
        expirationDate: "2025-07-21", // Past event
    },
    {
        id: 4,
        title: "Back to School Kickoff Fundraiser",
        date: "2025-08-22",
        time: "12:30 PM - 2:30 PM",
        location: "Park Circle",
        description: "Kickoff the new school year with fun, food and friends! Support our fundraiser for charity by purchasing food and beverages and enjoy some open court volleyball.",
        formUrl: "",
        category: "Fundraiser",
        totalParticipants: 20,
        duration: "2 hours",
        coordinator: "Enlighten Learning",
        registrationStartDate: "2025-07-01",
        expirationDate: "2025-08-22", // Past event
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

// Function to determine the status of an event
const getEventStatus = (event) => {
    const today = getTodayDate();
    const expirationDate = parseDate(event.expirationDate);
    const registrationStartDate = parseDate(event.registrationStartDate);

    // If expiration date has passed, it's a past event
    if (expirationDate && expirationDate < today) {
        return 'past';
    }

    // If there's a registration start date and it hasn't arrived yet, it's upcoming
    if (registrationStartDate && registrationStartDate > today) {
        return 'future';
    }

    // Otherwise, it's current/open
    return 'current';
};

// Function to categorize events based on their status
const categorizeEvents = () => {
    const categorized = {
        current: [],
        future: [],
        past: []
    };

    eventsData.forEach(event => {
        const status = getEventStatus(event);
        categorized[status].push(event);
    });

    return categorized;
};

const getCategoryColor = (category) => {
    const colors = {
        Fundraising: "primary",
        Volunteer: "secondary",
        Charity: "success",
        Education: "info",
        Environment: "warning",
        "Food Drive": "error",
        Community: "default",
        "Holiday Drive": "secondary"
    };
    return colors[category] || "default";
};

const getSectionConfig = (section) => {
    const configs = {
        current: {
            borderColor: '#4caf50', // Green border
            statusBgColor: '#4caf50',
            statusText: 'HAPPENING NOW',
            buttonColor: '#4caf50',
            buttonHoverColor: '#45a049',
            titleColor: '#4caf50',
            buttonText: 'Join Now',
            statsColor: '#4caf50'
        },
        future: {
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

const EventCard = ({ event, section }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const config = getSectionConfig(section);

    const handleFormClick = () => {
        if (event.formUrl) {
            window.open(event.formUrl, '_blank');
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
            {section === 'current' && event.expirationDate && isExpiringSoon(event.expirationDate) && (
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
                            {event.title}
                        </Typography>
                        <EventIcon sx={{ color: config.titleColor }} />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        <Chip
                            label={event.category}
                            color={getCategoryColor(event.category)}
                            size="small"
                        />
                    </Box>
                </Box>

                {/* Event Details */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <EventIcon fontSize="small" sx={{ color: config.titleColor }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {event.date}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <ScheduleIcon fontSize="small" sx={{ color: config.titleColor }} />
                        <Typography variant="body2" color="text.secondary">
                            {event.time}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LocationIcon fontSize="small" sx={{ color: config.titleColor }} />
                        <Typography variant="body2" color="text.secondary">
                            {event.location}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <AccessTimeIcon fontSize="small" sx={{ color: config.titleColor }} />
                        <Typography variant="body2" color="text.secondary">
                            Duration: {event.duration}
                        </Typography>
                    </Box>

                    {/* Registration Opens Date for Future Events */}
                    {/* {section === 'future' && event.registrationStartDate && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ExpirationIcon fontSize="small" sx={{ color: config.titleColor }} />
                            <Typography variant="body2" color="text.secondary">
                                Registration Opens: {formatDate(event.registrationStartDate)}
                            </Typography>
                        </Box>
                    )} */}

                    {/* Expiration Date for Current Events */}
                    {section === 'current' && event.expirationDate && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ExpirationIcon fontSize="small" sx={{
                                color: isExpiringSoon(event.expirationDate) ? '#ff5722' : config.titleColor
                            }} />
                            <Typography
                                variant="body2"
                                sx={{
                                    color: isExpiringSoon(event.expirationDate) ? '#ff5722' : 'text.secondary',
                                    fontWeight: isExpiringSoon(event.expirationDate) ? 600 : 400
                                }}
                            >
                                Registration Closes: {formatDate(event.expirationDate)}
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
                        {/* For current and future events - show expected participants and coordinator */}
                        {(section === 'current' || section === 'future') && (
                            <>
                                <Grid item xs={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <PeopleIcon sx={{ color: config.statsColor, mb: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Expected
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: config.statsColor }} fontWeight="bold">
                                            {event.totalParticipants}+
                                        </Typography>

                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <StarIcon sx={{ color: 'secondary.main', mb: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Coordinator
                                        </Typography>
                                        <Typography variant="body2" fontWeight="bold" color="text.primary">
                                            {event.coordinator}
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
                                            {event.totalParticipants}
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
                    {event.description}
                </Typography>

                {section === 'past' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Coordinated by:
                        </Typography>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                            {event.coordinator.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" fontWeight="600">
                            {event.coordinator}
                        </Typography>
                    </Box>
                )}
            </CardContent>

            <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={section === 'current' ? handleFormClick : undefined}
                    endIcon={<LaunchIcon />}
                    disabled={section === 'future' || section === 'past' || !event.formUrl}
                    sx={{
                        backgroundColor: (section === 'future' || section === 'past' || !event.formUrl) ? '#e0e0e0' : config.buttonColor,
                        color: (section === 'future' || section === 'past' || !event.formUrl) ? '#9e9e9e' : 'white',
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        cursor: (section === 'future' || section === 'past' || !event.formUrl) ? 'not-allowed' : 'pointer',
                        '&:hover': {
                            backgroundColor: (section === 'future' || section === 'past' || !event.formUrl) ? '#e0e0e0' : config.buttonHoverColor,
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

const EventCarousel = ({ events, section, title, subtitle, icon: Icon }) => {
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
    const maxIndex = Math.max(0, Math.ceil(events.length / itemsPerSlide) - 1);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const getVisibleEvents = () => {
        const startIndex = currentIndex * itemsPerSlide;
        return events.slice(startIndex, startIndex + itemsPerSlide);
    };

    if (events.length === 0) {
        const emptyMessages = {
            current: {
                title: "No Current Events",
                subtitle: "We're planning some amazing events! Please check back soon for new opportunities to get involved in your community.",
                icon: CurrentIcon
            },
            future: {
                title: "No Upcoming Events Scheduled",
                subtitle: "New events are in the works! Follow us on social media or check back regularly for exciting events on the horizon.",
                icon: UpcomingIcon
            },
            past: {
                title: "Building Our Event History",
                subtitle: "This is where we'll showcase all the incredible events we've hosted together. Stay tuned as we grow our community impact!",
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
                {section === 'current' && (
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
            {events.length > itemsPerSlide && (
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
                {getVisibleEvents().map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        section={section}
                    />
                ))}
            </Box>

            {/* Pagination Dots */}
            {events.length > itemsPerSlide && (
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

export default function EventsProgram() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const categorizedData = categorizeEvents();

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
                        <EventIcon
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
                        Events & Programs
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
                        "Join our community outreach initiatives! Explore our current events, upcoming programs,
                        and see the incredible impact we've made together in our community."
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

                <Divider sx={{ my: { xs: 4, sm: 6, md: 8 }, opacity: 0.3 }} />

                {/* Current Events Section */}
                <EventCarousel
                    events={categorizedData.current}
                    section="current"
                    title="Happening Now"
                    subtitle="Don't miss out! These events are currently accepting registrations and looking for passionate volunteers."
                    icon={CurrentIcon}
                />

                <Divider sx={{ my: { xs: 4, sm: 6, md: 8 }, opacity: 0.3 }} />

                {/* Upcoming Events Section */}
                <EventCarousel
                    events={categorizedData.future}
                    section="future"
                    title="Coming Soon"
                    subtitle="Get ready for these exciting upcoming events! Registration will open soon, so mark your calendars."
                    icon={UpcomingIcon}
                />

                <Divider sx={{ my: { xs: 4, sm: 6, md: 8 }, opacity: 0.3 }} />

                {/* Past Events Section */}
                <EventCarousel
                    events={categorizedData.past}
                    section="past"
                    title="Our Impact"
                    subtitle="Celebrate the amazing work we've accomplished together! See the positive change we've created in our community."
                    icon={CompletedIcon}
                />
                                                                
                {/* Community Impact Summary */}
                {/* <Box sx={{
                    mt: { xs: 6, sm: 8, md: 10 },
                    p: { xs: 4, sm: 6 },
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    borderRadius: 4,
                    boxShadow: theme => theme.shadows[8],
                    border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`
                }}> */}
                    {/* <Box sx={{ textAlign: 'center', mb: 5 }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                background: 'linear-gradient(45deg, #4caf50, #2196f3, #ff9800)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Together We've Achieved Amazing Things
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ maxWidth: '500px', mx: 'auto', lineHeight: 1.6 }}
                        >
                            Every event brings our community closer and creates lasting positive change
                        </Typography>
                    </Box>

                    <Grid container spacing={4} sx={{ textAlign: 'center' }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                p: 3,
                                borderRadius: 3,
                                backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                                height: '100%'
                            }}>
                                <PeopleIcon sx={{ fontSize: 50, color: '#4caf50', mb: 2 }} />
                                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold', mb: 1 }}>
                                    100+
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Community Members Engaged
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                p: 3,
                                borderRadius: 3,
                                backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                                height: '100%'
                            }}>
                                <EventIcon sx={{ fontSize: 50, color: '#2196f3', mb: 2 }} />
                                <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 'bold', mb: 1 }}>
                                    {categorizedData.past.length + categorizedData.current.length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Events Successfully Hosted
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                p: 3,
                                borderRadius: 3,
                                backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                                height: '100%'
                            }}>
                                <StarIcon sx={{ fontSize: 50, color: '#ff9800', mb: 2 }} />
                                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold', mb: 1 }}>
                                    100%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Community Driven Impact
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{
                        mt: 4,
                        p: 3,
                        backgroundColor: isDarkMode ? '#0a0a0a' : '#f0f8ff',
                        borderRadius: 3,
                        textAlign: 'center',
                        border: `2px solid ${isDarkMode ? '#1976d2' : '#e3f2fd'}`
                    }}>
                        <Typography variant="body1" sx={{
                            fontStyle: 'italic',
                            color: 'primary.main',
                            fontSize: '1.1rem',
                            fontWeight: 500
                        }}>
                            "The strength of our community lies in the participation of every member.
                            Thank you for being part of our journey towards positive change."
                        </Typography>
                    </Box> */}
                {/* </Box> */}
            </Container>
        </Box>
    );
}