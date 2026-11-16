import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import CollectionPage from './pages/CollectionPage';
import ArtworkPage from './pages/ArtworkPage';
import { galleryCollections, COLLECTIONS_BASE, PREVIEW_HOME } from './data/collections';
import Footer from './components/Footer';
import PptxMatch from './pptx-match/PptxMatch';
import Stats from './pages/Stats';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
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
        <Routes>
          {/* Original slide-for-slide version of the design, kept for comparison. */}
          <Route path="/pptx-match" element={<PptxMatch />} />
          {/* Private analytics page (not linked from the site); has its own header, no site footer. */}
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={
            <>
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
                  {/* Hidden preview: the same home page, but the finished collections are clickable. */}
                  <Route path={PREVIEW_HOME} element={
                    <>
                      <Home />
                      <Collections preview />
                      <Contact />
                    </>
                  } />
                  {galleryCollections.flatMap((c) => [
                    <Route key={c.slug} path={`${COLLECTIONS_BASE}/${c.slug}`} element={<CollectionPage collection={c} />} />,
                    <Route key={`${c.slug}-artwork`} path={`${COLLECTIONS_BASE}/${c.slug}/:slug`} element={<ArtworkPage collection={c} />} />,
                  ])}
                  <Route path={`${COLLECTIONS_BASE}/*`} element={<Navigate to={PREVIEW_HOME} replace state={{ scrollTo: 'collections' }} />} />
                  {/* Public collection and painting pages are blocked for now; redirect to the gallery section. */}
                  <Route path="/collections/*" element={<Navigate to="/" replace state={{ scrollTo: 'collections' }} />} />
                  <Route path="/painting/*" element={<Navigate to="/" replace state={{ scrollTo: 'collections' }} />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
        <Routes>
          <Route path="/stats" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
        <Analytics />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
