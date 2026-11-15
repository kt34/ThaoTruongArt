import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { PetPortrait } from '../data/petPortraits';
import { colors, fonts } from '../constants';

// Grid tile for one pet portrait: artwork, name and a "View portrait" pill, all one link.
const PortraitCard = ({ pet, eager = false }: { pet: PetPortrait; eager?: boolean }) => (
  <Box
    component={RouterLink}
    to={`/collections/pet-portraits/${pet.slug}`}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      color: colors.black,
      textDecoration: 'none',
      '&:focus-visible': { outline: `3px solid ${colors.teal}`, outlineOffset: 4 },
      '&:hover img': { transform: 'scale(1.04)' },
      '&:hover .card-cta': { bgcolor: colors.teal, color: colors.white },
    }}
  >
    <Box sx={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', bgcolor: 'rgba(14,40,65,0.06)' }}>
      <Box
        component="img"
        src={pet.card}
        alt={`Pet portrait: ${pet.name}`}
        loading={eager ? 'eager' : 'lazy'}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
      />
    </Box>

    <Box sx={{ fontFamily: fonts.heading, fontSize: { xs: '1rem', md: '1.15rem' }, textAlign: 'center', mt: 2, mb: 1.75 }}>{pet.name}</Box>

    <Box
      className="card-cta"
      component="span"
      sx={{
        mt: 'auto',
        width: '100%',
        maxWidth: 240,
        py: { xs: 0.75, sm: 1 },
        textAlign: 'center',
        border: `1px solid ${colors.teal}`,
        borderRadius: 999,
        color: colors.teal,
        fontSize: '0.92rem',
        letterSpacing: '0.04em',
        transition: 'background-color 0.25s ease, color 0.25s ease',
      }}
    >
      View portrait
    </Box>
  </Box>
);

export default PortraitCard;
