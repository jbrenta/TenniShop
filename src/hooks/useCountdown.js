import { useState, useEffect } from 'react';
import { DEFAULTS } from '../config/constants';

const useCountdown = (initialTime = DEFAULTS.COUNTDOWN_INITIAL) => {
  const [counter, setCounter] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        let { hours, minutes, seconds } = prevCounter;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return counter;
};

export default useCountdown; 