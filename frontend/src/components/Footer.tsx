import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'background.default', mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Thao Truong Art. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 