import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { Section, Container } from '../components/Layout';
import { headingText, imageRadius, headerOffset } from '../styles';
import { collections, colors, fonts } from '../constants';

const Collections = () => (
  <Section id="collections" bg={colors.teal} color={colors.white} sx={{ scrollMarginTop: headerOffset }}>
    <Container>
      <AnimatedSection>
        <Typography component="h2" sx={{ ...headingText, textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          Gallery Collections
        </Typography>
      </AnimatedSection>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 3, md: 3.5 },
        }}
      >
        {collections.map((collection, index) => (
          <AnimatedSection key={collection.id} delay={index * 0.08}>
            <Box
              component={Link}
              to={`/collections/${collection.id}`}
              sx={{
                display: 'block',
                height: '100%',
                bgcolor: colors.cream,
                color: colors.black,
                borderRadius: imageRadius,
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover, &:focus-visible': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 16px 34px rgba(0,0,0,0.25)',
                },
                '&:hover img': { transform: 'scale(1.05)' },
                '&:focus-visible': { outline: `3px solid ${colors.cream}`, outlineOffset: 4 },
              }}
            >
              <Box sx={{ overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={collection.cover}
                  alt={collection.title}
                  loading="lazy"
                  sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
              </Box>
              <Box sx={{ textAlign: 'center', fontFamily: fonts.heading, fontSize: '1.15rem', py: 2.25, px: 1.5 }}>
                {collection.title}
              </Box>
            </Box>
          </AnimatedSection>
        ))}
      </Box>
    </Container>
  </Section>
);

export default Collections;
