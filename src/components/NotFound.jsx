import Box from "@mui/material/Box";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Seo, PageIntro, ActionButton, Section } from "../kit";
import PathConstants from "../routes/pathConstants";

// The page shown for any address that does not exist on the site.
export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="That page does not exist on the Enlighten Learning site." noindex />
      <PageIntro
        eyebrow="404"
        title="Page not found"
        lead="We could not find that page. It may have moved, or the link may be out of date."
        actions={
          <ActionButton to={PathConstants.HOME} startIcon={<HomeRoundedIcon />} magnetic>
            Home
          </ActionButton>
        }
      />
      <Section size="sm">
        <Box sx={{ minHeight: { xs: 80, md: 160 } }} />
      </Section>
    </>
  );
}
