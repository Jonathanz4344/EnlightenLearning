import React, { useState, useCallback, useEffect, memo } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import ToggleColorMode from "../ToggleColorMode";
import PathConstants from "../../routes/pathConstants";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Logo from "/images/logo/Logo.png";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";

const logoStyle = {
  width: "40px",
  height: "40px",
  cursor: "pointer",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
};

const drawerLogoStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

// Enhanced styled components with modern shapes and glassmorphism
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    backdropFilter: 'blur(10px)',
    borderRadius: '0 0 24px 24px',
    border: `1px solid ${theme.palette.divider}`,
    borderTop: 'none',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    zIndex: -1,
  },
  '&.scrolled': {
    '&::before': {
      opacity: 1,
    },
  },
  '& .MuiToolbar-root': {
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
      : 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '0 0 24px 24px',
    border: `1px solid ${theme.palette.divider}`,
    borderTop: 'none',
    boxShadow: theme.palette.mode === 'light'
      ? '0 8px 32px rgba(0, 0, 0, 0.08)'
      : '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&.scrolled .MuiToolbar-root': {
    borderRadius: '16px 16px 20px 20px',
    margin: '8px 16px 0',
    boxShadow: theme.palette.mode === 'light'
      ? '0 12px 40px rgba(0, 0, 0, 0.12)'
      : '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
}));

const ModernToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '64px !important',
  padding: '0 24px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: '0 20px',
    minHeight: '60px !important',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: '0.875rem',
  textTransform: 'none',
  padding: '8px 16px',
  borderRadius: '12px',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'transparent',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '12px',
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
      : 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: -1,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    '&::before': {
      opacity: 1,
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: '3px',
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(90deg, #6366f1, #a855f7)'
      : 'linear-gradient(90deg, #8b5cf6, #ec4899)',
    borderRadius: '2px',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover::after': {
    width: '60%',
  }
}));

const ContactButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  textTransform: 'none',
  padding: '8px 16px',
  fontSize: '0.875rem',
  borderRadius: '12px',
  border: `2px solid ${theme.palette.divider}`,
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.5)'
    : 'rgba(17, 24, 39, 0.5)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)'
      : 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: theme.palette.primary.main,
    boxShadow: theme.palette.mode === 'light'
      ? '0 8px 25px rgba(99, 102, 241, 0.2)'
      : '0 8px 25px rgba(139, 92, 246, 0.3)',
    '&::before': {
      left: '100%',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: '8px 16px',
    fontSize: '0.85rem',
  }
}));

// Replace your existing DonateButton styled component with this:

const DonateButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 25%, #c084fc 50%, #d946ef 75%, #e879f9 100%)'
    : 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 25%, #ddd6fe 50%, #e879f9 75%, #f0abfc 100%)',
  backgroundSize: '300% 300%',
  color: 'white',
  fontWeight: 700,
  textTransform: 'none',
  padding: '10px 20px',
  fontSize: '0.875rem',
  borderRadius: '16px',
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(139, 92, 246, 0.4)' // Updated to match purple theme
    : '0 8px 32px rgba(167, 139, 250, 0.4)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  animation: 'gradientShift 3s ease infinite',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 12px 40px rgba(139, 92, 246, 0.5)' // Updated to match purple theme
      : '0 12px 40px rgba(167, 139, 250, 0.5)',
    '&::before': {
      transform: 'translateX(100%)',
    },
  },
  '@keyframes gradientShift': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: '10px 20px',
    fontSize: '0.85rem',
  }
}));

const DropdownContainer = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1300,
  minWidth: '240px',
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.95)'
    : 'rgba(17, 24, 39, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 20px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)'
    : '0 20px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.3)',
  padding: '8px',
  marginTop: '8px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-9px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: `10px solid ${theme.palette.background.paper}`,
    filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.1))',
  }
}));

const DropdownItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: '10px',
  margin: '2px 0',
  padding: '10px 12px',
  fontSize: '0.875rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)'
      : 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(6px)',
    '&::before': {
      left: '100%',
    },
  }
}));

const ModernDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '320px',
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
      : 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    borderTopRightRadius: '32px',
    borderBottomRightRadius: '32px',
    border: 'none',
    boxShadow: theme.palette.mode === 'light'
      ? '8px 0 40px rgba(0,0,0,0.15)'
      : '8px 0 40px rgba(0,0,0,0.4)',
  }
}));

// Memoized FlyoutContent component for better performance
const FlyoutContent = memo(
  ({
    items,
    subMenuOpen,
    handleSubMenuOpen,
    handleSubMenuLeave,
    onClick,
    isMobile,
  }) => {
    return (
      <Box
        sx={{
          minWidth: "180px",
          bgcolor: "transparent",
          borderRadius: "12px",
          padding: "6px",
        }}
        role="menu"
      >
        {items.map((item, index) => (
          <Box key={index}>
            {item.links.map((link, linkIndex) => (
              <MenuLink
                key={linkIndex}
                link={link}
                handleSubMenuOpen={handleSubMenuOpen}
                subMenuOpen={subMenuOpen}
                handleSubMenuLeave={handleSubMenuLeave}
                onClick={onClick}
                isMobile={isMobile}
              />
            ))}
          </Box>
        ))}
      </Box>
    );
  }
);

FlyoutContent.displayName = "FlyoutContent";

FlyoutContent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      links: PropTypes.array.isRequired,
    })
  ).isRequired,
  subMenuOpen: PropTypes.string,
  handleSubMenuOpen: PropTypes.func.isRequired,
  handleSubMenuLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
};

// Memoized MenuLink component for better performance
const MenuLink = memo(
  ({
    link,
    handleSubMenuOpen,
    subMenuOpen,
    handleSubMenuLeave,
    onClick,
    isMobile,
  }) => {
    const handleClick = useCallback(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (link.href) {
            e.currentTarget.querySelector("a")?.click();
          }
        }
      },
      [link.href]
    );

    const interactions = isMobile
      ? {
        onClick: link.subMenu ? handleSubMenuOpen(link.text) : undefined,
      }
      : {
        onMouseEnter: link.subMenu ? handleSubMenuOpen(link.text) : undefined,
        onMouseLeave: link.subMenu ? handleSubMenuLeave : undefined,
      };

    return (
      <div
        {...interactions}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="menuitem"
        tabIndex={0}
        style={{ position: "relative" }}
      >
        <Link
          to={link.href}
          style={{ textDecoration: "none", display: "block" }}
        >
          <DropdownItem>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: 600,
              }}
            >
              {link.text}
              {link.subMenu && (
                <ExpandMoreIcon
                  fontSize="small"
                  sx={{
                    ml: 0.5,
                    fontSize: "1rem",
                    transform:
                      subMenuOpen === link.text
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              )}
            </Typography>
          </DropdownItem>
        </Link>
        <AnimatePresence>
          {link.subMenu && subMenuOpen === link.text && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15, transition: { delay: 0.2 } }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: isMobile ? "0" : "100%",
                left: isMobile ? "100%" : "0",
                zIndex: 1200,
              }}
            >
              <Box
                sx={{
                  minWidth: "180px",
                  bgcolor: "background.paper",
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
                  p: 0.5,
                }}
                role="menu"
              >
                {link.subMenu.map((subLink, subIndex) => (
                  <MenuLink
                    key={subIndex}
                    link={subLink}
                    handleSubMenuOpen={handleSubMenuOpen}
                    subMenuOpen={subMenuOpen}
                    handleSubMenuLeave={handleSubMenuLeave}
                    onClick={onClick}
                    isMobile={isMobile}
                  />
                ))}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

MenuLink.displayName = "MenuLink";

MenuLink.propTypes = {
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    subMenu: PropTypes.array,
  }).isRequired,
  handleSubMenuOpen: PropTypes.func.isRequired,
  subMenuOpen: PropTypes.string,
  handleSubMenuLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
};

const Header = ({ mode, toggleColorMode }) => {
  const location = useLocation();
  const [open, setOpen] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if mobile on initial render and when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setOpen(null);
    setSubMenuOpen(null);
    setDrawerOpen(false);
  }, [location.pathname]);

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const menuItems = [
    { text: "Home", href: PathConstants.HOME },
    { text: "About Us", menu: "about" },
    { text: "Programs", menu: "programs" },
    { text: "Get Involved", menu: "get-involved" },
  ];

  const handleMouseEnter = useCallback(
    (menu) => () => {
      if (!isMobile) {
        setOpen(menu);
        setSubMenuOpen(null);
      } else {
        setOpen((prev) => (prev === menu ? null : menu));
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setOpen(null);
      setSubMenuOpen(null);
    }
  }, [isMobile]);

  const handleSubMenuOpen = useCallback(
    (menu) => () => {
      setSubMenuOpen((prev) => (prev === menu ? null : menu));
    },
    []
  );

  const handleSubMenuLeave = useCallback(() => {
    if (!isMobile) {
      setSubMenuOpen(null);
    }
  }, [isMobile]);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
    setOpen(null);
    setSubMenuOpen(null);
  }, []);

  const renderMenuContent = (menu) => {
    switch (menu) {
      case "about":
        return (
          <FlyoutContent
            items={[
              {
                links: [
                  {
                    text: "Our Mission",
                    href: PathConstants.MISSION,
                  },
                  {
                    text: "Meet Our Team",
                    href: PathConstants.OUR_TEAM
                  },
                  {
                    text: "Making a Difference",
                    href: PathConstants.MAKING_DIFF
                  },
                ],
              },
            ]}
            subMenuOpen={subMenuOpen}
            handleSubMenuOpen={handleSubMenuOpen}
            handleSubMenuLeave={handleSubMenuLeave}
            onClick={handleDrawerClose}
            isMobile={isMobile}
          />
        );
      case "programs":
        return (
          <FlyoutContent
            items={[
              {
                links: [
                  { text: "Tutoring Services", href: PathConstants.TUTORING_SERVICES },
                  // { text: "Success Stories", href: PathConstants.HOME },
                  { text: "Events & Programs", href: PathConstants.EVENTS },
                ],
              },
            ]}
            subMenuOpen={subMenuOpen}
            handleSubMenuOpen={handleSubMenuOpen}
            handleSubMenuLeave={handleSubMenuLeave}
            onClick={handleDrawerClose}
            isMobile={isMobile}
          />
        );
      case "get-involved":
        return (
          <FlyoutContent
            items={[
              {
                links: [
                  { text: "Volunteer Opportunities", href: PathConstants.VOLUNTEER_OPPORTUNITIES },
                  { text: "Apply as a Tutor", href: PathConstants.TUTOR },
                  { text: "Join the Executive Team", href: PathConstants.EXEC_TEAM },


                ],
              },
            ]}
            subMenuOpen={subMenuOpen}
            handleSubMenuOpen={handleSubMenuOpen}
            handleSubMenuLeave={handleSubMenuLeave}
            onClick={handleDrawerClose}
            isMobile={isMobile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Miracle's Group - Empowering communities through education, tutoring services, and volunteer programs."
        />
        <meta
          name="keywords"
          content="nonprofit, tutoring, education, volunteer, community support, fundraising"
        />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NonprofitType",
            name: "Miracle's Group",
            description:
              "A nonprofit organization dedicated to empowering communities through education and tutoring services.",
            url: window.location.origin,
          })}
        </script>
      </Helmet>

      <StyledAppBar className={isScrolled ? 'scrolled' : ''}>
        <Container maxWidth="lg">
          <ModernToolbar component="nav" aria-label="Main navigation">
            {/* Logo Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Link to={PathConstants.HOME}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Box
                    component="img"
                    src={Logo}
                    style={logoStyle}
                    alt="Miracle's Group Logo"
                  />
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <IconButton
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "text.primary",
                  borderRadius: "12px",
                  padding: "8px",
                  background: (theme) => theme.palette.mode === 'light'
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
                edge="start"
                aria-label="Open navigation menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 0.5,
                flex: 1,
                justifyContent: "center",
              }}
              component="nav"
              aria-label="Main menu"
            >
              {menuItems.map((item) => (
                <Box
                  key={item.menu || item.text}
                  sx={{ position: "relative" }}
                  onMouseEnter={item.menu ? handleMouseEnter(item.menu) : undefined}
                  onMouseLeave={item.menu ? handleMouseLeave : undefined}
                  role="menuitem"
                  tabIndex={0}
                >
                  {item.href ? (
                    <NavButton component={Link} to={item.href}>
                      {item.text}
                    </NavButton>
                  ) : (
                    <NavButton
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      {item.text}
                      <ExpandMoreIcon
                        fontSize="small"
                        sx={{
                          fontSize: "1rem",
                          transform:
                            open === item.menu
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </NavButton>
                  )}

                  <AnimatePresence>
                    {open === item.menu && (
                      <DropdownContainer
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {renderMenuContent(item.menu)}
                      </DropdownContainer>
                    )}
                  </AnimatePresence>
                </Box>
              ))}
            </Box>

            {/* Right Side Actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
              }}
            >
              <ContactButton
                component={Link}
                to={PathConstants.CONTACT_US}
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                Contact Us
              </ContactButton>

              <DonateButton
                component={Link}
                to={PathConstants.DONATE_NOW}
                startIcon={<FavoriteIcon sx={{ fontSize: "1rem" }} />}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  minWidth: "120px",
                }}
              >
                Donate
              </DonateButton>

              {/* Mobile Donate Button */}
              <DonateButton
                component={Link}
                to={PathConstants.DONATE_NOW}
                sx={{
                  display: { xs: "inline-flex", sm: "none" },
                  minWidth: "auto",
                  padding: "8px 12px",
                }}
              >
                <VolunteerActivismIcon sx={{ fontSize: "1.1rem" }} />
              </DonateButton>

              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
          </ModernToolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <ModernDrawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
          }}
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 3,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                component="img"
                src={Logo}
                style={drawerLogoStyle}
                alt="Miracle's Group Logo"
              />
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontWeight: 700 }}
              >
                Miracle's Group
              </Typography>
            </Box>
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                color: "text.primary",
                borderRadius: "12px",
                background: (theme) => theme.palette.action.hover,
              }}
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Menu Items */}
          <List sx={{ flex: 1, p: 2 }}>
            {menuItems.map((item) => (
              <ListItem key={item.menu || item.text} disablePadding sx={{ mb: 1 }}>
                <Box sx={{ width: "100%", position: "relative" }}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      style={{ textDecoration: "none", display: "block" }}
                      onClick={handleDrawerClose}
                    >
                      <DropdownItem sx={{ width: "100%" }}>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          sx={{ fontWeight: 600 }}
                        >
                          {item.text}
                        </Typography>
                      </DropdownItem>
                    </Link>
                  ) : (
                    <>
                      <DropdownItem
                        onClick={handleMouseEnter(item.menu)}
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="text.primary"
                          sx={{ fontWeight: 600 }}
                        >
                          {item.text}
                        </Typography>
                        <ExpandMoreIcon
                          sx={{
                            transform:
                              open === item.menu
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </DropdownItem>

                      <AnimatePresence>
                        {open === item.menu && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <Box sx={{ pl: 2, mt: 1 }}>
                              {renderMenuContent(item.menu)}
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* Mobile Action Buttons */}
          <Box sx={{ p: 3, space: 2 }}>
            <ContactButton
              component={Link}
              to={PathConstants.CONTACT_US}
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleDrawerClose}
            >
              Contact Us
            </ContactButton>
          </Box>
        </Box>
      </ModernDrawer>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <Box sx={{ height: { xs: "60px", md: "64px" } }} />
    </>
  );
};

Header.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Header;

