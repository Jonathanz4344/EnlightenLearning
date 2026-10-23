import * as React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import ToggleColorMode from "../ToggleColorMode";
import PathConstants from "../../routes/pathConstants";
import NavbarGarland from "../seasonal/NavbarGarland";
import { useMotionOk } from "../../motion";
import { site, phoneHref } from "../../config/site";
import { radius, duration, easing, layout, zIndex } from "../../theme/tokens";
import Logo from "/images/logo/Logo.png";

// The frosted header. On desktop the navigation sits in the middle and the
// actions on the right. The contact button, the phone pill and the Our Impact
// link are shown only when there is room for them; whatever does not fit
// moves into the drawer, which is always the navigation on phones.

const menuItems = [
  { text: "Home", href: PathConstants.HOME },
  {
    text: "About Us",
    menu: "about",
    links: [
      { text: "Our Mission", href: PathConstants.MISSION },
      { text: "Meet Our Team", href: PathConstants.OUR_TEAM },
      { text: "Making a Difference", href: PathConstants.MAKING_DIFF },
    ],
  },
  {
    text: "Programs",
    menu: "programs",
    links: [
      { text: "Tutoring Services", href: PathConstants.TUTORING_SERVICES },
      { text: "Events & Programs", href: PathConstants.EVENTS },
    ],
  },
  {
    text: "Get Involved",
    menu: "get-involved",
    links: [
      { text: "Volunteer Opportunities", href: PathConstants.VOLUNTEER_OPPORTUNITIES },
      { text: "Apply as a Tutor", href: PathConstants.TUTOR },
      { text: "Join the Executive Team", href: PathConstants.EXEC_TEAM },
    ],
  },
];

const GAP = 12;
const MENU_BUTTON_WIDTH = 44;

const navButtonSx = (theme) => ({
  color: theme.vars.palette.text.primary,
  fontWeight: 500,
  fontSize: "0.9375rem",
  padding: "8px 14px",
  minHeight: 40,
  whiteSpace: "nowrap",
  borderRadius: `${radius.pill}px`,
  "&:hover": { backgroundColor: theme.vars.palette.surface.sunken },
  "&[aria-current='page'], &[data-active='true']": { color: theme.vars.palette.accentText.main },
});

const actionSx = (theme) => ({
  borderRadius: `${radius.pill}px`,
  fontSize: "0.9375rem",
  padding: "8px 18px",
  minHeight: 40,
  whiteSpace: "nowrap",
  color: theme.vars.palette.text.primary,
  borderColor: theme.vars.palette.hairline.strong,
});

function DesktopMenu({ item, open, onOpen, onClose, pathname }) {
  const ok = useMotionOk();
  const isOpen = open === item.menu;
  const active = item.links.some((l) => l.href === pathname);
  const id = `menu-${item.menu}`;
  return (
    <Box
      sx={{ position: "relative" }}
      onMouseEnter={() => onOpen(item.menu)}
      onMouseLeave={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <Button
        sx={navButtonSx}
        data-active={active}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? id : undefined}
        onClick={() => (isOpen ? onClose() : onOpen(item.menu))}
        endIcon={
          <ExpandMoreIcon
            sx={{ fontSize: "18px !important", transition: `transform ${duration.base}ms ${easing.standard}`, transform: isOpen ? "rotate(180deg)" : "none" }}
          />
        }
      >
        {item.text}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={id}
            initial={ok ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={ok ? { opacity: 0, y: 6 } : undefined}
            transition={{ duration: duration.base / 1000, ease: easing.standardArray }}
            style={{ position: "absolute", top: "100%", left: 0, paddingTop: 8, zIndex: zIndex.menu }}
          >
            <Box
              id={id}
              role="menu"
              aria-label={item.text}
              sx={(theme) => ({
                minWidth: 240,
                p: 0.75,
                borderRadius: `${radius.md}px`,
                backgroundColor: theme.vars.palette.surface.paper,
                border: `1px solid ${theme.vars.palette.hairline.main}`,
                boxShadow: `0 16px 40px -16px ${theme.vars.palette.effects.shadowTint}`,
              })}
            >
              {item.links.map((link) => (
                <Button
                  key={link.href}
                  component={Link}
                  to={link.href}
                  role="menuitem"
                  onClick={onClose}
                  aria-current={pathname === link.href ? "page" : undefined}
                  sx={(theme) => ({
                    ...navButtonSx(theme),
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "100%",
                    borderRadius: `${radius.sm}px`,
                    padding: "9px 12px",
                  })}
                >
                  {link.text}
                </Button>
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

DesktopMenu.propTypes = {
  item: PropTypes.object.isRequired,
  open: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

const phoneEntries = () => {
  const entries = [];
  if (site.phoneCall) entries.push({ key: "call", icon: <CallRoundedIcon />, label: site.phoneCall, href: phoneHref("tel", site.phoneCall) });
  if (site.phoneText) entries.push({ key: "text", icon: <SmsRoundedIcon />, label: site.phoneText, href: phoneHref("sms", site.phoneText) });
  return entries;
};

const PhonePill = React.forwardRef(function PhonePill({ sx }, ref) {
  const entries = phoneEntries();
  if (!entries.length) return null;
  return (
    <Box ref={ref} sx={[{ display: "inline-flex", alignItems: "center", gap: 0.5 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {entries.map((entry) => (
        <Typography
          key={entry.key}
          component="a"
          href={entry.href}
          variant="body2"
          sx={(theme) => ({
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.5,
            py: 0.75,
            borderRadius: `${radius.pill}px`,
            border: `1px solid ${theme.vars.palette.hairline.main}`,
            color: theme.vars.palette.text.primary,
            textDecoration: "none",
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
            "& > svg": { fontSize: 18, color: theme.vars.palette.accentText.main },
            "&:hover": { backgroundColor: theme.vars.palette.surface.sunken },
          })}
        >
          {entry.icon}
          {entry.label}
        </Typography>
      ))}
    </Box>
  );
});

PhonePill.propTypes = { sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]) };

const ALL_FIT = { contact: true, phone: true, impact: true, menu: false };

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerGroup, setDrawerGroup] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [fit, setFit] = React.useState(ALL_FIT);

  const toolbarRef = React.useRef(null);
  const brandRef = React.useRef(null);
  const navRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const contactRef = React.useRef(null);
  const impactRef = React.useRef(null);
  const fixedRef = React.useRef(null);
  const widths = React.useRef({ phone: 0, contact: 0, impact: 0, fixed: 0 });

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(null);
    setDrawerOpen(false);
  }, [location.pathname]);

  // Decide which right-hand pieces fit. Each piece is measured while it is
  // shown and its width remembered, so hiding it never loses the number.
  React.useLayoutEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return undefined;
    const measure = () => {
      const w = widths.current;
      if (phoneRef.current && phoneRef.current.offsetWidth) w.phone = phoneRef.current.offsetWidth;
      if (contactRef.current && contactRef.current.offsetWidth) w.contact = contactRef.current.offsetWidth;
      if (impactRef.current && impactRef.current.offsetWidth) w.impact = impactRef.current.offsetWidth;
      if (fixedRef.current && fixedRef.current.offsetWidth) w.fixed = fixedRef.current.offsetWidth;
      const total = toolbar.clientWidth;
      const nav = navRef.current ? navRef.current.offsetWidth : 0;
      const brand = brandRef.current ? brandRef.current.offsetWidth : 0;
      // The navigation is centered, so the actions get the right half of the
      // bar minus half the navigation. Without a visible navigation (phones)
      // they get everything after the brand.
      const budget = nav > 0 ? total / 2 - nav / 2 - GAP * 2 : total - brand - GAP * 2;
      const plan = (reserveMenu) => {
        let remaining = budget - w.fixed - (reserveMenu ? MENU_BUTTON_WIDTH + GAP : 0);
        const next = { contact: false, phone: false, impact: false, menu: reserveMenu };
        const take = (key, width) => {
          if (width > 0 && remaining - (width + GAP) >= 0) {
            next[key] = true;
            remaining -= width + GAP;
          }
        };
        // Our Impact first, then the phone number, then the contact button,
        // which is the first to move into the drawer when the bar gets narrow
        take("impact", w.impact);
        take("phone", w.phone);
        take("contact", w.contact);
        return next;
      };
      // First try without a menu button; if anything is left out, plan again
      // with room for the button that opens the drawer.
      let next = plan(false);
      const leftOut = !next.contact || !next.impact || (w.phone > 0 && !next.phone);
      if (leftOut || nav === 0) next = plan(true);
      setFit((prev) => (prev.contact === next.contact && prev.phone === next.phone && prev.impact === next.impact && prev.menu === next.menu ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, []);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerGroup(null);
  };

  const hasPhone = phoneEntries().length > 0;
  const show = (visible) => ({ display: { xs: "none", md: visible ? "inline-flex" : "none" } });

  return (
    <>
      <Box
        component="header"
        sx={(theme) => ({
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: zIndex.header,
          backgroundColor: theme.vars.palette.frost.main,
          backdropFilter: "saturate(160%) blur(16px)",
          WebkitBackdropFilter: "saturate(160%) blur(16px)",
          borderBottom: `1px solid ${scrolled ? theme.vars.palette.frost.border : "transparent"}`,
          transition: `border-color ${duration.base}ms ${easing.standard}, background-color ${duration.base}ms ${easing.standard}`,
        })}
      >
        <Container maxWidth="xl">
          <Box
            ref={toolbarRef}
            component="nav"
            aria-label="Main navigation"
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: `${GAP}px`,
              minHeight: { xs: layout.headerHeight.phone, md: layout.headerHeight.desktop },
            }}
          >
            {/* Brand */}
            <Box ref={brandRef} sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <Link to={PathConstants.HOME} style={{ display: "inline-flex", borderRadius: 999 }}>
                <Box
                  component="img"
                  src={Logo}
                  alt="Enlighten Learning logo"
                  width={40}
                  height={40}
                  sx={(theme) => ({
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `1px solid ${theme.vars.palette.hairline.main}`,
                    transition: `transform ${duration.slow}ms ${easing.standard}`,
                    "@media (hover: hover)": { "&:hover": { transform: "rotate(-6deg) scale(1.04)" } },
                  })}
                />
              </Link>
            </Box>

            {/* Desktop navigation, centered */}
            <Box
              ref={navRef}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 0.25,
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
              }}
            >
              {menuItems.map((item) =>
                item.href ? (
                  <Button key={item.text} component={Link} to={item.href} sx={navButtonSx} aria-current={location.pathname === item.href ? "page" : undefined}>
                    {item.text}
                  </Button>
                ) : (
                  <DesktopMenu key={item.menu} item={item} open={open} onOpen={setOpen} onClose={() => setOpen(null)} pathname={location.pathname} />
                )
              )}
            </Box>

            {/* Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: `${GAP}px`, flexShrink: 0 }}>
              {hasPhone && <PhonePill ref={phoneRef} sx={show(fit.phone)} />}
              <Button
                ref={impactRef}
                component={Link}
                to={PathConstants.CHARITIES}
                variant="text"
                sx={(theme) => ({ ...actionSx(theme), ...show(fit.impact), color: theme.vars.palette.metallic.text, "&:hover": { backgroundColor: theme.vars.palette.metallic.soft } })}
              >
                Our Impact
              </Button>
              <Button
                ref={contactRef}
                component={Link}
                to={PathConstants.CONTACT_US}
                variant="outlined"
                color="inherit"
                sx={(theme) => ({ ...actionSx(theme), ...show(fit.contact) })}
              >
                Contact
              </Button>
              <Box ref={fixedRef} sx={{ display: "flex", alignItems: "center", gap: `${GAP}px` }}>
                <ToggleColorMode />
                <Button component={Link} to={PathConstants.DONATE_NOW} variant="contained" color="primary" sx={actionSx}>
                  Donate
                </Button>
              </Box>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-navigation"
                sx={{ display: { xs: "inline-flex", md: fit.menu ? "inline-flex" : "none" }, width: MENU_BUTTON_WIDTH, height: MENU_BUTTON_WIDTH }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Seasonal lights and charms hanging from the bottom of the navbar */}
            <NavbarGarland />
          </Box>
        </Container>
      </Box>

      {/* Drawer: the navigation on phones, and the overflow elsewhere */}
      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer} ModalProps={{ keepMounted: true }} PaperProps={{ id: "mobile-navigation", sx: { width: 300, maxWidth: "88vw" } }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
          <Link to={PathConstants.HOME} onClick={closeDrawer} style={{ display: "inline-flex" }}>
            <Box component="img" src={Logo} alt="Logo" width={40} height={40} sx={(theme) => ({ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: `1px solid ${theme.vars.palette.hairline.main}` })} />
          </Link>
          <IconButton onClick={closeDrawer} aria-label="Close navigation menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ px: 1 }}>
          {menuItems.map((item) =>
            item.href ? (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.href} onClick={closeDrawer} selected={location.pathname === item.href}>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ) : (
              <Box key={item.menu}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setDrawerGroup((prev) => (prev === item.menu ? null : item.menu))}
                    aria-expanded={drawerGroup === item.menu}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                    <ExpandMoreIcon sx={{ transition: `transform ${duration.base}ms ${easing.standard}`, transform: drawerGroup === item.menu ? "rotate(180deg)" : "none" }} />
                  </ListItemButton>
                </ListItem>
                <Collapse in={drawerGroup === item.menu} timeout="auto" unmountOnExit>
                  <List disablePadding sx={{ pl: 2, pb: 1 }}>
                    {item.links.map((link) => (
                      <ListItem key={link.href} disablePadding>
                        <ListItemButton component={Link} to={link.href} onClick={closeDrawer} selected={location.pathname === link.href}>
                          <ListItemText primary={link.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            )
          )}
          <Divider sx={{ my: 1 }} />
          <ListItem disablePadding>
            <ListItemButton component={Link} to={PathConstants.CHARITIES} onClick={closeDrawer} selected={location.pathname === PathConstants.CHARITIES}>
              <ListItemText primary="Our Impact" primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={PathConstants.CONTACT_US} onClick={closeDrawer} selected={location.pathname === PathConstants.CONTACT_US}>
              <ListItemText primary="Contact" primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
          {hasPhone && (
            <ListItem sx={{ pt: 1 }}>
              <PhonePill sx={{ flexWrap: "wrap" }} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}
