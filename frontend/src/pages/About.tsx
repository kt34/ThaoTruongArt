import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    const scrollToAbout = () => {
      const element = document.getElementById('about');
      if (element) {
        // Add a small delay to ensure the DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    };

    // Initial scroll
    scrollToAbout();

    // Add resize listener to handle orientation changes
    window.addEventListener('resize', scrollToAbout);

    // Cleanup
    return () => {
      window.removeEventListener('resize', scrollToAbout);
    };
  }, []);

  return null;
};

export default About; 