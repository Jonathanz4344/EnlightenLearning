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
    LinearProgress,
    Stack,
    Alert,
    AlertTitle,
} from "@mui/material";
import {
    Favorite as HeartIcon,
    School as SchoolIcon,
    AccountBalanceWallet as WalletIcon,
    TrendingUp as TrendingUpIcon,
    Groups as GroupsIcon,
    Star as AwardIcon,
    QrCode as QrCodeIcon,
    ContentCopy as CopyIcon,
    CheckCircle as CheckIcon,
    Lightbulb as LightbulbIcon,
    Support as SupportIcon,
    LocalLibrary as LibraryIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";
import Logo from "/images/logo/Logo.png";
import ZelleQr from "/images/donate/Zelle.jpg"

// Simple donation amounts
const donationAmounts = [25, 50, 100, 250];

// Updated Fundraising Progress component with modern design
const FundraisingProgress = ({ currentAmount, goalAmount }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const percentage = Math.min((currentAmount / goalAmount) * 100, 100);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Milestone data with icons and labels
    const milestones = [
        { percent: 25, label: 'Getting Started', icon: '🌱' },
        { percent: 50, label: 'Halfway There!', icon: '🔥' },
        { percent: 75, label: 'Almost There!', icon: '⭐' },
        { percent: 100, label: 'Goal Reached!', icon: '🎉' },
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                maxWidth: 700,
                mx: 'auto',
                mb: 4,
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                background: isDarkMode 
                    ? 'linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(45, 45, 45, 0.9))'
                    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
                border: isDarkMode 
                    ? '1px solid rgba(76, 175, 80, 0.3)' 
                    : '1px solid rgba(76, 175, 80, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #4caf50, #81c784, #4caf50)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite linear',
                },
                '@keyframes shimmer': {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' },
                },
            }}
        >
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
                        mb: 2,
                        boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
                    }}
                >
                    <TrendingUpIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        mb: 1,
                    }}
                >
                    Our Fundraising Progress
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        maxWidth: 400,
                        mx: 'auto',
                    }}
                >
                    Help us reach our goal to support more students in their educational journey
                </Typography>
            </Box>

            {/* Main Amount Display */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    gap: 1,
                    mb: 3,
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '2.5rem', sm: '3.5rem' },
                    }}
                >
                    ${currentAmount.toLocaleString()}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 500,
                        color: 'text.secondary',
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                    }}
                >
                    of ${goalAmount.toLocaleString()}
                </Typography>
            </Box>

            {/* Progress Bar */}
            <Box sx={{ position: 'relative', mb: 4 }}>
                {/* Background Track */}
                <Box
                    sx={{
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    {/* Progress Fill */}
                    <Box
                        sx={{
                            height: '100%',
                            width: `${percentage}%`,
                            borderRadius: 12,
                            background: 'linear-gradient(90deg, #43a047, #66bb6a, #81c784)',
                            backgroundSize: '200% 100%',
                            animation: 'progressShimmer 3s ease infinite',
                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            boxShadow: '0 0 20px rgba(76, 175, 80, 0.4)',
                            '@keyframes progressShimmer': {
                                '0%': { backgroundPosition: '0% 50%' },
                                '50%': { backgroundPosition: '100% 50%' },
                                '100%': { backgroundPosition: '0% 50%' },
                            },
                        }}
                    />
                    
                    {/* Milestone Markers on Track */}
                    {milestones.slice(0, 3).map((milestone) => (
                        <Box
                            key={milestone.percent}
                            sx={{
                                position: 'absolute',
                                left: `${milestone.percent}%`,
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: percentage >= milestone.percent 
                                    ? 'white' 
                                    : (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'),
                                boxShadow: percentage >= milestone.percent 
                                    ? '0 0 8px rgba(255,255,255,0.5)' 
                                    : 'none',
                                transition: 'all 0.5s ease',
                                zIndex: 2,
                            }}
                        />
                    ))}
                </Box>

                {/* Logo Marker */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: `${Math.min(Math.max(percentage, 5), 95)}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        transition: 'left 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 10,
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: 48, sm: 56 },
                            height: { xs: 48, sm: 56 },
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '3px solid #4caf50',
                            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4), 0 0 0 4px rgba(76, 175, 80, 0.15)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                animation: 'logoShine 2s infinite',
                            },
                            '@keyframes logoShine': {
                                '0%': { left: '-100%' },
                                '50%, 100%': { left: '100%' },
                            },
                        }}
                    >
                        <img
                            src={Logo}
                            alt="Enlighten Learning"
                            style={{
                                width: '70%',
                                height: '70%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                    {/* Percentage Badge below logo */}
                    <Chip
                        label={`${percentage.toFixed(0)}%`}
                        size="small"
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            top: '100%',
                            transform: 'translateX(-50%)',
                            mt: 0.5,
                            fontWeight: 700,
                            backgroundColor: '#4caf50',
                            color: 'white',
                            fontSize: '0.7rem',
                            height: 20,
                            boxShadow: '0 2px 8px rgba(76, 175, 80, 0.4)',
                        }}
                    />
                </Box>
            </Box>

            {/* Milestone Labels */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 4,
                    px: { xs: 0, sm: 2 },
                }}
            >
                {milestones.map((milestone, index) => (
                    <Box
                        key={milestone.percent}
                        sx={{
                            textAlign: 'center',
                            flex: 1,
                            opacity: percentage >= milestone.percent ? 1 : 0.5,
                            transition: 'opacity 0.5s ease',
                        }}
                    >
                        <Typography sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem', mb: 0.5 }}>
                            {milestone.icon}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                color: percentage >= milestone.percent ? '#4caf50' : 'text.secondary',
                                fontWeight: percentage >= milestone.percent ? 600 : 400,
                                fontSize: '0.7rem',
                            }}
                        >
                            {milestone.label}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.7rem',
                            }}
                        >
                            {milestone.percent}%
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            p: 2,
                            borderRadius: 3,
                            backgroundColor: isDarkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(76, 175, 80, 0.2)' : 'rgba(76, 175, 80, 0.15)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: '#4caf50', mb: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                        >
                            ${currentAmount.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Raised
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            p: 2,
                            borderRadius: 3,
                            backgroundColor: isDarkMode ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(33, 150, 243, 0.2)' : 'rgba(33, 150, 243, 0.15)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: '#2196f3', mb: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                        >
                            ${(goalAmount - currentAmount).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            To Go
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            p: 2,
                            borderRadius: 3,
                            backgroundColor: isDarkMode ? 'rgba(156, 39, 176, 0.1)' : 'rgba(156, 39, 176, 0.05)',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(156, 39, 176, 0.2)' : 'rgba(156, 39, 176, 0.15)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: '#9c27b0', mb: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                        >
                            ${goalAmount.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Goal
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            p: 2,
                            borderRadius: 3,
                            backgroundColor: isDarkMode ? 'rgba(255, 152, 0, 0.1)' : 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(255, 152, 0, 0.2)' : 'rgba(255, 152, 0, 0.15)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: '#ff9800', mb: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                        >
                            {percentage.toFixed(0)}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Complete
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Encouraging Message */}
            <Box
                sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 2,
                    background: isDarkMode 
                        ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(129, 199, 132, 0.1))'
                        : 'linear-gradient(135deg, rgba(76, 175, 80, 0.08), rgba(129, 199, 132, 0.05))',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: isDarkMode ? '#81c784' : '#2e7d32',
                        fontWeight: 500,
                        fontStyle: 'italic',
                    }}
                >
                    {percentage >= 100 
                        ? "🎉 We reached our goal! Thank you for your incredible support!"
                        : percentage >= 75 
                            ? "⭐ Almost there! Your donation can help us cross the finish line!"
                            : percentage >= 50 
                                ? "🔥 Halfway there! Every contribution brings us closer to our goal!"
                                : "🌱 Every donation makes a difference in a student's life!"}
                </Typography>
            </Box>
        </Paper>
    );
};

// Simple donation button component
const DonationButton = ({ amount }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();

    const handleDonateClick = () => {
        // For demo purposes, we'll just show the Zelle info
        document.getElementById('zelle-section')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    const getButtonColor = (amount) => {
        if (amount <= 50) return '#4caf50';
        if (amount <= 100) return '#2196f3';
        if (amount <= 250) return '#ff9800';
        if (amount <= 500) return '#9c27b0';
        return '#e91e63';
    };

    const buttonColor = getButtonColor(amount);

    return (
        <Button
            variant="contained"
            fullWidth
            onClick={handleDonateClick}
            sx={{
                py: 3,
                px: 4,
                fontSize: '1.5rem',
                fontWeight: 700,
                backgroundColor: buttonColor,
                color: 'white',
                borderRadius: 3,
                border: `3px solid ${buttonColor}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: buttonColor,
                    opacity: 0.9,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px rgba(${buttonColor === '#4caf50' ? '76, 175, 80' :
                        buttonColor === '#2196f3' ? '33, 150, 243' :
                            buttonColor === '#ff9800' ? '255, 152, 0' :
                                buttonColor === '#9c27b0' ? '156, 39, 176' : '233, 30, 99'}, 0.4)`
                }
            }}
        >
            ${amount}
        </Button>
    );
};

export default function DonateNow() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [copiedZelle, setCopiedZelle] = React.useState(false);

    // Fundraising data
    const currentAmount = 2000;
    const goalAmount = 10000;
    const zelleEmail = "Enlightenlearningfinance@gmail.com";

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedZelle(true);
            setTimeout(() => setCopiedZelle(false), 2000);
        });
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
                {/* Page Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8, md: 10 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <HeartIcon
                            sx={{
                                fontSize: { xs: 60, sm: 80, md: 100 },
                                color: '#e91e63'
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
                            background: 'linear-gradient(45deg, #e91e63, #f06292)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Support Our Mission
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
                        Donations help us raise money to donate to charities that provide hope care and support to those in need. Striving to make a positive impact on as many lives possible.
                    </Typography>
                </Box>

                {/* Fundraising Progress */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 6,
                            color: isDarkMode ? '#fff' : '#333'
                        }}
                    >
                        Our Fundraising Progress
                    </Typography>
                    <FundraisingProgress
                        currentAmount={currentAmount}
                        goalAmount={goalAmount}
                    />
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 4, fontStyle: 'italic', maxWidth: 600, mx: 'auto' }}
                    >
                        Every dollar helps us make a bigger impact in our community! We're getting closer to our goal every day.
                    </Typography>
                </Box>

                <Divider sx={{ my: { xs: 4, sm: 6, md: 8 }, opacity: 0.3 }} />

                {/* Simple Donation Buttons - FIXED MOBILE LAYOUT */}
                <Box sx={{ mb: 8 }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 2,
                            color: isDarkMode ? '#fff' : '#333'
                        }}
                    >
                        Choose Your Donation Amount
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            textAlign: 'center',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            mb: 6
                        }}
                    >
                        Select any amount below to make your donation
                    </Typography>

                    {/* IMPROVED GRID LAYOUT FOR MOBILE */}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        sx={{
                            maxWidth: 600,
                            mx: 'auto',
                            // Ensure proper centering on all screen sizes
                            '& .MuiGrid-item': {
                                display: 'flex',
                                justifyContent: 'center'
                            }
                        }}
                    >
                        {donationAmounts.map((amount) => (
                            <Grid
                                item
                                xs={6}      // 2 columns on mobile (better than 4)
                                sm={6}      // Still 2 columns on small tablets
                                md={3}      // 4 columns on desktop
                                key={amount}
                            >
                                <DonationButton amount={amount} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Zelle Payment Section - FIXED EMAIL OVERFLOW */}
                <Box id="zelle-section" sx={{ mb: 8 }}>
                    <Paper
                        elevation={8}
                        sx={{
                            p: { xs: 4, sm: 6 },
                            backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                            borderRadius: 4,
                            border: '3px solid #6f42c1',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 6,
                                background: 'linear-gradient(90deg, #6f42c1, #8e44ad)',
                            }
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    mx: 'auto',
                                    mb: 3,
                                    backgroundColor: '#6f42c1',
                                    background: 'linear-gradient(135deg, #6f42c1, #8e44ad)',
                                }}
                            >
                                <WalletIcon sx={{ fontSize: 40 }} />
                            </Avatar>
                            <Typography
                                variant="h4"
                                component="h3"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    color: '#6f42c1'
                                }}
                            >
                                Send Your Donation via Zelle
                            </Typography>
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ mb: 4, lineHeight: 1.6 }}
                            >
                                Send your donation directly to our Financial Director
                            </Typography>
                        </Box>

                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={6}>
                                {/* Zelle Information */}
                                <Box sx={{ mb: 4 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 3,
                                            color: isDarkMode ? '#fff' : '#333'
                                        }}
                                    >
                                        Zelle Payment Information:
                                    </Typography>

                                    <Card
                                        sx={{
                                            p: 3,
                                            backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                                            border: '2px solid rgba(111, 66, 193, 0.2)',
                                            mb: 3
                                        }}
                                    >
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Financial Director:
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                Brianna Tam
                                            </Typography>
                                        </Box>

                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Zelle Email/Phone:
                                            </Typography>
                                            {/* FIXED MOBILE EMAIL LAYOUT */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile
                                                    alignItems: { xs: 'flex-start', sm: 'center' },
                                                    gap: 1
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: 'monospace',
                                                        wordBreak: 'break-all', // Allow breaking on mobile
                                                        fontSize: { xs: '0.9rem', sm: '1.25rem' }, // Smaller on mobile
                                                        lineHeight: 1.2
                                                    }}
                                                >
                                                    {zelleEmail}
                                                </Typography>
                                                <IconButton
                                                    onClick={() => copyToClipboard(zelleEmail)}
                                                    size="small"
                                                    sx={{
                                                        color: '#6f42c1',
                                                        alignSelf: { xs: 'flex-start', sm: 'center' },
                                                        mt: { xs: 0.5, sm: 0 }
                                                    }}
                                                >
                                                    {copiedZelle ? <CheckIcon /> : <CopyIcon />}
                                                </IconButton>
                                            </Box>
                                            {copiedZelle && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: '#4caf50', fontWeight: 600 }}
                                                >
                                                    Copied to clipboard!
                                                </Typography>
                                            )}
                                        </Box>
                                    </Card>

                                    <Alert severity="info" sx={{ mb: 3 }}>
                                        <Typography variant="body2">
                                            <strong>How to send via Zelle:</strong><br />
                                            1. Open your banking app<br />
                                            2. Select "Send Money with Zelle"<br />
                                            3. Enter the email above<br />
                                            4. Enter your donation amount<br />
                                            5. Add "Enlighten Learning Donation" in the memo
                                        </Typography>
                                    </Alert>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {/* QR Code Section */}
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 3,
                                            color: isDarkMode ? '#fff' : '#333'
                                        }}
                                    >
                                        Scan QR Code to Pay
                                    </Typography>

                                    {/* QR Code */}
                                    <Card
                                        sx={{
                                            p: 4,
                                            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
                                            border: '2px dashed #6f42c1',
                                            borderRadius: 3,
                                            display: 'inline-block',
                                            maxWidth: '100%' // Prevent overflow on mobile
                                        }}
                                    >
                                        <img
                                            src={ZelleQr}
                                            alt="Zelle QR Code for Enlighten Learning Donations"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                maxWidth: '200px',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </Card>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: 'block', mt: 2 }}
                                    >
                                        Use your phone's camera or banking app to scan
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>

                {/* Thank You Message */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: { xs: 4, sm: 6 },
                            backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                            borderRadius: 4,
                            border: '2px solid #e91e63',
                            maxWidth: '800px',
                            mx: 'auto'
                        }}
                    >
                        <HeartIcon sx={{ fontSize: 60, color: '#e91e63', mb: 3 }} />
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                color: '#e91e63'
                            }}
                        >
                            Thank You for Your Support!
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.6,
                                mb: 3
                            }}
                        >
                            Every donation, no matter the size, makes a meaningful difference as we strive to raise our fundraising goal. Your generosity helps us raise funds for a variety of charities that provide hope, care and support to those in need. We couldn't do this without you, thank you for helping us make a lasting impact in many lives!
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                fontStyle: 'italic'
                            }}
                        >
                            Together, we're building a brighter future for our community.
                        </Typography>
                    </Paper>
                </Box>

                {/* Contact Information */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            mb: 3,
                            color: isDarkMode ? '#fff' : '#333'
                        }}
                    >
                        Questions About Donations?
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Contact our Financial Director for any questions about donations or payment methods.
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Chip
                            icon={<SupportIcon />}
                            label="Enlightenlearningfinance@gmail.com"
                            variant="outlined"
                            clickable
                            onClick={() => window.location.href = 'mailto:Enlightenlearningfinance@gmail.com'}
                            sx={{
                                px: 2,
                                py: 1,
                                fontSize: { xs: '0.8rem', sm: '1rem' }, // Smaller on mobile
                                borderColor: '#2196f3',
                                color: '#2196f3',
                                cursor: 'pointer',
                                maxWidth: { xs: '100%', sm: 'none' }, // Full width on mobile if needed
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                    borderColor: '#1976d2',
                                    color: '#1976d2'
                                },
                                // Handle text overflow on mobile
                                '& .MuiChip-label': {
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }
                            }}
                        />
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}