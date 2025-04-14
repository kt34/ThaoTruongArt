import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      id="home"
      sx={{
        width: '100%',
        position: 'relative',
        height: '500px',
        overflow: 'hidden',
        paddingTop: '60px',
        marginTop: '-60px',
        py: 2,
      }}
    >
      <Box
        component="img"
        src="/images/nature-image.jpg"
        alt="Nature"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </Box>
  );
};

export default Home; 