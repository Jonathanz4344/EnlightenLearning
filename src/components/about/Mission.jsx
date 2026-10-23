import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { TUTORING_SESSIONS_DISPLAY, TOTAL_RAISED_DISPLAY } from "../../constants/metrics";
import PathConstants from "../../routes/pathConstants";
import {
  Seo,
  Section,
  PageIntro,
  SectionHeading,
  FeatureGrid,
  FeatureCard,
  CheckList,
  CTABand,
  StatRow,
  Stat,
  Prose,
  IconWell,
  Surface,
  Badge,
  Eyebrow,
} from "../../kit";
import { Reveal, Stagger, StaggerItem } from "../../motion";

// Mission pillars data - updated to reflect charitable focus
const missionPillars = [
  {
    id: 1,
    title: "Learn with Joy",
    subtitle: "Discover the wonder in every lesson",
    description:
      "We believe learning should be an exciting journey of curiosity and discovery. Our wish is for every student to find the joy in knowledge, cultivate a lifelong passion for learning, and grow into thoughtful individuals who'll make a difference in the world. Every lesson is a step towards our mission of helping those in need.",
    icon: EmojiEventsRoundedIcon,
    stats: { value: "30+", label: "Active Volunteers" },
    features: [
      "Personalized learning paths",
      "Interactive learning experience",
      "Mentorship from passionate tutors",
      "Learning that gives back to charity",
    ],
  },
  {
    id: 2,
    title: "Give with Passion",
    subtitle: "Service from the heart",
    description:
      "Our commitment goes beyond teaching—we are dedicated to building a brighter future for the next generation. We pour our hearts into every interaction and charitable cause, creating meaningful connections that inspire the children in our community to learn and grow. Together we are making a tangible difference in countless lives.",
    icon: VolunteerActivismRoundedIcon,
    stats: { value: TUTORING_SESSIONS_DISPLAY, label: "Sessions Taught" },
    features: [
      "Dedicated volunteer tutors",
      "Charitable tutoring programs",
      "Community events and initiatives",
      "Giving back to those in need",
    ],
  },
  {
    id: 3,
    title: "Change the World",
    subtitle: "Creating ripples of positive impact",
    description:
      "Every individual we reach has the potential to create lasting change. By providing quality education, and fostering compassion for others, we are empowering the next generation to be world changers. Each step, each individual, all working towards creating a brighter tomorrow. ",
    icon: PublicRoundedIcon,
    stats: { value: "200+", label: "Lives Impacted" },
    features: ["Youth empowerment", "Purpose driven learning", "Fostering community", "Charitable mission"],
  },
  {
    id: 4,
    title: "Fundraising for Good",
    subtitle: "Supporting causes that matter",
    description:
      "Our fundraising efforts are at the heart of our mission. We're passionate about raising funds for multiple charities that provide hope, support, and care to children and families in need. When you learn with us or support our mission with a donation, you're directly contributing to life changing causes. ",
    icon: MonetizationOnRoundedIcon,
    stats: { value: TOTAL_RAISED_DISPLAY, label: "Funds Raised" },
    features: [
      "Multiple charity partnerships",
      "Supporting families in need ",
      "Driving meaningful change",
      "Life changing donations",
    ],
  },
];

// Impact metrics data
const impactMetrics = [
  { icon: <AutoStoriesRoundedIcon />, value: "200+", label: "Lives Impacted" },
  { icon: <GroupRoundedIcon />, value: "30+", label: "Active Volunteers" },
  { icon: <EventRoundedIcon />, value: TUTORING_SESSIONS_DISPLAY, label: "Sessions Taught" },
  { icon: <MonetizationOnRoundedIcon />, value: TOTAL_RAISED_DISPLAY, label: "Raised for Charity" },
];

const heroMarks = [
  { icon: <SchoolRoundedIcon />, tone: "tint" },
  { icon: <FavoriteRoundedIcon />, tone: "season" },
  { icon: <PublicRoundedIcon />, tone: "tint" },
  { icon: <MonetizationOnRoundedIcon />, tone: "metallic" },
];

export default function Mission() {
  return (
    <>
      <Seo
        title="Our Mission"
        description="Enlighten Learning is a movement to create a brighter future through knowledge and compassion. Learn how our tutoring gives back to children and families in need."
      />

      {/* Hero Section */}
      <PageIntro
        title="Who We Are"
        lead="Enlighten Learning is more than an educational platform—it's a movement to create a brighter future through knowledge and compassion. We believe education should empower minds and inspire action, which is why giving back to those in need is at the heart of everything we do."
      >
        <Reveal delay={0.1} y={10}>
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
        <Reveal delay={0.2} y={12}>
          <Typography variant="h2" component="h2" sx={{ pt: 2, textWrap: "balance" }}>
            Learn. Grow. Give Back.
          </Typography>
        </Reveal>
      </PageIntro>

      {/* Mission Section */}
      <Section variant="paper">
        <FeatureGrid columns={{ xs: 1, md: 2 }} gap={3}>
          <FeatureCard title="Our Mission" titleComponent="h2" titleVariant="h3" spotlight padding={{ xs: 3, md: 5 }}>
            <Prose>
              <p>
                We&apos;re on a mission to give back, supporting charities that bring hope, care, and opportunities to those in need. Our proceeds support multiple charities to help children and families in need.
              </p>
              <p>
                To foster bright minds while making a meaningful difference in the world. We strive to empower the next generation by providing high quality learning experiences while supporting life-changing causes.
              </p>
            </Prose>
          </FeatureCard>
          <FeatureCard title="Our Vision" titleComponent="h2" titleVariant="h3" spotlight padding={{ xs: 3, md: 5 }}>
            <Prose>
              <p>
                To create a world where education and compassion work hand in hand—guiding young learners to reach their fullest potential and improving lives locally.
              </p>
              <p>Our fundraising initiative is fueled by a passion for education and a commitment to helping those in need.</p>
            </Prose>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      {/* Impact Metrics */}
      <Section>
        <SectionHeading title="Our Impact by the Numbers" align="center" />
        <StatRow items={impactMetrics} align="center" />
      </Section>

      {/* Charitable Commitment Section */}
      <Section variant="tint">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 4 }}>
          <Reveal>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mb: 3 }}>
              <IconWell tone="season" size="lg" round>
                <FavoriteRoundedIcon />
              </IconWell>
              <IconWell tone="metallic" size="lg" round>
                <HandshakeRoundedIcon />
              </IconWell>
              <IconWell tone="tint" size="lg" round>
                <LocalHospitalRoundedIcon />
              </IconWell>
            </Box>
          </Reveal>
          <SectionHeading
            title="Our Charitable Commitment"
            lead="We're on a mission to raise as much as we can for as many institutions as possible. Enlighten Learning proudly supports charities that provide hope, support and care to those in need."
            align="center"
            gutterBottom={false}
            maxWidth={820}
          />

          {/* Featured callout box */}
          <Reveal sx={{ width: "100%" }}>
            <Surface tone="paper" padding={{ xs: 3, md: 5 }} sx={{ maxWidth: 900, mx: "auto", display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
              <Eyebrow tone="metallic" icon={<StarRoundedIcon />} align="center">
                When you learn with us, you&apos;re also helping children and families in need
              </Eyebrow>
              <Typography variant="h3" component="p" sx={{ textWrap: "balance", fontStyle: "italic" }}>
                Together, we can change lives and make a positive impact on as many lives as possible.
              </Typography>
            </Surface>
          </Reveal>

          {/* Impact statistics showcase */}
          <Stagger sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 3, width: "100%", maxWidth: 640 }}>
            <StaggerItem>
              <Surface tone="paper" sx={{ display: "flex", justifyContent: "center" }}>
                <Stat value={TOTAL_RAISED_DISPLAY} label="Raised for Charity" align="center" tone="metallic" />
              </Surface>
            </StaggerItem>
            <StaggerItem>
              <Surface tone="paper" sx={{ display: "flex", justifyContent: "center" }}>
                <Stat value="200+" label="Lives Impacted" align="center" tone="accent" />
              </Surface>
            </StaggerItem>
          </Stagger>
        </Box>
      </Section>

      {/* Mission Pillars */}
      <Section>
        <SectionHeading
          title="The Four Pillars of Our Mission"
          lead="These four pillars guide everything we do, from our educational approach to our commitment to charitable giving."
          align="center"
        />
        <FeatureGrid columns={{ xs: 1, md: 2 }} gap={3}>
          {missionPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <FeatureCard
                key={pillar.id}
                icon={<Icon />}
                title={pillar.title}
                titleVariant="h4"
                eyebrow={pillar.subtitle}
                badge={<Badge tone="accent">{`${pillar.stats.value} ${pillar.stats.label}`}</Badge>}
                description={pillar.description}
                spotlight
                padding={{ xs: 3, md: 4 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}>
                  <Typography variant="h6" component="h4">
                    Key Features:
                  </Typography>
                  <CheckList items={pillar.features} />
                </Box>
              </FeatureCard>
            );
          })}
        </FeatureGrid>
      </Section>

      {/* Call to Action Section */}
      <CTABand
        title="Join Our Mission"
        lead="Together, we can create a brighter future through education and fundraising. Whether you volunteer your time, make a donation, or simply spread the word—every action makes a difference."
        primary={{ label: "Volunteer With Us", to: PathConstants.VOLUNTEER_OPPORTUNITIES, icon: <VolunteerActivismRoundedIcon /> }}
        secondary={{ label: "Support Our Cause", to: PathConstants.DONATE_NOW, icon: <MonetizationOnRoundedIcon /> }}
      />
    </>
  );
}
