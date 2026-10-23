import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { TUTORING_SESSIONS_DISPLAY } from "../../constants/metrics";
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
  IconWell,
  ActionButton,
} from "../../kit";
import { Reveal, Stagger, StaggerItem } from "../../motion";

// Subject Areas Data
const subjectAreas = [
  {
    id: 1,
    title: "NYS & Regents Test Prep",
    subtitle: "Grades 3-8",
    description:
      "Help elementary, middle and high school students excel on New York State standardized tests and State Regents exams across various subjects. Focus on test-taking strategies, content review, and building confidence for academic success.",
    icon: QuizRoundedIcon,
    category: "Test Preparation",
    grades: ["Elementary", "Middle School", "High School"],
    commitment: "Flexible scheduling",
  },
  {
    id: 5,
    title: "World Languages",
    subtitle: "Spanish, Mandarin, French",
    description: "Assist students in developing language proficiency through conversation practice, grammar instruction, and cultural immersion activities.",
    icon: LanguageRoundedIcon,
    category: "Language",
    grades: ["Spanish", "Mandarin Chinese", "French"],
    commitment: "Conversational sessions",
  },
  {
    id: 6,
    title: "Music",
    subtitle: "Elementary, Middle & High School",
    description:
      "Provide personalized music instruction, including reading music, developing instrumental or vocal skills, and exploring music theory and performance techniques. Lessons are tailored to each student’s goals and level.",
    icon: MusicNoteRoundedIcon,
    category: "Fine Arts",
    grades: ["Elementary", "Middle School", "High School"],
    commitment: "Weekly sessions",
  },
  {
    id: 2,
    title: "English",
    subtitle: "Elementary, Middle & High School",
    description: "Guide students through reading comprehension, writing skills, grammar, literature analysis, and essay composition across all grade levels.",
    icon: MenuBookRoundedIcon,
    category: "Core Subject",
    grades: ["Elementary", "Middle School", "High School"],
    commitment: "Weekly sessions",
  },
  {
    id: 3,
    title: "Mathematics",
    subtitle: "Elementary through Geometry",
    description: "Support students in fundamental math concepts, algebra, and geometry. Build strong mathematical foundations and problem-solving skills.",
    icon: CalculateRoundedIcon,
    category: "Core Subject",
    grades: ["Elementary", "Middle School", "High School"],
    commitment: "Regular practice sessions",
  },
  {
    id: 4,
    title: "Science",
    subtitle: "Earth Science, Biology, Chemistry",
    description: "Help students understand scientific concepts, conduct experiments, and develop critical thinking skills in various science disciplines.",
    icon: ScienceRoundedIcon,
    category: "Core Subject",
    grades: ["Elementary", "Middle School", "High School"],
    commitment: "Lab and theory sessions",
  },
];

// Subjects are shown in id order
const sortedSubjects = [...subjectAreas].sort((a, b) => a.id - b.id);

// Application form opened by every "Apply Now" button
const APPLY_FORM_URL = "https://forms.gle/z364CwT8uw2JSHMQ7";

// Quick stats under the page header
const quickStats = [
  { value: subjectAreas.length, label: "Subject Areas" },
  { value: "K-12", label: "Grade Levels" },
  { value: "15+", label: "Dedicated Tutors" },
  { value: TUTORING_SESSIONS_DISPLAY, label: "Tutoring Sessions" },
];

function SubjectCard({ subject }) {
  const Icon = subject.icon;
  return (
    <FeatureCard
      icon={<Icon />}
      badge={
        <Badge tone="success" size="sm">
          NOW HIRING
        </Badge>
      }
      eyebrow={subject.subtitle}
      title={subject.title}
      spotlight
      footer={
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Join our team */}
          <Surface tone="tint" padding={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 0.5 }}>
            <IconWell tone="paper" size="sm" round sx={{ mb: 0.5 }}>
              <SchoolRoundedIcon />
            </IconWell>
            <Typography variant="h6" component="p">
              Join Our Tutoring Team!
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Share your knowledge and make a difference
            </Typography>
          </Surface>
          <ActionButton href={APPLY_FORM_URL} external fullWidth endIcon={<LaunchRoundedIcon />}>
            Apply Now
          </ActionButton>
        </Box>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Badge tone="accent">{subject.category}</Badge>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary", textWrap: "pretty" }}>
          {subject.description}
        </Typography>

        {/* Grade levels or areas */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" component="h4">
            Areas of Focus:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {subject.grades.map((grade) => (
              <Badge key={grade} tone="neutral" size="sm">
                {grade}
              </Badge>
            ))}
          </Box>
        </Box>
      </Box>
    </FeatureCard>
  );
}

SubjectCard.propTypes = {
  subject: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    category: PropTypes.string.isRequired,
    grades: PropTypes.arrayOf(PropTypes.string).isRequired,
    commitment: PropTypes.string,
  }).isRequired,
};

export default function ApplyTutor() {
  return (
    <>
      <Seo
        title="Apply as a Tutor"
        description="Share your knowledge, inspire young minds, and make a lasting impact in your community. Join our team of dedicated tutors today!"
      />

      {/* Page header */}
      <PageIntro
        title="Enlighten Learning Tutoring Team"
        lead="Share your knowledge, inspire young minds, and make a lasting impact in your community. Join our team of dedicated tutors today!"
      >
        <Reveal delay={0.1} y={10}>
          <Stagger sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 0.5, sm: 1.25 }, justifyContent: "center", pt: 1 }} gap={0.08}>
            {sortedSubjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <StaggerItem key={subject.id}>
                  <IconWell tone="tint" size="md" sx={{ width: { xs: 44, sm: 52 }, height: { xs: 44, sm: 52 }, "& > svg": { fontSize: { xs: 22, sm: 26 } } }}>
                    <Icon />
                  </IconWell>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Reveal>
      </PageIntro>

      {/* Quick stats */}
      <Section variant="paper" size="sm">
        <StatRow items={quickStats} align="center" />
      </Section>

      {/* Subject areas */}
      <Section>
        <SectionHeading title="Choose Your Expertise" lead="Select the subject area where you'd like to make an impact and help students succeed" align="center" />
        <FeatureGrid columns={{ xs: 1, sm: 2, md: 3 }} gap={3}>
          {sortedSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </FeatureGrid>
      </Section>

      {/* Why join our team */}
      <Section variant="tint">
        <SectionHeading title="Why Join Enlighten Learning?" align="center" />
        <FeatureGrid columns={{ xs: 1, md: 3 }} gap={3}>
          <FeatureCard
            icon={<ScheduleRoundedIcon />}
            title="Flexible Scheduling"
            description="Work around your schedule with flexible tutoring sessions that fit your lifestyle and availability."
            align="center"
            spotlight
            padding={{ xs: 3, md: 4 }}
          />
          <FeatureCard
            icon={<FavoriteRoundedIcon />}
            title="Rewarding Experience"
            description="Not only will you experience the joy of helping students succeed academically and build confidence, you'll also know your efforts directly support those in need."
            align="center"
            spotlight
            padding={{ xs: 3, md: 4 }}
          />
          <FeatureCard
            icon={<EmojiEventsRoundedIcon />}
            iconTone="metallic"
            title="Earn Service Hours"
            description="Earn valuable service hours while making a meaningful impact. Every hour you dedicate helps a student succeed and supports our charitable mission."
            align="center"
            spotlight
            padding={{ xs: 3, md: 4 }}
          />
        </FeatureGrid>
      </Section>
    </>
  );
}
