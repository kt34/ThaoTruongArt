import { Box, Typography } from '@mui/material';
import AnimatedSection from '../components/AnimatedSection';
import ArtworkCard from '../components/ArtworkCard';
import CommissionSection from '../components/CommissionSection';
import { Container } from '../components/Layout';
import type { Collection } from '../data/types';
import { colors } from '../constants';
import { headingText, bodyText, imageRadius } from '../styles';

// A gallery collection: banner (title, intro, feature photo), then a grid of its artworks.
const CollectionPage = ({ collection }: { collection: Collection }) => (
  <>
    <Box component="section" sx={{ bgcolor: colors.teal, color: colors.white, py: { xs: 4, md: 6 } }}>
      <Container>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'center' }}>
          <Box>
            <Typography component="h1" sx={{ ...headingText, fontSize: { xs: '2.4rem', md: '3.25rem' }, mb: 2.5 }}>
              {collection.title}
            </Typography>
            <Typography sx={{ ...bodyText, maxWidth: 520 }}>{collection.intro}</Typography>
          </Box>
          <Box
            component="img"
            src={collection.feature.src}
            alt={collection.feature.alt}
            sx={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', borderRadius: imageRadius, display: 'block' }}
          />
        </Box>
      </Container>
    </Box>

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
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Click any {collection.noun.singular} to see more photos
          </Box>
          <span>
            {collection.artworks.length} {collection.noun.plural}
          </span>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            columnGap: { xs: 2, sm: 3, md: 4 },
            rowGap: { xs: 5, md: 7 },
          }}
        >
          {collection.artworks.map((artwork, i) => (
            <AnimatedSection key={artwork.slug} delay={(i % 3) * 0.08}>
              <ArtworkCard artwork={artwork} collection={collection} eager={i < 3} />
            </AnimatedSection>
          ))}
        </Box>
      </Container>
    </Box>

    {collection.commission && <CommissionSection />}
  </>
);

export default CollectionPage;
