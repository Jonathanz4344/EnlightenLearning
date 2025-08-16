import * as React from "react";
import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    Typography,
    useMediaQuery,
    Grid,
    Divider,
    Avatar,
    Paper,
    TextField,
    InputAdornment,
    Fade,
    Zoom,
    Alert,
    Snackbar,
} from "@mui/material";
import {
    Email as EmailIcon,
    ContactMail as ContactIcon,
    Send as SendIcon,
    Person as PersonIcon,
    Subject as SubjectIcon,
    Message as MessageIcon,
    Favorite as HeartIcon,
    CheckCircle as SuccessIcon,
    Error as ErrorIcon,
    AccessTime as TimeIcon,
} from "@mui/icons-material";
import { useMode } from "../Layout";

const ContactForm = () => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Validate email field in real-time
        if (field === 'email') {
            if (value && !validateEmail(value)) {
                setEmailError('Please enter a valid email address');
            } else {
                setEmailError('');
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate email before submission
        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        // Get the form ID from environment variable
        const formspreeId = import.meta.env.VITE_FORMSPREE_CONTACT;

        // Construct the full Formspree URL
        const formspreeEndpoint = `https://formspree.io/f/${formspreeId}`;

        if (!formspreeId) {
            console.error('Formspree form ID not configured');
            setSubmitStatus('error');
            setSnackbarOpen(true);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || 'Contact Form Submission',
                    message: formData.message,
                    _replyto: formData.email, // This tells Formspree which email to reply to
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setEmailError('');
            } else {
                const errorData = await response.json();
                console.error('Formspree error:', errorData);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const isFormValid = formData.name && formData.email && formData.message && !emailError && validateEmail(formData.email);

    return (
        <>
            <Card
                elevation={8}
                sx={{
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: 'linear-gradient(90deg, #1976d2, #42a5f5, #2196f3)',
                    }
                }}
            >
                <CardContent sx={{ p: 4, pt: 5 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                mx: 'auto',
                                mb: 2,
                                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                boxShadow: '0 8px 20px rgba(25, 118, 210, 0.4)',
                            }}
                        >
                            <SendIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography
                            variant="h4"
                            fontWeight="700"
                            sx={{
                                color: '#1976d2',
                                mb: 1
                            }}
                        >
                            Send us a Message
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ maxWidth: '400px', mx: 'auto' }}
                        >
                            Fill out the form below and we'll get back to you as soon as possible
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Your Name"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={handleChange('name')}
                                    required
                                    disabled={isSubmitting}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1976d2',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleChange('email')}
                                    required
                                    disabled={isSubmitting}
                                    error={!!emailError}
                                    helperText={emailError || 'We\'ll use this to get back to you'}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color={emailError ? "error" : "primary"} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: emailError ? '#d32f2f' : '#1976d2',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: emailError ? '#d32f2f' : '#1976d2',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Subject"
                                    variant="outlined"
                                    value={formData.subject}
                                    onChange={handleChange('subject')}
                                    disabled={isSubmitting}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SubjectIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1976d2',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Your Message"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={formData.message}
                                    onChange={handleChange('message')}
                                    required
                                    disabled={isSubmitting}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                                                <MessageIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1976d2',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={!isFormValid || isSubmitting}
                                endIcon={<SendIcon />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)',
                                    },
                                    '&:disabled': {
                                        background: 'linear-gradient(135deg, #bdbdbd, #e0e0e0)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Success/Error Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={submitStatus === 'success' ? 'success' : 'error'}
                    sx={{ width: '100%' }}
                    iconMapping={{
                        success: <SuccessIcon fontSize="inherit" />,
                        error: <ErrorIcon fontSize="inherit" />
                    }}
                >
                    {submitStatus === 'success'
                        ? 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
                        : 'Sorry, there was an error sending your message. Please try again or email us directly.'
                    }
                </Alert>
            </Snackbar>
        </>
    );
};

const ContactInfoCard = ({ icon: Icon, title, content, color, action }) => {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";

    return (
        <Paper
            elevation={6}
            sx={{
                p: 4,
                textAlign: 'center',
                height: '100%',
                backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                transition: 'all 0.3s ease',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                cursor: action ? 'pointer' : 'default',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${color}30`,
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                }
            }}
            onClick={action}
        >
            <Box sx={{ mb: 3 }}>
                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        backgroundColor: color,
                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                        boxShadow: `0 8px 20px ${color}40`,
                        mb: 2
                    }}
                >
                    <Icon sx={{ fontSize: 40 }} />
                </Avatar>
            </Box>
            <Typography
                variant="h5"
                fontWeight="700"
                sx={{
                    mb: 2,
                    color: color,
                    fontSize: '1.4rem'
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body1"
                color="text.primary"
                sx={{
                    lineHeight: 1.7,
                    fontSize: '1rem',
                    fontWeight: 500
                }}
            >
                {content}
            </Typography>
        </Paper>
    );
};

export default function ContactUs() {
    const { mode = "light" } = useMode() || {};
    const isDarkMode = mode === "dark";
    const isMobile = useMediaQuery('(max-width:900px)');

    const handleEmailClick = () => {
        window.location.href = 'mailto:enlightenandlearning@gmail.com';
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
                <Fade in timeout={1000}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8, md: 10 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <ContactIcon
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
                            Get in Touch
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{
                                maxWidth: '700px',
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                                mb: 2
                            }}
                        >
                            Ready to support education in our community?
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                maxWidth: '600px',
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontSize: '1rem'
                            }}
                        >
                            Reach out to learn more about our fundraising efforts and how you can help.
                        </Typography>
                    </Box>
                </Fade>

                <Grid container spacing={6} sx={{ mb: 8 }}>
                    {/* Contact Form */}
                    <Grid item xs={12} lg={8}>
                        <Zoom in timeout={1200}>
                            <div>
                                <ContactForm />
                            </div>
                        </Zoom>
                    </Grid>

                    {/* Contact Information */}
                    <Grid item xs={12} lg={4}>
                        <Fade in timeout={1400}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}>
                                <ContactInfoCard
                                    icon={EmailIcon}
                                    title="Email Us"
                                    content="enlightenandlearning@gmail.com"
                                    color="#1976d2"
                                    action={handleEmailClick}
                                />

                                <ContactInfoCard
                                    icon={HeartIcon}
                                    title="Response Time"
                                    content="We typically respond within 24 - 48 hours"
                                    color="#4caf50"
                                />
                                <ContactInfoCard
                                    icon={TimeIcon}
                                    title="Availability"
                                    content="Flexible scheduling to fit your family's needs"
                                    color="#ff9800"
                                />
                            </Box>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}