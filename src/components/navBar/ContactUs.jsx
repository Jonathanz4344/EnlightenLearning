import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Seo, Section, PageIntro, FeatureGrid, FeatureCard, Surface, IconWell, ActionButton } from "../../kit";
import { Reveal } from "../../motion";

// Only the two social marks carry a brand color, and only on the icon itself
const brandIcon = (key) => (theme) => ({ color: theme.vars.palette.brand[key] });

// The three ways to reach us. Each card's link opens the same destination the
// old cards did: the email client or the social profile in a new tab.
const contactCards = [
  {
    icon: <EmailRoundedIcon />,
    iconTone: "tint",
    title: "Email Us",
    content: "enlightenandlearning@gmail.com",
    href: "mailto:enlightenandlearning@gmail.com",
    external: false,
  },
  {
    icon: <InstagramIcon sx={brandIcon("instagram")} />,
    iconTone: "sunken",
    title: "Follow us on Instagram",
    content: "@enlighten_learning",
    href: "https://www.instagram.com/enlighten_learning/",
    external: true,
  },
  {
    icon: <FacebookIcon sx={brandIcon("facebook")} />,
    iconTone: "sunken",
    title: "Follow us on Facebook",
    content: "@Enlighten Learning",
    href: "https://www.facebook.com/share/16yVvBdfyz/?mibextid=wwXIfr/",
    external: true,
  },
];

// The form keeps its own state so typing never re-renders the page around it
const ContactForm = () => {
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
      <Surface tone="paper" padding={{ xs: 3, md: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1.5, mb: 4 }}>
          <IconWell tone="tint" size="md">
            <SendRoundedIcon />
          </IconWell>
          <Typography variant="h3" component="h2" sx={{ textWrap: "balance", pt: 0.5 }}>
            Send us a Message
          </Typography>
          <Typography variant="body1" sx={(theme) => ({ color: theme.vars.palette.text.secondary, textWrap: "pretty" })}>
            Fill out the form below and we&apos;ll get back to you as soon as possible
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
              gap: 2.5,
              alignItems: "start",
            }}
          >
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange('name')}
              required
              disabled={isSubmitting}
              autoComplete="name"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRoundedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

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
              autoComplete="email"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon color={emailError ? "error" : "inherit"} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
              value={formData.subject}
              onChange={handleChange('subject')}
              disabled={isSubmitting}
              sx={{ gridColumn: { sm: "1 / -1" } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SubjectRoundedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

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
              sx={{ gridColumn: { sm: "1 / -1" } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
                      <MessageRoundedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 3.5 }}>
            <ActionButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!isFormValid || isSubmitting}
              endIcon={<SendRoundedIcon />}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </ActionButton>
          </Box>
        </Box>
      </Surface>

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
            success: <CheckCircleRoundedIcon fontSize="inherit" />,
            error: <ErrorRoundedIcon fontSize="inherit" />
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

export default function ContactUs() {
  return (
    <>
      <Seo title="Contact Us" description="Reach out to learn more about our fundraising efforts and how you can help." />

      {/* Page Header */}
      <PageIntro title="Get in Touch" lead="Ready to create change in our community?">
        <Reveal delay={0.14} y={12}>
          <Typography
            variant="body1"
            component="p"
            sx={(theme) => ({ color: theme.vars.palette.text.secondary, maxWidth: 600, textWrap: "pretty" })}
          >
            Reach out to learn more about our fundraising efforts and how you can help.
          </Typography>
        </Reveal>
      </PageIntro>

      {/* Contact form beside the contact cards */}
      <Section variant="sunken">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 7fr) minmax(0, 5fr)" },
            gap: { xs: 3, md: 4 },
            alignItems: "start",
          }}
        >
          <Reveal sx={{ minWidth: 0 }}>
            <ContactForm />
          </Reveal>

          <Box sx={{ minWidth: 0 }}>
            <FeatureGrid columns={{ xs: 1 }} gap={3}>
              {contactCards.map((card) => (
                <FeatureCard
                  key={card.title}
                  icon={card.icon}
                  iconTone={card.iconTone}
                  title={card.title}
                  href={card.href}
                  external={card.external}
                  actionLabel={card.content}
                  spotlight
                />
              ))}
            </FeatureGrid>
          </Box>
        </Box>
      </Section>
    </>
  );
}
