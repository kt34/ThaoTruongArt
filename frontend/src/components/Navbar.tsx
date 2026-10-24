import { Box, IconButton, Drawer, List, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors, fonts, FACEBOOK_URL, INSTAGRAM_URL } from '../constants';
import { headerOffset } from '../styles';

const navItems = [
  { label: 'About the Artist', section: 'about' },
  { label: 'Gallery Collections', section: 'collections' },
  { label: 'Contact', section: 'contact' },
];

const SocialIcons = ({ size }: { size: number }) => (
  <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
    {[
      { href: FACEBOOK_URL, label: 'Facebook', src: '/images/design/facebook.png' },
      { href: INSTAGRAM_URL, label: 'Instagram', src: '/images/design/instagram.png' },
    ].map((s) => (
      <Box
        key={s.label}
        component="a"
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={s.label}
        sx={{ display: 'block', borderRadius: '6px', overflow: 'hidden', transition: 'transform 0.2s ease', '&:hover': { transform: 'translateY(-2px)' } }}
      >
        <Box component="img" src={s.src} alt="" sx={{ width: size, height: size }} />
      </Box>
    ))}
  </Box>
);

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: sectionId === 'top' ? undefined : { scrollTo: sectionId } });
    } else if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: colors.teal,
        color: colors.white,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.15)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          height: headerOffset,
          px: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box
          component="button"
          onClick={() => handleNavigation('top')}
          aria-label="ThaoTruong Art, back to top"
          sx={{
            background: 'none',
            border: 'none',
            p: 0,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <Box component="img" src="/images/design/logo-wordmark.png" alt="ThaoTruong Art" sx={{ width: { xs: 180, md: 250 }, height: 'auto' }} />
          <Box component="img" src="/images/design/logo-tagline.png" alt="Joyful Art Getaway" sx={{ width: { xs: 168, md: 230 }, height: 'auto', mt: 0.25, transform: 'translateX(-5%)' /* image has extra left padding; centre the text under the wordmark */ }} />
        </Box>

        {isMobile ? (
          <IconButton color="inherit" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
        ) : (
          <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: { md: 4, lg: 5 } }}>
            {navItems.map((item) => (
              <Box
                key={item.section}
                component="button"
                onClick={() => handleNavigation(item.section)}
                sx={{
                  background: 'none',
                  border: 'none',
                  p: 0,
                  cursor: 'pointer',
                  color: colors.white,
                  fontFamily: fonts.heading,
                  fontSize: '1.05rem',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  opacity: 0.92,
                  transition: 'opacity 0.2s ease',
                  '&:hover': { opacity: 1 },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: -6,
                    width: '100%',
                    height: '2px',
                    bgcolor: colors.cream,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::after, &:focus-visible::after': { transform: 'scaleX(1)' },
                  '&:focus-visible': { outline: 'none' },
                }}
              >
                {item.label}
              </Box>
            ))}
            <Box sx={{ ml: 1 }}>
              <SocialIcons size={32} />
            </Box>
          </Box>
        )}
      </Box>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 270, bgcolor: colors.teal, color: colors.white } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton color="inherit" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItemButton key={item.section} onClick={() => handleNavigation(item.section)} sx={{ py: 1.5 }}>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontFamily: fonts.heading, fontSize: '1.15rem' }} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ px: 2, pt: 2 }}>
          <SocialIcons size={36} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
