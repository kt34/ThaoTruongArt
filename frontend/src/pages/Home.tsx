import { Box, Typography } from '@mui/material';
import AnimatedSection from '../components/AnimatedSection';
import { Section, Container } from '../components/Layout';
import { bodyText, sectionPadding, imageRadius, softShadow, headerOffset } from '../styles';
import { colors, fonts } from '../constants';

/* Hi, I'm Thao Truong */
const Intro = () => (
  <Section bg={colors.sage} color={colors.white} sx={{ py: { xs: 8, md: 10 } }}>
    <Container
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
        gap: { xs: 5, md: 8 },
        alignItems: 'center',
      }}
    >
      <AnimatedSection>
        <Box
          component="img"
          src="/images/design/thao-portrait.jpg"
          alt="Thao Truong"
          sx={{
            width: '100%',
            maxWidth: { xs: 300, md: 420 },
            mx: 'auto',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: `0 0 0 10px rgba(255,255,255,0.25), ${softShadow}`,
          }}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Box sx={{ textShadow: '0 1px 2px rgba(0,0,0,0.12)', textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            component="h1"
            sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: { xs: '1.7rem', md: '2.75rem' }, letterSpacing: '0.04em', lineHeight: 1.2, mb: 3 }}
          >
            Hi, I’m Thao Truong
          </Typography>
          <Typography sx={{ ...bodyText, fontSize: { xs: '1.17rem', md: '1.25rem' } }}>
            Art has always been a source of joy, creativity, and personal fulfilment in my life. As a
            self-taught artist, my artistic journey began in 2020 as a hobby, exploring arts and crafts
            simply for the love of creating. What started as a relaxing pastime soon grew into a true
            passion, one that continues to evolve and inspire me every day.
          </Typography>
        </Box>
      </AnimatedSection>
    </Container>
  </Section>
);

/* Fluid art beginnings: a full-width split with text on one side and the photo on the other */
const FluidBeginnings = () => (
  <Box
    component="section"
    sx={{ bgcolor: colors.blush, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { md: 'flex-end' }, order: { xs: 2, md: 1 } }}>
      <Box sx={{ maxWidth: { md: 600 }, width: '100%', px: { xs: 3, md: 4 }, pr: { md: 8 }, py: sectionPadding }}>
        <AnimatedSection>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: 56, height: 3, bgcolor: colors.teal, mb: 3 }} />
            <Typography sx={{ ...bodyText, color: '#1D1D1D', fontSize: { xs: '1.15rem', md: '1.45rem' }, lineHeight: 1.7 }}>
              My artistic journey began with fluid art, where I explored the beauty of colour, movement, and
              creative expression through a variety of techniques.
            </Typography>
          </Box>
        </AnimatedSection>
      </Box>
    </Box>
    <Box
      component="img"
      src="/images/design/fluid-canvases.jpg"
      alt="A stack of fluid art canvases"
      loading="lazy"
      sx={{ width: '100%', height: { xs: 380, sm: 480, md: 600 }, objectFit: 'cover', objectPosition: 'center 40%', order: { xs: 1, md: 2 } }}
    />
  </Box>
);

/* Evolving interests, with a loose collage of works in progress */
const collage = [
  { src: '/images/design/gumleaf-painting.jpg', alt: 'Painting gum leaves and blossoms', sx: { top: '0%', left: '0%', width: '62%', aspectRatio: '5 / 4', rotate: '-5deg', zIndex: 1 } },
  { src: '/images/design/feather-painting.jpg', alt: 'Painting detailed bird feathers', sx: { top: '24%', right: '0%', width: '46%', aspectRatio: '3 / 4', rotate: '6deg', zIndex: 2 } },
  { src: '/images/design/movement.jpg', alt: 'Movement, a black and white street scene', sx: { bottom: '0%', left: '4%', width: '52%', aspectRatio: '1 / 1', rotate: '0deg', zIndex: 3 } },
];

const EvolvingInterests = () => (
  <Section bg={colors.teal}>
    <Container
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '5fr 6fr' },
        gap: { xs: 6, md: 8 },
        alignItems: 'center',
      }}
    >
      <AnimatedSection>
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 480, mx: 'auto', aspectRatio: '1 / 1.08' }}>
          {collage.map(({ src, alt, sx }) => (
            <Box
              key={src}
              component="img"
              src={src}
              alt={alt}
              loading="lazy"
              sx={{
                position: 'absolute',
                objectFit: 'cover',
                border: `6px solid ${colors.cream}`,
                borderRadius: imageRadius,
                boxShadow: softShadow,
                transition: 'transform 0.4s ease',
                '&:hover': { transform: 'scale(1.04)', zIndex: 5 },
                ...sx,
              }}
            />
          ))}
        </Box>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Box sx={{ bgcolor: colors.rose, color: colors.white, borderRadius: imageRadius, p: { xs: 4, md: 6 }, boxShadow: softShadow }}>
          <Typography sx={bodyText}>
            Over time, my interests evolved to include abstract female figures, pet portraits, and, most
            recently, Australia's extraordinary native birds, fauna, and flora. Inspired by their vibrant
            colours, unique character, and natural beauty, I strive to capture their spirit in artwork that
            brings joy, energy, and a connection to nature.
          </Typography>
        </Box>
      </AnimatedSection>
    </Container>
  </Section>
);

/* Joyful Art GetAway, with Bruno */
const JoyfulGetaway = () => (
  <Section bg={colors.plum} color={colors.white}>
    <Container
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '6fr 5fr' },
        gap: { xs: 6, md: 8 },
        alignItems: 'center',
      }}
    >
      <AnimatedSection>
        <Typography sx={bodyText}>
          "Joyful Art GetAway" reflects my belief that art should bring happiness, wonder, and a moment of
          escape from everyday life. Creating and sharing art is incredibly rewarding, and I feel grateful
          to connect with others through my work.
        </Typography>
        <Box
          sx={{
            bgcolor: colors.sand,
            color: colors.navy,
            borderRadius: imageRadius,
            mt: 5,
            p: { xs: 3, md: 4 },
            borderLeft: { xs: `8px solid ${colors.teal}`, md: `5px solid ${colors.teal}` },
          }}
        >
          <Typography sx={{ ...bodyText, fontStyle: 'italic' }}>
            Bruno, my much-loved fur baby, is my constant studio companion and a daily source of joy and
            inspiration.
          </Typography>
        </Box>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Box
          component="img"
          src="/images/design/studio-bruno.jpg"
          alt="Thao painting in her studio with Bruno"
          loading="lazy"
          sx={{ width: '100%', maxWidth: 480, mx: 'auto', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: imageRadius, boxShadow: softShadow}}
        />
      </AnimatedSection>
    </Container>
  </Section>
);

/* Thank you, with the kookaburra family */
const ThankYou = () => (
  <Section bg={colors.cream} color="#1D1D1D">
    <Container
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: 6, md: 8 },
        alignItems: 'center',
      }}
    >
      <AnimatedSection>
        <Typography sx={{ ...bodyText, fontSize: { xs: '1.15rem', md: '1.45rem' }, lineHeight: 1.7 }}>
          I believe that art is happiness for the mind and soul. Thank you for visiting and being part of my
          creative journey. I hope my artwork brings a little colour, joy, and inspiration into your world.
        </Typography>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Box
          component="img"
          src="/images/design/kookaburra-family.jpg"
          alt="Kookaburra family painting"
          loading="lazy"
          sx={{ width: '100%', maxWidth: 540, mx: 'auto', aspectRatio: '1474 / 1244', objectFit: 'cover', borderRadius: '50%', boxShadow: softShadow }}
        />
      </AnimatedSection>
    </Container>
  </Section>
);

const Home = () => (
  <Box id="about" sx={{ scrollMarginTop: headerOffset }}>
    <Intro />
    <FluidBeginnings />
    <EvolvingInterests />
    <JoyfulGetaway />
    <ThankYou />
  </Box>
);

export default Home;
