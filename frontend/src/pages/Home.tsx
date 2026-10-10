import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import AnimatedSection from '../components/AnimatedSection';
import { HEADER_OFFSET } from '../components/Navbar';
import { colors, fonts } from '../constants';

// Body copy in the deck is 20pt Quattrocento Sans with wide letter-spacing on a 16:9 slide.
// On desktop it scales with the viewport so each section keeps the slide's proportions.
const bodyText = (letterSpacing = '0.1em'): SxProps<Theme> => ({
  fontFamily: fonts.body,
  fontSize: { xs: '1.1rem', sm: '1.2rem', md: 'min(2.05vw, 1.95rem)' },
  letterSpacing,
  lineHeight: 1.45,
  m: 0,
});

// A full-bleed section that matches the 16:9 slide on desktop and stacks on mobile.
const slideSx: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  bgcolor: colors.teal,
  aspectRatio: { md: '16 / 9' },
};

// Positions an element using the slide's percentages (desktop only).
const at = (left: number, top: number, width: number, height: number) => ({
  position: { md: 'absolute' },
  left: { md: `${left}%` },
  top: { md: `${top}%` },
  width: { md: `${width}%` },
  height: { md: `${height}%` },
});

/* Slide 1 — Hi, I'm Thao Truong */
const Intro = () => (
  <Box sx={{ bgcolor: colors.teal, pb: { xs: 5, md: '7.3vw' } }}>
    <Box
      sx={{
        bgcolor: colors.sage,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: { xs: 4, md: '3.5%' },
        px: { xs: 3, md: '3.5%' },
        py: { xs: 5, md: 0 },
        minHeight: { md: '31vw' },
      }}
    >
      <Box
        component="img"
        src="/images/design/thao-portrait.jpg"
        alt="Thao Truong"
        sx={{
          width: { xs: '72vw', sm: 340, md: '30.3%' },
          maxWidth: { xs: 340, md: 'none' },
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          my: { md: '0.15vw' },
        }}
      />
      <AnimatedSection>
        <Box sx={{ color: colors.white, pt: { md: '1.2vw' }, pr: { md: '2%' } }}>
          <Typography component="h2" sx={{ ...bodyText('0.1em'), fontWeight: 700, mb: { xs: 2.5, md: '2.6vw' } }}>
            Hi, I’m Thao Truong
          </Typography>
          <Typography sx={bodyText('0.075em')}>
            Art has always been a source of joy, creativity, and personal fulfilment in my life. As a
            self-taught artist, my artistic journey began in 2020 as a hobby, exploring arts and crafts
            simply for the love of creating. What started as a relaxing pastime soon grew into a true
            passion, one that continues to evolve and inspire me every day.
          </Typography>
        </Box>
      </AnimatedSection>
    </Box>
  </Box>
);

/* Slide 2 — Fluid art beginnings */
const FluidBeginnings = () => (
  <Box sx={{ ...slideSx, display: { xs: 'flex', md: 'block' }, flexDirection: 'column' }}>
    <Box
      sx={{
        ...at(0, 34.8, 61, 32.4),
        bgcolor: colors.blush,
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, md: '3.3%' },
        py: { xs: 5, md: 0 },
        order: { xs: 2, md: 0 },
      }}
    >
      <AnimatedSection>
        <Typography sx={{ ...bodyText('0.09em'), color: colors.black }}>
          My artistic journey began with fluid art, where I explored the beauty of colour, movement, and
          creative expression through a variety of techniques.
        </Typography>
      </AnimatedSection>
    </Box>
    <Box
      component="img"
      src="/images/design/fluid-canvases.jpg"
      alt="A stack of fluid art canvases"
      sx={{
        ...at(61, 0, 39, 100),
        width: { xs: '100%', md: '39%' },
        height: { xs: 360, sm: 460, md: '100%' },
        objectFit: 'cover',
        order: { xs: 1, md: 0 },
      }}
    />
  </Box>
);

/* Slide 3 — Evolving interests, with a collage of works in progress */
const collage = [
  { src: '/images/design/gumleaf-painting.jpg', alt: 'Painting gum leaves and blossoms', pos: [1.1, 1.1, 24.1, 31.8], rotate: -24.9 },
  { src: '/images/design/feather-painting.jpg', alt: 'Painting detailed bird feathers', pos: [1.7, 30.9, 17.7, 38.1], rotate: 40.3 },
  { src: '/images/design/movement.jpg', alt: 'Movement, a black and white street scene', pos: [6.8, 65.6, 21.3, 34.4], rotate: 0 },
] as const;

const EvolvingInterests = () => (
  <Box sx={{ ...slideSx, display: { xs: 'flex', md: 'block' }, flexDirection: 'column' }}>
    <Box
      sx={{
        display: { xs: 'grid', md: 'contents' },
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1.5,
        p: { xs: 2, md: 0 },
      }}
    >
      {collage.map(({ src, alt, pos, rotate }) => (
        <Box
          key={src}
          component="img"
          src={src}
          alt={alt}
          sx={{
            ...at(pos[0], pos[1], pos[2], pos[3]),
            width: { xs: '100%', md: `${pos[2]}%` },
            height: { xs: 'auto', md: `${pos[3]}%` },
            aspectRatio: { xs: '1 / 1', md: 'auto' },
            objectFit: 'cover',
            transform: { md: `rotate(${rotate}deg)` },
          }}
        />
      ))}
    </Box>
    <Box
      sx={{
        ...at(31.6, 21.1, 68.4, 53.5),
        bgcolor: colors.rose,
        px: { xs: 3, md: '3.2%' },
        pt: { xs: 5, md: '3.6%' },
        pb: { xs: 5, md: 0 },
      }}
    >
      <AnimatedSection>
        <Typography sx={{ ...bodyText(), color: colors.white }}>
          Over time, my interests evolved to include abstract female figures, pet portraits, and, most
          recently, Australia's extraordinary native birds, fauna, and flora. Inspired by their vibrant
          colours, unique character, and natural beauty, I strive to capture their spirit in artwork that
          brings joy, energy, and a connection to nature.
        </Typography>
      </AnimatedSection>
    </Box>
  </Box>
);

/* Slide 4 — Joyful Art GetAway & Bruno */
const JoyfulGetaway = () => (
  <Box sx={{ ...slideSx, display: { xs: 'flex', md: 'block' }, flexDirection: 'column' }}>
    <Box sx={{ ...at(0, 0, 100, 44.3), bgcolor: colors.plum, px: { xs: 3, md: '4.3%' }, pt: { xs: 5, md: '2.9%' }, pb: { xs: 5, md: 0 } }}>
      <AnimatedSection>
        <Typography sx={{ ...bodyText(), color: colors.white, maxWidth: { md: '53%' } }}>
          "Joyful Art GetAway" reflects my belief that art should bring happiness, wonder, and a moment of
          escape from everyday life. Creating and sharing art is incredibly rewarding, and I feel grateful
          to connect with others through my work.
        </Typography>
      </AnimatedSection>
    </Box>
    <Box
      sx={{
        ...at(0, 58, 69.2, 28),
        bgcolor: colors.sand,
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, md: '5.8%' },
        py: { xs: 4, md: 0 },
        my: { xs: 4, md: 0 },
      }}
    >
      <AnimatedSection>
        <Typography sx={{ ...bodyText(), fontStyle: 'italic', color: colors.navy, maxWidth: { md: '72%' } }}>
          Bruno, my much-loved fur baby, is my constant studio companion and a daily source of joy and
          inspiration.
        </Typography>
      </AnimatedSection>
    </Box>
    <Box
      component="img"
      src="/images/design/studio-bruno.jpg"
      alt="Thao painting in her studio with Bruno"
      sx={{
        ...at(57.8, 0, 42.2, 100),
        width: { xs: '100%', md: '42.2%' },
        height: { xs: 420, sm: 520, md: '100%' },
        objectFit: 'cover',
      }}
    />
  </Box>
);

/* Slide 5 — Thank you, with the kookaburra family */
const ThankYou = () => (
  <Box sx={{ ...slideSx, py: { xs: 6, md: 0 } }}>
    <Box
      sx={{
        ...at(0, 17.7, 100, 64.5),
        bgcolor: colors.cream,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 4, md: 0 },
        px: { xs: 3, md: '1.9%' },
        py: { xs: 5, md: 0 },
      }}
    >
      <Box sx={{ width: { md: '53%' } }}>
        <AnimatedSection>
          <Typography sx={{ ...bodyText(), color: colors.black }}>
            I believe that art is happiness for the mind and soul. Thank you for visiting and being part of
            my creative journey. I hope my artwork brings a little colour, joy, and inspiration into your
            world.
          </Typography>
        </AnimatedSection>
      </Box>
      <Box
        component="img"
        src="/images/design/kookaburra-family.jpg"
        alt="Kookaburra family painting"
        sx={{
          position: { md: 'absolute' },
          left: { md: '56.1%' },
          top: { md: '1.4%' },
          width: { xs: '100%', md: '42.5%' },
          height: { md: '98.8%' },
          maxWidth: { xs: 520, md: 'none' },
          aspectRatio: { xs: '1474 / 1244', md: 'auto' },
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    </Box>
  </Box>
);

const Home = () => (
  <Box id="about" component="section" sx={{ scrollMarginTop: `${HEADER_OFFSET}px` }}>
    <Intro />
    <FluidBeginnings />
    <EvolvingInterests />
    <JoyfulGetaway />
    <ThankYou />
  </Box>
);

export default Home;
