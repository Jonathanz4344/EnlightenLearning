import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TeamIcon from "@mui/icons-material/GroupsRounded";
import AcademicsIcon from "@mui/icons-material/SchoolRounded";
import DesignIcon from "@mui/icons-material/DesignServicesRounded";
import PRIcon from "@mui/icons-material/CampaignRounded";
import FinanceIcon from "@mui/icons-material/AccountBalanceRounded";
import OutreachIcon from "@mui/icons-material/ConnectWithoutContactRounded";
import VolunteerIcon from "@mui/icons-material/VolunteerActivismRounded";
import SecretaryIcon from "@mui/icons-material/AssignmentRounded";
import JoinIcon from "@mui/icons-material/PersonAddRounded";
import LaunchIcon from "@mui/icons-material/LaunchRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";
import {
  Seo,
  Section,
  PageIntro,
  SectionHeading,
  FeatureGrid,
  FeatureCard,
  CheckList,
  StatRow,
  Surface,
  Badge,
  IconWell,
  ActionButton,
} from "../../kit";
import { Reveal } from "../../motion";

// The application form, opened in a new tab from every apply button
const APPLY_FORM_URL = "https://forms.gle/JVqaueQjwRexzNjz8";

// Page copy, kept word for word
const copy = {
  title: "Enlighten Learning Executive Board",
  description:
    "Ready to make a real difference? Join our passionate team of student leaders. Together, we're dedicated to raising funds for charities that provide hope, care, and support, impacting countless lives.",
  why: { title: "Why Join Our Executive Board?" },
};

// Executive Board Positions Data
const execPositions = [
  {
    id: 1,
    title: "President",
    maxPositions: 1, // NEW: Number of available positions
    description: "Serves as the chief leader of the organization, overseeing all departments and ensuring smooth coordination between board members. Provides guidance to Heads, Directors, and Coordinators to help them achieve their goals, while maintaining the overall vision and mission of the organization. Represents the organization in official capacities and fosters partnerships to further its growth and impact.",
    icon: TeamIcon,
    responsibilities: [
      "Oversee all executive members",
      "Ensure alignment with organizational mission and goals",
      "Facilitate cross-department communication and collaboration",
      "Provide strategic guidance and support to all positions",
      "Lead board meetings and set organizational priorities"
    ],
    currentMembers: [{ name: "Brianna Tam", avatar: "BT" }],
    category: "Leadership"
  },
  {
    id: 2,
    title: "Head of Academics",
    maxPositions: 2, // NEW: Multiple positions available
    description: "Works with Head of Tutoring Services coordinating the quality and effectiveness of the tutoring program by guiding and training tutors, and ensuring consistent academic standards. Additionally, plan and conduct educational workshops to support student learning.",
    icon: AcademicsIcon,
    responsibilities: [
      "Tutor guidance and training",
      "Oversight of academic quality across tutoring program",
      "Assist the Head of Tutoring Services ",
      "Educational workshop planning and execution"
    ],
    currentMembers: [{ name: "Anna Zou", avatar: "AZ" }, { name: "Aarini Chakraborty", avatar: "AC" }],
    category: "Academic"
  },
  {
    id: 3,
    title: "Head of Design",
    maxPositions: 2, // NEW: Multiple positions available
    description: "Oversees PR officers and in charge of all aspects related to design and social media. Including, creating social media content and posting it to our socials. As well as sending out our posts and communicating with other organizations.",
    icon: DesignIcon,
    responsibilities: [
      "Oversee PR officers",
      "Design and social media management",
      "Content creation and posting",
      "Inter-organizational communication"
    ],
    currentMembers: [
      { name: "Tiffany Qi", avatar: "TQ" }, { name: "Veronica Chung", avatar: "VC" }
    ],
    category: "Marketing"
  },
  {
    id: 4,
    title: "Public Relations Officer",
    maxPositions: 2, // NEW: 2 positions available, currently 0 filled
    description: "Assist the Head of Design in creating social media content and posting it to our socials, managing social media accounts in general and communicating with other organizations.",
    icon: PRIcon,
    responsibilities: [
      "Account management",
      "Design and social media management",
      "Content creation and posting",
      "Inter-organizational communication"
    ],
    currentMembers: [
      // Empty - all 3 positions are open
    ],
    category: "Marketing"
  },
  {
    id: 5,
    title: "Director of Finance and Tutoring Services",
    maxPositions: 1, // NEW: Single position
    description: "Oversees all financial operations, which includes discussing program fees with families managing charity donations, and ensuring accurate financial records. Because financial planning is closely integrated with the operation of the tutoring program, this role also manages tutor-student pairing and recruitment, and the overall coordination of the Tutoring Program.",
    icon: FinanceIcon,
    responsibilities: [
      "Recordkeeping of finances",
      "Charity donation management",
      "Discuss program fees with families",
      "Oversees the Tutoring Program"
    ],
    currentMembers: [
      { name: "Brianna Tam", avatar: "BT" }
    ],
    category: "Operations"
  },
  // {
  //     id: 6,
  //     title: "Programs Director",
  //     maxPositions: 1, // NEW: Single position, currently open
  //     description: "Plans and executes special events; including agenda development, collaboration with relevant board members or other organizations and communicating with facilities to rent their space to host the event.",
  //     icon: ProgramsIcon,
  //     responsibilities: [
  //         "Special event planning and execution",
  //         "Agenda development",
  //         "Cross-team collaboration",
  //         "Facility coordination and rental"
  //     ],
  //     currentMembers: [],
  //     category: "Development"
  // },
  {
    id: 7,
    title: "Outreach Coordinator",
    maxPositions: 3, // NEW: 3 positions available, 1 filled
    description: "In charge of expanding the organization and spreading our mission. As well as planning and executing special events. Essentially the individual responsible for overseeing and promoting our tutoring program, events, opportunities, etc, in that area.",
    icon: OutreachIcon,
    responsibilities: [
      "Mission promotion",
      "Organizational expansion and recruitment",
      "Special event planning and execution",
      "Facilitate communication with public facilities"
    ],
    currentMembers: [
      { name: "Tiffany Zhou", avatar: "TZ" },
      { name: "Lauren Chen", avatar: "LC" }
    ],
    category: "Development"
  },
  {
    id: 8,
    title: "Volunteer Coordinator",
    maxPositions: 1, // NEW: Single position
    description: "In charge of volunteer-related tasks (hours tracking, board attendance, etc.). Responsible for daily volunteer recruitment, including communicating with public facilities and utilizing promotional materials to facilitate community engagement.",
    icon: VolunteerIcon,
    responsibilities: [
      "Volunteer hours tracking and certificates",
      "Track board attendance",
      "Daily recruitment activities",
      "Facilitate communication with public facilities"
    ],
    currentMembers: [
      { name: "Eileen Liang", avatar: "EL" }
    ],
    category: "Development"
  },
  {
    id: 9,
    title: "Secretary",
    maxPositions: 1, // NEW: Single position
    description: "Take meeting notes for board meetings and help with general organization and management of board members (assignments, coordination, etc.). Additionally, update members on what happened at each meeting, their tasks for the week, and assist with outreach efforts to support organizational goals.",
    icon: SecretaryIcon,
    responsibilities: [
      "Meeting documentation",
      "Board member organization",
      "Weekly updates and task management",
      "Assist with outreach initiatives",
    ],
    currentMembers: [
      { name: "Lauren Chen", avatar: "LC" }
    ],
    category: "Operations"
  },
];

// NEW: Function to automatically determine position status
const getPositionStatus = (position) => {
  const currentMembersCount = position.currentMembers.length;
  const maxPositions = position.maxPositions;

  if (currentMembersCount >= maxPositions) {
    return 'closed'; // Position is filled
  } else {
    return 'open'; // Position has openings
  }
};

// NEW: Function to check if position has multiple openings
const hasMultipleOpenings = (position) => {
  return position.maxPositions > 1;
};

// Helper function to get status configuration. Each status maps to a Badge
// tone instead of its own color.
const getStatusConfig = (status) => {
  const configs = {
    open: {
      tone: 'success',
      label: 'OPEN - APPLY NOW',
      buttonText: 'Apply for Position',
      buttonEnabled: true
    },
    closed: {
      tone: 'neutral',
      label: 'POSITION FILLED',
      buttonText: 'Position Filled',
      buttonEnabled: false
    },
    filled: {
      tone: 'neutral',
      label: 'CURRENTLY FILLED',
      buttonText: 'Learn More',
      buttonEnabled: false
    }
  };
  return configs[status] || configs.open;
};

// Helper function to calculate total unique active members
const getTotalActiveMembers = (positions) => {
  const uniqueMembers = new Set();

  positions.forEach(position => {
    position.currentMembers.forEach(member => {
      uniqueMembers.add(member.name);
    });
  });

  return uniqueMembers.size;
};

// NEW: Helper function to calculate total open positions
const getTotalOpenPositions = (positions) => {
  return positions.reduce((total, position) => {
    const openings = position.maxPositions - position.currentMembers.length;
    return total + Math.max(0, openings);
  }, 0);
};

// Reasons to join, each with an icon in place of the old emoji
const whyJoin = [
  {
    icon: <LightbulbRoundedIcon />,
    title: "Leadership Development",
    description: "Gain valuable leadership experience while making a direct impact on the community and those in need.",
  },
  {
    icon: <HandshakeRoundedIcon />,
    title: "Collaborative",
    description: "Work alongside passionate, like-minded individuals who share your commitment to giving back.",
  },
  {
    icon: <TrackChangesRoundedIcon />,
    title: "Community Impact",
    description: "Make a tangible difference in your community by raising money for charities that provide hope, care and support to those in need.",
  },
];

const positionShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maxPositions: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentMembers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
});

function PositionCard({ position }) {
  // NEW: Automatically determine status
  const status = getPositionStatus(position);
  const multiple = hasMultipleOpenings(position);
  const openings = position.maxPositions - position.currentMembers.length;

  const statusConfig = getStatusConfig(status);
  const IconComponent = position.icon;

  return (
    <FeatureCard
      icon={<IconComponent />}
      eyebrow={position.category}
      title={position.title}
      description={position.description}
      badge={
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 1 }}>
          {multiple && status === 'open' && <Badge tone="info">{openings} OPENINGS</Badge>}
          <Badge tone={statusConfig.tone}>{statusConfig.label}</Badge>
        </Box>
      }
      spotlight
    >
      {/* Key responsibilities */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography variant="h6" component="h4">
          Key Responsibilities:
        </Typography>
        <CheckList items={position.responsibilities} dense />
      </Box>

      {/* Team and action, held at the bottom of the card */}
      <Box sx={{ mt: "auto", pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Current members (for all positions that have them) */}
        {position.currentMembers.length > 0 && (
          <Surface tone="sunken" radius="md" padding={2}>
            <Typography variant="subtitle2" component="h4" sx={{ mb: 1.5 }}>
              Current Team Members:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {position.currentMembers.map((member) => (
                <Box key={member.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    sx={(theme) => ({
                      width: 32,
                      height: 32,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      backgroundColor: theme.vars.palette.accentText.softer,
                      color: theme.vars.palette.accentText.main,
                    })}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Surface>
        )}

        {/* "This Could Be You" for open positions only */}
        {status === 'open' && (
          <Surface
            tone="tint"
            radius="md"
            padding={2}
            sx={(theme) => ({
              borderStyle: "dashed",
              borderColor: theme.vars.palette.hairline.strong,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 0.75,
            })}
          >
            <IconWell tone="accent" size="sm" round>
              <QuestionMarkRoundedIcon />
            </IconWell>
            <Typography variant="h6" component="p">
              This Could Be You!
            </Typography>
            <Typography variant="body2" sx={(theme) => ({ color: theme.vars.palette.text.secondary })}>
              {openings === 1
                ? "Join our team and make a difference"
                : `${openings} positions available - join our team!`
              }
            </Typography>
          </Surface>
        )}

        {statusConfig.buttonEnabled ? (
          <ActionButton href={APPLY_FORM_URL} external fullWidth endIcon={<LaunchIcon />}>
            {statusConfig.buttonText}
          </ActionButton>
        ) : (
          <ActionButton variant="outlined" color="inherit" fullWidth disabled>
            {statusConfig.buttonText}
          </ActionButton>
        )}
      </Box>
    </FeatureCard>
  );
}

PositionCard.propTypes = {
  position: positionShape.isRequired,
};

// A band of position cards with its heading. Renders nothing when the list is empty.
function PositionSection({ positions, title, lead, icon, variant = "page", columns }) {
  if (positions.length === 0) return null;

  return (
    <Section variant={variant}>
      <Reveal>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <IconWell tone="tint" size="lg" round>
            {icon}
          </IconWell>
        </Box>
      </Reveal>
      <SectionHeading title={title} lead={lead} align="center" />
      <FeatureGrid columns={columns} gap={3}>
        {positions.map((position) => (
          <PositionCard key={position.id} position={position} />
        ))}
      </FeatureGrid>
    </Section>
  );
}

PositionSection.propTypes = {
  positions: PropTypes.arrayOf(positionShape).isRequired,
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(["page", "sunken", "paper", "tint", "ink"]),
  columns: PropTypes.object,
};

export default function ExecTeam() {
  // NEW: Automatically categorize positions based on their current status
  const positionsWithStatus = execPositions.map(position => ({
    ...position,
    status: getPositionStatus(position),
    multiple: hasMultipleOpenings(position)
  }));

  const openPositions = positionsWithStatus.filter(pos => pos.status === 'open');
  const filledPositions = positionsWithStatus.filter(pos => pos.status === 'closed' || pos.status === 'filled');

  // Calculate total active members and open positions dynamically
  const totalActiveMembers = getTotalActiveMembers(execPositions);
  const totalOpenPositions = getTotalOpenPositions(execPositions);

  const quickStats = [
    { value: totalOpenPositions, label: "Open Positions", tone: "accent" },
    { value: totalActiveMembers, label: "Active Members" },
    { value: execPositions.length, label: "Board Roles" },
  ];

  return (
    <>
      <Seo
        title="Join the Executive Team"
        description="Join our passionate team of student leaders. Together, we're dedicated to raising funds for charities that provide hope, care, and support, impacting countless lives."
      />

      {/* Page header with the quick stats */}
      <PageIntro title={copy.title} lead={copy.description}>
        <Reveal delay={0.14} y={12}>
          <Box sx={{ width: "100%", maxWidth: 640, pt: 2 }}>
            <StatRow items={quickStats} columns={{ xs: 3 }} align="center" />
          </Box>
        </Reveal>
      </PageIntro>

      {/* Open positions */}
      <PositionSection
        positions={openPositions}
        title="Open Positions"
        lead="Ready to make an impact? These positions are currently seeking passionate candidates who want to drive positive change in our community."
        icon={<JoinIcon />}
        variant="paper"
        columns={{ xs: 1, md: 2 }}
      />

      {/* Current team */}
      <PositionSection
        positions={filledPositions}
        title="Meet Our Team"
        lead="Get to know the dedicated individuals currently leading our organization and the important work they do."
        icon={<TeamIcon />}
        columns={{ xs: 1, sm: 2, md: 3 }}
      />

      {/* Why join */}
      <Section variant="tint">
        <SectionHeading title={copy.why.title} align="center" />
        <FeatureGrid columns={{ xs: 1, md: 3 }} gap={3}>
          {whyJoin.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} align="center" spotlight />
          ))}
        </FeatureGrid>
        <Reveal>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 2, pt: { xs: 5, md: 7 } }}>
            <ActionButton href={APPLY_FORM_URL} external size="large" magnetic endIcon={<LaunchIcon />}>
              Apply Now
            </ActionButton>
            <Typography variant="body2" sx={(theme) => ({ color: theme.vars.palette.text.secondary })}>
              Applications are reviewed on a rolling basis
            </Typography>
          </Box>
        </Reveal>
      </Section>
    </>
  );
}
