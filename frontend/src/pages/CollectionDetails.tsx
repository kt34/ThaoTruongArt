import { Box, Typography, Container, Card, CardMedia, CardContent, Button, TextField, Alert, CircularProgress } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';

// Temporary mock data - replace with your actual data
const collectionsData = {
  'fluid-art': {
    title: 'Fluid Art',
    description: 'A mesmerizing collection of fluid art paintings that capture the beauty of color and movement.',
    paintings: [
      {
        id: 1,
        title: "Natural's Blend",
        image: '/images/fluid-art/natural-blend-1.jpg'
      },
      {
        id: 2,
        title: 'Spring Aroma',
        image: '/images/fluid-art/spring-aroma-1.jpg'
      },
      {
        id: 3,
        title: 'Red Desert',
        image: '/images/fluid-art/red-desert-1.jpg',
        description: 'Explosion of colors in perfect harmony',
        price: '$380',
        dimensions: '20" x 30"',
        year: '2023'
      },
      {
        id: 4,
        title: "Colour's Dance",
        image: '/images/fluid-art/colour-dance-1.jpg',
        description: 'Explosion of colors in perfect harmony',
        price: '$380',
        dimensions: '20" x 30"',
        year: '2023'
      },
      {
        id: 5,
        title: 'Aqua Swash',
        image: '/images/fluid-art/aqua-swash-1.jpg',
        description: 'Explosion of colors in perfect harmony',
        price: '$380',
        dimensions: '20" x 30"',
        year: '2023'
      },
      {
        id: 6,
        title: 'The Harmony',
        image: '/images/fluid-art/the-harmony-1.jpg',
        description: 'Explosion of colors in perfect harmony',
        price: '$380',
        dimensions: '20" x 30"',
        year: '2023'
      },
      {
        id: 7,
        title: 'Blue Lagoon',
        image: '/images/fluid-art/blue-lagoon-1.jpg',
        description: 'Explosion of colors in perfect harmony',
        price: '$380',
        dimensions: '20" x 30"',
        year: '2023'
      },
      {
        id: 8,
        title: 'Contours',
        image: '/images/fluid-art/contours-1.jpg',
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
        id: 9,
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
        id: 10,
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
    description: 'Artworks are a unique way of preserving cherished moments with our loved ones, and pets are no exception. Commision a unique pet portrait of your beloved pet, or gift one to a friend for a special occasion! Each painting is made with quality oil paint and inclues a signed certificate of authenticity.',
    paintings: [
      {
        id: 11,
        title: 'Whiskers',
        image: '/images/pet-portrait/Jessie.jpg',
      },
      {
        id: 12,
        title: 'Whiskers',
        image: '/images/pet-portrait/Hector-Maud-Buster.jpg',
      },
      {
        id: 13,
        title: 'Whiskers',
        image: '/images/pet-portrait/Mame.jpg',
      },
      {
        id: 14,
        title: 'Whiskers',
        image: '/images/pet-portrait/Wander-Vanesse.jpg',
      },
      {
        id: 15,
        title: 'Whiskers',
        image: '/images/pet-portrait/pug.JPG',
      },
      {
        id: 16,
        title: 'Whiskers',
        image: '/images/pet-portrait/Cosmo-Atom.jpg',
      },
    ]
  }
};

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const collection = collectionsData[collectionId as keyof typeof collectionsData];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: `Pet Portrait Commission Request:\n\nPet's Name: ${formData.phone}\n\nAdditional Details:\n${formData.message}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    }}>
      <Box sx={{ 
        flex: 1, 
        py: 3, 
        width: '100vw',
        maxWidth: '100%',
        overflow: 'hidden',
        marginX: 0,
        paddingX: 0
      }}>
        <AnimatedSection>
          <Container maxWidth="xl">
            <Typography variant="h3" component="h1" gutterBottom align="center">
              {collection.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
              {collection.description}
            </Typography>
          </Container>
        </AnimatedSection>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)' 
          },
          gap: 4,
          width: '100%',
          margin: 0,
          px: { xs: 2, sm: 4, md: 6 }
        }}>
          {collection.paintings.map((painting, index) => (
            <Box key={painting.id} sx={{ 
              width: '100%', 
              margin: 0,
              padding: 0
            }}>
              <AnimatedSection delay={index * 0.1}>
                <Link 
                  to={`/painting/${collectionId}/${painting.id}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                <Card sx={{ 
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 0,
                  borderRadius: 0,
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      aspectRatio: '3 / 2',        // Keep card size uniform
                      objectFit: 'contain',        // Show full image with original aspect ratio
                      backgroundColor: 'white',    // Fill remaining space with white
                      display: 'block'
                    }}
                    image={painting.image}
                    alt={painting.title}
                  />
                  {collectionId !== 'pet-portraits' && (
                    <CardContent sx={{ 
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {painting.title}
                      </Typography>
                    </CardContent>
                  )}
                </Card>
                </Link>
              </AnimatedSection>
            </Box>
          ))}
        </Box>

        {collectionId === 'pet-portraits' && (
          <AnimatedSection>
            <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
              <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                Commission Your Pet Portrait
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <Card sx={{ height: '100%', borderRadius: 2 }}>
                    <CardMedia
                      component="img"
                      image="/images/pet-portrait/Bruno.jpg"
                      alt="Commission Example"
                      sx={{
                        width: '100%',
                        padding: '20px',  // Equal padding on all sides
                        objectFit: 'contain',  // Show full image without cropping
                        backgroundColor: 'white',
                        display: 'block'
                      }}
                    />
                  </Card>
                </Box>
                <Box sx={{ flex: 1 }}>
                  {status === 'success' && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Your commission request has been sent successfully!
                    </Alert>
                  )}
                  {status === 'error' && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {errorMessage}
                    </Alert>
                  )}
                  <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Request a Commission
                    </Typography>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Pet's Name"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Additional Details"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ mt: 2 }}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? <CircularProgress size={24} /> : 'Submit Request'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          </AnimatedSection>
        )}
      </Box>
    </Box>
  );
};

export default CollectionDetail;