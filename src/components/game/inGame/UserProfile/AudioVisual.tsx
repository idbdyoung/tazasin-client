import { useCallback, useEffect, useState } from 'react';

import Player from '../../../../modules/game/Player';
import { useGame } from '../../../../modules/game/Provider';

interface AudioBoardProps {
  player?: Player;
}

const AudioVisual: React.FC<AudioBoardProps> = ({ player }) => {
  const { gameState } = useGame();
  const [audioDetected, setAudioDetected] = useState(false);

  const audioDetector = useCallback((detected: boolean) => setAudioDetected(detected), []);

  useEffect(() => {
    if (!player) return;
    player.onAudioDetected(audioDetector);

    return () => player.removeAudioDetected(audioDetector);
  }, []);

  return (
    <div
      style={{ background: player ? player.color : '#525255' }}
      className={`relative flex justify-center items-center w-2/3 aspect-square rounded-full ring-2 ${
        audioDetected ? 'ring-white' : 'ring-zinc-800'
      } text-2xl text-primary-gray`}
    >
      {gameState === 'ingame' && player?.attackState !== 'default' && (
        <img
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25px] h-[25px]"
          src={`/assets/${player?.attackState}.png`}
        />
      )}
      {player?.user.name}
    </div>
  );
};

export default AudioVisual;
