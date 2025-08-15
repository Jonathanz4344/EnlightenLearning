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
    Groups as TeamIcon,
    School as AcademicsIcon,
    DesignServices as DesignIcon,
    Campaign as PRIcon,
    AccountBalance as FinanceIcon,
    Event as ProgramsIcon,
    ConnectWithoutContact as OutreachIcon,
    VolunteerActivism as VolunteerIcon,
    Assignment as SecretaryIcon,
    PersonAdd as JoinIcon,
    Launch as LaunchIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";

// Executive Board Positions Data
const execPositions = [
    {
        id: 1,
        title: "President",
        status: "closed", // open, closed, filled
        multiple: false,
        description: "Serves as the chief leader of the organization, overseeing all departments and ensuring smooth coordination between board members. Provides guidance to Heads, Directors, and Coordinators to help them achieve their goals, while maintaining the overall vision and mission of the organization. Represents the organization in official capacities and fosters partnerships to further its growth and impact.",
        icon: TeamIcon,
        responsibilities: [
            "Oversee all executive members",
            "Ensure alignment with organizational mission and goals",
            "Facilitate cross-department communication and collaboration",
            "Provide strategic guidance and support to all positions",
            "Lead board meetings and set organizational priorities"
        ],
        currentMembers: [{ name: "Brianna Tam", avatar: "BT" }],
        category: "Leadership"
    },
    {
        id: 2,
        title: "Head of Academics",
        status: "closed", // open, closed, filled
        multiple: true,
        description: "Creates and maintains the tutoring curriculum, organizes and manages resources for tutors to use for students. Additionally, plans and conducts workshops to provide guidance and tips for other tutors.",
        icon: AcademicsIcon,
        responsibilities: [
            "Curriculum development and maintenance",
            "Resource organization for tutors",
            "Workshop planning and execution",
            "Tutor guidance and training"
        ],
        currentMembers: [{ name: "Anna Zou", avatar: "AZ" }, { name: "Aarini Chakraborty", avatar: "AC" }],
        category: "Academic"
    },
    {
        id: 3,
        title: "Head of Design",
        status: "closed",
        multiple: false,
        description: "Oversees PR officers and in charge of all aspects related to design and social media. Including, creating social media content and posting it to our socials. As well as sending out our posts and communicating with other organizations.",
        icon: DesignIcon,
        responsibilities: [
            "Oversee PR officers",
            "Design and social media management",
            "Content creation and posting",
            "Inter-organizational communication"
        ],
        currentMembers: [
            { name: "Tiffany Qi", avatar: "TQ" }
        ],
        category: "Creative"
    },
    {
        id: 4,
        title: "Public Relations Officer",
        status: "open",
        multiple: true,
        description: "Assist the Head of Design in creating social media content and posting it to our socials, managing social media accounts in general and communicating with other organizations.",
        icon: PRIcon,
        responsibilities: [
            "Account management",
            "Design and social media management",
            "Content creation and posting",
            "Inter-organizational communication"
        ],
        currentMembers: [
            { name: "Veronica Chung", avatar: "VC" }
        ],
        category: "Creative"
    },
    {
        id: 5,
        title: "Director of Finance",
        status: "closed",
        multiple: false,
        description: "Oversees all financial operations, which includes discussing pricing quota with parents, recording organizational expenses, managing charity donations, and ensuring accurate financial records.",
        icon: FinanceIcon,
        responsibilities: [
            "Financial operations oversight",
            "Pricing discussions with parents",
            "Expense recording and tracking",
            "Charity donation management"
        ],
        currentMembers: [
            { name: "Brianna Tam", avatar: "BT" }
        ],
        category: "Operations"
    },
    {
        id: 6,
        title: "Programs Director",
        status: "open",
        multiple: false,
        description: "Plans and executes special events; including agenda development, collaboration with relevant board members or other organizations and communicating with facilities to rent their space to host the event.",
        icon: ProgramsIcon,
        responsibilities: [
            "Special event planning and execution",
            "Agenda development",
            "Cross-team collaboration",
            "Facility coordination and rental"
        ],
        currentMembers: [],
        category: "Programs"
    },
    {
        id: 7,
        title: "Outreach Coordinator",
        status: "open",
        multiple: true,
        description: "In charge of recruitment of both students and tutors within your area. As well as expansion of the organization and spreading our mission. Essentially the individual responsible for overseeing and promoting our tutoring program in that area.",
        icon: OutreachIcon,
        responsibilities: [
            "Student and tutor recruitment",
            "Organizational expansion",
            "Mission promotion",
            "Local program support and engagement"
        ],
        currentMembers: [
            { name: "Tiffany Zhou", avatar: "TZ" }
        ],
        category: "Growth"
    },
    {
        id: 8,
        title: "Volunteer Coordinator",
        status: "closed",
        multiple: false,
        description: "In charge of volunteer-related tasks (hours tracking, board attendance, etc.). Responsible for daily volunteer recruitment, including communicating with public facilities and utilizing promotional materials to facilitate community engagement.",
        icon: VolunteerIcon,
        responsibilities: [
            "Volunteer hours tracking and certificates",
            "Track board attendance",
            "Daily recruitment activities",
            "Facilitate communication with public facilities"
        ],
        currentMembers: [
            { name: "Eileen Liang", avatar: "EL" }
        ],
        category: "Operations"
    },
    {
        id: 9,
        title: "Secretary",
        status: "closed",
        multiple: false,
        description: "Take meeting notes for board meetings and help with general organization and management of board members (assignments, coordination, etc.). Additionally, update members on what happened at each meeting, their tasks for the week, and assist with outreach efforts to support organizational goals.",
        icon: SecretaryIcon,
        responsibilities: [
            "Meeting documentation",
            "Board member organization",
            "Weekly updates and task management",
            "Assist with outreach initiatives",
        ],
        currentMembers: [
            { name: "Lauren Chen", avatar: "LC" }
        ],
        category: "Operations"
    },


];

// Helper function to get status configuration
const getStatusConfig = (status) => {
    const configs = {
        open: {
            color: '#4caf50',
            bgColor: '#e8f5e8',
            textColor: '#2e7d32',
            label: 'OPEN - APPLY NOW',
            buttonText: 'Apply for Position',
            buttonEnabled: true
        },
        closed: {
            color: '#f44336',
            bgColor: '#ffebee',
            textColor: '#c62828',
            label: 'POSITION FILLED',
            buttonText: 'Position Filled',
            buttonEnabled: false
        },
        filled: {
            color: '#2196f3',
            bgColor: '#e3f2fd',
            textColor: '#1565c0',
            label: 'CURRENTLY FILLED',
            buttonText: 'Learn More',
            buttonEnabled: false
        }
    };
    return configs[status] || configs.open;
};

// Helper function to get category color
const getCategoryColor = (category) => {
    const colors = {
        Academic: '#4caf50',
        Creative: '#e91e63',
        Operations: '#2196f3',
        Programs: '#ff9800',
        Growth: '#9c27b0'
    };
    return colors[category] || '#757575';
};

// Helper function to calculate total unique active members
const getTotalActiveMembers = (positions) => {
    const uniqueMembers = new Set();

    positions.forEach(position => {
        position.currentMembers.forEach(member => {
            uniqueMembers.add(member.name);
        });
    });

    return uniqueMembers.size;
};

const PositionCard = ({ position }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const statusConfig = getStatusConfig(position.status);
    const categoryColor = getCategoryColor(position.category);
    const IconComponent = position.icon;

    const handleApplyClick = () => {
        window.open("https://forms.gle/JVqaueQjwRexzNjz8", '_blank');
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                border: `3px solid ${statusConfig.color}`,
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
                    backgroundColor: statusConfig.color,
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
                {statusConfig.label}
            </Box>

            {/* Multiple Positions Badge */}
            {position.multiple && position.status === 'open' && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: -12,
                        left: 16,
                        backgroundColor: '#ff9800',
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
                    MULTIPLE POSITIONS
                </Box>
            )}

            <CardContent sx={{ flexGrow: 1, p: 3, pt: 4, display: 'flex', flexDirection: 'column' }}>
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
                            {position.title}
                        </Typography>
                        <IconComponent sx={{ color: categoryColor, fontSize: 32 }} />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        <Chip
                            label={position.category}
                            sx={{
                                backgroundColor: `${categoryColor}20`,
                                color: categoryColor,
                                fontWeight: 600
                            }}
                            size="small"
                        />
                        {position.multiple && (
                            <Chip
                                label="Multiple Openings"
                                color="warning"
                                size="small"
                            />
                        )}
                    </Box>
                </Box>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ lineHeight: 1.6, mb: 3 }}
                >
                    {position.description}
                </Typography>

                {/* Key Responsibilities */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: categoryColor
                        }}
                    >
                        Key Responsibilities:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {position.responsibilities.map((responsibility, index) => (
                            <Typography
                                component="li"
                                variant="body2"
                                color="text.secondary"
                                key={index}
                                sx={{ mb: 0.5 }}
                            >
                                {responsibility}
                            </Typography>
                        ))}
                    </Box>
                </Box>

                {/* Flexible spacer to push team section to bottom */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Team Section - Fixed positioning at bottom */}
                <Box sx={{
                    mt: 'auto',
                    minHeight: position.status === 'open' ? '180px' : '120px', // More space for open positions
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    gap: 2
                }}>
                    {/* Current Members (for all positions that have them) */}
                    {position.currentMembers.length > 0 && (
                        <Box sx={{
                            backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                            borderRadius: 2,
                            p: 2,
                        }}>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, mb: 1 }}
                            >
                                Current Team Members:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {position.currentMembers.map((member, index) => (
                                    <Box
                                        key={index}
                                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                fontSize: '0.8rem',
                                                backgroundColor: categoryColor
                                            }}
                                        >
                                            {member.avatar}
                                        </Avatar>
                                        <Typography variant="body2" fontWeight="600">
                                            {member.name}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* "This Could Be You" section for OPEN positions only */}
                    {position.status === 'open' && (
                        <Box sx={{
                            backgroundColor: statusConfig.bgColor,
                            borderRadius: 2,
                            p: 2,
                            textAlign: 'center',
                            border: `2px dashed ${statusConfig.color}`,
                            minHeight: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <Avatar
                                sx={{
                                    width: 50,
                                    height: 50,
                                    mx: 'auto',
                                    mb: 1,
                                    backgroundColor: statusConfig.color,
                                    fontSize: '1.2rem'
                                }}
                            >
                                ?
                            </Avatar>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: statusConfig.textColor,
                                    fontWeight: 600,
                                    mb: 0.5,
                                    fontSize: '1rem'
                                }}
                            >
                                This Could Be You!
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                Join our team and make a difference
                            </Typography>
                        </Box>
                    )}
                </Box>
            </CardContent>

            {/* Action Button - Fixed at bottom */}
            <Box sx={{ p: 3, pt: 0, mt: 'auto' }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={statusConfig.buttonEnabled ? handleApplyClick : undefined}
                    endIcon={statusConfig.buttonEnabled ? <LaunchIcon /> : null}
                    disabled={!statusConfig.buttonEnabled}
                    sx={{
                        backgroundColor: statusConfig.buttonEnabled ? statusConfig.color : '#e0e0e0',
                        color: statusConfig.buttonEnabled ? 'white' : '#9e9e9e',
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        '&:hover': {
                            backgroundColor: statusConfig.buttonEnabled ? statusConfig.color : '#e0e0e0',
                            opacity: statusConfig.buttonEnabled ? 0.9 : 1,
                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#e0e0e0',
                            color: '#9e9e9e',
                        }
                    }}
                >
                    {statusConfig.buttonText}
                </Button>
            </Box>
        </Card>
    );
};

const PositionCarousel = ({ positions, title, subtitle, icon: Icon, colorTheme }) => {
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
    const maxIndex = Math.max(0, Math.ceil(positions.length / itemsPerSlide) - 1);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const getVisiblePositions = () => {
        const startIndex = currentIndex * itemsPerSlide;
        return positions.slice(startIndex, startIndex + itemsPerSlide);
    };

    if (positions.length === 0) return null;

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
            {positions.length > itemsPerSlide && (
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
                    minHeight: '750px', // Increased for open positions with more content
                    alignItems: 'stretch'
                }}
            >
                {getVisiblePositions().map((position) => (
                    <PositionCard
                        key={position.id}
                        position={position}
                    />
                ))}
            </Box>

            {/* Pagination Dots */}
            {positions.length > itemsPerSlide && (
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

export default function ExecTeam() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

    // Categorize positions
    const openPositions = execPositions.filter(pos => pos.status === 'open');
    const filledPositions = execPositions.filter(pos => pos.status === 'closed' || pos.status === 'filled');

    // Calculate total active members dynamically
    const totalActiveMembers = getTotalActiveMembers(execPositions);

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
                        <TeamIcon
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
                        Enlighten Learning Executive Board
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
                        Join our passionate team of student leaders dedicated to making education accessible
                        and impactful for everyone in our community.
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
                                {openPositions.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Open Positions
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#2196f3' }} fontWeight="bold">
                                {totalActiveMembers}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Active Members
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" color="secondary.main" fontWeight="bold">
                                {execPositions.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Board Roles
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: { xs: 4, sm: 6, md: 8 }, opacity: 0.3 }} />

                {/* Open Positions Section */}
                <PositionCarousel
                    positions={openPositions}
                    title="Open Positions"
                    subtitle="Ready to make an impact? These positions are currently seeking passionate candidates who want to drive positive change in our community."
                    icon={JoinIcon}
                    colorTheme="#4caf50"
                />

                <Divider sx={{ my: { xs: 4, sm: 6, md: 8 }, opacity: 0.3 }} />

                {/* Current Team Section */}
                <PositionCarousel
                    positions={filledPositions}
                    title="Meet Our Team"
                    subtitle="Get to know the dedicated individuals currently leading our organization and the important work they do."
                    icon={TeamIcon}
                    colorTheme="#2196f3"
                />

                {/* Why Join Section */}
                <Box sx={{
                    mt: { xs: 6, sm: 8, md: 10 },
                    p: { xs: 4, sm: 6 },
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    borderRadius: 4,
                    boxShadow: theme => theme.shadows[8],
                    border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`
                }}>
                    <Box sx={{ textAlign: 'center', mb: 5 }}>
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
                            Why Join Our Executive Board?
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
                        >
                            Become part of a team that's making real change in education and community outreach
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{
                                p: 3,
                                textAlign: 'center',
                                height: '100%',
                                backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                                border: `2px solid ${isDarkMode ? '#4caf50' : '#e8f5e8'}`
                            }}>
                                <AcademicsIcon sx={{ fontSize: 50, color: '#4caf50', mb: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Leadership Development
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Gain valuable leadership experience while making a direct impact on your peers and community members.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{
                                p: 3,
                                textAlign: 'center',
                                height: '100%',
                                backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                                border: `2px solid ${isDarkMode ? '#2196f3' : '#e3f2fd'}`
                            }}>
                                <TeamIcon sx={{ fontSize: 50, color: '#2196f3', mb: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Collaborative Environment
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Work alongside passionate, like-minded individuals who share your commitment to educational excellence.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{
                                p: 3,
                                textAlign: 'center',
                                height: '100%',
                                backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                                border: `2px solid ${isDarkMode ? '#ff9800' : '#fff3e0'}`
                            }}>
                                <VolunteerIcon sx={{ fontSize: 50, color: '#ff9800', mb: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Community Impact
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Make a tangible difference in your community by helping students achieve their academic goals.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                {/* Final Call to Action */}
                <Box sx={{
                    textAlign: 'center',
                    mt: { xs: 6, sm: 8, md: 10 },
                    p: { xs: 4, sm: 6 },
                    background: isDarkMode
                        ? 'linear-gradient(135deg, #1a1a1a, #2d2d2d)'
                        : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                    borderRadius: 4,
                    border: `2px solid ${isDarkMode ? '#333' : '#dee2e6'}`
                }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: 'primary.main'
                        }}
                    >
                        Ready to Lead with Purpose?
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            mb: 4,
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6
                        }}
                    >
                        Whether you're interested in academics, design, finance, or community outreach,
                        there's a place for you on our executive board. Join us in building a brighter
                        future through education.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}