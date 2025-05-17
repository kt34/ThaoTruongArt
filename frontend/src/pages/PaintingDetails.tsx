import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

const collectionsData = {
    'fluid-art': {
      title: 'Fluid Art',
      description: 'A mesmerizing collection of fluid art paintings that capture the beauty of color and movement.',
      paintings: [
        {
          id: 1,
          title: "Natural's Blend",
          image: '/images/fluid-art/Natural-Blend-1.jpg',
          description: 'A vibrant piece inspired by ocean waves',
          price: '$450',
          dimensions: '24" x 36"',
          year: '2023'
        },
        {
          id: 2,
          title: 'Spring Aroma',
          image: '/images/fluid-art/spring-aroma.png',
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 3,
          title: 'Red Desert',
          image: '/images/fluid-art/red-dessert.jpg',
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 4,
          title: "Colour's Dance",
          image: '/images/fluid-art/colours-dance.jpg',
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 5,
          title: 'Aqua Swash',
          image: '/images/fluid-art/aqua-swash.png',
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 6,
          title: 'The Harmony',
          image: '/images/fluid-art/the-harmony.png',
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 7,
          title: 'Blue Lagoon',
          image: '/images/fluid-art/blue-lagoon.jpg',
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 8,
          title: 'Contours',
          image: '/images/fluid-art/contours.jpg',
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        }
      ]
    },
    'australian-birds': {
      title: 'Australian Birds',
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
      title: 'Female Figures',
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
      title: 'Pet Portraits',
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

  const PaintingDetail = () => {
    const { collectionId, paintingId } = useParams();
    const navigate = useNavigate();
  
    const collection = collectionsData[collectionId as keyof typeof collectionsData];
    const painting = collection?.paintings.find(p => p.id === Number(paintingId));
  
    if (!painting) {
      return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: 2 }}>
          <Typography variant="h4">Painting not found</Typography>
          <Button onClick={() => navigate(-1)} sx={{ mt: 2 }} variant="contained">
            Go Back
          </Button>
        </Box>
      );
    }
  
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9', py: 6 }}>
        <Container maxWidth="md">
          <Box component="img"
            src={painting.image}
            alt={painting.title}
            sx={{ 
              width: '100%', 
              borderRadius: 2, 
              objectFit: 'contain', 
              mb: 4 
            }}
          />
          <Typography variant="h3" gutterBottom>{painting.title}</Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            {painting.description}
          </Typography>
          <Typography variant="body1" paragraph>
            Dimensions: {painting.dimensions}
          </Typography>
          <Typography variant="body1" paragraph>
            Year: {painting.year}
          </Typography>
          <Typography variant="h5" color="primary">{painting.price}</Typography>
  
          <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 4 }}>
            Back to Collection
          </Button>
        </Container>
      </Box>
    );
  };
  
export default PaintingDetail;
