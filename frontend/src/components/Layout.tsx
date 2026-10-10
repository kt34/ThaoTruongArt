import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';
import { sectionPadding } from '../styles';

interface SectionProps {
  id?: string;
  bg: string;
  color?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const Section = ({ id, bg, color, children, sx }: SectionProps) => (
  <Box
    id={id}
    component="section"
    sx={[{ bgcolor: bg, color, py: sectionPadding, overflow: 'hidden' }, ...(Array.isArray(sx) ? sx : [sx])]}
  >
    {children}
  </Box>
);

export const Container = ({ children, sx }: { children: ReactNode; sx?: SxProps<Theme> }) => (
  <Box sx={[{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 4 } }, ...(Array.isArray(sx) ? sx : [sx])]}>{children}</Box>
);
