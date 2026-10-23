import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Reveal } from "../motion";

// Questions and answers as hairline accordions.
export default function FAQ({ items, defaultOpen = null, idPrefix = "faq", sx }) {
  return (
    <Reveal>
      <Box sx={sx}>
        {items.map((item, i) => (
          <Accordion key={item.question} defaultExpanded={defaultOpen === i}>
            <AccordionSummary
              expandIcon={<ExpandMoreRoundedIcon />}
              aria-controls={`${idPrefix}-${i}-content`}
              id={`${idPrefix}-${i}-header`}
            >
              <Typography variant="h6" component="h3">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails id={`${idPrefix}-${i}-content`}>
              {typeof item.answer === "string" ? (
                <Typography variant="body1" sx={(theme) => ({ color: theme.vars.palette.text.secondary, maxWidth: "68ch" })}>
                  {item.answer}
                </Typography>
              ) : (
                item.answer
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Reveal>
  );
}

FAQ.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.node.isRequired,
      answer: PropTypes.node.isRequired,
    })
  ).isRequired,
  defaultOpen: PropTypes.number,
  idPrefix: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
