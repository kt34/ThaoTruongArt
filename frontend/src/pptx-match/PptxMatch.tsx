import Navbar from './Navbar';
import Home from './Home';
import Collections from './Collections';
import Contact from './Contact';

// The first version of the site, matching the design deck slide for slide. Kept at /pptx-match for comparison.
const PptxMatch = () => (
  <>
    <Navbar />
    <main>
      <Home />
      <Collections />
      <Contact />
    </main>
  </>
);

export default PptxMatch;
