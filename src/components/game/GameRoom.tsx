import { useNavigate } from 'react-router-dom';

import UserCard from './UserCard';

const GameRoom = ({ gameRoom }: { gameRoom: GameRoom }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/game/${gameRoom.gameId}`, { replace: true })}
      className="flex flex-col w-full border-2 text-primary-gray border-primary-gray rounded-2xl mb-10 p-5 text-sm hover:opacity-70 cursor-pointer"
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-2xl">{gameRoom.roomName}</div>
        <div>
          <div className="text-sm">방번호: {gameRoom.gameId}</div>
          <div>승리 조건: {gameRoom.winCondition}점</div>
        </div>
      </div>
      <div className="w-full h-full flex flex-row flex-1 mt-3 space-x-11">
        {new Array(4).fill('').map((_, i) => {
          return (
            <UserCard
              key={i}
              color={gameRoom.sessions[i]?.color}
              user={gameRoom.sessions[i]?.user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameRoom;
