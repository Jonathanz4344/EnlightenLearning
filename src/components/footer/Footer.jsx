import * as React from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
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
import Logo from "/images/logo/Logo.png";
import PathConstants from "../../routes/pathConstants";
import { useMode } from "../Layout";

const logoStyle = {
  width: "140px",
  height: "auto",
};

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
              <Link
                href={PathConstants.HOME}
                title="Citywide Eye Care Home"
                aria-label="Go to Citywide Eye Care homepage"
              >
                <img
                  src={Logo}
                  style={logoStyle}
                  alt="Citywide Eye Care logo"
                  itemProp="logo"
                />
              </Link>

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
                  <Link
                    href="mailto:enlightenandlearning@gmail.com"
                    color="inherit"
                    itemProp="email"
                    underline="hover"
                  >
                    enlightenandlearning@gmail.com
                  </Link>
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

          {/* Footer Navigation - Now visible on all screen sizes */}
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
              <Link
                color="inherit"
                href={PathConstants.HOME}
                underline="hover"
                aria-label="Go to Home page"
              >
                Home
              </Link>
              <Link
                color="inherit"
                href={PathConstants.MISSION}
                underline="hover"
                aria-label="Learn about our doctor"
              >
                Our Mission
              </Link>
              <Link
                color="inherit"
                href={PathConstants.OUR_TEAM}
                underline="hover"
                aria-label="View frequently asked questions"
              >
                Meet Our Team
              </Link>

              {/* <Typography
                variant="h6"
                component="h3"
                id="footer-patient-heading"
                color="primary.main"
                sx={{ mt: 2, fontWeight: 600 }}
              >
                Patient Center
              </Typography>
              <Link
                color="inherit"
                href={PathConstants.HOME}
                underline="hover"
                aria-label="Access patient forms"
              >
                Insurance
              </Link>
              <Link
                color="inherit"
                href={PathConstants.HOME}
                underline="hover"
                aria-label="Access patient forms"
              >
                Patient Forms
              </Link>
              <Link
                color="inherit"
                href={PathConstants.HOME}
                underline="hover"
                aria-label="View current promotions"
              >
                Promotions
              </Link> */}
            </Box>

            {/* Myopia Management & Vision Therapy Links */}
            <Box
              component="div"
              role="navigation"
              aria-labelledby="footer-myopia-heading"
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
                id="footer-myopia-heading"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                Programs
              </Typography>
              <Link
                color="inherit"
                href={PathConstants.TUTORING_SERVICES}
                underline="hover"
                aria-label="Learn about myopia management"
              >
                Tutoring Services
              </Link>
              <Link
                color="inherit"
                href={PathConstants.EVENTS}
                underline="hover"
                aria-label="Learn about Ortho-K treatment"
              >
                Events & Programs
              </Link>
              {/* <Typography
                variant="h6"
                component="h3"
                id="footer-vision-heading"
                color="primary.main"
                sx={{ mt: 2, fontWeight: 600 }}
              >
                Vision Therapy
              </Typography>
              <Link
                color="inherit"
                href={PathConstants.HOME}
                underline="hover"
                aria-label="Learn about vision therapy"
              >
                Vision Therapy
              </Link>
              <Link
                color="inherit"
                href={PathConstants.HOME}
                underline="hover"
                aria-label="Explore our therapy program"
              >
                Therapy Program
              </Link> */}
            </Box>

            {/* Dry Eyes Links */}
            <Box
              component="div"
              role="navigation"
              aria-labelledby="footer-dryeyes-heading"
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
                id="footer-dryeyes-heading"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                 Get Involved
              </Typography>
              <Link
                color="inherit"
                href={PathConstants.VOLUNTEER_OPPORTUNITIES}
                underline="hover"
                aria-label="Learn about dry eye treatments"
              >
                Volunteer Opportunities
              </Link>
              <Link
                color="inherit"
                href={PathConstants.TUTOR}
                underline="hover"
                aria-label="Learn about RF treatment for dry eyes"
              >
                Apply as a Tutor
              </Link>
              <Link
                color="inherit"
                href={PathConstants.EXEC_TEAM}
                underline="hover"
                aria-label="Learn about IPL treatment for dry eyes"
              >
                Join the Executive Team
              </Link>
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
            {/* <Box>
              <Link
                color="inherit"
                href={PathConstants.HOME}
                underline="hover"
                aria-label="Read our privacy policy"
              >
                Privacy Policy
              </Link>
              <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
                &nbsp;•&nbsp;
              </Typography>
              <Link
                color="inherit"
                href={PathConstants.HOME}
                underline="hover"
                aria-label="View our accessibility statement"
              >
                Accessibility Statement
              </Link>
            </Box> */}
            <Copyright />
          </Box>

          {/* Social Media Links */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: { xs: "center", sm: "flex-end" },
              mt: { xs: 2, sm: 0 },
            }}
          >
            {/* <IconButton
              href="https://g.co/kgs/1UPZmiY"
              aria-label="Visit our Google Business profile"
              color="inherit"
            >
              <GoogleIcon />
            </IconButton> */}
            <IconButton
              href="https://www.instagram.com/enlighten_learning/"
              aria-label="Follow us on Instagram"
              color="inherit"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://www.facebook.com/share/16yVvBdfyz/?mibextid=wwXIfr/"
              aria-label="Like us on Facebook"
              color="inherit"
            >
              <FacebookIcon />
            </IconButton>
            {/* <IconButton
              href="https://www.tiktok.com/@citywideeyecare/"
              aria-label="Follow us on TikTok"
              color="inherit"
            >
              <TikTokIcon />
            </IconButton> */}
          </Stack>
        </Box>
      </Container>
    </footer>
  );
}
