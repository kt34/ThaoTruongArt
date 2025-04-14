import { Box, Typography, Container } from '@mui/material';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  return (
    <Box sx={{ py: 2, scrollMarginTop: '60px' }}>
      <Container maxWidth="lg">
        <AnimatedSection>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'secondary.main',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Welcome to Thao Truong Art
          </Typography>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: 'text.secondary',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Discover the intersection of AI and human creativity
          </Typography>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <Box
            component="img"
            src="/images/nature-image.jpg"
            alt="Featured Artwork"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '600px',
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </AnimatedSection>
      </Container>
    </Box>
  );
};

export default Home; 