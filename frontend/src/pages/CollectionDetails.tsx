import { Box, Typography, Container, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

// Temporary mock data - replace with your actual data
const collectionsData = {
  'fluid-art': {
    title: 'Fluid Art Collection',
    description: 'A mesmerizing collection of fluid art paintings that capture the beauty of color and movement.',
    paintings: [
      {
        id: 1,
        title: 'Ocean Flow',
        image: '/images/fluid-painting.jpg',
        description: 'A vibrant piece inspired by ocean waves',
        price: '$450',
        dimensions: '24" x 36"',
        year: '2023'
      },
      {
        id: 2,
        title: 'Color Burst',
        image: '/images/nature-image.jpg',
        description: 'Explosion of colors in perfect harmony',
        price: '$380',
        dimensions: '20" x 30"',
        year: '2023'
      }
    ]
  },
  'australian-birds': {
    title: 'Nature Collection',
    description: 'Inspired by the beauty of the natural world.',
    paintings: [
      {
        id: 3,
        title: 'Mountain Sunrise',
        image: '/images/nature-image2.jpg',
        description: 'Capturing the first light of day',
        price: '$520',
        dimensions: '30" x 40"',
        year: '2023'
      }
    ]
  },
  'female-figures': {
    title: 'Portrait Collection',
    description: 'Expressive portraits that capture the essence of the subject.',
    paintings: [
      {
        id: 4,
        title: 'Grace',
        image: '/images/female-figure.jpg',
        description: 'A study in elegance and poise',
        price: '$600',
        dimensions: '24" x 36"',
        year: '2023'
      }
    ]
  },
  'pet-portraits': {
    title: 'Pet Portraits Collection',
    description: 'Capturing the unique personalities of our furry friends.',
    paintings: [
      {
        id: 5,
        title: 'Whiskers',
        image: '/images/pet-painting.jpg',
        description: 'A portrait of a playful cat',
        price: '$480',
        dimensions: '20" x 30"',
        year: '2023'
      }
    ]
  }
};

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const collection = collectionsData[collectionId as keyof typeof collectionsData];

  if (!collection) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 8
      }}>
        <Typography variant="h4">Collection not found</Typography>
        <Button 
          onClick={() => navigate('/')} 
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
        >
          Return to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      pt: { xs: '64px', sm: '64px' } // Account for navbar height
    }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
        <AnimatedSection>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            {collection.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
            {collection.description}
          </Typography>
        </AnimatedSection>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          maxWidth: '1200px',
          mx: 'auto',
          px: 2
        }}>
          {collection.paintings.map((painting, index) => (
            <Box key={painting.id}>
              <AnimatedSection delay={index * 0.1}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={painting.image}
                    alt={painting.title}
                    sx={{ 
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                  <CardContent sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {painting.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {painting.description}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Typography variant="body2" color="text.secondary">
                        {painting.dimensions} • {painting.year}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                        {painting.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CollectionDetail; 