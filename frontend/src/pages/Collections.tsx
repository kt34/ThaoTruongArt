import { Box, Typography, Container, Card, CardContent, CardMedia } from '@mui/material';
import AnimatedSection from '../components/AnimatedSection';

const Collections = () => {
  const collections = [
    {
      title: 'Australian Birds',
      image: '/images/australian-bird.jpg',
      description: 'Australia is home to a diverse range of bird species, many of which are found nowhere else in the world. From the vibrant Rainbow Lorikeet and the iconic Laughing Kookaburra to the strikingly intelligent Australian Magpie, the country\'s birdlife is colorful and unique.'
    },
    {
      title: 'Female Figures',
      image: '/images/female-figure.jpg',
      description: 'Australia is home to a diverse range of bird species, many of which are found nowhere else in the world. From the vibrant Rainbow Lorikeet and the iconic Laughing Kookaburra to the strikingly intelligent Australian Magpie, the country\'s birdlife is colorful and unique.'
    },
    {
      title: 'Pet Portraits',
      image: '/images/pet-painting.jpg',
      description: 'Australia is home to a diverse range of bird species, many of which are found nowhere else in the world. From the vibrant Rainbow Lorikeet and the iconic Laughing Kookaburra to the strikingly intelligent Australian Magpie, the country\'s birdlife is colorful and unique.'
    },
    {
      title: 'Fluid Art',
      image: '/images/fluid-painting.jpg',
      description: 'Australia is home to a diverse range of bird species, many of which are found nowhere else in the world. From the vibrant Rainbow Lorikeet and the iconic Laughing Kookaburra to the strikingly intelligent Australian Magpie, the country\'s birdlife is colorful and unique.'
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
              mb: 4,
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
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={collection.image}
                  alt={collection.title}
                  sx={{
                    objectFit: 'cover'
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {collection.title}
                  </Typography>
                  <Typography>
                    {collection.description}
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