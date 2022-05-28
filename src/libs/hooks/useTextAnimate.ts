import { useEffect, useRef, useState } from 'react';

const useTextAnimate = (text: string, speed: number, startCondition: boolean = true) => {
  const chars = useRef(text.split(''));
  const [textPrinter, setTextPrinter] = useState('');
  const [isDone, setDone] = useState(false);

  useEffect(() => {
    if (!startCondition) return;

    if (!chars.current.length) {
      setDone(true);
      return;
    }
    const shifted = chars.current.shift();
    const id = setTimeout(() => setTextPrinter(textPrinter + shifted), speed);

    return () => clearTimeout(id);
  }, [textPrinter, startCondition]);

  return { textPrinter, isDone };
};

export default useTextAnimate;
