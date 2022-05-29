import { useGame } from '../../../../modules/game/Provider';

import Button from '../../../buttons/Default';
import LeaveButton from './LeaveButton';
import RoomState from './RoomState';

const GameHeader = () => {
  const { players, controller } = useGame();

  const handleStartGame = () => {
    if (!players[0].isHost) return;
    controller.startGame();
  };

  const handleReadyGame = () => {
    controller.readyGame();
  };

  return (
    <div className="flex flex-row w-full h-[100px] justify-between items-center px-2 text-sm text-white border-b border-white border-opacity-50">
      <RoomState />
      <div className="flex flex-1 h-full justify-center items-center">
        {players[0]?.isHost ? (
          <Button
            className="text-black"
            text={'게임 시작하기'}
            disabled={players.length === 1 || !!players.find(player => !player.isReady)}
            onClick={handleStartGame}
          />
        ) : (
          <Button
            className={`text-black ${players[0]?.isReady ? 'bg-opacity-60' : 'bg-opacity-100'}`}
            text={players[0]?.isReady ? '준비 취소' : '게임 준비'}
            onClick={handleReadyGame}
          />
        )}
      </div>
      <LeaveButton />
    </div>
  );
};

export default GameHeader;
