import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Artwork, Collection } from '../data/types';
import { colors, fonts } from '../constants';

interface ArtworkCardProps {
  artwork: Artwork;
  collection: Collection;
  eager?: boolean;
}

// Grid tile for one artwork: image, name and a "View" pill, all one link.
const ArtworkCard = ({ artwork, collection, eager = false }: ArtworkCardProps) => {
  const contain = collection.cardFit === 'contain';

  return (
    <Box
      component={RouterLink}
      to={`/collections/${collection.slug}/${artwork.slug}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        color: colors.black,
        textDecoration: 'none',
        '&:focus-visible': { outline: `3px solid ${colors.teal}`, outlineOffset: 4 },
        '&:hover img': { transform: 'scale(1.04)' },
        // Fade to the hover image (only on devices with a mouse).
        '@media (hover: hover)': { '&:hover .card-hover, &:focus-visible .card-hover': { opacity: 1 } },
        '&:hover .card-cta': { bgcolor: colors.teal, color: colors.white },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          bgcolor: 'rgba(14,40,65,0.06)',
          // Whole-painting tiles sit on the light background with a little breathing room.
          ...(contain && { p: { xs: 1.5, md: 2.5 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }),
        }}
      >
        <Box
          component="img"
          src={artwork.card}
          alt={`${collection.title}: ${artwork.name}`}
          loading={eager ? 'eager' : 'lazy'}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: contain ? 'contain' : 'cover',
            display: 'block',
            transition: 'transform 0.6s ease',
            ...(contain && { filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))' }),
          }}
        />
        {artwork.cardHover && (
          <Box
            className="card-hover"
            component="img"
            src={artwork.cardHover}
            alt=""
            loading="lazy"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0,
              transition: 'opacity 0.45s ease, transform 0.6s ease',
            }}
          />
        )}
      </Box>

      <Box sx={{ fontFamily: fonts.heading, fontSize: { xs: '1rem', md: '1.15rem' }, textAlign: 'center', mt: 2, mb: 1.75 }}>
        {artwork.name}
      </Box>

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
        View {collection.noun.singular}
      </Box>
    </Box>
  );
};

export default ArtworkCard;
