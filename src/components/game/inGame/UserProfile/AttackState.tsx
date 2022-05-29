import { useEffect, useRef, useState } from 'react';
import Player from '../../../../modules/game/Player';
import { useGame } from '../../../../modules/game/Provider';

const AttackState = ({ player }: { player: Player }) => {
  const { controller } = useGame();
  const [timer, setTimer] = useState(7);

  useEffect(() => {
    let timer = 7;

    const id = setInterval(() => {
      if (player?.attackState === 'default' || timer < 0) {
        clearInterval(id);

        if (player.isMe) {
          controller.resetAttackState();
        }
        return;
      }
      setTimer(timer);
      timer--;
    }, 1000);

    return () => clearInterval(id);
  }, [player.attackState]);

  return (
    <div className="absolute flex justify-center text-white items-center w-1/5 top-1 left-1 aspect-square bg-red-500 rounded-full">
      {timer}
    </div>
  );
};

export default AttackState;
