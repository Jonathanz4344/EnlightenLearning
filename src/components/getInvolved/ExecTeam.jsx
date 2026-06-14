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
        maxPositions: 1, // NEW: Number of available positions
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
        maxPositions: 2, // NEW: Multiple positions available
        description: "Works with Head of Tutoring Services coordinating the quality and effectiveness of the tutoring program by guiding and training tutors, and ensuring consistent academic standards. Additionally, plan and conduct educational workshops to support student learning.",
        icon: AcademicsIcon,
        responsibilities: [
            "Tutor guidance and training",
            "Oversight of academic quality across tutoring program",
            "Assist the Head of Tutoring Services ",
            "Educational workshop planning and execution"
        ],
        currentMembers: [{ name: "Anna Zou", avatar: "AZ" }, { name: "Aarini Chakraborty", avatar: "AC" }],
        category: "Academic"
    },
    {
        id: 3,
        title: "Head of Design",
        maxPositions: 2, // NEW: Multiple positions available
        description: "Oversees PR officers and in charge of all aspects related to design and social media. Including, creating social media content and posting it to our socials. As well as sending out our posts and communicating with other organizations.",
        icon: DesignIcon,
        responsibilities: [
            "Oversee PR officers",
            "Design and social media management",
            "Content creation and posting",
            "Inter-organizational communication"
        ],
        currentMembers: [
            { name: "Tiffany Qi", avatar: "TQ" }, { name: "Veronica Chung", avatar: "VC" }
        ],
        category: "Marketing"
    },
    {
        id: 4,
        title: "Public Relations Officer",
        maxPositions: 2, // NEW: 2 positions available, currently 0 filled
        description: "Assist the Head of Design in creating social media content and posting it to our socials, managing social media accounts in general and communicating with other organizations.",
        icon: PRIcon,
        responsibilities: [
            "Account management",
            "Design and social media management",
            "Content creation and posting",
            "Inter-organizational communication"
        ],
        currentMembers: [
            // Empty - all 3 positions are open
        ],
        category: "Marketing"
    },
    {
        id: 5,
        title: "Director of Finance and Tutoring Services",
        maxPositions: 1, // NEW: Single position
        description: "Oversees all financial operations, which includes discussing program fees with families managing charity donations, and ensuring accurate financial records. Because financial planning is closely integrated with the operation of the tutoring program, this role also manages tutor-student pairing and recruitment, and the overall coordination of the Tutoring Program.",
        icon: FinanceIcon,
        responsibilities: [
            "Recordkeeping of finances",
            "Charity donation management",
            "Discuss program fees with families",
            "Oversees the Tutoring Program"
        ],
        currentMembers: [
            { name: "Brianna Tam", avatar: "BT" }
        ],
        category: "Operations"
    },
    // {
    //     id: 6,
    //     title: "Programs Director",
    //     maxPositions: 1, // NEW: Single position, currently open
    //     description: "Plans and executes special events; including agenda development, collaboration with relevant board members or other organizations and communicating with facilities to rent their space to host the event.",
    //     icon: ProgramsIcon,
    //     responsibilities: [
    //         "Special event planning and execution",
    //         "Agenda development",
    //         "Cross-team collaboration",
    //         "Facility coordination and rental"
    //     ],
    //     currentMembers: [],
    //     category: "Development"
    // },
    {
        id: 7,
        title: "Outreach and ProgramsCoordinator",
        maxPositions: 3, // NEW: 3 positions available, 1 filled
        description: "In charge of expanding the organization and spreading our mission. As well as planning and executing special events. Essentially the individual responsible for overseeing and promoting our tutoring program, events, opportunities, etc, in that area.",
        icon: OutreachIcon,
        responsibilities: [
            "Mission promotion",
            "Organizational expansion and recruitment",
            "Special event planning and execution",
            "Facilitate communication with public facilities"
        ],
        currentMembers: [
            { name: "Tiffany Zhou", avatar: "TZ" },
            { name: "Lauren Chen", avatar: "LC" }
        ],
        category: "Development"
    },
    {
        id: 8,
        title: "Volunteer Coordinator",
        maxPositions: 1, // NEW: Single position
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
        maxPositions: 1, // NEW: Single position
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

// NEW: Function to automatically determine position status
const getPositionStatus = (position) => {
    const currentMembersCount = position.currentMembers.length;
    const maxPositions = position.maxPositions;

    if (currentMembersCount >= maxPositions) {
        return 'closed'; // Position is filled
    } else {
        return 'open'; // Position has openings
    }
};

// NEW: Function to check if position has multiple openings
const hasMultipleOpenings = (position) => {
    return position.maxPositions > 1;
};

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

// NEW: Helper function to calculate total open positions
const getTotalOpenPositions = (positions) => {
    return positions.reduce((total, position) => {
        const openings = position.maxPositions - position.currentMembers.length;
        return total + Math.max(0, openings);
    }, 0);
};

const PositionCard = ({ position }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();

    // NEW: Automatically determine status
    const status = getPositionStatus(position);
    const multiple = hasMultipleOpenings(position);
    const openings = position.maxPositions - position.currentMembers.length;

    const statusConfig = getStatusConfig(status);
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
            {multiple && status === 'open' && (
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
                    {openings} OPENINGS
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
                        {/* {multiple && (
                            <Chip
                                label={status === 'open' ? `${openings} Openings` : `${position.maxPositions} Total Positions`}
                                color={status === 'open' ? "warning" : "default"}
                                size="small"
                            />
                        )} */}
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
                    minHeight: status === 'open' ? '180px' : '120px', // More space for open positions
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
                    {status === 'open' && (
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
                                {openings === 1
                                    ? "Join our team and make a difference"
                                    : `${openings} positions available - join our team!`
                                }
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

    // NEW: Automatically categorize positions based on their current status
    const positionsWithStatus = execPositions.map(position => ({
        ...position,
        status: getPositionStatus(position),
        multiple: hasMultipleOpenings(position)
    }));

    const openPositions = positionsWithStatus.filter(pos => pos.status === 'open');
    const filledPositions = positionsWithStatus.filter(pos => pos.status === 'closed' || pos.status === 'filled');

    // Calculate total active members and open positions dynamically
    const totalActiveMembers = getTotalActiveMembers(execPositions);
    const totalOpenPositions = getTotalOpenPositions(execPositions);

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
                        Ready to make a real difference? Join our passionate team of student leaders. Together, we're dedicated to raising funds for charities that provide hope, care, and support, impacting countless lives.
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
                                {totalOpenPositions}
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
                    textAlign: 'center',
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(25, 118, 210, 0.05)',
                    borderRadius: 4,
                    p: { xs: 4, sm: 6, md: 8 },
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(25, 118, 210, 0.1)'}`,
                }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 4,
                            color: 'primary.main',
                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                        }}
                    >
                        Why Join Our Executive Board?
                    </Typography>

                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    backgroundColor: 'transparent',
                                    textAlign: 'center'
                                }}
                            >
                                <Box sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    backgroundColor: '#4caf50',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2
                                }}>
                                    <Typography variant="h4" sx={{ color: 'white' }}>💡</Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Leadership Development
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Gain valuable leadership experience while making a direct impact on the community and those in need.
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    backgroundColor: 'transparent',
                                    textAlign: 'center'
                                }}
                            >
                                <Box sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    backgroundColor: '#2196f3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2
                                }}>
                                    <Typography variant="h4" sx={{ color: 'white' }}>🤝</Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Collaborative
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Work alongside passionate, like-minded individuals who share your commitment to giving back.
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    backgroundColor: 'transparent',
                                    textAlign: 'center'
                                }}
                            >
                                <Box sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    backgroundColor: '#ff9800',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2
                                }}>
                                    <Typography variant="h4" sx={{ color: 'white' }}>🎯</Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Community Impact
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Make a tangible difference in your community by raising money for charities that provide hope, care and support to those in need.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 6 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => window.open("https://forms.gle/JVqaueQjwRexzNjz8", '_blank')}
                            endIcon={<LaunchIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Apply Now
                        </Button>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 2, fontSize: '0.9rem' }}
                        >
                            Applications are reviewed on a rolling basis
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}