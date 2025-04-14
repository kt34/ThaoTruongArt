import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Collections = () => {
  const collections = [
    {
      title: 'Australian Birds',
      image: '/images/australian-bird.jpg',
      description: 'Australia is home to a diverse range of bird species, many of which are found nowhere else in the world. From the vibrant Rainbow Lorikeet and the iconic Laughing Kookaburra to the strikingly intelligent Australian Magpie, the country\'s birdlife is colorful and unique.',
    },
    {
      title: 'Female Figures',
      image: '/images/female-figure.jpg',
      description: 'Australia is home to a diverse range of bird species, many of which are found nowhere else in the world. From the vibrant Rainbow Lorikeet and the iconic Laughing Kookaburra to the strikingly intelligent Australian Magpie, the country\'s birdlife is colorful and unique.',
    },
    {
      title: 'Pet Portraits',
      image: '/images/pet-painting.jpg',
      description: 'Australia is home to a diverse range of bird species, many of which are found nowhere else in the world. From the vibrant Rainbow Lorikeet and the iconic Laughing Kookaburra to the strikingly intelligent Australian Magpie, the country\'s birdlife is colorful and unique.',
    },
    {
      title: 'Fluid Art',
      image: '/images/fluid-painting.jpg',
      description: 'Australia is home to a diverse range of bird species, many of which are found nowhere else in the world. From the vibrant Rainbow Lorikeet and the iconic Laughing Kookaburra to the strikingly intelligent Australian Magpie, the country\'s birdlife is colorful and unique.',
    },
  ];

  return (
    <Box 
      id="collections" 
      sx={{ 
        py: 2,
        paddingTop: '60px',
        marginTop: '-60px',
      }}
    >
      <Typography
        id="collections-header"
        variant="h2"
        component="h1"
        sx={{
          color: 'secondary.main',
          textAlign: 'center',
          mb: 2,
        }}
      >
        Collections
      </Typography>
      <Box
        className="collections-grid"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
          px: 4,
        }}
      >
        {collections.map((collection, index) => (
          <Box
            key={index}
            className="collection-item"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box
              component="img"
              src={collection.image}
              alt={collection.title}
              sx={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
            <Typography variant="h5" component="h2">
              {collection.title}
            </Typography>
            <Typography variant="body1">
              {collection.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Collections; 