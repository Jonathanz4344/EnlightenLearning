import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import PathConstants from "../../routes/pathConstants";
import { radius, duration, easing } from "../../theme/tokens";
import {
  Seo,
  Section,
  PageIntro,
  SectionHeading,
  Figure,
  FeatureGrid,
  FeatureCard,
  CheckList,
  CTABand,
  StatRow,
  Stat,
  Surface,
  Badge,
  Quote,
  IconWell,
} from "../../kit";
import { Reveal, Stagger, StaggerItem } from "../../motion";

// Placeholder charity data - replace with your actual charities
const charitiesData = [
  {
    id: 1,
    name: "Adventures in Learning",
    description:
      "Adventures in Learning is a nonprofit organization located in Manhasset that provides after school educational enrichment to support underserved children in Long Island.",
    whySupport: ["Supporting underserved children through education", "Creating access to education and opportunities"],
    amountDonated: 1000,
    logo: "/images/charity/charity1.jpg",
    image: "/images/charity/charity1.jpg",
    website: "https://www.adventuresinlearning.org",
  },
  {
    id: 2,
    name: "Cohen Children's Medical Center",
    description:
      "Cohen Children's Medical Center is a children's hospital that specializes in pediatric care and supporting families throughout their children's medical journeys.",
    whySupport: [
      "Focused on helping children receive the medical care they need",
      "Promoting access to quality healthcare for young patients and their families",
    ],
    amountDonated: 1000,
    logo: "/images/charity/charity2.jpeg",
    image: "/images/charity/charity2.jpeg",
    website: "https://www.northwell.edu/cohen-childrens-medical-center",
  },
  {
    id: 3,
    name: "Ronald McDonald House Long Island",
    description:
      "Ronald McDonald House is an organization that helps families navigate their children's medical challenges by offering a welcoming place to stay and a supportive community near hospitals.",
    whySupport: [
      "Easing the financial and emotional strain so families can focus on their child's recovery",
      "Providing essential resources and support during difficult times",
    ],
    amountDonated: 1000,
    logo: "/images/charity/charity3.jpeg",
    image: "/images/charity/charity3.jpeg",
    website: "https://www.rmhlongisland.org",
  },

  // Add more charities as you make donations!
];

// Placeholder testimonials - replace with real quotes
const testimonials = [
  {
    id: 1,
    quote:
      "Thank you, Enlighten Learning board of directors and faithful volunteers for the generous support and assistance you have provided to the Adventures in Learning after school homework tutoring and enrichment program. Your donation of $1,000 on 1/21/26 is so appreciated and we are honored that Adventures was chosen as the first donation of your organization, Enlighten Learning. Our gratitude to the amazing members of Enlighten Learning for partnering with us to bring educational opportunities to the underserved children in our Long Island communities.",
    author: "Diana L Holden",
    role: "Executive Director",
    organization: "Adventures in Learning",
    avatar: "/images/charity/charity1.jpg",
  },
  {
    id: 2,
    quote:
      "Thank you for your gift of $1,000 to Cohen Children's Medical Center. Your generous support helps us provide exceptional, compassionate care to every person we serve, regardless of their ability to pay. Because of you, we are able to reach far beyond our hospital walls-transforming lives, empowering our communities and accelerating medical breakthroughs from idea to reality. By supporting Cohen Children's Medical Center, you become part of the Northwell team. Together, we are building a healthier, brighter future for all. Thank you for your commitment and partnership.",
    author: "Cohen Children's Medical Center",
    role: "Northwell Health",
    organization: "Cohen Children's Medical Center",
    avatar: "/images/charity/charity2.jpeg",
  },
  {
    id: 3,
    quote:
      "Thank you for your generous donation of $1,000.00 in support of Ronald McDonald House Long Island. We are proud that Enlighten Learning finds our organization deserving of your support. For 40 years, we have been committed to supporting families caring for their sick children by helping them access the medical care and resources they need. Ronald McDonald House can continue to provide programs and support because of generous friends like you. As we reflect on 40 years of impact, we are especially grateful for supporters like you who make this work possible. Thank you for giving the gift of togetherness. You help families stay cared for during their most difficult days. We are so grateful.",
    author: "Ronald McDonald House Long Island",
    role: "Ronald McDonald House Charities",
    organization: "Ronald McDonald House Long Island",
    avatar: "/images/charity/charity3.jpeg",
  },
];

const HERO_TITLE = "Making a Difference Together";
const HERO_LEAD = "See where your donations go and the impact we're making in our community through our charitable efforts.";

// Photo carousel, optimized for single/few charities
const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? charitiesData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === charitiesData.length - 1 ? 0 : prev + 1));
  };

  const currentCharity = charitiesData[currentIndex];
  const prevCharity = charitiesData[currentIndex === 0 ? charitiesData.length - 1 : currentIndex - 1];
  const nextCharity = charitiesData[currentIndex === charitiesData.length - 1 ? 0 : currentIndex + 1];
  const showControls = charitiesData.length > 1;

  // Auto-advance the carousel every few seconds; the timer resets whenever the slide changes manually
  useEffect(() => {
    if (charitiesData.length <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === charitiesData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const arrowSx = (side) => (theme) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: { xs: 8, md: -24 },
    zIndex: 1,
    backgroundColor: theme.vars.palette.surface.paper,
    border: `1px solid ${theme.vars.palette.hairline.strong}`,
    "&:hover": { backgroundColor: theme.vars.palette.surface.sunken },
  });

  return (
    <Section>
      <SectionHeading title={<>Our Impact in Action</>} lead={<>See the charities and causes we&apos;ve proudly supported</>} align="center" />

      <Reveal>
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          {/* Featured charity display */}
          <Box sx={{ position: "relative" }}>
            <Figure src={currentCharity.image} alt={currentCharity.name} fit="cover" ratio="16 / 9" priority />

            {/* Overlay info on a frosted strip; on phones the picture is small, so the strip sits under it instead */}
            <Box
              sx={(theme) => ({
                position: { xs: "relative", sm: "absolute" },
                left: { sm: 12 },
                right: { sm: 12 },
                bottom: { sm: 12 },
                mt: { xs: 1.5, sm: 0 },
                p: 2,
                borderRadius: `${radius.md}px`,
                backgroundColor: theme.vars.palette.frost.main,
                border: `1px solid ${theme.vars.palette.frost.border}`,
                backdropFilter: "blur(12px)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
              })}
            >
              <Typography variant="h5" component="p">
                {currentCharity.name}
              </Typography>
              <Badge tone="metallic">{`$${currentCharity.amountDonated.toLocaleString()} Donated`}</Badge>
            </Box>

            {/* Navigation buttons, only when there is more than one charity */}
            {showControls && (
              <>
                <IconButton onClick={handlePrev} aria-label={`Previous: ${prevCharity.name}`} sx={arrowSx("left")}>
                  <ArrowBackRoundedIcon />
                </IconButton>
                <IconButton onClick={handleNext} aria-label={`Next: ${nextCharity.name}`} sx={arrowSx("right")}>
                  <ArrowForwardRoundedIcon />
                </IconButton>
              </>
            )}
          </Box>

          {/* Dots indicator, only when there is more than one charity */}
          {showControls && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mt: 2 }}>
              {charitiesData.map((charity, index) => {
                const active = currentIndex === index;
                return (
                  <Box
                    key={charity.id}
                    component="button"
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Show ${charity.name}`}
                    aria-pressed={active}
                    sx={(theme) => ({
                      width: active ? 40 : 24,
                      height: 24,
                      p: 0,
                      border: 0,
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      transition: `width ${duration.base}ms ${easing.standard}`,
                      "&::before": {
                        content: '""',
                        display: "block",
                        mx: "auto",
                        width: active ? 24 : 8,
                        height: 8,
                        borderRadius: `${radius.pill}px`,
                        backgroundColor: active ? theme.vars.palette.primary.main : theme.vars.palette.hairline.strong,
                        transition: `width ${duration.base}ms ${easing.standard}, background-color ${duration.base}ms ${easing.standard}`,
                      },
                    })}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      </Reveal>
    </Section>
  );
};

// Charities grid, optimized for single/few charities
const CharitiesGrid = () => {
  const single = charitiesData.length === 1;

  return (
    <Section variant="paper">
      <SectionHeading
        title={single ? "Our First Charity" : "Our Charities"}
        lead={
          single
            ? "We're proud to announce our first charitable donation! This marks the beginning of our mission to give back to the community."
            : "These are the organizations we've proudly supported. Your donations help us continue this mission."
        }
        align="center"
      />

      <FeatureGrid columns={{ xs: 1, sm: 2, md: 3 }} gap={3}>
        {charitiesData.map((charity) => (
          <FeatureCard
            key={charity.id}
            spotlight
            title={charity.name}
            description={charity.description}
            // The header slot carries the photo, framed the same way on every card
            badge={
              <Box sx={{ position: "relative", width: "100%", minWidth: 0 }}>
                <Figure src={charity.image} alt={charity.name} fit="cover" ratio="4 / 3" radius="md" />
                {charity.id === 1 && charitiesData.length >= 1 && (
                  <Chip icon={<FavoriteRoundedIcon />} label="First Donation!" size="small" sx={{ position: "absolute", top: 12, left: 12 }} />
                )}
              </Box>
            }
            footer={
              <Surface tone="tint" padding={2} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Stat
                  value={`$${charity.amountDonated.toLocaleString()}`}
                  label={
                    <Typography component="span" variant="caption" sx={{ letterSpacing: "0.08em", color: "text.secondary" }}>
                      AMOUNT DONATED
                    </Typography>
                  }
                  align="center"
                  tone="metallic"
                />
              </Surface>
            }
          >
            {/* Why support section */}
            {charity.whySupport && charity.whySupport.length > 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="subtitle2" component="h4">
                  Why {charity.name}?
                </Typography>
                <CheckList items={charity.whySupport} dense />
              </Box>
            )}
          </FeatureCard>
        ))}
      </FeatureGrid>

      {/* Future charities teaser, only while there is just one charity */}
      {charitiesData.length === 1 && (
        <Reveal>
          <Surface
            tone="paper"
            padding={4}
            sx={(theme) => ({
              mt: 6,
              maxWidth: 600,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 1.5,
              borderStyle: "dashed",
              borderColor: theme.vars.palette.hairline.strong,
            })}
          >
            <IconWell tone="sunken" size="lg" round>
              <GroupsRoundedIcon />
            </IconWell>
            <Typography variant="h6" component="h3">
              More Charities Coming Soon
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              We&apos;re actively working to support more organizations. Stay tuned for future donations as we continue to grow our impact in the community!
            </Typography>
          </Surface>
        </Reveal>
      )}
    </Section>
  );
};

// Testimonial wall, optimized for single/few testimonials
const TestimonialWall = () => {
  // Show a "coming soon" message if there are no testimonials
  if (testimonials.length === 0) {
    return (
      <Section>
        <SectionHeading title={<>Messages of Gratitude</>} lead={<>Hear from the organizations we support</>} align="center" />
        <Reveal>
          <Surface
            tone="paper"
            padding={4}
            sx={(theme) => ({
              maxWidth: 600,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 1.5,
              borderStyle: "dashed",
              borderColor: theme.vars.palette.hairline.strong,
            })}
          >
            <IconWell tone="sunken" size="lg" round>
              <FormatQuoteRoundedIcon />
            </IconWell>
            <Typography variant="h6" component="h3">
              Testimonials Coming Soon
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              We&apos;re collecting messages of gratitude from the charities we support. Check back soon to hear how your donations are making a difference!
            </Typography>
          </Surface>
        </Reveal>
      </Section>
    );
  }

  const single = testimonials.length === 1;

  return (
    <Section>
      <SectionHeading
        title={single ? "A Message of Gratitude" : "Words of Gratitude"}
        lead={
          single
            ? "Hear from the organization we've had the privilege to support"
            : "Hear from the organizations we've had the privilege to support"
        }
        align="center"
      />

      {single ? (
        // A single testimonial, centered and larger
        <Reveal>
          <Quote
            size="lg"
            text={testimonials[0].quote}
            author={testimonials[0].author}
            role={testimonials[0].role}
            avatar={testimonials[0].avatar}
            sx={{ maxWidth: 700, mx: "auto" }}
          />
        </Reveal>
      ) : (
        // Several testimonials in a grid
        <Stagger sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id} sx={{ display: "flex", minWidth: 0 }}>
              <Quote
                text={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                organization={testimonial.author === testimonial.organization ? undefined : testimonial.organization}
                avatar={testimonial.avatar}
                sx={{ width: "100%" }}
              />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </Section>
  );
};

// Main charities page component
export default function Charities() {
  const totalDonated = charitiesData.reduce((sum, charity) => sum + charity.amountDonated, 0);
  const totalCharities = charitiesData.length;

  return (
    <>
      <Seo title="Our Impact" description={HERO_LEAD} />

      {/* Hero with the impact stats */}
      <PageIntro title={HERO_TITLE} lead={HERO_LEAD}>
        <Reveal delay={0.16} y={12} sx={{ width: "100%", pt: 2 }}>
          <StatRow
            items={[
              { value: `$${totalDonated.toLocaleString()}`, label: "Total Donations", icon: <MonetizationOnRoundedIcon /> },
              { value: `${totalCharities}`, label: "Charities Supported", icon: <HandshakeRoundedIcon /> },
              { value: "100%", label: "Charitable Commitment", icon: <VolunteerActivismRoundedIcon /> },
            ]}
            columns={{ xs: 1, sm: 3 }}
            align="center"
          />
        </Reveal>
      </PageIntro>

      <PhotoCarousel />
      <CharitiesGrid />
      <TestimonialWall />

      {/* Call to action */}
      <CTABand
        title={<>Help Us Support More Causes</>}
        lead={<>Your donation directly supports these charities and helps us expand our impact in the community.</>}
        primary={{ label: "Donate Now", to: PathConstants.DONATE_NOW }}
      />
    </>
  );
}
