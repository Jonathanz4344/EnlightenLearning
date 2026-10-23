import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import { TOTAL_RAISED, FUNDRAISING_GOAL } from "../../constants/metrics";
import Logo from "/images/logo/Logo.png";
import ZelleQr from "/images/donate/Zelle.jpg";
import PathConstants from "../../routes/pathConstants";
import { SEASONS } from "../../constants/season";
import { useSeason } from "../../theme/SeasonContext";
import { radius, duration, easing } from "../../theme/tokens";
import FundraisingScenery from "../seasonal/FundraisingScenery";
import {
  Seo,
  Section,
  PageIntro,
  SectionHeading,
  Surface,
  Badge,
  Stat,
  StatRow,
  Meter,
  ActionButton,
  Figure,
  IconWell,
  CTABand,
} from "../../kit";
import { Reveal, Stagger, StaggerItem } from "../../motion";

// The fundraising balloon changes with the season: a pumpkin in October and a
// snowball in December. The season comes from src/constants/season.js. Every
// seasonal color below is a CSS variable the theme writes while that season
// is on, so the pieces follow light and dark mode on their own.
const pumpkinRibs = (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
    <g strokeWidth="2.5" strokeLinecap="round" style={{ fill: "none", stroke: "var(--el-season-pumpkin-deep)", opacity: 0.5 }}>
      <path d="M50 3 C30 20 30 80 50 97" />
      <path d="M50 3 C70 20 70 80 50 97" />
      <path d="M42 4 C12 22 12 78 42 96" />
      <path d="M58 4 C88 22 88 78 58 96" />
    </g>
  </svg>
);

const pumpkinStem = (
  <svg viewBox="0 0 30 30" width="100%" height="100%" aria-hidden="true">
    <path d="M12 30 C12 22 11 14 8 8 L14 6 C16 13 17 21 17 30 Z" style={{ fill: "var(--el-season-stem)" }} />
    <path d="M16 15 C20 9 27 9 29 13 C25 16 20 17 16 15 Z" style={{ fill: "var(--el-season-leaf)" }} />
    <path d="M11 8 C7 2 1 4 2 9 C3 13 8 12 7 9" strokeWidth="1.5" strokeLinecap="round" style={{ fill: "none", stroke: "var(--el-season-leaf)" }} />
  </svg>
);

const snowSparkles = (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
    <g style={{ fill: "var(--el-season-flake-edge)" }}>
      <circle cx="22" cy="62" r="2.2" />
      <circle cx="78" cy="30" r="1.8" />
      <circle cx="70" cy="78" r="2.4" />
      <circle cx="30" cy="20" r="1.5" />
      <circle cx="85" cy="58" r="1.6" />
      <circle cx="15" cy="40" r="1.4" />
    </g>
    <g style={{ fill: "var(--el-season-snow-edge)" }}>
      <path d="M80 70 L81.2 73.8 L85 75 L81.2 76.2 L80 80 L78.8 76.2 L75 75 L78.8 73.8 Z" />
      <path d="M24 28 L25 31 L28 32 L25 33 L24 36 L23 33 L20 32 L23 31 Z" />
    </g>
  </svg>
);

const hollySprig = (
  <svg viewBox="0 0 36 26" width="100%" height="100%" aria-hidden="true">
    <ellipse cx="11" cy="11" rx="9.5" ry="4.4" transform="rotate(-22 11 11)" style={{ fill: "var(--el-season-holly)" }} />
    <ellipse cx="25" cy="11" rx="9.5" ry="4.4" transform="rotate(22 25 11)" style={{ fill: "var(--el-season-holly-deep)" }} />
    <path d="M3 14 L17 8 M33 14 L19 8" strokeWidth="0.8" style={{ fill: "none", stroke: "var(--el-season-holly-deep)" }} />
    <circle cx="15.5" cy="15" r="2.8" style={{ fill: "var(--el-season-berry)" }} />
    <circle cx="20.5" cy="15" r="2.8" style={{ fill: "var(--el-season-berry)" }} />
    <circle cx="18" cy="19.2" r="2.8" style={{ fill: "var(--el-season-berry-light)" }} />
    <circle cx="14.6" cy="14.1" r="0.8" style={{ fill: "var(--el-season-snow)", opacity: 0.7 }} />
  </svg>
);

const BALLOON_LOOKS = {
  [SEASONS.NORMAL]: {
    noun: "balloon",
    emoji: "🎈",
    subtitle: "Every donation inflates and lifts us higher",
    startLine: "Help inflate and launch our balloon!",
  },
  [SEASONS.HALLOWEEN]: {
    noun: "pumpkin",
    emoji: "🎃",
    subtitle: "Every donation grows our pumpkin and lifts us higher",
    startLine: "Help grow and launch our pumpkin!",
    body: "var(--el-season-pumpkin)",
    trim: "var(--el-season-pumpkin-deep)",
    inside: pumpkinRibs,
    topper: { node: pumpkinStem, sx: { left: "24%", top: "-12%", width: "24%", height: "24%", transform: "rotate(-18deg)" } },
  },
  [SEASONS.CHRISTMAS]: {
    noun: "snowball",
    emoji: "❄️",
    subtitle: "Every donation builds our snowball and lifts us higher",
    startLine: "Help roll up and launch our snowball!",
    body: "var(--el-season-snow)",
    trim: "var(--el-season-snow-edge)",
    inside: snowSparkles,
    topper: { node: hollySprig, sx: { right: "2%", top: "2%", width: "34%", height: "25%", transform: "rotate(18deg)" } },
  },
};

// Simple donation amounts
const donationAmounts = [25, 50, 100, 250];

const PAGE_TITLE = "Support Our Mission";
const PAGE_LEAD =
  "Donations help us raise money to donate to charities that provide hope care and support to those in need. Striving to make a positive impact on as many lives possible.";
const PROGRESS_HEADING = "Our Fundraising Progress";
const financeMailto = "mailto:Enlightenlearningfinance@gmail.com";

// Geometry of the flight zone: milestones sit between TRACK_BASE and
// TRACK_BASE + RISE_SPAN percent from the bottom, and the balloon climbs the
// same span so it never covers the words above the zone.
const RISE_SPAN = 52;
const TRACK_BASE = 10;
const MILESTONES = [0, 25, 50, 75, 100];

// Logo balloon fundraising progress: the logo is the balloon. It rises and
// inflates with the share of the goal raised, on a tinted sky over a strip of
// ground, with the seasonal scenery behind it.
const FundraisingProgress = ({ currentAmount, goalAmount }) => {
  const { season } = useSeason();
  const look = BALLOON_LOOKS[season] ?? BALLOON_LOOKS[SEASONS.NORMAL];
  const Noun = look.noun.charAt(0).toUpperCase() + look.noun.slice(1);
  // True progress, uncapped, so we can celebrate going past the goal
  const rawPercentage = goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;
  const percentage = Math.min(rawPercentage, 100);
  const isOverGoal = rawPercentage > 100;
  const overageAmount = Math.max(currentAmount - goalAmount, 0);

  // Balloon rises from bottom (0%) to top (100%)
  const riseAmount = percentage;

  // Balloon inflates from 60% to 100% size, plus a little extra past the goal
  const balloonScale = 0.6 + (percentage / 100) * 0.4 + (isOverGoal ? 0.08 : 0);

  // Beating the goal is an honor, so the accents turn metallic
  const honorTone = isOverGoal ? "metallic" : "accent";
  const honorColor = (theme) => (isOverGoal ? theme.vars.palette.metallic.text : theme.vars.palette.accentText.main);
  const remainingLabel = isOverGoal ? "Above Goal" : "To Go";
  const shareLabel = isOverGoal ? "Of Goal" : "Complete";

  return (
    <Surface
      tone="tint"
      padding={0}
      sx={(theme) => ({
        maxWidth: 800,
        mx: "auto",
        overflow: "hidden",
        minHeight: { xs: 500, sm: 550 },
        backgroundColor: theme.vars.palette.season.tint,
        borderColor: isOverGoal ? theme.vars.palette.metallic.main : theme.vars.palette.hairline.main,
      })}
    >
      {/* Clouds */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`cloud-${i}`}
          aria-hidden="true"
          sx={(theme) => ({
            position: "absolute",
            top: `${15 + i * 25}%`,
            left: i % 2 === 0 ? "5%" : "70%",
            width: { xs: 60, sm: 100 },
            height: { xs: 25, sm: 40 },
            borderRadius: "50px",
            backgroundColor: theme.vars.palette.surface.paper,
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "20%",
              width: "40%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "inherit",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: "-30%",
              right: "20%",
              width: "30%",
              height: "80%",
              borderRadius: "50%",
              backgroundColor: "inherit",
            },
          })}
        />
      ))}

      {/* Ground at the bottom: the season's ground while a season is on, otherwise the sunken surface */}
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          backgroundColor: `var(--el-season-ground, ${theme.vars.palette.surface.sunken})`,
          borderTop: `1px solid ${theme.vars.palette.hairline.main}`,
          borderRadius: "100% 100% 0 0 / 30px 30px 0 0",
        })}
      />

      {/* Seasonal scenery: moon and stars, or falling snow and pine trees */}
      <FundraisingScenery season={season} />

      {/* Main content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 1.5, sm: 5 },
          pt: { xs: 3, sm: 5 },
          pb: { xs: 9, sm: 10 },
        }}
      >
        {/* Title */}
        <Typography variant="h4" component="h3" sx={{ textAlign: "center", mb: 1, color: honorColor }}>
          {isOverGoal ? "We Broke Through the Sky! 🎉" : `Help Our ${Noun} Rise! ${look.emoji}`}
        </Typography>
        <Typography
          variant="body2"
          sx={(theme) => ({
            color: isOverGoal ? theme.vars.palette.metallic.text : theme.vars.palette.text.secondary,
            textAlign: "center",
            mb: 4,
            fontWeight: isOverGoal ? 600 : 400,
          })}
        >
          {isOverGoal ? `Goal beaten by $${overageAmount.toLocaleString()} — every donation now goes even further` : look.subtitle}
        </Typography>

        {/* Balloon flight zone */}
        <Box sx={{ position: "relative", width: "100%", height: { xs: 300, sm: 340 }, display: "flex", justifyContent: "center" }}>
          {/* Vertical progress track */}
          <Box
            aria-hidden="true"
            sx={(theme) => ({
              position: "absolute",
              left: "50%",
              top: `${100 - (TRACK_BASE + RISE_SPAN)}%`,
              bottom: `${TRACK_BASE}%`,
              transform: "translateX(-50%)",
              width: 2,
              borderRadius: `${radius.xs}px`,
              backgroundColor: theme.vars.palette.hairline.strong,
            })}
          />

          {/* Milestone markers */}
          {MILESTONES.map((milestone) => {
            const reached = percentage >= milestone;
            return (
              <Box
                key={milestone}
                sx={{
                  position: "absolute",
                  left: "50%",
                  bottom: `${(milestone / 100) * RISE_SPAN + TRACK_BASE}%`,
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* The label sits clear of the balloon, joined to its dot by a hairline tick */}
                <Typography
                  variant="caption"
                  component="span"
                  sx={(theme) => ({
                    position: "absolute",
                    right: { xs: 68, sm: 92 },
                    color: reached ? honorColor(theme) : theme.vars.palette.text.secondary,
                    fontWeight: reached ? 700 : 500,
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  })}
                >
                  {isOverGoal && milestone === 100 ? "GOAL 🏆" : `$${((goalAmount * milestone) / 100).toLocaleString()}`}
                </Typography>
                <Box
                  aria-hidden="true"
                  sx={(theme) => ({
                    position: "absolute",
                    right: 16,
                    width: { xs: 46, sm: 70 },
                    height: "1px",
                    backgroundColor: theme.vars.palette.hairline.strong,
                  })}
                />
                <Box
                  aria-hidden="true"
                  sx={(theme) => ({
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: reached
                      ? isOverGoal
                        ? theme.vars.palette.metallic.main
                        : theme.vars.palette.primary.main
                      : theme.vars.palette.surface.paper,
                    border: "2px solid",
                    borderColor: reached
                      ? isOverGoal
                        ? theme.vars.palette.metallic.text
                        : theme.vars.palette.primary.dark
                      : theme.vars.palette.hairline.strong,
                    transition: `background-color ${duration.slow}ms ${easing.standard}`,
                  })}
                />
              </Box>
            );
          })}

          {/* The logo balloon */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: `${Math.max((riseAmount / 100) * RISE_SPAN, 5)}%`,
              transform: "translateX(-50%)",
            }}
          >
            <Reveal y={40} delay={0.15} sx={{ position: "relative" }}>
              {/* Balloon string */}
              <Box
                aria-hidden="true"
                sx={(theme) => ({
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 2,
                  height: { xs: 40, sm: 60 },
                  borderRadius: `${radius.xs}px`,
                  backgroundColor: theme.vars.palette.hairline.strong,
                })}
              />

              {/* Main balloon (the logo) */}
              <Box
                sx={{
                  width: { xs: 120, sm: 160 },
                  height: { xs: 120, sm: 160 },
                  transform: `scale(${balloonScale})`,
                  position: "relative",
                }}
              >
                {/* Balloon body */}
                <Box
                  sx={(theme) => ({
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundColor: look.body ?? (isOverGoal ? theme.vars.palette.metallic.main : theme.vars.palette.primary.main),
                    border: "3px solid",
                    borderColor: look.trim ?? (isOverGoal ? theme.vars.palette.metallic.text : theme.vars.palette.primary.dark),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    // One soft highlight so the body reads as round
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "10%",
                      left: "15%",
                      width: "30%",
                      height: "25%",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, var(--el-ink-text), transparent 70%)",
                      opacity: 0.55,
                    },
                  })}
                >
                  {/* Seasonal markings: pumpkin ribs or snow sparkles */}
                  {look.inside}

                  {/* Logo inside */}
                  <img src={Logo} alt="Enlighten Learning" style={{ position: "relative", width: "65%", height: "65%", objectFit: "contain" }} />
                </Box>

                {/* Seasonal topper: a pumpkin stem or a sprig of holly */}
                {look.topper && (
                  <Box aria-hidden="true" sx={{ position: "absolute", zIndex: 1, ...look.topper.sx }}>
                    {look.topper.node}
                  </Box>
                )}

                {/* Balloon tie */}
                <Box
                  aria-hidden="true"
                  sx={(theme) => ({
                    position: "absolute",
                    bottom: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 16,
                    height: 16,
                    backgroundColor: look.trim ?? (isOverGoal ? theme.vars.palette.metallic.text : theme.vars.palette.primary.dark),
                    clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                  })}
                />
              </Box>

              {/* Percentage badge */}
              <Box sx={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)" }}>
                <Badge tone={honorTone}>{isOverGoal ? `🏆 ${rawPercentage.toFixed(0)}%` : `${percentage.toFixed(0)}%`}</Badge>
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* Amount display */}
        <Surface
          tone="paper"
          padding={{ xs: 2, sm: 3 }}
          sx={(theme) => ({
            mt: 4,
            width: "100%",
            maxWidth: 440,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderColor: isOverGoal ? theme.vars.palette.metallic.main : theme.vars.palette.hairline.main,
          })}
        >
          <Stat
            value={`$${currentAmount.toLocaleString()}`}
            label={
              isOverGoal ? (
                <>
                  raised — <strong>${overageAmount.toLocaleString()}</strong> past our{" "}${goalAmount.toLocaleString()} goal 🎉
                </>
              ) : (
                <>
                  raised of <strong>${goalAmount.toLocaleString()}</strong> goal
                </>
              )
            }
            align="center"
            tone={honorTone}
          />

          {/* Mini progress bar */}
          <Meter value={currentAmount} max={goalAmount} label={PROGRESS_HEADING} tone={honorTone} height={8} sx={{ width: "100%", mt: 2.5 }} />

          {/* Stats row */}
          <StatRow
            items={[
              { value: `$${currentAmount.toLocaleString()}`, label: "Raised" },
              {
                value: isOverGoal ? `+$${overageAmount.toLocaleString()}` : `$${(goalAmount - currentAmount).toLocaleString()}`,
                label: remainingLabel,
              },
              { value: `${rawPercentage.toFixed(0)}%`, label: shareLabel },
            ]}
            columns={{ xs: 3 }}
            align="center"
            divided={false}
            sx={{
              width: "100%",
              mt: 3,
              gap: { xs: 1, md: 0 },
              // Three secondary figures share a small box, so their numbers step down from the hero size
              "& p:first-of-type": { fontSize: { xs: "1.375rem", sm: "1.75rem" } },
            }}
          />
        </Surface>

        {/* Encouraging message */}
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            color: honorColor,
            fontWeight: isOverGoal ? 700 : 500,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          {isOverGoal
            ? "🏆 Goal smashed — and we're still climbing! Thank you for lifting us this far."
            : percentage >= 100
              ? `${look.emoji} The ${look.noun} has reached the sky! Thank you!`
              : percentage >= 75
                ? `${look.emoji} Almost at the clouds! One more push!`
                : percentage >= 50
                  ? `${look.emoji} Rising higher! Keep it going!`
                  : percentage >= 25
                    ? `${look.emoji} Lifting off! Help us soar!`
                    : `${look.emoji} ${look.startLine}`}
        </Typography>
      </Box>
    </Surface>
  );
};

FundraisingProgress.propTypes = {
  currentAmount: PropTypes.number.isRequired,
  goalAmount: PropTypes.number.isRequired,
};

// Simple donation button component
const DonationButton = ({ amount }) => {
  const handleDonateClick = () => {
    // For demo purposes, we'll just show the Zelle info
    document.getElementById("zelle-section")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <ActionButton variant="outlined" size="large" fullWidth onClick={handleDonateClick} sx={{ py: 2, fontSize: "1.25rem", fontVariantNumeric: "tabular-nums" }}>
      ${amount}
    </ActionButton>
  );
};

DonationButton.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default function DonateNow() {
  const [copiedZelle, setCopiedZelle] = useState(false);

  // Fundraising data
  const currentAmount = TOTAL_RAISED;
  const goalAmount = FUNDRAISING_GOAL;
  const zelleEmail = "Enlightenlearningfinance@gmail.com";

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedZelle(true);
      setTimeout(() => setCopiedZelle(false), 2000);
    });
  };

  return (
    <>
      <Seo title="Donate Now" description={PAGE_LEAD} />

      {/* Page header */}
      <PageIntro title={PAGE_TITLE} lead={PAGE_LEAD}>
        <Reveal delay={0.12} y={10}>
          <IconWell tone="season" size="lg" round>
            <FavoriteRoundedIcon />
          </IconWell>
        </Reveal>
      </PageIntro>

      {/* Fundraising progress */}
      <Section>
        <SectionHeading title={<>{PROGRESS_HEADING}</>} align="center" />
        <Reveal>
          <FundraisingProgress currentAmount={currentAmount} goalAmount={goalAmount} />
        </Reveal>
        <Reveal delay={0.1}>
          <Typography variant="body1" sx={{ mt: 4, fontStyle: "italic", maxWidth: 600, mx: "auto", textAlign: "center", color: "text.secondary" }}>
            Every dollar helps us make a bigger impact in our community! We&apos;re getting closer to our goal every day.
          </Typography>
          {/* See our impact button */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <ActionButton variant="outlined" size="large" to={PathConstants.CHARITIES} startIcon={<VolunteerActivismRoundedIcon />} arrow>
              See Our Impact &amp; Charities
            </ActionButton>
          </Box>
        </Reveal>
      </Section>

      {/* Simple donation buttons */}
      <Section variant="paper">
        <SectionHeading title={<>Choose Your Donation Amount</>} lead={<>Select any amount below to make your donation</>} align="center" />
        <Stagger
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
            gap: 2,
            maxWidth: 640,
            mx: "auto",
          }}
        >
          {donationAmounts.map((amount) => (
            <StaggerItem key={amount} sx={{ display: "flex" }}>
              <DonationButton amount={amount} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Zelle payment section */}
      <Section id="zelle-section">
        <Reveal>
          <Surface tone="paper" padding={{ xs: 3, md: 5 }} sx={{ maxWidth: 980, mx: "auto" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2.5, mb: { xs: 4, md: 5 } }}>
              <IconWell tone="accent" size="lg" round>
                <AccountBalanceWalletRoundedIcon />
              </IconWell>
              <SectionHeading
                level="h3"
                variant="h3"
                align="center"
                title={<>Send Your Donation via Zelle</>}
                lead={<>Send your donation directly to our Financial Director</>}
                gutterBottom={false}
                reveal={false}
              />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: { xs: 4, md: 6 }, alignItems: "start" }}>
              {/* Zelle information */}
              <Box>
                <Typography variant="h6" component="h4" sx={{ mb: 2 }}>
                  Zelle Payment Information:
                </Typography>

                <Surface tone="sunken" padding={3} sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" component="p" sx={{ color: "text.secondary" }}>
                      Financial Director:
                    </Typography>
                    <Typography variant="h6" component="p">
                      Brianna Tam
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" component="p" sx={{ color: "text.secondary" }}>
                      Zelle Email/Phone:
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                      <Typography variant="h6" component="p" sx={{ overflowWrap: "anywhere", minWidth: 0 }}>
                        {zelleEmail}
                      </Typography>
                      <IconButton onClick={() => copyToClipboard(zelleEmail)} size="small" aria-label={`Copy ${zelleEmail}`} sx={{ color: "accentText.main" }}>
                        {copiedZelle ? <CheckCircleRoundedIcon /> : <ContentCopyRoundedIcon />}
                      </IconButton>
                    </Box>
                    <Box role="status" sx={{ minHeight: 20 }}>
                      {copiedZelle && (
                        <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600 }}>
                          Copied to clipboard!
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Surface>

                <Alert severity="info">
                  <Typography variant="body2" component="div">
                    <strong>How to send via Zelle:</strong>
                    <br />
                    1. Open your banking app
                    <br />
                    2. Select &quot;Send Money with Zelle&quot;
                    <br />
                    3. Enter the email above
                    <br />
                    4. Enter your donation amount
                    <br />
                    5. Add &quot;Enlighten Learning Donation&quot; in the memo
                  </Typography>
                </Alert>
              </Box>

              {/* QR code */}
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" component="h4" sx={{ mb: 2 }}>
                  Scan QR Code to Pay
                </Typography>
                <Figure
                  src={ZelleQr}
                  alt="Zelle QR Code for Enlighten Learning Donations"
                  fit="contain"
                  ratio="1 / 1"
                  radius="md"
                  caption={<>Use your phone&apos;s camera or banking app to scan</>}
                  sx={{ maxWidth: 280, mx: "auto", textAlign: "center" }}
                />
              </Box>
            </Box>
          </Surface>
        </Reveal>
      </Section>

      {/* Thank you message */}
      <Section variant="tint">
        <Reveal>
          <Surface
            tone="paper"
            padding={{ xs: 3, md: 5 }}
            sx={{ maxWidth: 800, mx: "auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 2 }}
          >
            <IconWell tone="season" size="lg" round>
              <FavoriteRoundedIcon />
            </IconWell>
            <Typography variant="h2" component="h2" sx={{ textWrap: "balance" }}>
              Thank You for Your Support!
            </Typography>
            <Typography variant="subtitle1" component="p" sx={{ color: "text.secondary", textWrap: "pretty" }}>
              Every donation, no matter the size, makes a meaningful difference as we strive to raise our fundraising goal. Your generosity helps us raise funds for a variety of charities that provide hope, care and support to those in need. We couldn&apos;t do this without you, thank you for helping us make a lasting impact in many lives!
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              Together, we&apos;re building a brighter future for our community.
            </Typography>
          </Surface>
        </Reveal>
      </Section>

      {/* Contact information */}
      <CTABand title={<>Questions About Donations?</>} lead={<>Contact our Financial Director for any questions about donations or payment methods.</>}>
        <Chip
          component="a"
          href={financeMailto}
          clickable
          icon={<SupportRoundedIcon />}
          label="Enlightenlearningfinance@gmail.com"
          sx={(theme) => ({
            mt: 1,
            maxWidth: "100%",
            height: "auto",
            py: 1,
            px: 0.75,
            fontSize: "0.9375rem",
            fontWeight: 600,
            backgroundColor: theme.vars.palette.inkText.primary,
            color: theme.vars.palette.surface.ink,
            borderColor: theme.vars.palette.hairline.strong,
            "&:hover": { backgroundColor: theme.vars.palette.primary.light, color: theme.vars.palette.surface.ink },
            "& .MuiChip-label": { overflow: "hidden", textOverflow: "ellipsis" },
          })}
        />
      </CTABand>
    </>
  );
}
