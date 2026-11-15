import { Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import CommissionSection from '../components/CommissionSection';
import PortraitCard from '../components/PortraitCard';
import { Container } from '../components/Layout';
import { petPortraits } from '../data/petPortraits';
import { colors, fonts } from '../constants';

const MORE_COUNT = 3;

const PetPortraitDetail = () => {
  const { slug } = useParams();
  const index = petPortraits.findIndex((p) => p.slug === slug);
  if (index === -1) return <Navigate to="/collections/pet-portraits" replace />;

  const pet = petPortraits[index];
  // The next few portraits in order, wrapping round to the start.
  const more = Array.from({ length: MORE_COUNT }, (_, i) => petPortraits[(index + 1 + i) % petPortraits.length]);

  return (
    <>
      <Box component="section" sx={{ bgcolor: colors.cream, color: colors.black, pt: { xs: 4, md: 6 }, pb: { xs: 7, md: 10 } }}>
        <Container>
          <Box
            component={RouterLink}
            to="/collections/pet-portraits"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              mb: { xs: 3, md: 4 },
              color: colors.teal,
              textDecoration: 'none',
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              '&:hover': { textDecoration: 'underline', textUnderlineOffset: 4 },
            }}
          >
            <ArrowBack fontSize="small" /> All pet portraits
          </Box>

          {/* Keyed by portrait so the gallery starts at the first image on each page. */}
          <ImageCarousel
            key={pet.slug}
            images={pet.images}
            alt={`Pet portrait of ${pet.name}`}
            title={
              <Typography
                component="h1"
                sx={{ fontFamily: fonts.heading, fontWeight: 400, fontSize: { xs: '1.8rem', md: '2.2rem' }, lineHeight: 1.2, letterSpacing: '0.01em', color: colors.teal, m: 0 }}
              >
                {pet.name}
              </Typography>
            }
          />
        </Container>
      </Box>

      <Box component="section" sx={{ bgcolor: colors.cream, color: colors.black, pb: { xs: 7, md: 10 } }}>
        <Container>
          <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.12)', pt: { xs: 5, md: 7 } }}>
            <Typography component="h2" sx={{ fontFamily: fonts.heading, fontWeight: 400, fontSize: { xs: '1.6rem', md: '2rem' }, color: colors.teal, textAlign: 'center', mb: { xs: 4, md: 5 } }}>
              More pet portraits
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
                gap: { xs: 2, sm: 3, md: 4 },
                rowGap: { xs: 5 },
                // Two columns on phones: drop the third card rather than leave it alone on a row.
                '& > :nth-of-type(3)': { display: { xs: 'none', sm: 'flex' } },
              }}
            >
              {more.map((p) => (
                <PortraitCard key={p.slug} pet={p} />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <CommissionSection />
    </>
  );
};

export default PetPortraitDetail;
