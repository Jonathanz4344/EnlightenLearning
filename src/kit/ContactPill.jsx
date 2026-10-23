import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { site, phoneHref } from "../config/site";
import { radius } from "../theme/tokens";
import { useBand } from "./BandContext";

// The contact details in one pill: a call number, a text number (marked as
// texts) and the email. Numbers appear only once they are set in
// src/config/site.js; until then the pill shows the email.
export default function ContactPill({ showEmail = true, sx }) {
  const band = useBand();
  const entries = [];
  if (site.phoneCall) entries.push({ key: "call", icon: <CallRoundedIcon />, label: site.phoneCall, href: phoneHref("tel", site.phoneCall), title: "Call" });
  if (site.phoneText) entries.push({ key: "text", icon: <SmsRoundedIcon />, label: site.phoneText, href: phoneHref("sms", site.phoneText), title: "Text" });
  if (showEmail || entries.length === 0) entries.push({ key: "email", icon: <MailOutlineRoundedIcon />, label: site.email, href: `mailto:${site.email}` });
  return (
    <Box
      sx={[
        (theme) => ({
          display: "inline-flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          p: 0.5,
          borderRadius: `${radius.pill}px`,
          border: `1px solid ${band === "ink" ? theme.vars.palette.hairline.strong : theme.vars.palette.hairline.main}`,
          backgroundColor: band === "ink" ? "transparent" : theme.vars.palette.surface.paper,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
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
            color: "inherit",
            textDecoration: "none",
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
            "& > svg": { fontSize: 18, color: band === "ink" ? theme.vars.palette.primary.light : theme.vars.palette.accentText.main },
            "&:hover": { backgroundColor: band === "ink" ? theme.vars.palette.hairline.main : theme.vars.palette.surface.sunken },
          })}
        >
          {entry.icon}
          {entry.label}
          {entry.title && (
            <Box component="span" sx={(theme) => ({ fontSize: "0.75rem", color: theme.vars.palette.text.secondary })}>
              ({entry.title})
            </Box>
          )}
        </Typography>
      ))}
    </Box>
  );
}

ContactPill.propTypes = {
  showEmail: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
