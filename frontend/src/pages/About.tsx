import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    // Scroll to the about section in the home page
    const element = document.getElementById('about');
    if (element) {
      const offset = 60; // Height of the navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return null;
};

export default About; 