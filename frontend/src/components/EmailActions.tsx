import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { MailOutline } from '@mui/icons-material';
import { colors, CONTACT_EMAIL, gmailComposeUrl, mailtoUrl, outlookComposeUrl } from '../constants';
import { imageRadius } from '../styles';

interface EmailActionsProps {
  subject?: string;
  body?: string;
  // Show the address itself, so visitors can always copy it by hand.
  showAddress?: boolean;
  align?: 'left' | 'center';
}

const linkSx = {
  background: 'none',
  border: 'none',
  p: 0,
  font: 'inherit',
  color: colors.teal,
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  '&:hover': { color: colors.plum },
  '&:focus-visible': { outline: `2px solid ${colors.teal}`, outlineOffset: 2 },
};

// "Email Thao" opens the visitor's default mail app; the links below cover web mail users and copying the address.
const EmailActions = ({ subject = '', body = '', showAddress = false, align = 'left' }: EmailActionsProps) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. an insecure context); the address stays visible to copy by hand.
    }
  };

  const centred = align === 'center';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: centred ? 'center' : 'flex-start', gap: 2 }}>
      {showAddress && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, color: colors.black }}>
          <MailOutline sx={{ color: colors.teal }} />
          <Typography sx={{ fontSize: { xs: '1.05rem', sm: '1.2rem' }, letterSpacing: '0.02em', wordBreak: 'break-all' }}>
            {CONTACT_EMAIL}
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="secondary"
        size="large"
        href={mailtoUrl(subject, body)}
        startIcon={<MailOutline />}
        sx={{ py: 1.4, px: 4, fontSize: '1.1rem', borderRadius: imageRadius, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
      >
        Email Thao
      </Button>

      <Typography
        component="div"
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: centred ? 'center' : 'flex-start', alignItems: 'center', columnGap: 1.25, fontSize: '0.98rem', color: 'text.secondary' }}
      >
        <span>Or:</span>
        <Box component="a" href={gmailComposeUrl(subject, body)} target="_blank" rel="noopener noreferrer" sx={linkSx}>
          Open in Gmail
        </Box>
        <span aria-hidden>·</span>
        <Box component="a" href={outlookComposeUrl(subject, body)} target="_blank" rel="noopener noreferrer" sx={linkSx}>
          Outlook
        </Box>
        <span aria-hidden>·</span>
        <Box component="button" type="button" onClick={copyEmail} sx={linkSx} aria-live="polite">
          {copied ? 'Copied!' : 'Copy address'}
        </Box>
      </Typography>
    </Box>
  );
};

export default EmailActions;
