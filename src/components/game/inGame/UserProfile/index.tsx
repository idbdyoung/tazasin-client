import { useEffect, useState } from 'react';
import Player from '../../../../modules/game/Player';
import { useGame } from '../../../../modules/game/Provider';
import AttackState from './AttackState';

import AudioVisual from './AudioVisual';
import Mark from './Mark';
import Score from './Score';

interface UserProfileProps {
  player?: Player;
}

const UserProfile: React.FC<UserProfileProps> = ({ player }) => {
  const { gameState, gamePhase, controller, gameRoomInfo } = useGame();
  const [attacking, setAttacking] = useState<string | boolean>();

  useEffect(() => {
    if (!player) return;
    if (player?.score === gameRoomInfo?.winCondition) {
      controller.endGame(player.id);
    }
  }, [player?.score]);

  useEffect(() => {
    if (player?.attackState === 'default') {
      setAttacking(false);
    } else {
      setAttacking(player?.attackState);
    }
  }, [player?.attackState]);

  return (
    <div className={'aspect-square w-full'}>
      <div className="relative aspect-square flex flex-col justify-evenly items-center rounded-md border border-white border-opacity-20">
        <AudioVisual player={player} />
        {gameState === 'ingame' && (
          <Score score={player?.score ?? 0} color={player?.color ?? 'white'} />
        )}
        {gameState === 'ingame' && !!attacking && <AttackState player={player!} />}
        {gameState === 'waiting' && (
          <>
            {player?.isMe && (
              <Mark
                text="you"
                className="absolute bottom-2 left-2 text-white"
                background={player.color}
              />
            )}
            {player?.isHost ? (
              <Mark
                text="host"
                className="absolute bottom-2 right-2 text-white"
                background={player.color}
              />
            ) : (
              gamePhase === 'ready' &&
              player?.isReady && (
                <div className="absolute flex justify-end items-end w-full h-full bg-zinc-800 opacity-70 text-white p-1 border border-white rounded-md">
                  준비완료
                </div>
              )
            )}
            {player?.isHost && <img src="/assets/crown.png" className="absolute top-1/4 w-1/12" />}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
