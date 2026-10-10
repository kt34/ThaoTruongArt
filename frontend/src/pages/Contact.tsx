import { useState } from 'react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { ContentCopy, Check, MailOutline, OpenInNew } from '@mui/icons-material';
import AnimatedSection from '../components/AnimatedSection';
import { HEADER_OFFSET } from '../components/Navbar';
import { colors, fonts, CONTACT_EMAIL, gmailComposeUrl, mailtoUrl } from '../constants';

const topics = [
  { label: 'My artwork', subject: 'Question about your artwork' },
  { label: 'A commission', subject: 'Commission enquiry' },
  { label: 'Workshops', subject: 'Workshop enquiry' },
  { label: 'Just saying hello', subject: 'Hello from your website' },
];

const greeting = 'Hi Thao,\n\n';

const Contact = () => {
  const [topic, setTopic] = useState(topics[0]);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); the address is still visible to copy by hand.
    }
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        bgcolor: colors.teal,
        color: colors.white,
        scrollMarginTop: `${HEADER_OFFSET}px`,
        borderTop: `1px solid rgba(255,255,255,0.18)`,
        px: { xs: 2, sm: 3, md: '6%' },
        py: { xs: 7, md: '6vw' },
      }}
    >
      <Box
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 5, md: 8 },
          alignItems: 'center',
        }}
      >
        <AnimatedSection>
          <Typography component="h2" sx={{ fontFamily: fonts.heading, fontSize: { xs: '2.6rem', md: '3.6rem' }, lineHeight: 1.1, mb: 2 }}>
            Contact
          </Typography>
          <Typography component="p" sx={{ fontFamily: fonts.heading, fontSize: { xs: '1.5rem', md: '2rem' }, mb: 3, color: colors.blush }}>
            I’d love to hear from you
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, letterSpacing: '0.03em', lineHeight: 1.6, mb: 2 }}>
            Whether you have a question about my artwork, are interested in commissioning a custom piece,
            enquiring about workshops, or simply want to say hello, please feel free to get in touch.
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontStyle: 'italic', letterSpacing: '0.03em' }}>
            Thank you for visiting Joyful Art GetAway.
          </Typography>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <Box sx={{ bgcolor: colors.cream, color: colors.black, boxShadow: '0 18px 40px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
            {/* Colour bands echo the palette used throughout the site. */}
            <Box sx={{ display: 'flex', height: 10 }}>
              {[colors.sage, colors.blush, colors.rose, colors.plum, colors.sand].map((c) => (
                <Box key={c} sx={{ flex: 1, bgcolor: c }} />
              ))}
            </Box>

            <Box sx={{ p: { xs: 3, sm: 4.5 } }}>
              <Typography component="h3" sx={{ fontFamily: fonts.heading, fontSize: '1.2rem', mb: 2 }}>
                What would you like to talk about?
              </Typography>
              <Box role="radiogroup" aria-label="Email topic" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mb: 4 }}>
                {topics.map((t) => {
                  const selected = t.label === topic.label;
                  return (
                    <Box
                      key={t.label}
                      component="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setTopic(t)}
                      sx={{
                        fontFamily: fonts.body,
                        fontSize: '1rem',
                        letterSpacing: '0.03em',
                        px: 2,
                        py: 0.9,
                        borderRadius: 999,
                        cursor: 'pointer',
                        border: `1.5px solid ${selected ? colors.plum : 'rgba(0,0,0,0.25)'}`,
                        bgcolor: selected ? colors.plum : 'transparent',
                        color: selected ? colors.white : colors.black,
                        transition: 'all 0.2s ease',
                        '&:hover': { borderColor: colors.plum },
                        '&:focus-visible': { outline: `2px solid ${colors.teal}`, outlineOffset: 2 },
                      }}
                    >
                      {t.label}
                    </Box>
                  );
                })}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  border: '1px solid rgba(0,0,0,0.15)',
                  bgcolor: colors.white,
                  pl: 2,
                  pr: 0.5,
                  py: 0.5,
                  mb: 3,
                }}
              >
                <MailOutline sx={{ color: colors.teal }} />
                <Typography sx={{ flex: 1, fontSize: { xs: '1rem', sm: '1.1rem' }, letterSpacing: '0.02em', wordBreak: 'break-all' }}>
                  {CONTACT_EMAIL}
                </Typography>
                <Tooltip title={copied ? 'Copied!' : 'Copy email address'}>
                  <IconButton onClick={copyEmail} aria-label="Copy email address" sx={{ color: colors.teal }}>
                    {copied ? <Check /> : <ContentCopy fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Box>

              <Button
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                href={gmailComposeUrl(topic.subject, greeting)}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNew />}
                sx={{ py: 1.6, fontSize: '1.1rem', borderRadius: 0, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
              >
                Draft an email in Gmail
              </Button>

              <Typography sx={{ mt: 2, textAlign: 'center', fontSize: '0.98rem', color: 'text.secondary' }}>
                Not using Gmail?{' '}
                <Box
                  component="a"
                  href={mailtoUrl(topic.subject, greeting)}
                  sx={{ color: colors.teal, textDecoration: 'underline', textUnderlineOffset: 3, '&:hover': { color: colors.plum } }}
                >
                  Open your mail app
                </Box>
              </Typography>
            </Box>
          </Box>
        </AnimatedSection>
      </Box>
    </Box>
  );
};

export default Contact;
