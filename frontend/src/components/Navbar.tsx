import { AppBar, Toolbar, Typography, Link, Box, IconButton, useTheme, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About', sectionId: 'about' },
    { label: 'Collections', sectionId: 'collections' },
    { label: 'Contact', sectionId: 'contact' },
    { label: 'FAQ', sectionId: 'faq' },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          key={item.sectionId}
          onClick={() => scrollToSection(item.sectionId)}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black' }}>
      <Toolbar sx={{ 
        flexDirection: 'column',
        py: isMobile ? 1 : 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%',
          mb: isMobile ? 0 : 2,
          position: 'relative'
        }}>
          <Box sx={{ 
            position: 'absolute', 
            left: 0,
            display: 'flex',
            gap: 1
          }}>
            <IconButton
              color="inherit"
              component="a"
              href="https://www.facebook.com/thaotruongart"
              target="_blank"
              rel="noopener noreferrer"
              size={isMobile ? "small" : "medium"}
            >
              <FacebookIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton
              color="inherit"
              component="a"
              href="https://www.instagram.com/thaotruongart"
              target="_blank"
              rel="noopener noreferrer"
              size={isMobile ? "small" : "medium"}
            >
              <InstagramIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>

          <Typography
            variant="h4"
            component="div"
            sx={{ 
              cursor: 'pointer',
              fontSize: isMobile ? '1.5rem' : '2.125rem',
              textAlign: 'center',
              flex: 1
            }}
            onClick={() => scrollToSection('home')}
          >
            Thao Truong Art
          </Typography>

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ position: 'absolute', right: 0 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 4 }}>
            {menuItems.map((item) => (
              <Link
                key={item.sectionId}
                component="button"
                variant="body1"
                onClick={() => scrollToSection(item.sectionId)}
                sx={{ 
                  color: 'black', 
                  textDecoration: 'none', 
                  '&:hover': { color: 'primary.main' },
                  '&:focus': { outline: 'none' },
                  '&:focus-visible': { outline: 'none' }
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>
        )}

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 