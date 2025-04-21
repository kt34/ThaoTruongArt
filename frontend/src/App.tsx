import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Footer from './components/Footer';
import CollectionDetails from './pages/CollectionDetails';
import PaintingDetails from './pages/PaintingDetails';
import { useEffect } from 'react';

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

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        const offset = 60; // Height of the navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToSection />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <section id="home">
                  <Home />
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
              </>
            } />
            <Route path="/collections/:collectionId" element={<CollectionDetails />} />
            <Route path="/painting/:collectionId/:paintingId" element={<PaintingDetails />} />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
