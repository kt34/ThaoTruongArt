import { Box, Typography } from '@mui/material';
import AnimatedSection from '../components/AnimatedSection';
import CommissionSection from '../components/CommissionSection';
import PortraitCard from '../components/PortraitCard';
import { Container } from '../components/Layout';
import { petPortraits, PET_PORTRAITS_INTRO, PET_PORTRAITS_FEATURE } from '../data/petPortraits';
import { colors } from '../constants';
import { headingText, bodyText, imageRadius } from '../styles';

const PetPortraits = () => (
  <>
    {/* Banner: title and intro on the left, feature photo on the right. */}
    <Box component="section" sx={{ bgcolor: colors.teal, color: colors.white, py: { xs: 4, md: 6 } }}>
      <Container>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'center' }}>
          <Box>
            <Typography component="h1" sx={{ ...headingText, fontSize: { xs: '2.4rem', md: '3.25rem' }, mb: 2.5 }}>
              Pet Portraits
            </Typography>
            <Typography sx={{ ...bodyText, maxWidth: 520 }}>{PET_PORTRAITS_INTRO}</Typography>
          </Box>
          <Box
            component="img"
            src={PET_PORTRAITS_FEATURE}
            alt="The Awesome Three, a pet portrait of a dog and two cats, on an easel in the studio"
            sx={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', borderRadius: imageRadius, display: 'block' }}
          />
        </Box>
      </Container>
    </Box>

    {/* Artwork grid. */}
    <Box component="section" sx={{ bgcolor: colors.cream, color: colors.black, py: { xs: 5, md: 7 } }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            pb: 2,
            mb: { xs: 3, md: 4 },
            borderBottom: '1px solid rgba(0,0,0,0.12)',
            fontSize: '0.92rem',
            color: 'text.secondary',
            letterSpacing: '0.04em',
          }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Click a portrait to see more photos</Box>
          <span>{petPortraits.length} portraits</span>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            columnGap: { xs: 2, sm: 3, md: 4 },
            rowGap: { xs: 5, md: 7 },
          }}
        >
          {petPortraits.map((pet, i) => (
            <AnimatedSection key={pet.slug} delay={(i % 3) * 0.08}>
              <PortraitCard pet={pet} eager={i < 3} />
            </AnimatedSection>
          ))}
        </Box>
      </Container>
    </Box>

    <CommissionSection />
  </>
);

export default PetPortraits;
