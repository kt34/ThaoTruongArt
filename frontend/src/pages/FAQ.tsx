import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'How can I purchase artwork?',
    answer: 'You can purchase artwork directly through our website. Each piece will have a "Purchase" button that will guide you through the process. We accept various payment methods including credit cards and PayPal.'
  },
  {
    question: 'What is your shipping policy?',
    answer: 'We ship worldwide using trusted carriers. Shipping costs are calculated based on the size and weight of the artwork, as well as the destination. All artwork is carefully packaged to ensure safe delivery.'
  },
  {
    question: 'Do you accept commissions?',
    answer: 'Yes, we accept commissions for custom artwork. Please contact us through the contact form with your requirements, and we\'ll discuss the details and pricing.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We want you to be completely satisfied with your purchase. If you\'re not happy with your artwork, you can return it within 14 days of receipt for a full refund, minus shipping costs.'
  }
];

const FAQ = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8, scrollMarginTop: '60px' }}>
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
                '&:focus': { outline: 'none' },
                '&:focus-visible': { outline: 'none' }
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