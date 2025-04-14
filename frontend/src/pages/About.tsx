import { Box, Typography, Container } from '@mui/material';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  return (
    <Box sx={{ py: 2, scrollMarginTop: '60px' }}>
      <Container maxWidth="md">
        <AnimatedSection>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'secondary.main',
              mb: 4,
              textAlign: 'center',
            }}
          >
            About the Artist
          </Typography>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Typography
            variant="body1"
            paragraph
            sx={{ mb: 3 }}
          >
            Thao Truong is a self-taught artist whose work blends AI-generated elements with human creativity, crafting visually striking narratives that blur the line between technology and traditional storytelling. Based in Sydney, her artistic vision is deeply influenced by the intersection of digital media, storytelling, and human emotion.
          </Typography>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <Typography
            variant="body1"
            paragraph
            sx={{ mb: 3 }}
          >
            Through her work, Thao explores themes of identity, memory, and the evolving role of artificial intelligence in artistic expression. She utilizes AI-generated compositions as a foundation, refining them with her own creative touch to evoke depth, nuance, and emotion. Her pieces often feature surreal, dreamlike imagery, drawing inspiration from mythology, personal experiences, and the fluidity of human imagination.
          </Typography>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <Typography
            variant="body1"
            paragraph
          >
            Thao's creative journey is driven by a fascination with how technology can enhance artistic expression rather than replace it. Her work has gained recognition among digital art communities and collectors, with pieces showcased in private collections both in Australia and internationally.
          </Typography>
        </AnimatedSection>
      </Container>
    </Box>
  );
};

export default About; 