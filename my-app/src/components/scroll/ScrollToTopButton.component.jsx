import { useState, useEffect } from 'react';
import './ScrollToTopButton.styles.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Función para hacer scroll hasta la parte superior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Animación suave al subir
    });
  };

  // Mostrar el botón solo después de hacer scroll hacia abajo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top">
          ↑ 
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
