import { AppBar, Toolbar, Typography, Link, Box, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Facebook, Instagram, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

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
    setMobileOpen(false);
  };

  const drawer = (
    <List>
      {['home', 'about', 'collections', 'contact', 'faq'].map((text) => (
        <ListItem key={text} onClick={() => scrollToSection(text)} sx={{ cursor: 'pointer' }}>
          <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
        </ListItem>
      ))}
      <ListItem>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton color="inherit" href="https://facebook.com" target="_blank">
            <Facebook />
          </IconButton>
          <IconButton color="inherit" href="https://instagram.com" target="_blank">
            <Instagram />
          </IconButton>
        </Box>
      </ListItem>
    </List>
  );

  return (
    <AppBar position="sticky" sx={{ 
      bgcolor: 'white',
      color: 'black',
      boxShadow: 'none',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      height: '64px'
    }}>
      <Toolbar sx={{ 
        minHeight: '64px !important',
        height: '64px',
        padding: '0 16px'
      }}>
        {isMobile ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: 'primary.main'
                }}
                onClick={() => scrollToSection('home')}
              >
                Thao Truong Art
              </Typography>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '200px',
                  boxSizing: 'border-box',
                },
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                cursor: 'pointer',
                fontWeight: 'bold',
                color: 'primary.main'
              }}
              onClick={() => scrollToSection('home')}
            >
              Thao Truong Art
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => scrollToSection('home')}
                  sx={{ 
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500
                  }}
                >
                  Home
                </Link>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => scrollToSection('about')}
                  sx={{ 
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500
                  }}
                >
                  About
                </Link>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => scrollToSection('collections')}
                  sx={{ 
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500
                  }}
                >
                  Collections
                </Link>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => scrollToSection('contact')}
                  sx={{ 
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500
                  }}
                >
                  Contact
                </Link>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => scrollToSection('faq')}
                  sx={{ 
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500
                  }}
                >
                  FAQ
                </Link>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                <IconButton 
                  color="inherit" 
                  href="https://facebook.com" 
                  target="_blank"
                  sx={{ 
                    color: 'black',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  href="https://instagram.com" 
                  target="_blank"
                  sx={{ 
                    color: 'black',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <Instagram />
                </IconButton>
              </Box>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 