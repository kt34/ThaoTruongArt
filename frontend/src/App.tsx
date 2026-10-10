import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import CollectionDetails from './pages/CollectionDetails';
import PaintingDetails from './pages/PaintingDetails';
import { useEffect } from 'react';
import { colors, fonts } from './constants';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.teal,
      light: '#5E8DA1',
      dark: '#2B5264',
      contrastText: colors.white,
    },
    secondary: {
      main: colors.plum,
      light: '#9D6176',
      dark: '#5F2E3E',
      contrastText: colors.white,
    },
    background: {
      default: colors.teal,
      paper: colors.cream,
    },
    text: {
      primary: colors.black,
      secondary: '#4A5560',
    },
  },
  typography: {
    fontFamily: fonts.body,
    h1: { fontFamily: fonts.heading, fontWeight: 400 },
    h2: { fontFamily: fonts.heading, fontWeight: 400 },
    h3: { fontFamily: fonts.heading, fontWeight: 400 },
    h4: { fontFamily: fonts.heading, fontWeight: 400 },
    h5: { fontFamily: fonts.heading, fontWeight: 400 },
    h6: { fontFamily: fonts.heading, fontWeight: 400 },
    button: { fontFamily: fonts.heading, textTransform: 'none' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: colors.teal },
      },
    },
  },
});

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      // Wait a frame so the home page sections exist before scrolling.
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo(0, 0);
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
                <Home />
                <Collections />
                <Contact />
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
