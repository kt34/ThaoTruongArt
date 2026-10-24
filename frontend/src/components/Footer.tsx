import { Box, Typography } from '@mui/material';
import { colors } from '../constants';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: colors.teal,
      borderTop: '1px solid rgba(255,255,255,0.18)',
      py: 4,
      px: 2,
      textAlign: 'center',
    }}
  >
    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', letterSpacing: '0.05em' }}>
      © {new Date().getFullYear()} ThaoTruong Art · Joyful Art Getaway
    </Typography>
  </Box>
);

export default Footer;
