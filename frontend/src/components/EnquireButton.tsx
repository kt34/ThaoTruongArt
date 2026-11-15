import { useState } from 'react';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import { Close, MailOutline } from '@mui/icons-material';
import EmailActions from './EmailActions';
import { colors, fonts } from '../constants';

// Small "Enquire about this piece" pill that opens the email options with the artwork already named.
const EnquireButton = ({ artworkName }: { artworkName: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen(true)}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1.75,
          py: 0.6,
          border: `1px solid ${colors.teal}`,
          borderRadius: 999,
          bgcolor: 'transparent',
          color: colors.teal,
          font: 'inherit',
          fontSize: '0.85rem',
          letterSpacing: '0.04em',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease, color 0.2s ease',
          '&:hover': { bgcolor: colors.teal, color: colors.white },
          '&:focus-visible': { outline: `2px solid ${colors.teal}`, outlineOffset: 2 },
        }}
      >
        <MailOutline sx={{ fontSize: 16 }} /> Enquire about this piece
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { bgcolor: colors.cream, borderRadius: '8px', m: 2, maxWidth: 440, width: '100%' } } }}
      >
        <Box sx={{ position: 'relative', p: { xs: 3, sm: 4 } }}>
          <IconButton aria-label="Close" onClick={() => setOpen(false)} size="small" sx={{ position: 'absolute', top: 10, right: 10 }}>
            <Close fontSize="small" />
          </IconButton>
          <Typography component="h2" sx={{ fontFamily: fonts.heading, fontSize: '1.4rem', color: colors.teal, mb: 1, pr: 3 }}>
            Enquire about {artworkName}
          </Typography>
          <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'text.secondary', mb: 3 }}>
            Send Thao an email about pricing or availability. The painting’s name is already filled in.
          </Typography>
          <EmailActions
            showAddress
            subject={`Enquiry: ${artworkName}`}
            body={`Hi Thao,\n\nI'm interested in ${artworkName}. Could you tell me more about the price and availability?\n\n`}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default EnquireButton;
