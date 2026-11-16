import { Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import CommissionSection from '../components/CommissionSection';
import ArtworkCard from '../components/ArtworkCard';
import EnquireButton from '../components/EnquireButton';
import { Container } from '../components/Layout';
import type { Collection } from '../data/types';
import { COLLECTIONS_BASE } from '../data/collections';
import { colors, fonts } from '../constants';

const MORE_COUNT = 3;

// One artwork: gallery with the name (and any details) beside it, then more from the collection.
const ArtworkPage = ({ collection }: { collection: Collection }) => {
  const { slug } = useParams();
  const { artworks } = collection;
  const index = artworks.findIndex((a) => a.slug === slug);
  if (index === -1) return <Navigate to={`${COLLECTIONS_BASE}/${collection.slug}`} replace />;

  const artwork = artworks[index];
  // The next few artworks in order, wrapping round to the start.
  const more = Array.from({ length: MORE_COUNT }, (_, i) => artworks[(index + 1 + i) % artworks.length]);

  const sidebar = (
    <Box>
      {collection.tags && (
        <Typography sx={{ fontSize: '0.78rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'text.secondary', mb: 1.25 }}>
          {collection.tags.join(' · ')}
        </Typography>
      )}
      <Typography
        component="h1"
        sx={{ fontFamily: fonts.heading, fontWeight: 400, fontSize: { xs: '1.8rem', md: '2.2rem' }, lineHeight: 1.2, letterSpacing: '0.01em', color: colors.teal, m: 0 }}
      >
        {artwork.name}
      </Typography>

      {artwork.details && (
        <Box
          component="dl"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: 2.5,
            rowGap: 1,
            m: 0,
            mt: 2.5,
            pt: 2.5,
            borderTop: '1px solid rgba(0,0,0,0.12)',
            fontSize: '1rem',
          }}
        >
          {artwork.details.map((d) => (
            <Box key={d.label} sx={{ display: 'contents' }}>
              <Box component="dt" sx={{ color: 'text.secondary' }}>
                {d.label}
              </Box>
              <Box component="dd" sx={{ m: 0 }}>
                {d.value}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {collection.enquire && (
        <Box sx={{ mt: 2.5 }}>
          <EnquireButton artworkName={artwork.name} />
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <Box component="section" sx={{ bgcolor: colors.cream, color: colors.black, pt: { xs: 4, md: 6 }, pb: { xs: 7, md: 10 } }}>
        <Container>
          <Box
            component={RouterLink}
            to={`${COLLECTIONS_BASE}/${collection.slug}`}
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
            <ArrowBack fontSize="small" /> {collection.title}
          </Box>

          {/* Keyed by artwork so the gallery starts at the first image on each page. */}
          <ImageCarousel
            key={artwork.slug}
            images={artwork.images}
            alt={`${collection.title}: ${artwork.name}`}
            title={sidebar}
            mobileTitleFirst={collection.mobileTitleFirst}
          />
        </Container>
      </Box>

      <Box component="section" sx={{ bgcolor: colors.cream, color: colors.black, pb: { xs: 7, md: 10 } }}>
        <Container>
          <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.12)', pt: { xs: 5, md: 7 } }}>
            <Typography component="h2" sx={{ fontFamily: fonts.heading, fontWeight: 400, fontSize: { xs: '1.6rem', md: '2rem' }, color: colors.teal, textAlign: 'center', mb: { xs: 4, md: 5 } }}>
              More from {collection.title}
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
              {more.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} collection={collection} />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {collection.commission && <CommissionSection />}
    </>
  );
};

export default ArtworkPage;
