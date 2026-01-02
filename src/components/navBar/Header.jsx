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
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

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
  // Mobile responsive styles
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(1),
    '& .MuiToolbar-root': {
      minHeight: '60px !important',
      borderRadius: '999px',
      margin: '0 8px',
      padding: '0 16px',
    },
    '&.scrolled .MuiToolbar-root': {
      borderRadius: '999px',
      margin: '4px 12px 0',
    },
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
    padding: '0 16px',
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
    padding: '6px 12px',
    fontSize: '0.8rem',
  }
}));

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
    ? '0 8px 32px rgba(139, 92, 246, 0.4)'
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
      ? '0 12px 40px rgba(139, 92, 246, 0.5)'
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
    padding: '8px 12px',
    fontSize: '0.8rem',
    minWidth: 'auto',
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
    width: '280px',
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
  const [subMenuOpen, setSubMenuOpen] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
                  { text: "Our Mission", href: PathConstants.MISSION },
                  { text: "Meet Our Team", href: PathConstants.OUR_TEAM },
                  { text: "Making a Difference", href: PathConstants.MAKING_DIFF },
                  { text: "Our Charities", href: PathConstants.CHARITIES },
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
      </Helmet>

      <StyledAppBar className={isScrolled ? "scrolled" : ""}>
        <Container maxWidth="lg">
          <ModernToolbar component="nav" aria-label="Main navigation">
            {/* Logo + Mobile Menu Button */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Link to={PathConstants.HOME}>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Box component="img" src={Logo} style={logoStyle} alt="Miracle's Group Logo" />
                </motion.div>
              </Link>
              {isMobile && (
                <IconButton
                  sx={{
                    color: "text.primary",
                    borderRadius: "12px",
                    padding: "8px",
                    background: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                  onClick={handleDrawerToggle}
                  aria-label="Open navigation menu"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                {menuItems.map((item) => (
                  <Box
                    key={item.menu || item.text}
                    sx={{ position: "relative" }}
                    onMouseEnter={item.menu ? handleMouseEnter(item.menu) : undefined}
                    onMouseLeave={item.menu ? handleMouseLeave : undefined}
                  >
                    {item.href ? (
                      <NavButton component={Link} to={item.href}>
                        {item.text}
                      </NavButton>
                    ) : (
                      <NavButton sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        {item.text}
                        <ExpandMoreIcon
                          fontSize="small"
                          sx={{
                            fontSize: "1rem",
                            transform: open === item.menu ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s",
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
                        >
                          {renderMenuContent(item.menu)}
                        </DropdownContainer>
                      )}
                    </AnimatePresence>
                  </Box>
                ))}
              </Box>
            )}

            {/* Right Actions (Contact, Donate, Dark Mode) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1, md: 2 } }}>
              <ContactButton component={Link} to={PathConstants.CONTACT_US}>
                Contact
              </ContactButton>
              <DonateButton component={Link} to={PathConstants.DONATE_NOW}>
                Donate
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
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Link to={PathConstants.HOME} onClick={handleDrawerClose}>
            <Box component="img" src={Logo} style={drawerLogoStyle} alt="Logo" />
          </Link>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />
        <List>
          {menuItems.map((item) => (
            <Box key={item.menu || item.text}>
              {item.href ? (

                <ListItem disablePadding>
                  <ListItemButton component={Link} to={item.href} onClick={handleDrawerClose}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem
                  button
                  onClick={() => setOpen((prev) => (prev === item.menu ? null : item.menu))}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  {item.text}
                  <ExpandMoreIcon
                    sx={{
                      transform: open === item.menu ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </ListItem>
              )}

              <AnimatePresence>
                {open === item.menu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {renderMenuContent(item.menu)}
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          ))}
        </List>
      </ModernDrawer>
    </>
  );
};

Header.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Header;
