import { Box, IconButton, Drawer, List, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors, fonts, FACEBOOK_URL, INSTAGRAM_URL } from '../constants';

// Height of the compact bar; sections use it as their scroll-margin.
export const HEADER_OFFSET = 76;

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
        sx={{ display: 'block', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' } }}
      >
        <Box component="img" src={s.src} alt="" sx={{ width: size, height: size }} />
      </Box>
    ))}
  </Box>
);

interface BarProps {
  compact: boolean;
  isMobile: boolean;
  onNavigate: (section: string) => void;
  onOpenMenu: () => void;
}

const Bar = ({ compact, isMobile, onNavigate, onOpenMenu }: BarProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 3,
      px: { xs: 2, md: '2%' },
      py: compact ? 1.25 : 3.5,
      minHeight: compact ? HEADER_OFFSET : undefined,
    }}
  >
    <Box
      component="button"
      onClick={() => onNavigate('top')}
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
      <Box
        component="img"
        src="/images/design/logo-wordmark.png"
        alt="ThaoTruong Art"
        sx={{ width: compact ? { xs: 190, sm: 240 } : 'clamp(280px, 34vw, 510px)', height: 'auto' }}
      />
      <Box
        component="img"
        src="/images/design/logo-tagline.png"
        alt="Joyful Art Getaway"
        sx={{ width: compact ? { xs: 120, sm: 150 } : 'clamp(240px, 29vw, 440px)', height: 'auto', mt: compact ? 0 : 1 }}
      />
    </Box>

    {isMobile ? (
      <IconButton color="inherit" aria-label="Open menu" onClick={onOpenMenu}>
        <MenuIcon fontSize="large" />
      </IconButton>
    ) : (
      <Box
        component="nav"
        sx={{ display: 'flex', alignItems: 'center', gap: { md: 3, lg: 5 }, alignSelf: compact ? 'center' : 'flex-start', mt: compact ? 0 : 2 }}
      >
        {navItems.map((item) => (
          <Box
            key={item.section}
            component="button"
            onClick={() => onNavigate(item.section)}
            sx={{
              background: 'none',
              border: 'none',
              p: 0,
              cursor: 'pointer',
              color: colors.white,
              fontFamily: fonts.heading,
              fontSize: compact ? '1.05rem' : 'clamp(1rem, 1.45vw, 1.4rem)',
              whiteSpace: 'nowrap',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: -6,
                width: 0,
                height: '2px',
                bgcolor: colors.cream,
                transition: 'width 0.3s ease',
              },
              '&:hover::after, &:focus-visible::after': { width: '100%' },
              '&:focus-visible': { outline: 'none' },
            }}
          >
            {item.label}
          </Box>
        ))}
        <Box sx={{ ml: { md: 1, lg: 4 } }}>
          <SocialIcons size={compact ? 30 : 40} />
        </Box>
      </Box>
    )}
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
    const onScroll = () => setScrolled(window.scrollY > 220);
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

  const barProps = { isMobile, onNavigate: handleNavigation, onOpenMenu: () => setMobileOpen(true) };

  return (
    <>
      {isMobile ? (
        // On small screens a single compact bar stays pinned to the top.
        <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 1100, bgcolor: colors.teal, color: colors.white, boxShadow: '0 2px 12px rgba(0,0,0,0.18)' }}>
          <Bar compact {...barProps} />
        </Box>
      ) : (
        <>
          {/* Full header from the design, then a compact bar that slides in once it scrolls away. */}
          <Box component="header" sx={{ bgcolor: colors.teal, color: colors.white }}>
            <Bar compact={false} {...barProps} />
          </Box>
          <Box
            aria-hidden={!scrolled}
            inert={!scrolled || undefined}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1100,
              bgcolor: colors.teal,
              color: colors.white,
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
              transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
              transition: 'transform 0.3s ease',
            }}
          >
            <Bar compact {...barProps} />
          </Box>
        </>
      )}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: colors.teal, color: colors.white } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton color="inherit" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItemButton key={item.section} onClick={() => handleNavigation(item.section)}>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontFamily: fonts.heading, fontSize: '1.15rem' }} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ px: 2, pt: 2 }}>
          <SocialIcons size={36} />
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
