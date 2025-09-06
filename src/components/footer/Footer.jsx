import * as React from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SiTiktok as TikTokIcon } from "react-icons/si";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIcon from "@mui/icons-material/Phone";
import SmsIcon from "@mui/icons-material/Sms";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import MailIcon from "@mui/icons-material/Mail"; // Added mail icon import
import Logo from "/images/logo/Logo.png";
import PathConstants from "../../routes/pathConstants";
import { useMode } from "../Layout";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const logoStyle = {
  width: "140px",
  height: "auto",
};

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  display: 'inline-block',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(4px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: 0,
    height: '2px',
    background: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  }
}));

const ExternalLink = styled('a')(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  display: 'inline-block',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(4px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: 0,
    height: '2px',
    background: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © Enlighten Learning Tutoring Center "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const { mode = "light" } = useMode() || {};
  const isDarkMode = mode === "dark";
  const [email, setEmail] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmail("");
      setSuccessMessage("Successfully Subscribed!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      setSuccessMessage("Please enter a valid email.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <footer
      aria-labelledby="footer-heading"
      style={{
        backgroundColor: isDarkMode ? "#121212" : "#f9f9f9",
        color: isDarkMode ? "#fff" : "#333",
        borderTop: "1px solid",
        borderColor: isDarkMode ? "#333" : "#ddd",
        transition: "background-color 0.3s, color 0.3s",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          textAlign: { sm: "center", md: "left" },
        }}
      >
        {/* Main Footer Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
            gap: { xs: 3, sm: 6 },
            flexWrap: { sm: "wrap", md: "nowrap" },
          }}
        >
          {/* Logo and Business Info */}
          <Box
            component="article"
            itemScope
            itemType="https://schema.org/Optician"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              minWidth: { xs: "100%", sm: "40%", md: "30%" },
            }}
          >
            <Box>
              <FooterLink
                to={PathConstants.HOME}
                title="Enlighten Learning Home"
                aria-label="Go to Enlighten Learning homepage"
              >
                <img
                  src={Logo}
                  style={logoStyle}
                  alt="Enlighten Learning logo"
                  itemProp="logo"
                />
              </FooterLink>

              {/* Business Address and Contact */}
              <Box
                component="address"
                sx={{
                  fontStyle: "normal",
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" />
                  <ExternalLink
                    href="mailto:enlightenandlearning@gmail.com"
                    itemProp="email"
                  >
                    enlightenandlearning@gmail.com
                  </ExternalLink>
                </Box>
                
                {/* Instagram Link */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <InstagramIcon fontSize="small" />
                  <ExternalLink
                    href="https://www.instagram.com/enlighten_learning/"
                    target="_blank"
                    rel="instagram"
                    aria-label="Follow us on Instagram"
                  >
                    @enlighten_learning
                  </ExternalLink>
                </Box>
                
                {/* Facebook Link */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FacebookIcon fontSize="small" />
                  <ExternalLink
                    href="https://www.facebook.com/share/16yVvBdfyz/?mibextid=wwXIfr/"
                    target="_blank"
                    rel="facebook"
                    aria-label="Like us on Facebook"
                  >
                    @enlightenlearning
                  </ExternalLink>
                </Box>
              </Box>
            </Box>

            {/* Newsletter Subscription */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" color="inherit" mb={2}>
                Subscribe to our newsletter for updates and events.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="footer-email-input"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{
                    autoComplete: "email",
                    "aria-label": "Enter your email address",
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ flexShrink: 0 }}
                  onClick={handleSubscribe}
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </Button>
              </Stack>
              {successMessage && (
                <Typography
                  variant="body2"
                  color="success.main"
                  sx={{ mt: 2, fontWeight: "bold" }}
                  role="alert"
                >
                  {successMessage}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Footer Navigation */}
          <Box
            component="nav"
            aria-label="Footer Navigation"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              gap: { xs: 4, sm: 6 },
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "flex-start", sm: "space-between" },
            }}
          >
            {/* About Us Links */}
            <Box
              component="div"
              role="navigation"
              aria-labelledby="footer-about-heading"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minWidth: { xs: "45%", sm: "auto" },
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                id="footer-about-heading"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                About Us
              </Typography>
              <FooterLink to={PathConstants.HOME} aria-label="Go to Home page">
                Home
              </FooterLink>
              <FooterLink
                to={PathConstants.MISSION}
                aria-label="Learn about our mission"
              >
                Our Mission
              </FooterLink>
              <FooterLink
                to={PathConstants.OUR_TEAM}
                aria-label="Meet our team"
              >
                Meet Our Team
              </FooterLink>
              <FooterLink
                to={PathConstants.MAKING_DIFF}
                aria-label="Making a Difference"
              >
                Making a Difference
              </FooterLink>
            </Box>

            {/* Programs Links */}
            <Box
              component="div"
              role="navigation"
              aria-labelledby="footer-programs-heading"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minWidth: { xs: "45%", sm: "auto" },
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                id="footer-programs-heading"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                Programs
              </Typography>
              <FooterLink
                to={PathConstants.TUTORING_SERVICES}
                aria-label="Learn about tutoring services"
              >
                Tutoring Services
              </FooterLink>
              <FooterLink
                to={PathConstants.EVENTS}
                aria-label="View events and programs"
              >
                Events & Programs
              </FooterLink>
            </Box>

            {/* Get Involved Links */}
            <Box
              component="div"
              role="navigation"
              aria-labelledby="footer-getinvolved-heading"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minWidth: { xs: "45%", sm: "auto" },
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                id="footer-getinvolved-heading"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                Get Involved
              </Typography>
              <FooterLink
                to={PathConstants.VOLUNTEER_OPPORTUNITIES}
                aria-label="Learn about volunteer opportunities"
              >
                Volunteer Opportunities
              </FooterLink>
              <FooterLink
                to={PathConstants.TUTOR}
                aria-label="Apply as a tutor"
              >
                Apply as a Tutor
              </FooterLink>
              <FooterLink
                to={PathConstants.EXEC_TEAM}
                aria-label="Join the executive team"
              >
                Join the Executive Team
              </FooterLink>
            </Box>
          </Box>
        </Box>

        {/* Footer Bottom - Copyright and Social Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "flex-end" },
            pt: { xs: 4, sm: 8 },
            width: "100%",
            gap: { xs: 2, sm: 0 },
          }}
        >
          {/* Legal Links and Copyright */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Copyright />
          </Box>

          {/* Social Media Links with Mail Icon */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: { xs: "center", sm: "flex-end" },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <IconButton
              href="mailto:enlightenandlearning@gmail.com"
              aria-label="Send us an email"
              color="inherit"
              component="a"
            >
              <MailIcon />
            </IconButton>
            <IconButton
              href="https://www.instagram.com/enlighten_learning/"
              aria-label="Follow us on Instagram"
              color="inherit"
              component="a"
              target="_blank"
              rel="instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://www.facebook.com/share/16yVvBdfyz/?mibextid=wwXIfr/"
              aria-label="Like us on Facebook"
              color="inherit"
              component="a"
              target="_blank"
              rel="facebook"
            >
              <FacebookIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </footer>
  );
}