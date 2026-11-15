import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { Section, Container } from '../components/Layout';
import { headingText, imageRadius, headerOffset } from '../styles';
import { collections, colors, fonts } from '../constants';

const Collections = () => (
  <Section id="collections" bg={colors.teal} color={colors.white} sx={{ scrollMarginTop: headerOffset }}>
    <Container>
      <AnimatedSection>
        <Typography component="h2" sx={{ ...headingText, textAlign: 'center', mb: 1.5 }}>
          Gallery Collections
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: fonts.body,
            fontSize: { xs: '0.9rem', md: '1rem' },
            fontStyle: 'italic',
            letterSpacing: '0.08em',
            opacity: 0.8,
            mb: { xs: 5, md: 7 },
          }}
        >
          More collections coming soon
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
              {...(collection.href ? { component: RouterLink, to: collection.href } : {})}
              sx={{
                display: 'block',
                height: '100%',
                bgcolor: colors.cream,
                color: colors.black,
                textDecoration: 'none',
                borderRadius: imageRadius,
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                ...(collection.href && {
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 28px rgba(0,0,0,0.25)' },
                  '&:hover img': { transform: 'scale(1.05)' },
                  '&:focus-visible': { outline: `3px solid ${colors.blush}`, outlineOffset: 3 },
                }),
              }}
            >
              <Box sx={{ overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={collection.cover}
                  alt={collection.title}
                  loading="lazy"
                  sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: collection.coverPosition ?? 'center', transition: 'transform 0.5s ease' }}
                />
              </Box>
              <Box sx={{ textAlign: 'center', fontFamily: fonts.heading, fontSize: '1.15rem', py: 2.25, px: 1.5 }}>
                {collection.title}
                <Box component="span" sx={{ display: 'block', mt: 0.5, fontFamily: fonts.body, fontSize: '0.85rem', letterSpacing: '0.06em', color: collection.href ? colors.teal : 'text.secondary', fontStyle: collection.href ? 'normal' : 'italic' }}>
                  {collection.href ? 'View collection →' : 'Coming soon'}
                </Box>
              </Box>
            </Box>
          </AnimatedSection>
        ))}
      </Box>
    </Container>
  </Section>
);

export default Collections;
