import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import {
  Seo,
  Section,
  PageIntro,
  SectionHeading,
  FeatureGrid,
  FeatureCard,
  StatRow,
  Surface,
  Badge,
  MetaList,
  ActionButton,
  IconWell,
} from "../../kit";
import { Reveal } from "../../motion";

// Page copy. The lead doubles as the Seo description.
const PAGE_TITLE = "Volunteer Opportunities";
const PAGE_LEAD = "Join us in making a difference! Explore current, upcoming, and past volunteer opportunities to get involved and contribute to your community.";

// Simplified volunteer data - single array with all opportunities
const volunteerData = [
  {
    id: 6,
    title: "Spring into Game Development: Kids Coding Workshop",
    date: "2026-03-18 ",
    time: "4:00 PM - 5:30 PM",
    location: "Syosset Public Library",
    description: "Help children code a simple Spring-themed game using Scratch. Volunteers must have a basic knowledge of Scratch.",
    formUrl: "https://forms.gle/ipPGYsspt6geriRy6",
    category: "Coding",
    volunteersNeeded: 10,
    totalParticipants: 20,
    duration: "1.5 hours",
    coordinator: "Enlighten Learning",
    registrationStartDate: "2026-01-04",
    expirationDate: "2026-03-18",
  },
  {
    id: 5,
    title: "Snowy Literature Workshop",
    date: "2025-12-12 ",
    time: "4:00 PM - 5:30 PM",
    location: "Shelter Rock Library",
    description: "Want to help guide students on their journey in storytelling? This is a great opportunity for those who want to engage with students to guide them in expressing their creativity.",
    formUrl: "https://forms.gle/UjB7PafvMfFvBocj9",
    category: "Literature",
    volunteersNeeded: 10,
    totalParticipants: 30,
    duration: "1.5 hours",
    coordinator: "Enlighten Learning",
    registrationStartDate: "2025-12-05",
    expirationDate: "2025-12-12",
  },
  {
    id: 1,
    title: "The Art of Winter Crafts Event",
    date: "2025-01-10",
    time: "4:00 PM - 5:30 PM",
    location: "Shelter Rock Library",
    description: "Assist the children in creating winter crafts to celebrate the season. We will be making a 3D snowman and paper snowflakes.",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSda9fa92M-4Q0x_8q6c1xc5yBhtGfei78FHhauze_CrSkcztQ/viewform?usp=dialog",
    category: "Arts and Craft",
    volunteersNeeded: 10,
    totalParticipants: 30,
    duration: "1.5 hours",
    coordinator: "Enlighten Learning",
    registrationStartDate: "2025-01-01",
    expirationDate: "2025-01-10", // Past event
  },
  {
    id: 2,
    title: "Easter Fun Fest",
    date: "2025-04-18",
    time: "4:00 PM - 5:30 PM",
    location: "Ridder's Pond Park",
    description: "Guide a scavenger hunt for the community children to celebrate Easter! Volunteers will also help run exciting field games and competitions.",
    formUrl: "https://forms.gle/vAF6viqg8trKTs4Z8",
    category: "Scavenger Hunt",
    volunteersNeeded: 10,
    totalParticipants: 30,
    duration: "1.5 hours",
    coordinator: "Enlighten Learning",
    registrationStartDate: "2025-04-01",
    expirationDate: "2025-04-18", // Past event
  },
  // {
  //     id: 3,
  //     title: "Veterans Day Card Marking",
  //     date: "",
  //     time: "",
  //     location: "",
  //     description: "Join us in creating heartfelt cards for veterans. We will be giving these cards to veterans to express our gratitude for their service. This is a wonderful opportunity to honor those who have served our country.",
  //     formUrl: "",
  //     category: "Literature",
  //     volunteersNeeded: 30,
  //     totalParticipants: 30,
  //     duration: "",
  //     coordinator: "Enlighten Learning",
  //     registrationStartDate: "22023-07-01",
  //     expirationDate: "",
  // },
  {
    id: 4,
    title: "Summer Volleyball Clinic",
    date: "2025-07-21 - 2025-08-25",
    time: "10:30 AM - 12:00 PM",
    location: "Park Circle",
    description: "Need an athletic summer schedule? Help coach the community kids at our introductory volleyball clinic.",
    formUrl: "",
    category: "Volleyball",
    volunteersNeeded: 30,
    totalParticipants: 30,
    duration: "1.5 hours",
    coordinator: "Enlighten Learning",
    registrationStartDate: "2025-07-01",
    expirationDate: "2025-08-25",
  },


];

// Helper function to get today's date without time
const getTodayDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Helper function to parse date string to Date object
const parseDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
};

// Function to determine the status of a volunteer opportunity
const getVolunteerStatus = (volunteer) => {
  const today = getTodayDate();
  const expirationDate = parseDate(volunteer.expirationDate);
  const registrationStartDate = parseDate(volunteer.registrationStartDate);

  // If expiration date has passed, it's a past event
  if (expirationDate && expirationDate < today) {
    return 'past';
  }

  // If there's a registration start date and it hasn't arrived yet, it's upcoming
  if (registrationStartDate && registrationStartDate > today) {
    return 'upcoming';
  }

  // Otherwise, it's open for registration
  return 'open';
};

// Returns a sortable timestamp for an opportunity. The date field may be a
// single date ("2025-01-10") or a range ("2025-07-21 - 2025-08-25"), so we sort
// on the start date and fall back to the expiration date.
const getSortTime = (volunteer) => {
  const startDate = (volunteer.date || "").trim().split(/\s*-\s*(?=\d{4})/)[0].trim();
  const parsed = parseDate(startDate) || parseDate(volunteer.expirationDate);
  return parsed && !isNaN(parsed.getTime()) ? parsed.getTime() : 0;
};

// Function to categorize volunteers based on their status
const categorizeVolunteers = () => {
  const categorized = {
    open: [],
    upcoming: [],
    past: []
  };

  volunteerData.forEach(volunteer => {
    const status = getVolunteerStatus(volunteer);
    categorized[status].push(volunteer);
  });

  // Newest to oldest within each section
  Object.values(categorized).forEach(section => {
    section.sort((a, b) => getSortTime(b) - getSortTime(a));
  });

  return categorized;
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Check if expiration is soon (within 7 days)
const isExpiringSoon = (dateString) => {
  if (!dateString) return false;
  const expirationDate = parseDate(dateString);
  const today = getTodayDate();
  const sevenDaysFromNow = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));
  return expirationDate <= sevenDaysFromNow && expirationDate >= today;
};

// The status pill and button label of each section, with the Badge tone
const getSectionConfig = (section) => {
  const configs = {
    open: {
      statusText: 'OPEN NOW',
      buttonText: 'Sign Up Now',
      tone: 'success'
    },
    upcoming: {
      statusText: 'UPCOMING',
      buttonText: 'Registration Opens Soon',
      tone: 'info'
    },
    past: {
      statusText: 'COMPLETED',
      buttonText: 'Event Details',
      tone: 'neutral'
    }
  };
  return configs[section];
};

// What a section shows when it has no opportunities
const emptyMessages = {
  open: {
    title: "No Open Opportunities Right Now",
    subtitle: "We're planning some amazing volunteer experiences! Please check back soon for new opportunities to make a difference in your community.",
    icon: VolunteerActivismRoundedIcon
  },
  upcoming: {
    title: "No Upcoming Events Scheduled",
    subtitle: "New volunteer opportunities are in the works! Follow us on social media or check back regularly for exciting events on the horizon.",
    icon: HourglassTopRoundedIcon
  },
  past: {
    title: "Building Our Impact History",
    subtitle: "This is where we'll showcase all the incredible work we've accomplished together. Stay tuned as we grow our community impact!",
    icon: CheckCircleRoundedIcon
  }
};

// Names for the icon-only rows, read by assistive technology only
const rowNames = { calendar: "Date", clock: "Time", place: "Location" };

const volunteerShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  formUrl: PropTypes.string,
  category: PropTypes.string,
  skillLevel: PropTypes.string,
  volunteersNeeded: PropTypes.number,
  totalParticipants: PropTypes.number,
  duration: PropTypes.string,
  coordinator: PropTypes.string,
  registrationStartDate: PropTypes.string,
  expirationDate: PropTypes.string,
});

const SECTIONS = ["open", "upcoming", "past"];

function VolunteerCard({ volunteer, section }) {
  const config = getSectionConfig(section);
  const expiringSoon = section === 'open' && Boolean(volunteer.expirationDate) && isExpiringSoon(volunteer.expirationDate);
  const registrationClosed = section === 'upcoming' || section === 'past' || !volunteer.formUrl;
  const showSkillLevel = (section === 'open' || section === 'upcoming') && Boolean(volunteer.skillLevel);

  const details = [
    { icon: <EventRoundedIcon />, label: rowNames.calendar, hideLabel: true, value: volunteer.date },
    { icon: <ScheduleRoundedIcon />, label: rowNames.clock, hideLabel: true, value: volunteer.time },
    { icon: <LocationOnRoundedIcon />, label: rowNames.place, hideLabel: true, value: volunteer.location },
    { icon: <TimerRoundedIcon />, label: "Duration:", value: volunteer.duration },
    // Expiration date for open events
    section === 'open' && volunteer.expirationDate
      ? {
          icon: <TodayRoundedIcon />,
          label: "Registration Closes:",
          value: expiringSoon ? (
            <Box component="span" sx={(theme) => ({ color: theme.vars.palette.warning.main, fontWeight: 600 })}>
              {formatDate(volunteer.expirationDate)}
            </Box>
          ) : (
            formatDate(volunteer.expirationDate)
          ),
        }
      : null,
    // For open and upcoming events - show volunteers needed and coordinator
    section === 'open' || section === 'upcoming'
      ? { icon: <PeopleRoundedIcon />, label: "Volunteers Needed", value: volunteer.volunteersNeeded }
      : null,
    section === 'open' || section === 'upcoming'
      ? { icon: <StarRoundedIcon />, label: "Coordinator", value: volunteer.coordinator }
      : null,
    // For past events - show total participants and coordinator
    section === 'past'
      ? { icon: <PeopleRoundedIcon />, label: "Total Participants", value: `${volunteer.totalParticipants || volunteer.volunteersNeeded}+` }
      : null,
    section === 'past' ? { icon: <StarRoundedIcon />, label: "Coordinated by:", value: volunteer.coordinator } : null,
  ].filter(Boolean);

  return (
    <FeatureCard
      spotlight
      eyebrow={volunteer.category}
      title={volunteer.title}
      badge={
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Badge tone={config.tone}>{config.statusText}</Badge>
          {showSkillLevel && <Badge tone="neutral">{volunteer.skillLevel}</Badge>}
          {expiringSoon && <Badge tone="warning">EXPIRING SOON!</Badge>}
        </Box>
      }
      footer={
        <ActionButton
          fullWidth
          variant={registrationClosed ? "outlined" : "contained"}
          disabled={registrationClosed}
          href={registrationClosed ? undefined : volunteer.formUrl}
          external
          endIcon={<LaunchRoundedIcon />}
        >
          {config.buttonText}
        </ActionButton>
      }
    >
      <MetaList items={details} dense />
      <Typography variant="body2" sx={{ textWrap: "pretty" }}>
        {volunteer.description}
      </Typography>
    </FeatureCard>
  );
}

VolunteerCard.propTypes = {
  volunteer: volunteerShape.isRequired,
  section: PropTypes.oneOf(SECTIONS).isRequired,
};

function VolunteerSection({ volunteers, section, title, subtitle, variant = "page" }) {
  if (volunteers.length === 0) {
    const message = emptyMessages[section];
    const EmptyIcon = message.icon;

    return (
      <Section variant={variant} size="sm">
        <Reveal>
          <Surface
            tone="paper"
            padding={{ xs: 3, md: 5 }}
            sx={{ maxWidth: 720, mx: "auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1.5 }}
          >
            <IconWell tone="tint" size="lg" round sx={{ mb: 1 }}>
              <EmptyIcon />
            </IconWell>
            <Typography variant="h4" component="h2" sx={{ textWrap: "balance" }}>
              {message.title}
            </Typography>
            <Typography variant="body1" sx={(theme) => ({ color: theme.vars.palette.text.secondary, maxWidth: 520, textWrap: "pretty" })}>
              {message.subtitle}
            </Typography>
            {section === 'open' && (
              <Typography variant="body2" sx={(theme) => ({ color: theme.vars.palette.text.secondary, pt: 1 })}>
                In the meantime, check out our upcoming events below! ⬇️
              </Typography>
            )}
          </Surface>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section variant={variant}>
      <SectionHeading title={title} lead={subtitle} align="center" />
      <FeatureGrid>
        {volunteers.map((volunteer) => (
          <VolunteerCard key={volunteer.id} volunteer={volunteer} section={section} />
        ))}
      </FeatureGrid>
    </Section>
  );
}

VolunteerSection.propTypes = {
  volunteers: PropTypes.arrayOf(volunteerShape).isRequired,
  section: PropTypes.oneOf(SECTIONS).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["page", "sunken", "paper", "tint"]),
};

export default function VolunteerOpportunities() {
  const categorizedData = categorizeVolunteers();

  const stats = [
    { icon: <VolunteerActivismRoundedIcon />, value: categorizedData.open.length, label: "Current Events" },
    { icon: <HourglassTopRoundedIcon />, value: categorizedData.upcoming.length, label: "Upcoming Events" },
    { icon: <FavoriteRoundedIcon />, value: "200+", label: "Lives Impacted", tone: "accent" },
  ];

  return (
    <>
      <Seo title={PAGE_TITLE} description={PAGE_LEAD} />

      {/* Page Header */}
      <PageIntro title={PAGE_TITLE} lead={PAGE_LEAD}>
        <Box sx={{ width: "100%", pt: { xs: 2, md: 3 } }}>
          <StatRow items={stats} align="center" columns={{ xs: 3 }} />
        </Box>
      </PageIntro>

      {/* Open Opportunities */}
      <VolunteerSection
        volunteers={categorizedData.open}
        section="open"
        title="Open Opportunities"
        subtitle="These events are currently open for registration. Sign up today to reserve your spot and make an impact!"
        variant="page"
      />

      {/* Upcoming Opportunities */}
      <VolunteerSection
        volunteers={categorizedData.upcoming}
        section="upcoming"
        title="Upcoming Opportunities"
        subtitle="Get a sneak peek at the exciting volunteer opportunities coming soon. Mark your calendars and stay ready!"
        variant="sunken"
      />

      {/* Past Opportunities */}
      <VolunteerSection
        volunteers={categorizedData.past}
        section="past"
        title="Past Events"
        subtitle="Take a look back at the amazing events and initiatives we’ve completed together."
        variant="page"
      />
    </>
  );
}
