import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardMedia, IconButton, Stack, Fade, Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CloseIcon from '@mui/icons-material/Close';
import AnimatedSection from '../components/AnimatedSection';

interface Painting {
  id: number;
  title: string;
  image: string;
  additionalImages?: string[];
  description?: string;
  price?: string;
  dimensions?: string;
  year?: string;
}

interface Collection {
  title: string;
  description: string;
  paintings: Painting[];
}

interface CollectionsData {
  [key: string]: Collection;
}

const collectionsData: CollectionsData = {
    'fluid-art': {
      title: 'Fluid Art',
      description: 'A mesmerizing collection of fluid art paintings that capture the beauty of color and movement.',
      paintings: [
        {
          id: 1,
          title: "Natural's Blend",
          image: '/images/fluid-art/natural-blend-1.jpg',
          additionalImages: ['/images/fluid-art/natural-blend-2.jpg', '/images/fluid-art/natural-blend-3.jpg'],
          description: 'A vibrant piece inspired by ocean waves',
          price: '$450',
          dimensions: '24" x 36"',
          year: '2023'
        },
        {
          id: 2,
          title: 'Spring Aroma',
          image: '/images/fluid-art/spring-aroma-1.jpg',
          additionalImages: ['/images/fluid-art/spring-aroma-2.jpg', '/images/fluid-art/spring-aroma-3.jpg'],
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 3,
          title: 'Red Desert',
          image: '/images/fluid-art/red-desert-1.jpg',
          additionalImages: ['/images/fluid-art/red-desert-2.jpg'],
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 4,
          title: "Colour's Dance",
          image: '/images/fluid-art/colour-dance-1.jpg',
          additionalImages: ['/images/fluid-art/colour-dance-2.jpg', '/images/fluid-art/colour-dance-3.jpg'],
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 5,
          title: 'Aqua Swash',
          image: '/images/fluid-art/aqua-swash-1.jpg',
          additionalImages: ['/images/fluid-art/aqua-swash-2.jpg'],
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 6,
          title: 'The Harmony',
          image: '/images/fluid-art/the-harmony-1.jpg',
          additionalImages: ['/images/fluid-art/the-harmony-2.jpg'],
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 7,
          title: 'Blue Lagoon',
          image: '/images/fluid-art/blue-lagoon-1.jpg',
          additionalImages: ['/images/fluid-art/blue-lagoon-2.jpg'],
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 8,
          title: 'Jellyfish Prom',
          image: '/images/fluid-art/jellyfish-prom-1.jpg',
          additionalImages: ['/images/fluid-art/jellyfish-prom-2.jpg', '/images/fluid-art/jellyfish-prom-2.png'],
          description: 'Explosion of colors in perfect harmony',
          price: '$380',
          dimensions: '20" x 30"',
          year: '2023'
        },
        {
          id: 9,
          title: 'Contours',
          image: '/images/fluid-art/contours-1.jpg',
          additionalImages: ['/images/fluid-art/contours-2.jpg', '/images/fluid-art/contours-3.jpg', '/images/fluid-art/contours-4.jpg'],
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
          title: 'Jessie',
          image: '/images/pet-portrait/Jessie.jpg',
          description: 'A vibrant portrait capturing Jessie\'s playful spirit and distinctive markings. The warm tones highlight her beautiful coat while maintaining the depth of her expressive eyes.',
          price: '$790',
          dimensions: '35" x 45"',
          year: '2023'
        },
        {
          id: 12,
          title: 'Hector, Maud & Buster',
          image: '/images/pet-portrait/Hector-Maud-Buster.jpg',
          description: 'A charming group portrait featuring three beloved pets. The composition beautifully balances each pet\'s unique personality while creating a harmonious family portrait.',
          price: '$990',
          dimensions: '51" x 61"',
          year: '2023'
        },
        {
          id: 13,
          title: 'Mame',
          image: '/images/pet-portrait/Mame.jpg',
          description: 'An elegant portrait that captures Mame\'s graceful presence. The artist\'s attention to detail brings out the subtle textures of her fur and the gentle expression in her eyes.',
          price: '$790',
          dimensions: '35" x 45"',
          year: '2023'
        },
        {
          id: 14,
          title: 'Wander & Vanesse',
          image: '/images/pet-portrait/Wander-Vanesse.jpg',
          description: 'A dynamic duo portrait that showcases the special bond between these two pets. The composition highlights their individual personalities while celebrating their companionship.',
          price: '$990',
          dimensions: '51" x 61"',
          year: '2023'
        },
        {
          id: 15,
          title: 'Pug Portrait',
          image: '/images/pet-portrait/pug.JPG',
          description: 'A delightful portrait that captures the endearing features of this charming pug. The artist has masterfully rendered the distinctive wrinkles and expressive face that make pugs so lovable.',
          price: '$490',
          dimensions: '25" x 30"',
          year: '2023'
        },
        {
          id: 16,
          title: 'Cosmo & Atom',
          image: '/images/pet-portrait/Cosmo-Atom.jpg',
          description: 'A striking portrait of two pets that perfectly captures their unique personalities. The composition creates a beautiful balance between the two subjects, highlighting their individual characteristics.',
          price: '$990',
          dimensions: '51" x 61"',
          year: '2023'
        },
      ]
    }
  };

  const PaintingDetail = () => {
    const { collectionId, paintingId } = useParams();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paintingImages, setPaintingImages] = useState<string[]>([]);
  
    const collection = collectionsData[collectionId as keyof typeof collectionsData];
    const painting = collection?.paintings.find(p => p.id === Number(paintingId));
  
    const getPaintingImages = async (painting: Painting) => {
      if (!painting) return [];
      
      // For fluid art paintings, use the additionalImages array
      if (collectionId === 'fluid-art') {
        return [painting.image, ...(painting.additionalImages || [])];
      }
      
      // For other collections, just use the single image
      return [painting.image];
    };
  
    useEffect(() => {
      const loadImages = async () => {
        if (painting) {
          const images = await getPaintingImages(painting);
          setPaintingImages(images);
          console.log(`Loaded ${images.length} images for ${painting.title}`);
        }
      };
      loadImages();
    }, [painting, collectionId]);
  
    const handleNext = () => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % (paintingImages.length || 1));
        setFadeIn(true);
      }, 300);
    };
  
    const handlePrevious = () => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev - 1 + (paintingImages.length || 1)) % (paintingImages.length || 1));
        setFadeIn(true);
      }, 300);
    };
  
    const handleIndicatorClick = (index: number) => {
      if (index === currentImageIndex) return;
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setFadeIn(true);
      }, 300);
    };
  
    const handleImageClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    // Only show navigation if there are multiple images
    const showNavigation = paintingImages.length > 1;
  
    if (!painting) {
      return (
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          px: 2 
        }}>
          <Typography variant="h4">Painting not found</Typography>
          <Button 
            onClick={() => navigate(-1)} 
            sx={{ mt: 2 }} 
            variant="contained"
            color="primary"
          >
            Go Back
          </Button>
        </Box>
      );
    }
  
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        py: 4,
        bgcolor: '#fafafa',
        width: '100vw',
        maxWidth: '100%',
        overflow: 'hidden',
        marginX: 0,
        px: { xs: 2, md: '4%' }
      }}>
        <Box sx={{ 
          width: '100%',
          margin: 0,
          padding: 0
        }}>
          <AnimatedSection>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, md: '4%' },
              width: '100%',
              margin: 0,
              padding: 0
            }}>
              {/* Image Carousel Section */}
              <Box sx={{ 
                position: 'relative',
                width: { xs: '100%', md: '66.666%' },
                aspectRatio: '4/3',
                backgroundColor: 'white',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 0,
                  overflow: 'hidden',
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Fade in={fadeIn} timeout={500}>
                    <CardMedia
                      component="img"
                      image={paintingImages[currentImageIndex]}
                      alt={painting.title}
                      sx={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '90%',
                        maxHeight: '90%',
                        objectFit: 'contain',
                        backgroundColor: 'white',
                        display: 'block',
                        padding: '20px',
                        cursor: 'zoom-in',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.02)'
                        }
                      }}
                      onClick={handleImageClick}
                    />
                  </Fade>
                </Card>
  
                {/* Navigation Buttons - Only show if there are multiple images */}
                {showNavigation && (
                  <>
                    <IconButton
                      onClick={handlePrevious}
                      sx={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { 
                          backgroundColor: 'white',
                          boxShadow: 2
                        },
                        width: 48,
                        height: 48,
                        transition: 'all 0.3s ease',
                        '&:focus': {
                          outline: 'none'
                        }
                      }}
                    >
                      <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleNext}
                      sx={{
                        position: 'absolute',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { 
                          backgroundColor: 'white',
                          boxShadow: 2
                        },
                        width: 48,
                        height: 48,
                        transition: 'all 0.3s ease',
                        '&:focus': {
                          outline: 'none'
                        }
                      }}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  </>
                )}
  
                {/* Image Indicators - Only show if there are multiple images */}
                {showNavigation && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {paintingImages.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: index === currentImageIndex ? 'primary.main' : 'rgba(0, 0, 0, 0.2)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: index === currentImageIndex ? 'primary.dark' : 'rgba(0, 0, 0, 0.3)'
                          }
                        }}
                        onClick={() => handleIndicatorClick(index)}
                      />
                    ))}
                  </Stack>
                )}
              </Box>
  
              {/* Information Section */}
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                width: { xs: '100%', md: '33.333%' },
                bgcolor: 'white',
                p: { xs: 3, md: 4 },
                margin: 0,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                height: 'fit-content'
              }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontFamily: "'Playfair Display', serif",
                    color: 'primary.main',
                    fontWeight: 500,
                    textAlign: 'left',
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  {painting.title}
                </Typography>
  
                {painting.description && (
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    paragraph
                    sx={{ 
                      textAlign: 'left',
                      lineHeight: 1.6
                    }}
                  >
                    {painting.description}
                  </Typography>
                )}
  
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 2,
                  mt: 2,
                  alignItems: 'flex-start',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  pt: 3
                }}>
                  {painting.dimensions && (
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      <strong>Dimensions:</strong> {painting.dimensions}
                    </Typography>
                  )}
                  {painting.year && (
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      <strong>Year:</strong> {painting.year}
                    </Typography>
                  )}
                  {painting.price && (
                    <Typography 
                      variant="h5" 
                      color="primary.main" 
                      sx={{ 
                        mt: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      {painting.price}
                    </Typography>
                  )}
                </Box>
  
                <Button 
                  variant="outlined" 
                  onClick={() => navigate(-1)} 
                  sx={{ 
                    mt: 4,
                    alignSelf: 'flex-start',
                    px: 4,
                    py: 1.5,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'primary.main',
                      color: 'white'
                    }
                  }}
                >
                  Back to Collection
                </Button>
              </Box>
            </Box>
          </AnimatedSection>
        </Box>
        {/* Full-size Image Modal */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Box
            sx={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              bgcolor: 'white',
              boxShadow: 24,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CardMedia
              component="img"
              image={paintingImages[currentImageIndex]}
              alt={painting.title}
              sx={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain'
              }}
            />
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Modal>
      </Box>
    );
  };
  
export default PaintingDetail;
