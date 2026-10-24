// Colours and fonts taken directly from the "ThaoTruongArt website design" deck.
export const colors = {
  teal: '#3C6E84',
  sage: '#A0B0A3',
  blush: '#E8CFC1',
  rose: '#DB9A8F',
  plum: '#814256',
  sand: '#EADAB8',
  cream: '#F6F6E9',
  navy: '#0E2841',
  white: '#FFFFFF',
  black: '#000000',
};

export const fonts = {
  body: "'Quattrocento Sans', 'Segoe UI', Arial, sans-serif",
  heading: 'Arial, Helvetica, sans-serif',
};

export const CONTACT_EMAIL = 'thaotruongart@yahoo.com';
export const FACEBOOK_URL = 'https://www.facebook.com/ThaoTruongArt';
export const INSTAGRAM_URL = 'https://www.instagram.com/thaotruongart';

// Opens Gmail's compose window with the recipient (and optional subject/body) pre-filled.
export const gmailComposeUrl = (subject = '', body = '') => {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: CONTACT_EMAIL });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params.toString()}`;
};

// Opens Outlook on the web with the recipient (and optional subject/body) pre-filled.
export const outlookComposeUrl = (subject = '', body = '') => {
  const params = new URLSearchParams({ to: CONTACT_EMAIL });
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
};

export const mailtoUrl = (subject = '', body = '') => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ''}`;
};

export const collections = [
  {
    id: 'australian-birds',
    title: 'Australian Native Birds',
    cover: '/images/design/cover-australian-birds.jpg',
    coverPosition: 'center 90%',
  },
  {
    id: 'pet-portraits',
    title: 'Pet Portraits',
    cover: '/images/design/cover-pet-portraits.jpg',
  },
  {
    id: 'women-figures',
    title: 'Women in Abstract',
    cover: '/images/design/cover-women-abstract.jpg',
  },
  {
    id: 'fluid-art',
    title: 'Abstract Fluid Art',
    cover: '/images/design/cover-fluid-art.jpg',
  },
];
