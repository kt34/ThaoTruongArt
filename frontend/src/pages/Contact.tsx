import { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Alert } from '@mui/material';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/contact', formData);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: 'secondary.main',
          mb: 4,
          textAlign: 'center',
        }}
      >
        Contact
      </Typography>
      <Box sx={{ color: 'secondary.main', mb: 4 }}>
        <Typography paragraph>
          Interested in a special artwork designed for your space? Thao Truong offers custom sizes and commissioned artworks. The creative process is flexible. The artist will engage directly with the client via email or online meeting to develop the creative brief and understand desired outcomes. A 50% deposit is required to confirm commission (non-refundable). For collaborations and commissions, contact Thao.
        </Typography>
        <Typography paragraph>
          thaotruongartistry@gmail.com
        </Typography>
      </Box>
      {status.type && (
        <Alert severity={status.type} sx={{ mb: 2 }}>
          {status.message}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              '&:focus': {
                outline: 'none',
              },
              '&:active': {
                backgroundColor: 'transparent',
              }
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact; 