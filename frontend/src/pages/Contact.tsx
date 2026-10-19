import { Box, Typography } from '@mui/material';
import AnimatedSection from '../components/AnimatedSection';
import EmailActions from '../components/EmailActions';
import { Section, Container } from '../components/Layout';
import { headingText, bodyText, imageRadius, softShadow, headerOffset } from '../styles';
import { colors, fonts } from '../constants';

const Contact = () => {
  return (
    <Section
      id="contact"
      bg={colors.teal}
      color={colors.white}
      sx={{ scrollMarginTop: headerOffset, borderTop: '1px solid rgba(255,255,255,0.15)' }}
    >
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 5, md: 8 },
          alignItems: 'center',
        }}
      >
        <AnimatedSection>
          <Typography component="h2" sx={{ ...headingText, mb: 2 }}>
            Contact
          </Typography>
          <Typography component="p" sx={{ fontFamily: fonts.heading, fontSize: { xs: '1.35rem', md: '1.6rem' }, mb: 3, color: colors.blush }}>
            I’d love to hear from you
          </Typography>
          <Typography sx={{ ...bodyText, mb: 2 }}>
            Whether you have a question about my artwork, are interested in commissioning a custom piece,
            enquiring about workshops, or simply want to say hello, please feel free to get in touch.
          </Typography>
          <Typography sx={{ ...bodyText, fontStyle: 'italic' }}>
            Thank you for visiting Joyful Art GetAway.
          </Typography>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <Box sx={{ bgcolor: colors.cream, color: colors.black, borderRadius: imageRadius, boxShadow: softShadow, overflow: 'hidden' }}>
            {/* Colour bands echo the palette used throughout the site. */}
            <Box sx={{ display: 'flex', height: 10 }}>
              {[colors.sage, colors.blush, colors.rose, colors.plum, colors.sand].map((c) => (
                <Box key={c} sx={{ flex: 1, bgcolor: c }} />
              ))}
            </Box>

            <Box sx={{ p: { xs: 3, sm: 4.5 } }}>
              <Typography component="h3" sx={{ fontFamily: fonts.heading, fontSize: '1.2rem', mb: 2.5 }}>
                Send me an email
              </Typography>
              <EmailActions showAddress subject="Hello from your website" body={'Hi Thao,\n\n'} />
            </Box>
          </Box>
        </AnimatedSection>
      </Container>
    </Section>
  );
};

export default Contact;
