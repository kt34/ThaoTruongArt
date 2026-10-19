import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { HEADER_OFFSET } from './constants';
import { collections, colors, fonts } from '../constants';

// Card widths and image shapes follow slide 6; the cards share a centre line, giving the staggered look.
const layout: Record<string, { column: string; aspect: string }> = {
  'australian-birds': { column: '23.2fr', aspect: '3 / 4' },
  'pet-portraits': { column: '23.9fr', aspect: '4 / 3' },
  'women-figures': { column: '19fr', aspect: '3 / 4' },
  'fluid-art': { column: '22.5fr', aspect: '4 / 5' },
};

const Collections = () => (
  <Box
    id="collections"
    component="section"
    sx={{
      bgcolor: colors.teal,
      scrollMarginTop: `${HEADER_OFFSET}px`,
      px: { xs: 2, sm: 3, md: '1.6%' },
      pt: { xs: 6, md: '3.4vw' },
      pb: { xs: 8, md: '7vw' },
    }}
  >
    <Typography
      component="h2"
      sx={{
        fontFamily: fonts.heading,
        color: colors.white,
        fontSize: { xs: '2.2rem', md: 'min(3.75vw, 3.6rem)' },
        mb: { xs: 4, md: '5.5vw' },
        ml: { md: '0.6%' },
      }}
    >
      Gallery Collections
    </Typography>

    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: collections.map((c) => layout[c.id].column).join(' '),
        },
        columnGap: { sm: 3, md: '2.6%' },
        rowGap: { xs: 4, sm: 5 },
        alignItems: 'center',
      }}
    >
      {collections.map((collection, index) => (
        <AnimatedSection key={collection.id} delay={index * 0.1}>
          <Box
            component={Link}
            to={`/collections/${collection.id}`}
            sx={{
              display: 'block',
              color: colors.black,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover, &:focus-visible': {
                transform: 'translateY(-8px)',
                boxShadow: '0 14px 30px rgba(0,0,0,0.28)',
              },
              '&:hover img': { transform: 'scale(1.04)' },
              '&:focus-visible': { outline: `3px solid ${colors.cream}`, outlineOffset: 4 },
            }}
          >
            <Box sx={{ overflow: 'hidden', bgcolor: colors.cream }}>
              <Box
                component="img"
                src={collection.cover}
                alt={collection.title}
                loading="lazy"
                sx={{
                  width: '100%',
                  aspectRatio: { xs: '4 / 3', sm: layout[collection.id].aspect },
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
            </Box>
            <Box
              sx={{
                bgcolor: colors.cream,
                textAlign: 'center',
                fontFamily: fonts.heading,
                fontSize: { xs: '1.2rem', md: 'min(1.85vw, 1.7rem)' },
                py: { xs: 2, md: '1.4vw' },
                px: 1,
              }}
            >
              {collection.title}
            </Box>
          </Box>
        </AnimatedSection>
      ))}
    </Box>
  </Box>
);

export default Collections;
