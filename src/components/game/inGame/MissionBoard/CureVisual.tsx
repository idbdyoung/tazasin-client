import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../../../modules/game/Provider';

const AttackVisual = () => {
  const firstRun = useRef(true);
  const [animatable, setAnimatable] = useState(false);
  const { myPlayer } = useGame();

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (myPlayer?.attackState === 'default') {
      setAnimatable(true);
      const id = setTimeout(() => setAnimatable(false), 2000);

      return () => clearInterval(id);
    }
  }, [myPlayer?.attackState]);

  return (
    <>
      {animatable && (
        <div className="absolute w-25 h-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-full opacity-10 animate-pulse-weak">
          <img src={'/assets/default.png'} />
        </div>
      )}
    </>
  );
};

export default AttackVisual;
