import type { SxProps, Theme } from '@mui/material';
import { fonts } from './constants';

// Shared spacing and type scale so every section on the page feels consistent.
export const sectionPadding = { xs: 8, md: 12 };

export const bodyText: SxProps<Theme> = {
  fontFamily: fonts.body,
  fontSize: { xs: '1.08rem', md: '1.25rem' },
  letterSpacing: '0.04em',
  lineHeight: 1.75,
  m: 0,
};

export const headingText: SxProps<Theme> = {
  fontFamily: fonts.heading,
  fontWeight: 400,
  fontSize: { xs: '2rem', md: '2.75rem' },
  lineHeight: 1.15,
  letterSpacing: '0.01em',
  m: 0,
};

export const imageRadius = '6px';
export const softShadow = '0 18px 40px rgba(0, 0, 0, 0.18)';

// Sticky header height; sections use it as their scroll-margin so anchors land below the header.
export const headerOffset = { xs: '72px', md: '96px' };
