import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import MailIcon from "@mui/icons-material/Mail";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "/images/logo/Logo.png";
import PathConstants from "../../routes/pathConstants";
import FooterScene from "../seasonal/FooterScene";
import { site, phoneHref, hasHours, hasAddress } from "../../config/site";
import { radius, duration, easing } from "../../theme/tokens";

const logoStyle = {
  width: "140px",
  height: "auto",
};

const linkSx = (theme) => ({
  color: "inherit",
  textDecoration: "none",
  display: "inline-block",
  position: "relative",
  fontSize: "0.9375rem",
  transition: `color ${duration.fast}ms ${easing.standard}`,
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: -2,
    width: "100%",
    height: "1px",
    backgroundColor: theme.vars.palette.hairline.strong,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: `transform ${duration.base}ms ${easing.standard}, background-color ${duration.base}ms ${easing.standard}`,
  },
  "&:hover": { color: theme.vars.palette.accentText.main },
  "&:hover::after": { transform: "scaleX(1)", backgroundColor: theme.vars.palette.accentText.main },
});

const FooterLink = styled(Link)(({ theme }) => linkSx(theme));
const ExternalLink = styled("a")(({ theme }) => linkSx(theme));

const columnHeadingSx = (theme) => ({
  fontSize: "0.8125rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  color: theme.vars.palette.text.secondary,
  mb: 0.5,
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © Enlighten Learning Tutoring Center "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const DAY_LABELS = { monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun" };
const formatDays = (days) => {
  const short = days.map((d) => DAY_LABELS[String(d).toLowerCase()] || d);
  return short.length > 2 ? `${short[0]} to ${short[short.length - 1]}` : short.join(" and ");
};
const formatTime = (value) => {
  const [h, m] = String(value).split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = ((h + 11) % 12) + 1;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
};

export default function Footer() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // --- Handle newsletter subscription ---
  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("❌ Please enter a valid email address.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setIsLoading(true);
    setMessage("Submitting...");

    try {
      // Determine the correct API URL
      const isDev = import.meta.env.DEV;
      const apiUrl = isDev ? "http://localhost:3000/api/subscribe" : "/api/subscribe";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && (result.result === "success" || result.success)) {
        setMessage("✅ Thanks for subscribing!");
        setEmail("");
      } else {
        setMessage("❌ Error: " + (result.error || result.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const showContactBlock = site.phoneCall || site.phoneText || hasHours() || hasAddress();

  return (
    <Box
      component="footer"
      aria-labelledby="footer-heading"
      sx={(theme) => ({
        position: "relative",
        backgroundColor: theme.vars.palette.surface.sunken,
        color: theme.vars.palette.text.primary,
        borderTop: `1px solid ${theme.vars.palette.hairline.main}`,
        pt: { xs: 7, md: 10 },
        pb: { xs: 5, md: 6 },
      })}
    >
      {/* Seasonal scene standing on the top edge of the footer */}
      <FooterScene />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: { xs: 5, md: 8 },
        }}
      >
        {/* --- Main Footer Content --- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 5fr) minmax(0, 7fr)" },
            gap: { xs: 5, md: 8 },
          }}
        >
          {/* --- Logo and Contact --- */}
          <Box
            component="article"
            itemScope
            itemType="https://schema.org/Optician"
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <FooterLink to={PathConstants.HOME} aria-label="Go to homepage" sx={{ "&::after": { display: "none" } }}>
              <img src={Logo} style={logoStyle} alt="Logo" width={140} height={138} />
            </FooterLink>

            {/* Business Contact */}
            <Box component="address" sx={{ fontStyle: "normal", display: "flex", flexDirection: "column", gap: 1.25 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <EmailIcon fontSize="small" sx={(theme) => ({ color: theme.vars.palette.accentText.main })} />
                <ExternalLink href="mailto:enlightenandlearning@gmail.com">enlightenandlearning@gmail.com</ExternalLink>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <InstagramIcon fontSize="small" sx={(theme) => ({ color: theme.vars.palette.accentText.main })} />
                <ExternalLink href="https://www.instagram.com/enlighten_learning/" target="_blank" rel="noopener">@enlighten_learning</ExternalLink>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <FacebookIcon fontSize="small" sx={(theme) => ({ color: theme.vars.palette.accentText.main })} />
                <ExternalLink href="https://www.facebook.com/share/16yVvBdfyz/?mibextid=wwXIfr/" target="_blank" rel="noopener">@Enlighten Learning</ExternalLink>
              </Box>
              {site.phoneCall && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                  <CallRoundedIcon fontSize="small" sx={(theme) => ({ color: theme.vars.palette.accentText.main })} />
                  <ExternalLink href={phoneHref("tel", site.phoneCall)} sx={{ fontVariantNumeric: "tabular-nums" }}>{site.phoneCall}</ExternalLink>
                  <Typography variant="caption" color="text.secondary">Calls</Typography>
                </Box>
              )}
              {site.phoneText && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                  <SmsRoundedIcon fontSize="small" sx={(theme) => ({ color: theme.vars.palette.accentText.main })} />
                  <ExternalLink href={phoneHref("sms", site.phoneText)} sx={{ fontVariantNumeric: "tabular-nums" }}>{site.phoneText}</ExternalLink>
                  <Typography variant="caption" color="text.secondary">Texts</Typography>
                </Box>
              )}
              {hasHours() && (
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
                  <AccessTimeRoundedIcon fontSize="small" sx={(theme) => ({ color: theme.vars.palette.accentText.main, mt: "2px" })} />
                  <Box component="dl" sx={{ m: 0, display: "grid", gridTemplateColumns: "auto auto", columnGap: 2, rowGap: 0.25, fontSize: "0.9375rem", fontVariantNumeric: "tabular-nums" }}>
                    {site.hours.map((slot, i) => (
                      <React.Fragment key={i}>
                        <Box component="dt" sx={{ color: "text.secondary" }}>{formatDays(slot.days)}</Box>
                        <Box component="dd" sx={{ m: 0 }}>{`${formatTime(slot.opens)} to ${formatTime(slot.closes)}`}</Box>
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>
              )}
              {hasAddress() && (
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
                  <PlaceRoundedIcon fontSize="small" sx={(theme) => ({ color: theme.vars.palette.accentText.main, mt: "2px" })} />
                  <ExternalLink href={site.address.mapUrl} target="_blank" rel="noopener">
                    {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
                  </ExternalLink>
                </Box>
              )}
            </Box>

            {hasAddress() && site.address.mapEmbedUrl && (
              <Box
                sx={(theme) => ({ borderRadius: `${radius.lg}px`, overflow: "hidden", border: `1px solid ${theme.vars.palette.hairline.main}`, aspectRatio: "16 / 9", maxWidth: 420 })}
              >
                <iframe title="Map" src={site.address.mapEmbedUrl} width="100%" height="100%" style={{ border: 0, display: "block" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </Box>
            )}

            {/* --- Newsletter Form --- */}
            <Box sx={{ mt: showContactBlock ? 0 : 1 }}>
              <Typography variant="h6" gutterBottom>Newsletter</Typography>
              <Typography variant="body2" color="inherit" mb={2}>
                Subscribe to our newsletter for updates and events.
              </Typography>

              <form onSubmit={handleSubscribe}>
                <Stack direction="row" spacing={1} useFlexGap sx={{ maxWidth: 440 }}>
                  <TextField
                    id="footer-email-input"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    fullWidth
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    inputProps={{ "aria-label": "Your email address", autoComplete: "email", inputMode: "email" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ flexShrink: 0 }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Subscribe"}
                  </Button>
                </Stack>
              </form>

              {message && (
                <Typography
                  variant="body2"
                  color={message.includes("✅") ? "success.main" : "error.main"}
                  sx={{ mt: 2, fontWeight: "bold" }}
                  role="alert"
                >
                  {message}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Footer Navigation */}
          <Box
            component="nav"
            aria-label="Footer Navigation"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" },
              gap: { xs: 4, md: 4 },
            }}
          >
            {/* About Us Links */}
            <Box
              component="div"
              role="navigation"
              aria-labelledby="footer-about-heading"
              sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}
            >
              <Typography variant="h6" component="h3" id="footer-about-heading" sx={columnHeadingSx}>
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
              sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}
            >
              <Typography variant="h6" component="h3" id="footer-programs-heading" sx={columnHeadingSx}>
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
              sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}
            >
              <Typography variant="h6" component="h3" id="footer-getinvolved-heading" sx={columnHeadingSx}>
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

            {/* Support Us Links */}
            <Box
              component="div"
              role="navigation"
              aria-labelledby="footer-support-heading"
              sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}
            >
              <Typography variant="h6" component="h3" id="footer-support-heading" sx={columnHeadingSx}>
                Support Us
              </Typography>
              <FooterLink
                to={PathConstants.DONATE_NOW}
                aria-label="Donate to support our mission"
              >
                Donate Now
              </FooterLink>
              <FooterLink
                to={PathConstants.CHARITIES}
                aria-label="View our charity partners"
              >
                Our Impact
              </FooterLink>
            </Box>
          </Box>
        </Box>

        {/* Footer Bottom - Copyright and Social Links */}
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "center" },
            pt: { xs: 3, md: 4 },
            borderTop: `1px solid ${theme.vars.palette.hairline.main}`,
            width: "100%",
            gap: { xs: 2, sm: 0 },
          })}
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
            spacing={0.5}
            sx={{
              justifyContent: { xs: "center", sm: "flex-end" },
              mt: { xs: 1, sm: 0 },
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
    </Box>
  );
}
