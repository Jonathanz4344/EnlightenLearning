import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import BookOnlineRoundedIcon from "@mui/icons-material/BookOnlineRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
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
    title: "NYS & Regents Prep",
    subtitle: "Grades 3-8",
    description:
      "Comprehensive preparation for New York State exams for grades 3-8 and Regents exams for grade 8 and up. Test-taking strategies and comprehensive content review for academic success",
    icon: QuizRoundedIcon,
    category: "Test Preparation",
    grades: ["Elementary", "Middle School", "High School"],
  },
  {
    id: 5,
    title: "World Languages",
    subtitle: "Spanish, Mandarin, French",
    description: "Develop language proficiency through conversation practice, grammar instruction, and cultural immersion activities.",
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
      "Whether you're just learning to read music or preparing for high-level concerts and competitions, our lessons are tailored to your level and interests.",
    icon: MusicNoteRoundedIcon,
    category: "Fine Arts",
    grades: ["Elementary", "Middle School", "High School"],
    commitment: "Weekly sessions",
    specialNote: "*Instrument-dependent availability.",
  },
  {
    id: 2,
    title: "English",
    subtitle: "Elementary, Middle & High School",
    description:
      "Expert guidance in reading comprehension, writing skills, grammar, literature analysis, and essay composition across all grade levels.",
    icon: MenuBookRoundedIcon,
    category: "Core Subject",
    grades: ["Elementary", "Middle School", "High School"],
    commitment: "Weekly sessions",
  },
  {
    id: 3,
    title: "Mathematics",
    subtitle: "Elementary through Geometry",
    description:
      "Build strong mathematical foundations and problem-solving skills with support ranging from fundamental math concepts at the elementary level, to high school level courses like Algebra 1/2, and Geometry.",
    icon: CalculateRoundedIcon,
    category: "Core Subject",
    grades: ["Elementary", "Middle School", "High School"],
    commitment: "Regular practice sessions",
  },
  {
    id: 4,
    title: "Science",
    subtitle: "Earth Science, Biology, Chemistry",
    description:
      "Develop understanding of scientific concepts, course specific content, and build critical thinking skills across various science disciplines from elementary level sciences to Earth Science, Biology and Chemistry. ",
    icon: ScienceRoundedIcon,
    category: "Core Subject",
    grades: ["Elementary", "Middle School", "High School"],
    commitment: "Lab and theory sessions",
  },
];

// Subjects are shown in id order
const sortedSubjects = [...subjectAreas].sort((a, b) => a.id - b.id);

// Booking form opened by every "Book Session" button
const BOOKING_FORM_URL = "https://forms.gle/yBkAste1jFLEVqLw9";

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
          AVAILABLE NOW
        </Badge>
      }
      eyebrow={subject.subtitle}
      title={subject.title}
      spotlight
      footer={
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Book session */}
          <Surface tone="tint" padding={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 0.5 }}>
            <IconWell tone="paper" size="sm" round sx={{ mb: 0.5 }}>
              <BookOnlineRoundedIcon />
            </IconWell>
            <Typography variant="h6" component="p">
              Book Your Session Today!
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Expert tutoring available now
            </Typography>
            <Typography variant="caption" component="p" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              *per tutor availability
            </Typography>
          </Surface>
          <ActionButton href={BOOKING_FORM_URL} external fullWidth endIcon={<LaunchRoundedIcon />}>
            Book Session
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
          {subject.specialNote && (
            <Typography variant="caption" component="p" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              {subject.specialNote}
            </Typography>
          )}
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
    specialNote: PropTypes.string,
  }).isRequired,
};

export default function TutoringServices() {
  return (
    <>
      <Seo
        title="Tutoring Services"
        description="Excel in your studies and make a difference. Our expert tutoring services are designed to help students achieve their academic goals and build confidence."
      />

      {/* Page header */}
      <PageIntro
        title="Enlighten Learning Tutoring Services"
        lead="Excel in your studies and make a difference. Our expert tutoring services are designed to help students achieve their academic goals and build confidence. And with every lesson, you're helping us fundraise for charities that provide hope, care, and support to those in need."
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
        <SectionHeading title="Our Tutoring Services" lead="Choose the subject area where your child needs support and watch them excel" align="center" />
        <FeatureGrid columns={{ xs: 1, sm: 2, md: 3 }} gap={3}>
          {sortedSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </FeatureGrid>
      </Section>

      {/* Why choose us */}
      <Section variant="tint">
        <SectionHeading title="Why Choose Enlighten Learning?" align="center" />
        <FeatureGrid columns={{ xs: 1, md: 3 }} gap={3}>
          <FeatureCard
            icon={<GroupsRoundedIcon />}
            title="Expert Tutors"
            description="Our qualified tutors are passionate about education and dedicated to student success."
            align="center"
            spotlight
            padding={{ xs: 3, md: 4 }}
          />
          <FeatureCard
            icon={<ScheduleRoundedIcon />}
            title="Flexible Scheduling"
            description="Sessions scheduled around your family's busy schedule with convenient timing options."
            align="center"
            spotlight
            padding={{ xs: 3, md: 4 }}
          />
          <FeatureCard
            icon={<EmojiEventsRoundedIcon />}
            iconTone="metallic"
            title="Proven Results"
            description="Track record of helping students improve grades and build academic confidence."
            align="center"
            spotlight
            padding={{ xs: 3, md: 4 }}
          />
        </FeatureGrid>
      </Section>
    </>
  );
}
