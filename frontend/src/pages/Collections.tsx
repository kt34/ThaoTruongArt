import { Box, Typography, Container, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const Collections = () => {
  const collections = [
    {
      title: 'Australian Birds',
      image: '/images/australian-bird.jpg',
      path: '/collections/australian-birds'
    },
    {
      title: 'Female Figures',
      image: '/images/female-figure.jpg',
      path: '/collections/female-figures'
    },
    {
      title: 'Pet Portraits',
      image: '/images/pet-painting.jpg',
      path: '/collections/pet-portraits'
    },
    {
      title: 'Fluid Art',
      image: '/images/fluid-art/aqua-swash-1.jpg',
      path: '/collections/fluid-art'
    }
  ];

  return (
    <Box sx={{ py: 2, scrollMarginTop: '60px', width: '100%', maxWidth: '100%' }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <AnimatedSection>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'secondary.main',
              mb: 7,
              textAlign: 'center',
            }}
          >
            Collections
          </Typography>
        </AnimatedSection>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(4, 1fr)' 
          }, 
          gap: 4,
          width: '100%',
          maxWidth: '100%'
        }}>
          {collections.map((collection, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card
                component={Link}
                to={collection.path}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  color: 'inherit',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    color: 'inherit',
                    textDecoration: 'none',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={collection.image}
                  alt={collection.title}
                  sx={{
                    width: '100%',
                    aspectRatio: '3/2',
                    objectFit: 'contain',
                    backgroundColor: 'white',
                    display: 'block',
                    padding: '20px'
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {collection.title}
                  </Typography>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Collections; 