import { AppBar, Toolbar, Typography, Link, Box, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Facebook, Instagram, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If we're not on the home page, navigate to home first
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // If we're already on the home page, just scroll to the section
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
    }
    setMobileOpen(false);
  };

  const drawer = (
    <List>
      {['home', 'about', 'collections', 'contact', 'faq'].map((text) => (
        <ListItem key={text} onClick={() => handleNavigation(text)} sx={{ cursor: 'pointer' }}>
          <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
        </ListItem>
      ))}
      <ListItem>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton color="inherit" href="https://www.facebook.com/ThaoTruongArt" target="_blank">
            <Facebook />
          </IconButton>
          <IconButton color="inherit" href="https://www.instagram.com/thaotruongart" target="_blank">
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
                  color: 'primary.main',
                }}
                onClick={() => handleNavigation('home')}
              >
                Thao Truong Art
              </Typography>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{
                '&:focus': {
                  outline: 'none',
                },
                '&:active': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              ModalProps={{
                keepMounted: true,
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
              onClick={() => handleNavigation('home')}
            >
              Thao Truong Art
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => handleNavigation('home')}
                  sx={{ 
                    textDecoration: 'none !important', 
                    position: 'relative',
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500,
                    outline: 'none',
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0',
                      height: '2px',
                      bottom: '-4px',
                      left: '0',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease-in-out'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  Home
                </Link>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => handleNavigation('about')}
                  sx={{ 
                    textDecoration: 'none !important', 
                    position: 'relative',
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500,
                    outline: 'none',
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0',
                      height: '2px',
                      bottom: '-4px',
                      left: '0',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease-in-out'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  About
                </Link>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => handleNavigation('collections')}
                  sx={{ 
                    textDecoration: 'none !important', 
                    position: 'relative',
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500,
                    outline: 'none',
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0',
                      height: '2px',
                      bottom: '-4px',
                      left: '0',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease-in-out'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  Collections
                </Link>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => handleNavigation('contact')}
                  sx={{ 
                    textDecoration: 'none !important', 
                    position: 'relative',
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500,
                    outline: 'none',
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0',
                      height: '2px',
                      bottom: '-4px',
                      left: '0',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease-in-out'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  Contact
                </Link>
                <Link
                  component="button"
                  variant="body1"
                  color="inherit"
                  onClick={() => handleNavigation('faq')}
                  sx={{ 
                    textDecoration: 'none !important', 
                    position: 'relative',
                    '&:hover': { color: 'primary.main' },
                    fontWeight: 500,
                    outline: 'none',
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0',
                      height: '2px',
                      bottom: '-4px',
                      left: '0',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease-in-out'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  FAQ
                </Link>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                <IconButton 
                  color="inherit" 
                  href="https://www.facebook.com/ThaoTruongArt" 
                  target="_blank"
                  sx={{ 
                    color: 'black',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  href="https://www.instagram.com/thaotruongart" 
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