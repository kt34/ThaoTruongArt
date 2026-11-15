import { Box, Typography } from '@mui/material';
import { Brush, MailOutline, PhotoCamera } from '@mui/icons-material';
import AnimatedSection from './AnimatedSection';
import EmailActions from './EmailActions';
import { Section, Container } from './Layout';
import { colors, fonts } from '../constants';
import { headingText } from '../styles';

const steps = [
  {
    icon: <MailOutline />,
    title: 'Get in touch',
    text: 'Tell me about your pet and the canvas size you have in mind.',
  },
  {
    icon: <PhotoCamera />,
    title: 'Send your photos',
    text: 'A few clear, well-lit photos taken at your pet’s eye level work best.',
  },
  {
    icon: <Brush />,
    title: 'Your portrait',
    text: 'Hand-painted in oil, with a signed certificate of authenticity.',
  },
];

const emailBody = 'Hi Thao,\n\nI would love to commission a pet portrait.\n\nAbout my pet:\nCanvas size:\n\n';

// "Commission a pet portrait" call to action, shown at the end of the gallery and of each portrait page.
const CommissionSection = () => (
  <Section id="commission" bg={colors.teal} color={colors.white}>
    <Container sx={{ maxWidth: 1000, textAlign: 'center' }}>
      <AnimatedSection>
        <Typography component="h2" sx={{ ...headingText, mb: 2 }}>
          Commission a pet portrait
        </Typography>
        <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.7, opacity: 0.9, maxWidth: 560, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          A one-of-a-kind painting of your companion, made from your favourite photos.
        </Typography>
      </AnimatedSection>

      <Box
        component="ol"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 4.5, md: 6 },
          mb: { xs: 6, md: 7 },
        }}
      >
        {steps.map((step, i) => (
          <AnimatedSection key={step.title} delay={i * 0.1}>
            <Box component="li">
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  mx: 'auto',
                  mb: 2,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.blush,
                }}
              >
                {step.icon}
              </Box>
              <Typography sx={{ fontFamily: fonts.body, fontSize: '0.8rem', letterSpacing: '0.18em', opacity: 0.7, mb: 0.75 }}>
                STEP {i + 1}
              </Typography>
              <Typography component="h3" sx={{ fontFamily: fonts.body, fontSize: '1.2rem', mb: 1 }}>
                {step.title}
              </Typography>
              <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.65, opacity: 0.85, maxWidth: 280, mx: 'auto' }}>{step.text}</Typography>
            </Box>
          </AnimatedSection>
        ))}
      </Box>

      <AnimatedSection delay={0.2}>
        <EmailActions subject="Pet portrait commission" body={emailBody} align="center" onDark />
      </AnimatedSection>
    </Container>
  </Section>
);

export default CommissionSection;
