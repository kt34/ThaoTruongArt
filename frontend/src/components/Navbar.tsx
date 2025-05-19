import { AppBar, Toolbar, Typography, Link, Box, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import { Facebook, Instagram, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [collectionsAnchorEl, setCollectionsAnchorEl] = useState<null | HTMLElement>(null);
  const openCollectionsMenu = Boolean(collectionsAnchorEl);

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If we're not on the home page, navigate to home first
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // If we're already on the home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = isMobile ? 56 : 64; // Different offset for mobile/desktop
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

  const handleCollectionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setCollectionsAnchorEl(event.currentTarget);
  };
  
  const handleCollectionsClose = () => {
    setCollectionsAnchorEl(null);
  };

  const navLinkStyle = {
    color: 'inherit',
    textDecoration: 'none !important',
    fontFamily: 'Playfair Display, serif',
    fontSize: '1.1rem',
    position: 'relative',
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: 'primary.main',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      width: '0',
      height: '2px',
      backgroundColor: 'currentColor',
      transition: 'width 0.3s ease',
    },
    '&:hover::after': {
      width: '100%',
    },
    outline: 'none',
    '&:focus': { outline: 'none' },
    '&:focus-visible': { outline: 'none' }
  };

  const drawer = (
    <List>
      {['home', 'about', 'collections', 'contact', 'faq'].map((text) => (
        <ListItem key={text} onClick={() => handleNavigation(text)} sx={{ cursor: 'pointer' }}>
          <ListItemText 
            primary={text.charAt(0).toUpperCase() + text.slice(1)} 
            primaryTypographyProps={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.1rem'
            }}
          />
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
                onClick={() => handleNavigation('home')}
                sx={{ 
                  flexGrow: 1,
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}
              >
                ThaoTruong Art
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={() => setMobileOpen(true)}
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:active': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '180px',
                  bgcolor: 'white',
                  color: 'black',
                },
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              component="div"
              onClick={() => handleNavigation('home')}
              sx={{ 
                flexGrow: 1,
                fontFamily: 'Playfair Display, serif',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              ThaoTruong Art
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {['home', 'about'].map((text) => (
                <Link
                  key={text}
                  component="button"
                  onClick={() => handleNavigation(text)}
                  sx={navLinkStyle}
                >
                  {text.charAt(0).toUpperCase() + text.slice(1)}
                </Link>
              ))}

            <Typography
                onClick={handleCollectionsClick}
                sx={{
                  color: 'inherit',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Collections
              </Typography>
              <Menu
                anchorEl={collectionsAnchorEl}
                open={openCollectionsMenu}
                onClose={handleCollectionsClose}
                MenuListProps={{
                  'aria-labelledby': 'collections-button',
                  autoFocusItem: false,
                }}
                sx={{
                  '& .MuiPaper-root': {
                    mt: 1,
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                  },
                }}
              >
                {[
                  { title: 'Australian Birds', path: '/collections/australian-birds' },
                  { title: 'Women Figures', path: '/collections/women-figures' },
                  { title: 'Pet Portraits', path: '/collections/pet-portraits' },
                  { title: 'Fluid Art', path: '/collections/fluid-art' }
                ].map((item) => (
                  <MenuItem
                    key={item.title}
                    onClick={() => {
                      navigate(item.path);
                      handleCollectionsClose();
                    }}
                    sx={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1rem',
                    }}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Menu>

              {['contact', 'faq'].map((text) => (
                <Link
                  key={text}
                  component="button"
                  onClick={() => handleNavigation(text)}
                  sx={navLinkStyle}
                >
                  {text.charAt(0).toUpperCase() + text.slice(1)}
                </Link>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
              <IconButton color="inherit" href="https://www.facebook.com/ThaoTruongArt" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://www.instagram.com/thaotruongart" target="_blank">
                <Instagram />
              </IconButton>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 