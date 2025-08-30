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

// Updated Fundraising Progress component
const FundraisingProgress = ({ currentAmount, goalAmount }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const percentage = Math.min((currentAmount / goalAmount) * 100, 100);
    const progressHeight = 400; // Height of the progress bar area

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 600,
                mx: 'auto',
                mb: 4
            }}
        >
            {/* Goal Amount at Top */}
            <Box
                sx={{
                    mb: 2,
                    textAlign: 'center',
                    p: 2,
                    backgroundColor: isDarkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)',
                    borderRadius: 3,
                    border: '2px solid #4caf50',
                    minWidth: 200
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        color: '#4caf50',
                        mb: 0.5
                    }}
                >
                    ${goalAmount.toLocaleString()}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: '#4caf50',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 1
                    }}
                >
                    Goal
                </Typography>
            </Box>

            {/* Main Progress Container */}
            <Box
                sx={{
                    position: 'relative',
                    width: 120,
                    height: progressHeight,
                    mx: 'auto'
                }}
            >
                {/* Background Track */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        transform: 'translateX(-50%)',
                        width: 12,
                        height: '100%',
                        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        borderRadius: 6,
                    }}
                />

                {/* Progress Fill */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        bottom: 0,
                        transform: 'translateX(-50%)',
                        width: 12,
                        height: `${percentage}%`,
                        background: 'linear-gradient(0deg, #4caf50, #66bb6a, #81c784)',
                        borderRadius: 6,
                        transition: 'height 1.5s ease-out',
                        boxShadow: '0 0 20px rgba(76, 175, 80, 0.4)',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '30%',
                            background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.3))',
                            borderRadius: 6,
                        }
                    }}
                />

                {/* Current Amount Indicator */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        bottom: `${percentage}%`,
                        transform: 'translate(-50%, 50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        transition: 'bottom 1.5s ease-out',
                    }}
                >
                    {/* Current Amount Display */}
                    <Paper
                        elevation={8}
                        sx={{
                            p: 2.5,
                            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                            border: '3px solid #4caf50',
                            borderRadius: 3,
                            minWidth: 160,
                            textAlign: 'center',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                right: -12,
                                transform: 'translateY(-50%)',
                                width: 0,
                                height: 0,
                                borderTop: '12px solid transparent',
                                borderBottom: '12px solid transparent',
                                borderLeft: '12px solid #4caf50',
                            }
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                color: '#4caf50',
                                mb: 0.5,
                                fontSize: { xs: '1.8rem', sm: '2.2rem' }
                            }}
                        >
                            ${currentAmount.toLocaleString()}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#4caf50',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5
                            }}
                        >
                            {percentage.toFixed(0)}% Raised
                        </Typography>
                    </Paper>

                    {/* Logo Circle */}
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '4px solid #4caf50',
                            boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src={Logo}
                            alt="Enlighten Learning"
                            style={{
                                width: '70%',
                                height: '70%',
                                objectFit: 'contain'
                            }}
                        />
                    </Box>
                </Box>

                {/* Progress Milestones */}
                {[25, 50, 75].map((milestone) => (
                    <Box
                        key={milestone}
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            bottom: `${milestone}%`,
                            transform: 'translate(-50%, 50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        {/* Milestone dot */}
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: percentage >= milestone ? '#4caf50' : (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'),
                                border: '2px solid white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                transition: 'background-color 0.5s ease',
                                zIndex: 2,
                            }}
                        />
                        {/* Milestone label */}
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 500,
                                ml: 2,
                                fontSize: '0.75rem'
                            }}
                        >
                            ${(goalAmount * milestone / 100).toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Zero Amount at Bottom */}
            <Box
                sx={{
                    mt: 2,
                    textAlign: 'center',
                    p: 1.5,
                    backgroundColor: isDarkMode ? 'rgba(158, 158, 158, 0.1)' : 'rgba(158, 158, 158, 0.05)',
                    borderRadius: 2,
                    border: '2px solid #9e9e9e',
                    minWidth: 120
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: '#9e9e9e',
                        mb: 0.5
                    }}
                >
                    $0
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: '#9e9e9e',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        fontSize: '0.7rem'
                    }}
                >
                    Start
                </Typography>
            </Box>

            {/* Progress Statistics */}
            <Box
                sx={{
                    mt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 4,
                    flexWrap: 'wrap'
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#4caf50' }}>
                        ${(goalAmount - currentAmount).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        Remaining
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#2196f3' }}>
                        {percentage.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        Complete
                    </Typography>
                </Box>
            </Box>
        </Box>
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