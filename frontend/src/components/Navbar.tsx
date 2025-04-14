import { AppBar, Toolbar, Typography, Box, IconButton, Link, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80; // Height of the navbar plus some extra space
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const Navbar = () => {
  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          py: 2,
          minHeight: 'auto',
        }}>
          <Typography
            variant="h4"
            onClick={() => scrollToSection('home')}
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              cursor: 'pointer',
            }}
          >
            THAO TRUONG ART
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
            <IconButton
              component="a"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'primary.main' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'primary.main' }}
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Toolbar>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            py: 2,
            borderTop: 1,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Link 
            onClick={() => scrollToSection('home')}
            sx={{ 
              color: 'primary.main',
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
            }}
          >
            Home
          </Link>
          <Link 
            onClick={() => scrollToSection('about')}
            sx={{ 
              color: 'primary.main',
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
            }}
          >
            About
          </Link>
          <Link 
            onClick={() => scrollToSection('collections')}
            sx={{ 
              color: 'primary.main',
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
            }}
          >
            Collections
          </Link>
          <Link 
            onClick={() => scrollToSection('contact')}
            sx={{ 
              color: 'primary.main',
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
            }}
          >
            Contact
          </Link>
          <Link 
            onClick={() => scrollToSection('faq')}
            sx={{ 
              color: 'primary.main',
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
            }}
          >
            FAQs
          </Link>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar; 