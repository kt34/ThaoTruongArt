import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B3C21',
      light: '#6B5C41',
      dark: '#2B1C01',
    },
    secondary: {
      main: '#332916',
      light: '#534936',
      dark: '#130900',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Playfair Display', 'Trebuchet MS', Arial, sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
    },
    h4: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
    },
    h5: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
    },
    h6: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
    },
    body1: {
      fontFamily: "'Poppins', sans-serif",
    },
    body2: {
      fontFamily: "'Poppins', sans-serif",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="collections">
          <Collections />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <section id="faq">
          <FAQ />
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
