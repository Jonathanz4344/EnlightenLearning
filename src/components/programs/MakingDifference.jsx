import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { TUTORING_SESSIONS_DISPLAY, TOTAL_RAISED_DISPLAY } from "../../constants/metrics";
import { Seo, Section, PageIntro, CTABand, Stat, Surface, Quote, ActionButton } from "../../kit";
import { Reveal, Stagger, StaggerItem } from "../../motion";

// The review forms: one for parents, one for tutors and volunteers
const PARENT_REVIEW_FORM = "https://forms.gle/V8LRoe4RJm3iUaXu5";
const TUTOR_VOLUNTEER_REVIEW_FORM = "https://forms.gle/V4ocU3f6RMxsDLM16";

// Enhanced reviews with priority scoring
const reviews = [
    {
        text: "After the tutoring lessons, Kingsley has gained more confidence in learning both ELA and Math. I appreciate that the tutors are always on time and well prepared for the lessons. They are also flexible when schedule changes are needed. I am satisfied with the two tutors paired with Kingsley. I would recommend the program to others.",
        author: "Iris A.",
        priority: "large",
    },
    {
        text: "Being a tutor at Enlighten Learning has allowed me to experience so many meaningful moments with the kids I work with. One of my students, Kingsley, has especially made the experience memorable. We’ve built such a strong connection that he has chosen to continue tutoring with me again this year, which feels both rewarding and encouraging. Through this opportunity, I’ve gained valuable skills such as learning how to effectively socialize with younger children, developing patience, working independently, and practicing negotiation when challenges arise. Tutoring has truly taught me how impactful small efforts can be in helping others grow. I would gladly participate again, and I’m excited to continue tutoring my student this year and create even more new memories together.",
        author: "Tiffany Q.",
        priority: "large",
    },
    {
        text: "My daughter was tutored in Algebra, I would recommend it to others.",
        author: "Sophie Z.",
        priority: "medium",
    },
    {
        text: "The classes were very good! ",
        author: "Emma Z.    ",
        priority: "small",
    },
    {
        text: "Many athletes find that such clinics accelerate their skill development and build confidence.They emphasize skills like spiking, serving, blocking, packed into a short timeframe. Kids loved it .",
        author: "Harpreet K.",
        priority: "large",
    },
    {
        text: "It was such a great experience. Very welcoming for beginners and kids enjoyed it! Very well run and appreciated that the structure accommodated for water breaks. My kids of different ages felt included and enjoyed it!",
        author: "Ruby J.",
        priority: "large",
    },
    {
        text: "The clinic was a good environment for beginners.",
        author: "Himali P.",
        priority: "small",
    },

    {
        text: "My experience as a tutor was very valuable and beneficial. It allowed me to gain strong communication skills, learn to be more patient, and how to adapt my teaching style to better suit the student I worked with. Additionally, watching the student make progress and become more confident was extremely fulfilling. Given the personal growth and positive impact, I would definitely participate again.",
        author: "Tiffany Z",
        priority: "large",
    },
    {
        text: "As the Volunteer Coordinator of Enlighten Learning, I became more organized and efficient in managing schedules and resources. Being apart of the Enlighten Learning team taught me how to finish tasks effectively and collaborate with diverse stakeholders. Seeing the program run smoothly due to these efforts was incredibly rewarding. Would I participate again? Absolutely. The experience was fulfilling, and I'd love to contribute to help scale the program's impact.",
        author: "Eileen L.",
        priority: "large",
    },
    {
        text: "My kid loves Tiffany's teaching very much. She knows how to teach kids and how to make them be very interested to learn knowledge. Anna always be very happy after tutoring and cannot wait for next lesson. She also has patient and acts as Anna's friend too. Easy communicate with me. I believe she definitely improved her English. Overall highly recommended.",
        author: "Eugena F.",
        priority: "large",
    },
    {
        text: "Kingsley has been tutoring with Tiffany for about 12 weeks. I totally understand it is not a long period of time, but I still do see improvements from it. His reading comprehension and answering multiple choices are much better than before. I appreciated Tiffany and Brianna who are very responsive and addressed Kingsley's reading problems. I am very satisfied with the pairing process and will definitely consider coming back. I would also recommend others to this program.",
        author: "Iris A.",
        priority: "large",
    },
    {
        text: "I had a great experience being a tutor. I really learned a lot about responsibility, time management, patience etc. These skills are very useful not only in the tutoring environment but also school, later work, and life. I would love to tutor again.",
        author: "Anna Z.",
        priority: "large",
    },
    {
        text: "I enjoyed being a board member and felt that my contributions were really helping Enlighten Learning grow. I gained the skills to develop events and ideas with the help of others, and actually act on those ideas.",
        author: "Aarini C.",
        priority: "medium",
    },
    {
        text: "The experience helped me develop patience and communication skills, also helping me find new ways to present different concepts to children.",
        author: "Alison I.",
        priority: "medium",
    },
    {
        text: "It was a good experience. I got to work with a lot of good people. I earned leadership skills and also learned how to collaborate with my team for a united goal.",
        author: "Veronica C.",
        priority: "medium",
    },
    {
        text: "I loved being able to teach other people the basics on how to play volleyball! it was a fun experience, and was a great way to be active and helpful!",
        author: "Sonali P.",
        priority: "medium",
    },
    {
        text: "Very fun and enjoyable to be able to share my expertise and help younger kids practice and play volleyball.",
        author: "Abigail T.",
        priority: "medium",
    },
    {
        text: "This was a great program and I love how it was set up!",
        author: "Ayana P.",
        priority: "small",
    },
    {
        text: "I had lots of fun with this clinic.",
        author: "Juhee J",
        priority: "small",
    },
    {
        text: "Through Enlighten Learning I've developed my planning and organizational skills by helping plan our events. I'll continue to develop these skills and gain new experiences as a board member of this organization.",
        author: "Lauren C.",
        priority: "medium",
    },
];

// Sort reviews by priority for better arrangement
const sortedReviews = reviews.sort((a, b) => {
    const priorityOrder = { large: 3, medium: 2, small: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
});

// One of the four numbers, in a paper card
function ImpactStat({ icon, value, label, tone = "text" }) {
  return (
    <StaggerItem sx={{ display: "flex", minWidth: 0 }}>
      <Surface tone="paper" sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Stat icon={icon} value={value} label={label} tone={tone} align="center" />
      </Surface>
    </StaggerItem>
  );
}

ImpactStat.propTypes = {
  icon: PropTypes.node,
  value: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  tone: PropTypes.oneOf(["text", "accent", "metallic"]),
};

export default function Reviews() {
  // Pagination state
  const [visibleCount, setVisibleCount] = React.useState(6); // Show 6 reviews initially
  const [isLoading, setIsLoading] = React.useState(false);

  // Get visible reviews based on current count
  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const hasMoreReviews = visibleCount < sortedReviews.length;

  const handleLoadMore = () => {
      setIsLoading(true);
      // Simulate loading delay for smooth UX
      setTimeout(() => {
          setVisibleCount(prev => Math.min(prev + 6, sortedReviews.length));
          setIsLoading(false);
      }, 500);
  };

  // Deal the reviews into columns: each goes to the column with the fewest
  // cards, so the ones loaded later land at the bottom instead of reshuffling
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up("sm"));
  const upMd = useMediaQuery(theme.breakpoints.up("md"));
  const columns = upMd ? 3 : upSm ? 2 : 1;

  const createMasonryLayout = () => {
    const columnArrays = Array.from({ length: columns }, () => []);

    visibleReviews.forEach((review, index) => {
      const shortestColumn = columnArrays.reduce((shortest, current) =>
        current.length < shortest.length ? current : shortest
      );
      shortestColumn.push({ ...review, index });
    });

    return columnArrays;
  };

  const masonryColumns = createMasonryLayout();

  return (
    <>
      <Seo title="Making a Difference" description="Hear from our amazing community of learners, educators, and supporters" />

      {/* Page Header */}
      <PageIntro title="What People Say" lead="Hear from our amazing community of learners, educators, and supporters">
        <Reveal delay={0.14} y={12}>
          <Typography
            variant="body1"
            component="p"
            sx={(theme) => ({ color: theme.vars.palette.text.secondary, maxWidth: 600, textWrap: "pretty" })}
          >
            Real stories from real people who have experienced the impact of our programs
          </Typography>
        </Reveal>

        {/* Review Buttons */}
        <Reveal delay={0.2} y={12}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "center", pt: 1 }}>
            <ActionButton href={PARENT_REVIEW_FORM} external size="large" startIcon={<FamilyRestroomRoundedIcon />}>
              Parent Review
            </ActionButton>
            <ActionButton
              href={TUTOR_VOLUNTEER_REVIEW_FORM}
              external
              variant="outlined"
              color="inherit"
              size="large"
              startIcon={<VolunteerActivismRoundedIcon />}
            >
              Tutor/Volunteer Review
            </ActionButton>
          </Box>
        </Reveal>
      </PageIntro>

      {/* Stats Section */}
      <Section variant="tint" size="sm">
        <Stagger
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
            gap: { xs: 2, md: 3 },
          }}
        >
          <ImpactStat icon={<AutoStoriesRoundedIcon />} value="200+" label="Lives Impacted" />
          <ImpactStat icon={<EventRoundedIcon />} value={TUTORING_SESSIONS_DISPLAY} label="Tutoring Sessions" />
          <ImpactStat icon={<MonetizationOnRoundedIcon />} value={TOTAL_RAISED_DISPLAY} label="Raised for Charity" tone="metallic" />
          <ImpactStat icon={<GroupRoundedIcon />} value="30+" label="Active Volunteers" />
        </Stagger>
      </Section>

      {/* Masonry Reviews Layout */}
      <Section>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: 3,
            alignItems: "start",
          }}
        >
          {masonryColumns.map((column, columnIndex) => (
            <Box key={columnIndex} sx={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
              {column.map((review) => (
                <Reveal key={review.index} y={16}>
                  <Quote text={review.text} author={review.author} role="Verified Reviewer" />
                </Reveal>
              ))}
            </Box>
          ))}
        </Box>

        {/* Load More Button */}
        {hasMoreReviews && (
          <Reveal>
            <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 3, md: 5 } }}>
              <ActionButton
                variant="outlined"
                color="inherit"
                size="large"
                onClick={handleLoadMore}
                disabled={isLoading}
                endIcon={<ExpandMoreRoundedIcon />}
              >
                {isLoading ? 'Loading More Reviews...' : `More from the Community `}
              </ActionButton>
            </Box>
          </Reveal>
        )}
      </Section>

      {/* Call to Action */}
      <CTABand
        title="Join Our Community"
        lead="Ready to be part of something special? Whether you're a student, parent, volunteer, or executive member, our mission is made possible because of people like you. We'd love to hear your story"
        primary={{ label: "Parent Review", href: PARENT_REVIEW_FORM, external: true, icon: <FamilyRestroomRoundedIcon /> }}
        secondary={{ label: "Tutor/Volunteer", href: TUTOR_VOLUNTEER_REVIEW_FORM, external: true, icon: <VolunteerActivismRoundedIcon /> }}
      />
    </>
  );
}
