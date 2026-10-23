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
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
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

// Page copy. The lead keeps the quotation marks the original rendered; the
// Seo description is the same sentence without them.
const PAGE_TITLE = "Events & Programs";
const PAGE_LEAD = `"Join our community outreach initiatives! Explore our current events, upcoming programs, and see the incredible impact we've made together in our community."`;
const PAGE_DESCRIPTION = PAGE_LEAD.slice(1, -1);

// Sample events data with expiration dates and registration start dates
const eventsData = [
  {
    id: 6,
    title: "Spring into Game Development: Kids Coding Workshop",
    date: "2026-03-18 ",
    time: "4:00 PM - 5:30 PM",
    location: "Syosset Public Library",
    description: " Join us for a fun hands-on workshop where children will learn the basics of game development by using Scratch to create a Spring-themed game!\n\n*Register directly on the Syosset Library website below.",
    formUrl: "https://syosset.librarycalendar.com/events/month/2026/03",
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
    description: "Calling all young storytellers! Join us at our cozy winter literature workshop to learn the components of a story and turn your ideas into stories worth saving.",
    formUrl: "https://forms.gle/xr8DBYPEGybZbYxN7",
    category: "Literature",
    volunteersNeeded: 30,
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
    description: "Get creative this winter at our fun-filled crafts event! We'll have all the materials you need to make a 3D snowman and snowflakes.",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf6FGGIfX3Xe7yK-MwdC-Y2wm2ysWjRbzxxIxid-oIF-WWDzw/viewform?usp=dialog",
    category: "Arts and Craft",
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
    description: "Come and join us for a day full of surprises! We will have an educational scavenger hunt and fun field game, there will be prizes!",
    formUrl: "https://forms.gle/KzTLV8EsQaMccSmdA",
    category: "Scavenger Hunt",
    totalParticipants: 30,
    duration: "1.5 hours",
    coordinator: "Enlighten Learning",
    registrationStartDate: "2025-04-01",
    expirationDate: "2025-04-18", // Past event
  },
  {
    id: 3,
    title: "Summer Volleyball Clinic",
    date: "2025-07-21 - 2025-08-25",
    time: "10:30 AM - 12:00 PM",
    location: "Park Circle",
    description: "Looking to stay active this summer? Join our volleyball clinic! Whether you're a beginner or need to brush up on your skills, you'll learn fundamentals and play games in a fun environment.",
    formUrl: "https://forms.gle/gUzvfJNfhUzqJrxp7",
    category: "Volleyball",
    totalParticipants: 20,
    duration: "1.5 hours",
    coordinator: "Enlighten Learning",
    registrationStartDate: "2025-07-01",
    expirationDate: "2025-07-21", // Past event
  },
  {
    id: 4,
    title: "Back to School Kickoff Fundraiser",
    date: "2025-08-22",
    time: "12:30 PM - 2:30 PM",
    location: "Park Circle",
    description: "Kickoff the new school year with fun, food and friends! Support our fundraiser for charity by purchasing food and beverages and enjoy some open court volleyball.",
    formUrl: "",
    category: "Fundraiser",
    totalParticipants: 20,
    duration: "2 hours",
    coordinator: "Enlighten Learning",
    registrationStartDate: "2025-07-01",
    expirationDate: "2025-08-22", // Past event
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

// Function to determine the status of an event
const getEventStatus = (event) => {
  const today = getTodayDate();
  const expirationDate = parseDate(event.expirationDate);
  const registrationStartDate = parseDate(event.registrationStartDate);

  // If expiration date has passed, it's a past event
  if (expirationDate && expirationDate < today) {
    return 'past';
  }

  // If there's a registration start date and it hasn't arrived yet, it's upcoming
  if (registrationStartDate && registrationStartDate > today) {
    return 'future';
  }

  // Otherwise, it's current/open
  return 'current';
};

// Returns a sortable timestamp for an event. The date field may be a single
// date ("2025-01-10") or a range ("2025-07-21 - 2025-08-25"), so we sort on the
// start date and fall back to the expiration date.
const getSortTime = (event) => {
  const startDate = (event.date || "").trim().split(/\s*-\s*(?=\d{4})/)[0].trim();
  const parsed = parseDate(startDate) || parseDate(event.expirationDate);
  return parsed && !isNaN(parsed.getTime()) ? parsed.getTime() : 0;
};

// Function to categorize events based on their status
const categorizeEvents = () => {
  const categorized = {
    current: [],
    future: [],
    past: []
  };

  eventsData.forEach(event => {
    const status = getEventStatus(event);
    categorized[status].push(event);
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
    current: {
      statusText: 'HAPPENING NOW',
      buttonText: 'Join Now',
      tone: 'success'
    },
    future: {
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

// What a section shows when it has no events
const emptyMessages = {
  current: {
    title: "No Current Events",
    subtitle: "We're planning some amazing events! Please check back soon for new opportunities to get involved in your community.",
    icon: PlayCircleRoundedIcon
  },
  future: {
    title: "No Upcoming Events Scheduled",
    subtitle: "New events are in the works! Follow us on social media or check back regularly for exciting events on the horizon.",
    icon: HourglassTopRoundedIcon
  },
  past: {
    title: "Building Our Event History",
    subtitle: "This is where we'll showcase all the incredible events we've hosted together. Stay tuned as we grow our community impact!",
    icon: CheckCircleRoundedIcon
  }
};

// Names for the icon-only rows, read by assistive technology only
const rowNames = { calendar: "Date", clock: "Time", place: "Location" };

const eventShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  formUrl: PropTypes.string,
  category: PropTypes.string,
  volunteersNeeded: PropTypes.number,
  totalParticipants: PropTypes.number,
  duration: PropTypes.string,
  coordinator: PropTypes.string,
  registrationStartDate: PropTypes.string,
  expirationDate: PropTypes.string,
});

const SECTIONS = ["current", "future", "past"];

function EventCard({ event, section }) {
  const config = getSectionConfig(section);
  const expiringSoon = section === 'current' && Boolean(event.expirationDate) && isExpiringSoon(event.expirationDate);
  const registrationClosed = section === 'future' || section === 'past' || !event.formUrl;

  const details = [
    { icon: <EventRoundedIcon />, label: rowNames.calendar, hideLabel: true, value: event.date },
    { icon: <ScheduleRoundedIcon />, label: rowNames.clock, hideLabel: true, value: event.time },
    { icon: <LocationOnRoundedIcon />, label: rowNames.place, hideLabel: true, value: event.location },
    { icon: <TimerRoundedIcon />, label: "Duration:", value: event.duration },
    // Expiration date for current events
    section === 'current' && event.expirationDate
      ? {
          icon: <TodayRoundedIcon />,
          label: "Registration Closes:",
          value: expiringSoon ? (
            <Box component="span" sx={(theme) => ({ color: theme.vars.palette.warning.main, fontWeight: 600 })}>
              {formatDate(event.expirationDate)}
            </Box>
          ) : (
            formatDate(event.expirationDate)
          ),
        }
      : null,
    // For current and future events - show expected participants and coordinator
    section === 'current' || section === 'future'
      ? { icon: <PeopleRoundedIcon />, label: "Expected", value: `${event.totalParticipants}+` }
      : null,
    section === 'current' || section === 'future'
      ? { icon: <StarRoundedIcon />, label: "Coordinator", value: event.coordinator }
      : null,
    // For past events - show total participants and coordinator
    section === 'past' ? { icon: <PeopleRoundedIcon />, label: "Total Participants", value: `${event.totalParticipants}+` } : null,
    section === 'past' ? { icon: <StarRoundedIcon />, label: "Coordinated by:", value: event.coordinator } : null,
  ].filter(Boolean);

  return (
    <FeatureCard
      spotlight
      eyebrow={event.category}
      title={event.title}
      badge={
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Badge tone={config.tone}>{config.statusText}</Badge>
          {expiringSoon && <Badge tone="warning">EXPIRING SOON!</Badge>}
        </Box>
      }
      footer={
        <ActionButton
          fullWidth
          variant={registrationClosed ? "outlined" : "contained"}
          disabled={registrationClosed}
          href={registrationClosed ? undefined : event.formUrl}
          external
          endIcon={<LaunchRoundedIcon />}
        >
          {config.buttonText}
        </ActionButton>
      }
    >
      <MetaList items={details} dense />
      <Typography variant="body2" sx={{ whiteSpace: "pre-line", textWrap: "pretty" }}>
        {event.description}
      </Typography>
    </FeatureCard>
  );
}

EventCard.propTypes = {
  event: eventShape.isRequired,
  section: PropTypes.oneOf(SECTIONS).isRequired,
};

function EventSection({ events, section, title, subtitle, variant = "page" }) {
  if (events.length === 0) {
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
            {section === 'current' && (
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
        {events.map((event) => (
          <EventCard key={event.id} event={event} section={section} />
        ))}
      </FeatureGrid>
    </Section>
  );
}

EventSection.propTypes = {
  events: PropTypes.arrayOf(eventShape).isRequired,
  section: PropTypes.oneOf(SECTIONS).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["page", "sunken", "paper", "tint"]),
};

export default function EventsProgram() {
  const categorizedData = categorizeEvents();

  const stats = [
    { icon: <PlayCircleRoundedIcon />, value: categorizedData.current.length, label: "Current Events" },
    { icon: <HourglassTopRoundedIcon />, value: categorizedData.future.length, label: "Upcoming Events" },
    { icon: <FavoriteRoundedIcon />, value: "200+", label: "Lives Impacted", tone: "accent" },
  ];

  return (
    <>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />

      {/* Page Header */}
      <PageIntro title={PAGE_TITLE} lead={PAGE_LEAD}>
        <Box sx={{ width: "100%", pt: { xs: 2, md: 3 } }}>
          <StatRow items={stats} align="center" columns={{ xs: 3 }} />
        </Box>
      </PageIntro>

      {/* Current Events Section */}
      <EventSection
        events={categorizedData.current}
        section="current"
        title="Happening Now"
        subtitle="Don't miss out! These events are currently accepting registrations and looking for passionate volunteers."
        variant="page"
      />

      {/* Upcoming Events Section */}
      <EventSection
        events={categorizedData.future}
        section="future"
        title="Coming Soon"
        subtitle="Get ready for these exciting upcoming events! Registration will open soon, so mark your calendars."
        variant="sunken"
      />

      {/* Past Events Section */}
      <EventSection
        events={categorizedData.past}
        section="past"
        title="Our Impact"
        subtitle="Celebrate the amazing work we've accomplished together! See the positive change we've created in our community."
        variant="page"
      />
    </>
  );
}
