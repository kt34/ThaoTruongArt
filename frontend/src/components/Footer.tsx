import { Box, Typography, Button, Container } from '@mui/material';

const Footer = () => {
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
    <Box sx={{ py: 6, bgcolor: 'background.default', mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 4
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 Thao Truong Artistry. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => scrollToSection('home')}
            >
              Home
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={() => scrollToSection('collections')}
            >
              Collections
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={() => scrollToSection('faq')}
            >
              FAQ
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 