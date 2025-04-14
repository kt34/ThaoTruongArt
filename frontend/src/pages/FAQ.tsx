import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'Commissions',
    answer: 'Thao Truong is a self-taught artist whose work blends AI-generated elements with human creativity, crafting visually striking narratives that blur the line between technology and traditional storytelling. Based in Sydney, her artistic vision is deeply influenced by the intersection of digital media, storytelling, and human emotion.',
  },
  {
    question: 'Returns',
    answer: 'Through her work, Thao explores themes of identity, memory, and the evolving role of artificial intelligence in artistic expression. She utilizes AI-generated compositions as a foundation, refining them with her own creative touch to evoke depth, nuance, and emotion. Her pieces often feature surreal, dreamlike imagery, drawing inspiration from mythology, personal experiences, and the fluidity of human imagination.',
  },
  {
    question: 'Damages and Issues',
    answer: "Thao's creative journey is driven by a fascination with how technology can enhance artistic expression rather than replace it. Her work has gained recognition among digital art communities and collectors, with pieces showcased in private collections both in Australia and internationally.",
  },
  {
    question: 'Exceptions',
    answer: "Thao's creative journey is driven by a fascination with how technology can enhance artistic expression rather than replace it. Her work has gained recognition among digital art communities and collectors, with pieces showcased in private collections both in Australia and internationally.",
  },
];

const FAQ = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: 'secondary.main',
          mb: 6,
          textAlign: 'center',
        }}
      >
        FAQs
      </Typography>
      <Box sx={{ width: '100%' }}>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: 'background.paper',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Typography variant="h6" sx={{ color: 'secondary.main' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ; 