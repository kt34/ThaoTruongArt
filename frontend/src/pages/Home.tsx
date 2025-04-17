import { Box, Typography, Button, Container } from '@mui/material';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 60; // Height of the navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box
      id="home"
      sx={{
        scrollMarginTop: '60px',
        paddingTop: '60px',
        marginTop: '-60px',
        py: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          bgcolor: 'background.default'
        }}
      >
        <Box
          component="img"
          src="/images/nature-image.jpg"
          alt="Featured Artwork"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))'
          }}
        />
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
            <AnimatedSection>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                Thao Truong Art
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Discover the beauty of contemporary art through my unique collection of paintings
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => scrollToSection('collections')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 6px 8px rgba(0,0,0,0.2)',
                    transform: 'translateY(-2px)'
                  },
                  outline: 'none',
                  '&:focus': { outline: 'none' },
                  '&:focus-visible': { outline: 'none' }
                }}
              >
                View Collections
              </Button>
            </AnimatedSection>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <AnimatedSection>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    color: 'secondary.main',
                    mb: 6,
                    textAlign: 'center',
                  }}
                >
                  About the Artist
                </Typography>
                <Typography variant="body1" paragraph>
                  Thao Truong is a contemporary artist based in Australia, specializing in fluid art and abstract paintings. Her work explores the intersection of color, movement, and emotion.
                </Typography>
                <Typography variant="body1">
                  With a background in fine arts and a passion for experimentation, Thao creates unique pieces that capture the essence of natural beauty and human expression.
                </Typography>
              </AnimatedSection>
            </Box>
            <Box sx={{ flex: 1 }}>
              <AnimatedSection delay={0.2}>
                <Box
                  component="img"
                  src="/images/thao-image.jpg"
                  alt="Artist at Work"
                  sx={{
                    width: '100%',
                    maxWidth: '450px',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'block',
                    mx: 'auto'
                  }}
                />
              </AnimatedSection>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 