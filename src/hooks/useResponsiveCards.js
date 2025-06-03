import { useState, useEffect } from 'react';

const useResponsiveCards = (responsive = true, defaultCount = 5) => {
  const [visibleCards, setVisibleCards] = useState(defaultCount);

  useEffect(() => {
    if (!responsive) {
      setVisibleCards(defaultCount);
      return;
    }

    const calculateVisibleCards = () => {
      const width = window.innerWidth;
      if (width <= 582) return 1;
      if (width <= 880) return 2;
      if (width <= 1176) return 3;
      if (width <= 1472) return 4;
      return 5;
    };

    const handleResize = () => {
      if (responsive) {
        setVisibleCards(calculateVisibleCards());
      }
    };

    // Initial calculation
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [responsive, defaultCount]);

  return visibleCards;
};

export default useResponsiveCards; 