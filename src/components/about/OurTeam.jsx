import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    Typography,
    useTheme,
    Grid,
    Avatar,
    Paper,
    Fade,
    Grow,
} from "@mui/material";
import {
    Person as PersonIcon,
    Star as StarIcon,
    Group as GroupIcon,
    Celebration as CelebrationIcon,
    VolunteerActivism as VolunteerIcon,
    School as SchoolIcon,
    Campaign as CampaignIcon,
    Palette as DesignIcon,
    Public as PublicIcon,
    AdminPanelSettings as AdminIcon,
    Psychology as PsychologyIcon,
    Assignment as AssignmentIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";
import PathConstants from "../../routes/pathConstants";
import Aarini from "/images/ourTeam/Aarini.jpg"
import Anna from "/images/ourTeam/Anna.JPG"
import Brianna from "/images/ourTeam/Brianna.jpg"
import Eileen from "/images/ourTeam/Eileen.png"
import Lauren from "/images/ourTeam/Lauren.PNG"
import TiffanyZ from "/images/ourTeam/TiffanyZ.png"
import Veronica from "/images/ourTeam/Veronica.png"
import TiffanyQ from "/images/ourTeam/TiffanyQ.jpeg"

// Team members data
const teamMembers = [
    {
        id: 1,
        name: "Brianna Tam",
        roles: ["Founder & President",],
        icon: AdminIcon,
        color: '#e91e63',
        bgGradient: 'linear-gradient(135deg, #e91e63, #f06292)',
        image: Brianna,
    },
    {
        id: 2,
        name: "Tiffany Qi",
        roles: ["Head of Design"],
        icon: DesignIcon,
        color: '#9c27b0',
        bgGradient: 'linear-gradient(135deg, #9c27b0, #ba68c8)',
        image: TiffanyQ,
    },
    {
        id: 3,
        name: "Veronica Chung",
        roles: ["Head of Design"],
        icon: PublicIcon,
        color: '#2196f3',
        bgGradient: 'linear-gradient(135deg, #2196f3, #42a5f5)',
        image: Veronica,
    },
    {
        id: 4,
        name: "Eileen Liang",
        roles: ["Volunteer Coordinator"],
        icon: VolunteerIcon,
        color: '#4caf50',
        bgGradient: 'linear-gradient(135deg, #4caf50, #66bb6a)',
        image: Eileen,
    },
    {
        id: 5,
        name: "Tiffany Zhou",
        roles: ["Outreach Coordinator"],
        icon: CampaignIcon,
        color: '#ff5722',
        bgGradient: 'linear-gradient(135deg, #ff5722, #ff8a65)',
        image: TiffanyZ,
    },
    {
        id: 6,
        name: "Anna Zou",
        roles: ["Head of Academics"],
        icon: SchoolIcon,
        color: '#ff9800',
        bgGradient: 'linear-gradient(135deg, #ff9800, #ffb74d)',
        image: Anna,
    },
    {
        id: 7,
        name: "Aarini Chakraborty",
        roles: ["Head of Academics"],
        icon: PsychologyIcon,
        color: '#795548',
        bgGradient: 'linear-gradient(135deg, #795548, #a1887f)',
        image: Aarini,
    },
    {
        id: 8,
        name: "Lauren Chen",
        roles: ["Secretary"],
        icon: AssignmentIcon,
        color: '#607d8b',
        bgGradient: 'linear-gradient(135deg, #607d8b, #78909c)',
        image: Lauren,
    }
];

// Team stats
const teamStats = [
    { icon: GroupIcon, value: "130", label: "Sessions Taught", color: "#4caf50" },
    { icon: SchoolIcon, value: "100+", label: "Lives Impacted", color: "#2196f3" },
    { icon: VolunteerIcon, value: "30+", label: "Active Volunteers", color: "#e91e63" },
    { icon: StarIcon, value: "100%", label: "Dedication", color: "#ff9800" },
];

const TeamMemberCard = ({ member, index }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const IconComponent = member.icon;

    return (
        <Grow in={true} timeout={800 + index * 200}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    border: `3px solid ${member.color}`,
                    borderRadius: 4,
                    overflow: 'visible',
                    position: 'relative',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: theme.shadows[20],
                        '& .member-avatar': {
                            transform: 'scale(1.1)',
                        }
                    }
                }}
            >
                {/* Decorative top gradient */}
                <Box
                    sx={{
                        height: 8,
                        background: member.bgGradient,
                        borderRadius: '4px 4px 0 0'
                    }}
                />

                <CardContent sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Avatar and Name */}
                    <Box sx={{ textAlign: 'center' }}>
                        <Box
                            className="member-avatar"
                            sx={{
                                display: 'inline-flex',
                                mb: 3,
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <Avatar
                                src={member.image || undefined}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    background: member.image ? 'transparent' : member.bgGradient,
                                    fontSize: '3rem',
                                    border: `4px solid ${member.color}30`,
                                    boxShadow: theme.shadows[12]
                                }}
                            >
                                {/* Show icon only if no image is available */}
                                {!member.image && <IconComponent sx={{ fontSize: 48, color: 'white' }} />}
                            </Avatar>
                        </Box>

                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                fontWeight: 800,
                                background: member.bgGradient,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '1.8rem',
                                mb: 2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {member.name}
                        </Typography>

                        {/* Roles below name */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center' }}>
                            {member.roles.map((role, roleIndex) => (
                                <Typography
                                    key={roleIndex}
                                    variant="body1"
                                    sx={{
                                        color: member.color,
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    {role}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grow>
    );
};

const TeamStat = ({ stat, index }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const IconComponent = stat.icon;

    return (
        <Fade in={true} timeout={600 + index * 150}>
            <Paper
                sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    border: `2px solid ${stat.color}30`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme => theme.shadows[12],
                        borderColor: stat.color,
                        '& .stat-icon': {
                            transform: 'scale(1.2) rotate(-5deg)',
                            color: stat.color
                        }
                    }
                }}
            >
                <IconComponent
                    className="stat-icon"
                    sx={{
                        fontSize: 56,
                        color: `${stat.color}80`,
                        mb: 2,
                        transition: 'all 0.3s ease'
                    }}
                />
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 900,
                        color: stat.color,
                        mb: 1
                    }}
                >
                    {stat.value}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontWeight: 600 }}
                >
                    {stat.label}
                </Typography>
            </Paper>
        </Fade>
    );
};

export default function OurTeam() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const navigate = useNavigate();

    const handleJoinTeamClick = () => {
        navigate(PathConstants.EXEC_TEAM);
    };

    const handleVolunteerClick = () => {
        navigate(PathConstants.VOLUNTEER_OPPORTUNITIES);
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
            <Container maxWidth="lg">
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
                                    <GroupIcon sx={{ fontSize: 60, color: '#4caf50' }} />
                                    <StarIcon sx={{ fontSize: 60, color: '#e91e63' }} />
                                    <PersonIcon sx={{ fontSize: 60, color: '#2196f3' }} />
                                    <CelebrationIcon sx={{ fontSize: 60, color: '#ff9800' }} />
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
                                Meet Our Team
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
                                Passionate students changing the world
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
                                Our diverse team of dedicated high school students bring together unique talents, perspectives, and unwavering commitment to giving back to those in need and providing quality education to the community. Each member plays a vital role in our mission to learn with joy, give with passion, and change the world.
                            </Typography>
                        </Box>
                    </Fade>
                </Box>

                {/* Team Stats */}
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
                        Our Team Impact
                    </Typography>

                    <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                        {teamStats.map((stat, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <TeamStat stat={stat} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Team Members Grid */}
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
                        Our Amazing Team Members
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
                        Each team member brings unique skills, passion, and dedication to our mission
                    </Typography>

                    <Grid container spacing={4}>
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
                                <TeamMemberCard member={member} index={index} />
                            </Grid>
                        ))}

                        {/* Join Us Card */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Grow in={true} timeout={800 + teamMembers.length * 200}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa',
                                        border: `3px dashed #4caf50`,
                                        borderRadius: 4,
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'translateY(-12px) scale(1.02)',
                                            boxShadow: theme.shadows[20],
                                            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
                                            borderColor: '#4caf50',
                                            borderStyle: 'solid'
                                        }
                                    }}
                                    onClick={handleJoinTeamClick}
                                >
                                    <CardContent sx={{ flexGrow: 1, p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Avatar
                                            sx={{
                                                width: 120,
                                                height: 120,
                                                background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
                                                mx: 'auto',
                                                mb: 3,
                                                fontSize: '3rem'
                                            }}
                                        >
                                            <PersonIcon sx={{ fontSize: 48, color: 'white' }} />
                                        </Avatar>

                                        <Typography
                                            variant="h4"
                                            component="h3"
                                            sx={{
                                                fontWeight: 800,
                                                mb: 2,
                                                color: '#4caf50'
                                            }}
                                        >
                                            This Could Be You!
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{
                                                mb: 4,
                                                lineHeight: 1.6
                                            }}
                                        >
                                            Join our passionate team of student leaders and make a difference in education.
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleJoinTeamClick();
                                            }}
                                            endIcon={<GroupIcon />}
                                            sx={{
                                                background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #45a049, #5cb85c)',
                                                }
                                            }}
                                        >
                                            Apply Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Grid>
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
                            Want to Join Our Team?
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
                            We're always looking for passionate, dedicated students who want to make a difference
                            in the world. Whether you're interested in tutoring, design, outreach, or leadership,
                            there's a place for you on our team. Join us in our mission to create a brighter tomorrow!
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleVolunteerClick}
                                endIcon={<VolunteerIcon />}
                                sx={{
                                    py: 2,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    borderColor: '#e91e63',
                                    color: '#e91e63',
                                    borderWidth: 2,
                                    '&:hover': {
                                        backgroundColor: '#e91e63',
                                        color: 'white',
                                        transform: 'translateY(-2px)',
                                        borderColor: '#e91e63',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Volunteer With Us
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}