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
    ArrowForward as ArrowForwardIcon,
    VolunteerActivism as VolunteerIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { TOTAL_RAISED, FUNDRAISING_GOAL } from "../../constants/metrics";
import { useMode } from "../Layout";
import Logo from "/images/logo/Logo.png";
import ZelleQr from "/images/donate/Zelle.jpg"
import PathConstants from "../../routes/pathConstants";

// Simple donation amounts
const donationAmounts = [25, 50, 100, 250];

// Logo Balloon Fundraising Progress - The logo IS the balloon!
const FundraisingProgress = ({ currentAmount, goalAmount }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    // True progress, uncapped, so we can celebrate going past the goal
    const rawPercentage = goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;
    const percentage = Math.min(rawPercentage, 100);
    const isOverGoal = rawPercentage > 100;
    const overageAmount = Math.max(currentAmount - goalAmount, 0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Balloon rises from bottom (0%) to top (100%)
    const riseAmount = percentage; // 0-100

    // Balloon inflates from 60% to 100% size, plus a little extra past the goal
    const balloonScale = 0.6 + (percentage / 100) * 0.4 + (isOverGoal ? 0.08 : 0);

    // Celebration accents once the goal is beaten
    const goldGradient = 'linear-gradient(135deg, #ffd54f 0%, #ffb300 50%, #ff8f00 100%)';
    const confettiColors = ['#f44336', '#ffc107', '#4caf50', '#2196f3', '#e91e63', '#9c27b0'];

    // Base balloon size
    const balloonSize = isMobile ? 120 : 160;

    return (
        <Paper
            elevation={0}
            sx={{
                maxWidth: 800,
                mx: 'auto',
                mb: 4,
                p: { xs: 3, sm: 5 },
                borderRadius: 5,
                background: isOverGoal
                    ? (isDarkMode
                        ? 'linear-gradient(180deg, rgba(45, 32, 18, 0.95) 0%, rgba(30, 30, 50, 0.95) 60%, rgba(20, 20, 35, 0.95) 100%)'
                        : 'linear-gradient(180deg, #fff8e1 0%, #ffe0b2 30%, #b3d9f7 70%, #90caf9 100%)')
                    : (isDarkMode
                        ? 'linear-gradient(180deg, rgba(20, 20, 35, 0.95) 0%, rgba(30, 30, 50, 0.95) 100%)'
                        : 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 30%, #90caf9 100%)'),
                border: isOverGoal ? '3px solid #ffb300' : 'none',
                position: 'relative',
                overflow: 'hidden',
                minHeight: { xs: 500, sm: 550 },
            }}
        >
            {/* Sky Background Elements */}
            {/* Clouds */}
            {[...Array(3)].map((_, i) => (
                <Box
                    key={`cloud-${i}`}
                    sx={{
                        position: 'absolute',
                        top: `${15 + i * 25}%`,
                        left: i % 2 === 0 ? '5%' : '70%',
                        width: { xs: 60, sm: 100 },
                        height: { xs: 25, sm: 40 },
                        borderRadius: '50px',
                        background: isDarkMode
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(255,255,255,0.7)',
                        boxShadow: isDarkMode
                            ? 'none'
                            : '0 4px 20px rgba(255,255,255,0.5)',
                        animation: `cloudFloat${i} ${15 + i * 5}s ease-in-out infinite`,
                        [`@keyframes cloudFloat${i}`]: {
                            '0%, 100%': { transform: 'translateX(0)' },
                            '50%': { transform: `translateX(${i % 2 === 0 ? '20px' : '-20px'})` },
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '-50%',
                            left: '20%',
                            width: '40%',
                            height: '100%',
                            borderRadius: '50%',
                            background: 'inherit',
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '-30%',
                            right: '20%',
                            width: '30%',
                            height: '80%',
                            borderRadius: '50%',
                            background: 'inherit',
                        },
                    }}
                />
            ))}

            {/* Celebration sunburst + confetti once we pass the goal */}
            {isOverGoal && (
                <>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -120,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 420,
                            height: 420,
                            borderRadius: '50%',
                            background: isDarkMode
                                ? 'radial-gradient(circle, rgba(255,193,7,0.22) 0%, transparent 65%)'
                                : 'radial-gradient(circle, rgba(255,193,7,0.45) 0%, transparent 65%)',
                            animation: 'sunPulse 4s ease-in-out infinite',
                            pointerEvents: 'none',
                            '@keyframes sunPulse': {
                                '0%, 100%': { opacity: 0.6, transform: 'translateX(-50%) scale(1)' },
                                '50%': { opacity: 1, transform: 'translateX(-50%) scale(1.12)' },
                            },
                        }}
                    />
                    {[...Array(16)].map((_, i) => (
                        <Box
                            key={`confetti-${i}`}
                            sx={{
                                position: 'absolute',
                                top: -20,
                                left: `${(i * 6.1 + 3) % 96}%`,
                                width: i % 3 === 0 ? 12 : 8,
                                height: i % 3 === 0 ? 8 : 12,
                                borderRadius: i % 4 === 0 ? '50%' : '2px',
                                backgroundColor: confettiColors[i % confettiColors.length],
                                opacity: 0.85,
                                pointerEvents: 'none',
                                zIndex: 1,
                                animation: `confettiFall${i % 3} ${5 + (i % 4)}s linear ${(i % 6) * 0.7}s infinite`,
                                [`@keyframes confettiFall${i % 3}`]: {
                                    '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
                                    '10%': { opacity: 0.9 },
                                    '90%': { opacity: 0.9 },
                                    '100%': {
                                        transform: `translateY(560px) rotate(${540 + (i % 3) * 180}deg)`,
                                        opacity: 0,
                                    },
                                },
                            }}
                        />
                    ))}
                </>
            )}

            {/* Ground/Grass at bottom */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 60,
                    background: isDarkMode
                        ? 'linear-gradient(180deg, #1b5e20 0%, #2e7d32 100%)'
                        : 'linear-gradient(180deg, #66bb6a 0%, #43a047 100%)',
                    borderRadius: '100% 100% 0 0 / 30px 30px 0 0',
                }}
            />

            {/* Main Content Container */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                {/* Title */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: isOverGoal ? (isDarkMode ? '#ffca28' : '#ef6c00') : (isDarkMode ? '#fff' : '#1565c0'),
                        textAlign: 'center',
                        mb: 1,
                        textShadow: isDarkMode ? 'none' : '0 2px 10px rgba(255,255,255,0.5)',
                    }}
                >
                    {isOverGoal ? 'We Broke Through the Sky! 🎉' : 'Help Our Balloon Rise! 🎈'}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: isOverGoal ? (isDarkMode ? '#ffe082' : '#e65100') : (isDarkMode ? 'rgba(255,255,255,0.7)' : '#1976d2'),
                        textAlign: 'center',
                        mb: 4,
                        fontWeight: isOverGoal ? 600 : 400,
                    }}
                >
                    {isOverGoal
                        ? `Goal beaten by $${overageAmount.toLocaleString()} — every donation now goes even further`
                        : 'Every donation inflates and lifts us higher'}
                </Typography>

                {/* Balloon Flight Zone */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: { xs: 280, sm: 320 },
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {/* Vertical Progress Track */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 40,
                            transform: 'translateX(-50%)',
                            width: 4,
                            background: isDarkMode
                                ? 'rgba(255,255,255,0.1)'
                                : 'rgba(255,255,255,0.5)',
                            borderRadius: 2,
                        }}
                    />

                    {/* Milestone Markers */}
                    {[0, 25, 50, 75, 100].map((milestone) => (
                        <Box
                            key={milestone}
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                bottom: `${(milestone / 100) * 85 + 10}%`,
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    position: 'absolute',
                                    right: 30,
                                    color: percentage >= milestone
                                        ? (isOverGoal
                                            ? (isDarkMode ? '#ffca28' : '#ef6c00')
                                            : (isDarkMode ? '#81c784' : '#2e7d32'))
                                        : (isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'),
                                    fontWeight: percentage >= milestone ? 700 : 400,
                                    fontSize: '0.7rem',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {isOverGoal && milestone === 100
                                    ? 'GOAL 🏆'
                                    : `$${(goalAmount * milestone / 100).toLocaleString()}`}
                            </Typography>
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: percentage >= milestone
                                        ? (isOverGoal ? '#ffb300' : '#4caf50')
                                        : (isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)'),
                                    border: '2px solid',
                                    borderColor: percentage >= milestone
                                        ? (isOverGoal ? '#ef6c00' : '#2e7d32')
                                        : (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'),
                                    transition: 'all 0.5s ease',
                                    boxShadow: percentage >= milestone
                                        ? (isOverGoal
                                            ? '0 0 12px rgba(255, 179, 0, 0.7)'
                                            : '0 0 10px rgba(76, 175, 80, 0.5)')
                                        : 'none',
                                }}
                            />
                        </Box>
                    ))}

                    {/* THE LOGO BALLOON */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            bottom: `${Math.max(riseAmount * 0.85, 5)}%`,
                            transform: 'translateX(-50%)',
                            transition: 'bottom 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            animation: isOverGoal
                                ? 'balloonSoar 4.5s ease-in-out infinite'
                                : percentage >= 50 ? 'balloonBob 3s ease-in-out infinite' : 'none',
                            '@keyframes balloonBob': {
                                '0%, 100%': { transform: 'translateX(-50%) translateY(0) rotate(-2deg)' },
                                '50%': { transform: 'translateX(-50%) translateY(-10px) rotate(2deg)' },
                            },
                            '@keyframes balloonSoar': {
                                '0%, 100%': { transform: 'translateX(-50%) translateY(0) rotate(-4deg)' },
                                '50%': { transform: 'translateX(-50%) translateY(-24px) rotate(4deg)' },
                            },
                        }}
                    >
                        {/* Balloon String */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 3,
                                height: { xs: 40, sm: 60 },
                                background: `linear-gradient(180deg, #8d6e63 0%, #6d4c41 100%)`,
                                borderRadius: 2,
                                transformOrigin: 'top center',
                                animation: percentage >= 50 ? 'stringWave 2s ease-in-out infinite' : 'none',
                                '@keyframes stringWave': {
                                    '0%, 100%': { transform: 'translateX(-50%) rotate(-3deg)' },
                                    '50%': { transform: 'translateX(-50%) rotate(3deg)' },
                                },
                            }}
                        />

                        {/* Main Balloon (Logo) */}
                        <Box
                            sx={{
                                width: balloonSize,
                                height: balloonSize,
                                transform: `scale(${balloonScale})`,
                                transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                position: 'relative',
                            }}
                        >
                            {/* Balloon Glow */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '140%',
                                    height: '140%',
                                    borderRadius: '50%',
                                    background: isOverGoal
                                        ? 'radial-gradient(circle, rgba(255, 179, 0, 0.55) 0%, transparent 70%)'
                                        : `radial-gradient(circle, rgba(76, 175, 80, ${0.2 + percentage * 0.003}) 0%, transparent 70%)`,
                                    animation: 'glowPulse 2s ease-in-out infinite',
                                    '@keyframes glowPulse': {
                                        '0%, 100%': { opacity: 0.7, transform: 'translate(-50%, -50%) scale(1)' },
                                        '50%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1.1)' },
                                    },
                                }}
                            />

                            {/* Balloon Body */}
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: isOverGoal
                                        ? `radial-gradient(ellipse at 30% 30%, #ffffff 0%, #fffde7 30%, #fff8e1 60%, #ffe082 100%)`
                                        : `radial-gradient(ellipse at 30% 30%, #ffffff 0%, #f5f5f5 30%, #e8f5e9 60%, #c8e6c9 100%)`,
                                    boxShadow: isOverGoal
                                        ? `
                                        inset -8px -8px 20px rgba(0,0,0,0.08),
                                        inset 8px 8px 20px rgba(255,255,255,0.95),
                                        0 10px 40px rgba(255, 179, 0, 0.45),
                                        0 0 80px rgba(255, 179, 0, 0.5)
                                    `
                                        : `
                                        inset -8px -8px 20px rgba(0,0,0,0.1),
                                        inset 8px 8px 20px rgba(255,255,255,0.9),
                                        0 10px 40px rgba(76, 175, 80, 0.3),
                                        0 0 60px rgba(76, 175, 80, ${0.1 + percentage * 0.003})
                                    `,
                                    border: '4px solid',
                                    borderColor: isOverGoal ? '#ffb300' : percentage >= 75 ? '#4caf50' : percentage >= 50 ? '#81c784' : '#a5d6a7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '10%',
                                        left: '15%',
                                        width: '30%',
                                        height: '25%',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 100%)',
                                    },
                                }}
                            >
                                {/* Logo Inside */}
                                <img
                                    src={Logo}
                                    alt="Enlighten Learning"
                                    style={{
                                        width: '65%',
                                        height: '65%',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                                    }}
                                />
                            </Box>

                            {/* Balloon Tie */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: -8,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 16,
                                    height: 16,
                                    background: isOverGoal ? '#ffb300' : percentage >= 75 ? '#4caf50' : percentage >= 50 ? '#81c784' : '#a5d6a7',
                                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                                }}
                            />
                        </Box>

                        {/* Percentage Badge */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -20,
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <Chip
                                label={isOverGoal ? `🏆 ${rawPercentage.toFixed(0)}%` : `${percentage.toFixed(0)}%`}
                                sx={{
                                    fontWeight: 800,
                                    backgroundColor: isOverGoal ? '#ffb300' : '#4caf50',
                                    background: isOverGoal ? goldGradient : undefined,
                                    color: isOverGoal ? '#4e342e' : 'white',
                                    fontSize: '0.9rem',
                                    height: 32,
                                    whiteSpace: 'nowrap',
                                    boxShadow: isOverGoal
                                        ? '0 4px 18px rgba(255, 179, 0, 0.6)'
                                        : '0 4px 15px rgba(76, 175, 80, 0.4)',
                                    border: '2px solid',
                                    borderColor: isOverGoal ? '#ef6c00' : '#2e7d32',
                                    animation: isOverGoal ? 'badgePop 2.5s ease-in-out infinite' : 'none',
                                    '@keyframes badgePop': {
                                        '0%, 100%': { transform: 'scale(1)' },
                                        '50%': { transform: 'scale(1.12)' },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Amount Display */}
                <Box
                    sx={{
                        mt: 4,
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 4,
                        background: isDarkMode
                            ? 'rgba(0,0,0,0.3)'
                            : 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: isOverGoal
                            ? '0 8px 32px rgba(255, 179, 0, 0.35)'
                            : '0 8px 32px rgba(0,0,0,0.1)',
                        border: isOverGoal ? '2px solid #ffb300' : 'none',
                        width: '100%',
                        maxWidth: 400,
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            background: isOverGoal
                                ? 'linear-gradient(135deg, #ffb300 0%, #ef6c00 100%)'
                                : 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: { xs: '2rem', sm: '2.5rem' },
                            mb: 0.5,
                        }}
                    >
                        ${currentAmount.toLocaleString()}
                    </Typography>
                    {isOverGoal ? (
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            raised — <strong>${overageAmount.toLocaleString()}</strong> past our{' '}
                            ${goalAmount.toLocaleString()} goal 🎉
                        </Typography>
                    ) : (
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            raised of <strong>${goalAmount.toLocaleString()}</strong> goal
                        </Typography>
                    )}

                    {/* Mini Progress Bar */}
                    <Box
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                width: `${percentage}%`,
                                borderRadius: 4,
                                background: isOverGoal
                                    ? 'linear-gradient(90deg, #ffd54f, #ffb300, #ff8f00, #ffd54f)'
                                    : 'linear-gradient(90deg, #66bb6a, #4caf50, #43a047)',
                                backgroundSize: isOverGoal ? '200% 100%' : 'auto',
                                transition: 'width 1.5s ease-out',
                                animation: isOverGoal ? 'barShimmer 2.5s linear infinite' : 'none',
                                '@keyframes barShimmer': {
                                    '0%': { backgroundPosition: '0% 50%' },
                                    '100%': { backgroundPosition: '200% 50%' },
                                },
                            }}
                        />
                    </Box>

                    {/* Stats Row */}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: isOverGoal ? '#ffb300' : '#4caf50' }}>
                                ${currentAmount.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">Raised</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2196f3' }}>
                                {isOverGoal
                                    ? `+$${overageAmount.toLocaleString()}`
                                    : `$${(goalAmount - currentAmount).toLocaleString()}`}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {isOverGoal ? 'Above Goal' : 'To Go'}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff9800' }}>
                                {rawPercentage.toFixed(0)}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {isOverGoal ? 'Of Goal' : 'Complete'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                {/* Encouraging Message */}
                <Typography
                    variant="body2"
                    sx={{
                        mt: 3,
                        color: isOverGoal
                            ? (isDarkMode ? '#ffca28' : '#ef6c00')
                            : (isDarkMode ? '#81c784' : '#2e7d32'),
                        fontWeight: isOverGoal ? 700 : 500,
                        textAlign: 'center',
                        fontStyle: 'italic',
                    }}
                >
                    {isOverGoal
                        ? "🏆 Goal smashed — and we're still climbing! Thank you for lifting us this far."
                        : percentage >= 100
                        ? "🎈 The balloon has reached the sky! Thank you!"
                        : percentage >= 75
                            ? "🎈 Almost at the clouds! One more push!"
                            : percentage >= 50
                                ? "🎈 Rising higher! Keep it going!"
                                : percentage >= 25
                                    ? "🎈 Lifting off! Help us soar!"
                                    : "🎈 Help inflate and launch our balloon!"}
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
    const currentAmount = TOTAL_RAISED;
    const goalAmount = FUNDRAISING_GOAL;
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
                    {/* See Our Impact Button */}
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Button
                            component={Link}
                            to={PathConstants.CHARITIES}
                            variant="outlined"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            startIcon={<VolunteerIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                borderWidth: 2,
                                borderColor: isDarkMode ? '#667eea' : '#764ba2',
                                color: isDarkMode ? '#667eea' : '#764ba2',
                                background: isDarkMode
                                    ? 'rgba(102, 126, 234, 0.1)'
                                    : 'rgba(118, 75, 162, 0.05)',
                                '&:hover': {
                                    borderWidth: 2,
                                    borderColor: isDarkMode ? '#764ba2' : '#667eea',
                                    background: isDarkMode
                                        ? 'rgba(102, 126, 234, 0.2)'
                                        : 'rgba(118, 75, 162, 0.1)',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            See Our Impact & Charities
                        </Button>
                    </Box>
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