import { useEffect, useState } from 'react';
import { useGame } from '../../../../modules/game/Provider';

const AttackVisual = () => {
  const [isDefault, setDefault] = useState(false);
  const { myPlayer } = useGame();

  useEffect(() => {
    if (!myPlayer?.attackState) return;
    if (myPlayer.attackState === 'default') {
      setDefault(true);
      setTimeout(() => setDefault(false));
    }
  }, [myPlayer?.attackState]);

  return (
    <>
      {myPlayer?.attackState !== 'default' ? (
        !isDefault && (
          <div className="absolute w-25 h-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 p-10 rounded-full opacity-10 animate-pulse-weak">
            <img src={`/assets/${myPlayer?.attackState}.png`} />
          </div>
        )
      ) : (
        <div className="absolute w-25 h-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 p-10 rounded-full opacity-10 animate-pulse-weak">
          <img src={`/assets/${myPlayer?.attackState}.png`} />
        </div>
      )}
    </>
  );
};

export default AttackVisual;
