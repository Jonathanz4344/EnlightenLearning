import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/PersonRounded";
import StarIcon from "@mui/icons-material/StarRounded";
import GroupIcon from "@mui/icons-material/GroupRounded";
import CelebrationIcon from "@mui/icons-material/CelebrationRounded";
import VolunteerIcon from "@mui/icons-material/VolunteerActivismRounded";
import SchoolIcon from "@mui/icons-material/SchoolRounded";
import CampaignIcon from "@mui/icons-material/CampaignRounded";
import DesignIcon from "@mui/icons-material/PaletteRounded";
import PublicIcon from "@mui/icons-material/PublicRounded";
import AdminIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import PsychologyIcon from "@mui/icons-material/PsychologyRounded";
import AssignmentIcon from "@mui/icons-material/AssignmentRounded";
import MoneyIcon from "@mui/icons-material/MonetizationOnRounded";
import EventIcon from "@mui/icons-material/EventRounded";
import AutoStoriesIcon from "@mui/icons-material/AutoStoriesRounded";
import { TUTORING_SESSIONS, TOTAL_RAISED_DISPLAY } from "../../constants/metrics";
import PathConstants from "../../routes/pathConstants";
import Aarini from "/images/ourTeam/Aarini.jpg"
import Anna from "/images/ourTeam/Anna.JPG"
import Brianna from "/images/ourTeam/Brianna.jpg"
import Eileen from "/images/ourTeam/Eileen.png"
import Lauren from "/images/ourTeam/Lauren.PNG"
import TiffanyZ from "/images/ourTeam/TiffanyZ.png"
import Veronica from "/images/ourTeam/Veronica.png"
import TiffanyQ from "/images/ourTeam/TiffanyQ.jpeg"
import {
  Seo,
  Section,
  PageIntro,
  SectionHeading,
  FeatureGrid,
  FeatureCard,
  CTABand,
  StatRow,
  Prose,
  IconWell,
  PersonCard,
  ActionButton,
} from "../../kit";
import { Reveal, Stagger, StaggerItem } from "../../motion";

// Page copy, kept word for word
const copy = {
  title: "Meet Our Team",
  subtitle: "Passionate students changing the world",
  description:
    "Our diverse team of dedicated high school students bring together unique talents, perspectives, and unwavering commitment to giving back to those in need and providing quality education to the community. Each member plays a vital role in our mission to learn with joy, give with passion, and change the world.",
  stats: { title: "Our Team Impact" },
  team: {
    title: "Our Amazing Team Members",
    subtitle: "Each team member brings unique skills, passion, and dedication to our mission",
  },
  join: {
    title: "This Could Be You!",
    description: "Join our passionate team of student leaders and make a difference in education.",
    cta: "Apply Now",
  },
  cta: {
    title: "Want to Join Our Team?",
    description:
      "We're always looking for passionate, dedicated students who want to make a difference in the world. Whether you're interested in tutoring, design, outreach, or leadership, there's a place for you on our team. Join us in our mission to create a brighter tomorrow!",
    cta: "Volunteer With Us",
  },
};

// Team members data. The icon stands in when a member has no portrait.
const teamMembers = [
  {
    id: 1,
    name: "Brianna Tam",
    roles: ["Founder & President"," Director of Finance and Tutoring Services"],
    icon: AdminIcon,
    image: Brianna,
  },
  {
    id: 2,
    name: "Tiffany Qi",
    roles: ["Head of Design"],
    icon: DesignIcon,
    image: TiffanyQ,
  },
  {
    id: 3,
    name: "Veronica Chung",
    roles: ["Head of Design"],
    icon: PublicIcon,
    image: Veronica,
  },
  {
    id: 4,
    name: "Eileen Liang",
    roles: ["Volunteer Coordinator"],
    icon: VolunteerIcon,
    image: Eileen,
  },
  {
    id: 5,
    name: "Tiffany Zhou",
    roles: ["Outreach Coordinator"],
    icon: CampaignIcon,
    image: TiffanyZ,
  },
  {
    id: 6,
    name: "Anna Zou",
    roles: ["Head of Academics"],
    icon: SchoolIcon,
    image: Anna,
  },
  {
    id: 7,
    name: "Aarini Chakraborty",
    roles: ["Head of Academics"],
    icon: PsychologyIcon,
    image: Aarini,
  },
  {
    id: 8,
    name: "Lauren Chen",
    roles: ["Secretary", "Outreach Coordinator"],
    icon: AssignmentIcon,
    image: Lauren,
  }
];

// Team stats
const teamStats = [
  { icon: <EventIcon />, value: `${TUTORING_SESSIONS}+`, label: "Sessions Taught" },
  { icon: <AutoStoriesIcon />, value: "200+", label: "Lives Impacted" },
  { icon: <GroupIcon />, value: "30+", label: "Active Volunteers" },
  { icon: <MoneyIcon />, value: TOTAL_RAISED_DISPLAY, label: "Raised for Charity" },
];

// Marks under the intro
const heroMarks = [
  { icon: <GroupIcon />, tone: "tint" },
  { icon: <StarIcon />, tone: "metallic" },
  { icon: <PersonIcon />, tone: "tint" },
  { icon: <CelebrationIcon />, tone: "season" },
];

export default function OurTeam() {
  return (
    <>
      <Seo
        title={copy.title}
        description="Our diverse team of dedicated high school students bring together unique talents, perspectives, and unwavering commitment to giving back to those in need and providing quality education to the community."
      />

      {/* Hero */}
      <PageIntro title={copy.title}>
        <Reveal delay={0.08} y={16}>
          <Typography variant="h4" component="p" sx={(theme) => ({ color: theme.vars.palette.accentText.main, textWrap: "balance" })}>
            {copy.subtitle}
          </Typography>
        </Reveal>
        <Reveal delay={0.14} y={16}>
          <Prose size="lead" sx={(theme) => ({ color: theme.vars.palette.text.secondary, mx: "auto" })}>
            <p>{copy.description}</p>
          </Prose>
        </Reveal>
        <Reveal delay={0.2} y={10}>
          <Stagger sx={{ display: "flex", gap: 1.25, justifyContent: "center", pt: 1 }} gap={0.08}>
            {heroMarks.map((mark, i) => (
              <StaggerItem key={i}>
                <IconWell tone={mark.tone} size="md">
                  {mark.icon}
                </IconWell>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </PageIntro>

      {/* Team stats */}
      <Section variant="paper">
        <SectionHeading title={copy.stats.title} align="center" />
        <StatRow items={teamStats} align="center" />
      </Section>

      {/* Team members */}
      <Section>
        <SectionHeading title={copy.team.title} lead={copy.team.subtitle} align="center" />
        <FeatureGrid columns={{ xs: 1, sm: 2, md: 3 }} gap={3}>
          {teamMembers.map((member) => {
            const Icon = member.icon;
            return <PersonCard key={member.id} name={member.name} roles={member.roles} image={member.image} icon={<Icon />} />;
          })}

          {/* Join us card */}
          <FeatureCard
            key="join"
            icon={<PersonIcon />}
            title={copy.join.title}
            description={copy.join.description}
            align="center"
            sx={{ "& > *": { justifyContent: "center" } }}
          >
            <Box sx={{ pt: 0.5 }}>
              <ActionButton to={PathConstants.EXEC_TEAM} endIcon={<GroupIcon />}>
                {copy.join.cta}
              </ActionButton>
            </Box>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      {/* Call to action */}
      <CTABand
        title={copy.cta.title}
        lead={copy.cta.description}
        primary={{ label: copy.cta.cta, to: PathConstants.VOLUNTEER_OPPORTUNITIES, icon: <VolunteerIcon /> }}
      />
    </>
  );
}
