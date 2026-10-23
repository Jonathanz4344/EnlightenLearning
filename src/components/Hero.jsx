import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import { TUTORING_SESSIONS_DISPLAY, TOTAL_RAISED_DISPLAY } from "../constants/metrics";
import PathConstants from "../routes/pathConstants";
import { Seo, Section, PageIntro, SectionHeading, FeatureGrid, FeatureCard, StatRow, Figure, CTABand, ActionButton } from "../kit";
import { Reveal, Parallax } from "../motion";
import { radius } from "../theme/tokens";

// Instagram Embed Component
const InstagramEmbed = ({ url }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        component="blockquote"
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={`${url}/?utm_source=ig_embed&utm_campaign=loading`}
        data-instgrm-version="14"
        sx={(theme) => ({
          backgroundColor: theme.vars.palette.surface.paper,
          border: `1px solid ${theme.vars.palette.hairline.main}`,
          borderRadius: `${radius.md}px`,
          margin: "1px",
          maxWidth: "540px",
          minWidth: "326px",
          padding: 0,
          width: "99.375%",
        })}
      />
    </Box>
  );
};

InstagramEmbed.propTypes = { url: PropTypes.string.isRequired };

// Facebook Embed Component. The plugin draws the post 500px wide (the width
// in its URL), so on narrower screens the frame is scaled down to fit instead
// of being cut off. A plain iframe is used because a Box would treat the
// width and height attributes as styles.
const FACEBOOK_WIDTH = 500;

const FacebookEmbed = ({ src, height = 550 }) => {
  const wrapperRef = React.useRef(null);
  const [scale, setScale] = useState(1);

  React.useLayoutEffect(() => {
    const node = wrapperRef.current;
    if (!node) return undefined;
    const update = () => setScale(Math.min(1, node.clientWidth / FACEBOOK_WIDTH));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ position: "relative", display: "flex", justifyContent: "center", mb: 4, width: "100%" }}>
      <Box
        sx={(theme) => ({
          width: Math.round(FACEBOOK_WIDTH * scale),
          height: Math.round(height * scale),
          maxWidth: "100%",
          overflow: "hidden",
          borderRadius: `${radius.md}px`,
          border: `1px solid ${theme.vars.palette.hairline.main}`,
          backgroundColor: theme.vars.palette.surface.paper,
        })}
      >
        <iframe
          src={src}
          width={FACEBOOK_WIDTH}
          height={height}
          title="Facebook post"
          style={{
            border: "none",
            display: "block",
            transform: scale < 1 ? `scale(${scale})` : "none",
            transformOrigin: "top left",
          }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </Box>
    </Box>
  );
};

FacebookEmbed.propTypes = { src: PropTypes.string.isRequired, height: PropTypes.number };

const pillars = [
  { icon: <SchoolRoundedIcon />, tone: "tint", title: "Learn with Joy", desc: "Discover knowledge that inspires" },
  { icon: <FavoriteRoundedIcon />, tone: "season", title: "Give with Passion", desc: "Support our charitable mission" },
  { icon: <PublicRoundedIcon />, tone: "metallic", title: "Change the World", desc: "Create lasting positive impact" },
];

const metrics = [
  { icon: <AutoStoriesRoundedIcon />, value: "200+", label: "Lives Impacted" },
  { icon: <GroupRoundedIcon />, value: "30+", label: "Active Volunteers" },
  { icon: <EventRoundedIcon />, value: TUTORING_SESSIONS_DISPLAY, label: "Sessions Taught" },
  { icon: <MonetizationOnRoundedIcon />, value: TOTAL_RAISED_DISPLAY, label: "Raised for Charity" },
];

// Doors into the site. The titles are the navigation labels and each
// description is the first sentence of that page's own introduction.
const doors = [
  {
    icon: <SchoolRoundedIcon />,
    title: "Tutoring Services",
    description: "Excel in your studies and make a difference. Our expert tutoring services are designed to help students achieve their academic goals and build confidence.",
    to: PathConstants.TUTORING_SERVICES,
    ariaLabel: "Learn about tutoring services",
  },
  {
    icon: <EventRoundedIcon />,
    title: "Events & Programs",
    description: "Join our community outreach initiatives! Explore our current events, upcoming programs, and see the incredible impact we've made together in our community.",
    to: PathConstants.EVENTS,
    ariaLabel: "View events and programs",
  },
  {
    icon: <VolunteerActivismRoundedIcon />,
    title: "Donate Now",
    description: "Donations help us raise money to donate to charities that provide hope care and support to those in need.",
    to: PathConstants.DONATE_NOW,
    ariaLabel: "Donate to support our mission",
  },
];

export default function Hero() {
  // State for controlling visibility of posts
  const [showAllInstagram, setShowAllInstagram] = useState(false);
  const [showAllFacebook, setShowAllFacebook] = useState(false);

  // Instagram post URLs - Easy to manage! (first one shows first)
  const instagramPosts = [
    // Ronald McDonald House Instagram post, hidden for now. Remove the // to show it again.
    // "https://www.instagram.com/p/DctjBexESLi",
    "https://www.instagram.com/p/DcbVcTejgVZ",
    "https://www.instagram.com/p/DT1uI3lDgGu",
    "https://www.instagram.com/p/DWFhmeykZCW",
    "https://www.instagram.com/p/DEvT6yEvrEh",
  ];

  // Facebook post URLs - Easy to manage! (first one shows first)
  const facebookPosts = [
    { src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0yic5oztA7myY15ro4jBHsXq7u1EAJCChe5WRxnegzZQUBcAuxAng379LpaD16Usrl%26id%3D61576772816131&show_text=true&width=500", height: 767 },
    // Cohen Children's Medical Center Facebook post, hidden for now. Remove the // to show it again.
    // { src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0CnrQ6LuZDfoAoF18PVBuYu99twdF3ifU49B3nX2rapLP8h42xFvSwgYYbaPCt8kwl%26id%3D61576772816131&show_text=true&width=500", height: 728 },
    { src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02GwqjcdCUTEoyoFJXrA95V6F2cKnXpqmsk7h7fiuqDELNUcYEx8TM8HCwC3Lx6W37l%26id%3D61576772816131&show_text=true&width=500", height: 472 },
    { src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D122148676226892427%26set%3Da.122095675754892427%26type%3D3&show_text=true&width=500", height: 645 },
    { src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D122130023210892427%26set%3Da.122096130290892427%26type%3D3&show_text=true&width=500", height: 645 },
  ];

  // Get visible posts based on state
  const visibleInstagramPosts = showAllInstagram ? instagramPosts : instagramPosts.slice(0, 3);
  const visibleFacebookPosts = showAllFacebook ? facebookPosts : facebookPosts.slice(0, 3);

  // Expand or collapse a column of posts. When collapsing, bring the button back
  // into view so the visitor isn't left looking further down the page.
  const togglePosts = (event, isExpanded, setExpanded) => {
    const button = event.currentTarget;
    setExpanded(!isExpanded);
    if (isExpanded) {
      requestAnimationFrame(() => button.scrollIntoView({ behavior: "smooth", block: "center" }));
    }
  };

  // Instagram posts revealed by "See More" need Instagram's script to load them
  useEffect(() => {
    if (showAllInstagram && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [showAllInstagram]);

  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);

    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

    return () => {
      const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [instagramPosts.length]);

  const feedColumnSx = { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 3 };

  return (
    <React.Fragment>
      <Seo
        fullTitle="Enlighten Learning - Learn with Joy, Give with Passion, Change the World"
        description="Join our mission to learn with joy, give with passion, and change the world through community service and education."
        path="/"
      />

      <PageIntro
        id="hero"
        display
        seasonTag
        align="left"
        eyebrow="Fundraising for a Good Cause"
        eyebrowIcon={<AutoAwesomeRoundedIcon />}
        title="Learn • Give • Change"
        lead="Join our community of learners and changemakers creating positive impact through education and compassionate action."
        leadComponent="h2"
        actions={
          <>
            <ActionButton to={PathConstants.DONATE_NOW} size="large" magnetic arrow>
              Donate
            </ActionButton>
            <ActionButton to={PathConstants.VOLUNTEER_OPPORTUNITIES} size="large" variant="outlined" color="inherit">
              Volunteer Opportunities
            </ActionButton>
          </>
        }
        aside={
          <Parallax strength={60}>
            <Figure
              src="/images/home/team-check-1800.jpg"
              srcSet="/images/home/team-check-640.jpg 640w, /images/home/team-check-1200.jpg 1200w, /images/home/team-check-1800.jpg 1800w"
              sizes="(min-width: 900px) 42vw, 100vw"
              alt="Enlighten Learning volunteers presenting a donation check to Adventures in Learning"
              ratio="4 / 3"
              radius="xl"
              priority
              kenBurns
            />
          </Parallax>
        }
      />

      {/* Mission pillars */}
      <Section size="sm">
        <FeatureGrid columns={{ xs: 1, sm: 3 }} gap={3}>
          {pillars.map((pillar) => (
            <FeatureCard key={pillar.title} icon={pillar.icon} iconTone={pillar.tone} title={pillar.title} description={pillar.desc} align="center" spotlight />
          ))}
        </FeatureGrid>
      </Section>

      {/* Impact at a glance */}
      <Section variant="sunken" size="sm">
        <StatRow items={metrics} align="center" />
      </Section>

      {/* Doors into the site */}
      <Section>
        <FeatureGrid columns={{ xs: 1, md: 3 }} gap={3}>
          {doors.map((door) => (
            <FeatureCard
              key={door.title}
              icon={door.icon}
              title={door.title}
              description={door.description}
              spotlight
              footer={
                <IconButton component={RouterLink} to={door.to} aria-label={door.ariaLabel} sx={(theme) => ({ ml: "auto", border: `1px solid ${theme.vars.palette.hairline.strong}` })}>
                  <ArrowForwardRoundedIcon />
                </IconButton>
              }
            />
          ))}
        </FeatureGrid>
      </Section>

      {/* Social Media Section */}
      <Section variant="paper">
        <SectionHeading
          title="Follow Our Journey"
          lead="Stay connected with our latest updates, events, and community impact stories across our social media platforms!"
          align="center"
        />

        {/* Side-by-Side Social Media Posts */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "repeat(2, minmax(0, 1fr))" }, gap: { xs: 6, lg: 4 } }}>
          {/* Instagram Column */}
          <Reveal>
            <Box sx={feedColumnSx}>
              {/* Instagram Header */}
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1.5 }}>
                <InstagramIcon sx={(theme) => ({ fontSize: 32, color: theme.vars.palette.brand.instagram })} />
                <Typography variant="h3" component="h3">
                  Instagram
                </Typography>
              </Box>

              {/* Instagram Posts */}
              <Box
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  width: "100%",
                  maxWidth: "550px",
                  mx: "auto",
                  "& .instagram-media": {
                    margin: "0 auto !important",
                    borderRadius: `${radius.md}px !important`,
                    overflow: "hidden",
                    border: `1px solid ${theme.vars.palette.hairline.main} !important`,
                    boxShadow: "none !important",
                  },
                })}
              >
                {visibleInstagramPosts.map((url) => (
                  <InstagramEmbed key={url} url={url} />
                ))}
              </Box>

              {/* See More / See Less Button for Instagram */}
              {instagramPosts.length > 3 && (
                <Box>
                  <ActionButton
                    variant="outlined"
                    color="inherit"
                    startIcon={showAllInstagram ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                    onClick={(event) => togglePosts(event, showAllInstagram, setShowAllInstagram)}
                  >
                    {showAllInstagram ? "See Less" : "See More Posts"}
                  </ActionButton>
                </Box>
              )}

              {/* Follow Button for Instagram */}
              <Box>
                <ActionButton href="https://www.instagram.com/enlighten_learning/" external startIcon={<InstagramIcon />} size="large">
                  Follow @enlighten_learning
                </ActionButton>
              </Box>
            </Box>
          </Reveal>

          {/* Facebook Column */}
          <Reveal delay={0.1}>
            <Box sx={feedColumnSx}>
              {/* Facebook Header */}
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1.5 }}>
                <FacebookIcon sx={(theme) => ({ fontSize: 32, color: theme.vars.palette.brand.facebook })} />
                <Typography variant="h3" component="h3">
                  Facebook
                </Typography>
              </Box>

              {/* Facebook Posts */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0, width: "100%", maxWidth: "550px", mx: "auto" }}>
                {visibleFacebookPosts.map((post, index) => (
                  <FacebookEmbed key={index} src={post.src} height={post.height} />
                ))}
              </Box>

              {/* See More / See Less Button for Facebook */}
              {facebookPosts.length > 3 && (
                <Box>
                  <ActionButton
                    variant="outlined"
                    color="inherit"
                    startIcon={showAllFacebook ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                    onClick={(event) => togglePosts(event, showAllFacebook, setShowAllFacebook)}
                  >
                    {showAllFacebook ? "See Less" : "See More Posts"}
                  </ActionButton>
                </Box>
              )}

              {/* Follow Button for Facebook */}
              <Box>
                <ActionButton href="https://www.facebook.com/share/16yVvBdfyz/?mibextid=wwXIfr/" external startIcon={<FacebookIcon />} size="large">
                  Follow @Enlighten Learning
                </ActionButton>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Section>

      <CTABand
        title="Join Our Mission"
        lead="Together, we can create a brighter future through education and fundraising. Whether you volunteer your time, make a donation, or simply spread the word—every action makes a difference."
        primary={{ label: "Volunteer With Us", to: PathConstants.VOLUNTEER_OPPORTUNITIES, icon: <VolunteerActivismRoundedIcon /> }}
        secondary={{ label: "Support Our Cause", to: PathConstants.DONATE_NOW, icon: <MonetizationOnRoundedIcon /> }}
      />
    </React.Fragment>
  );
}
