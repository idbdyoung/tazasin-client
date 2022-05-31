import { useNavigate } from 'react-router-dom';
import Player from '../../../../modules/game/Player';

interface EndingBoardProps {
  winner: Player;
}

const EndingBoard = ({ winner }: EndingBoardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center w-full h-full space-x-5">
      <div className="flex flex-col justify-center items-center text-white text-5xl space-y-2">
        <div>winner</div>
        <div
          style={{ background: winner?.color }}
          className="relative flex justify-center items-center w-[100px] h-[100px] rounded-full text-white text-2xl"
        >
          {winner?.user.name}
        </div>
        <div
          className="flex justify-center items-center text-sm text-zinc-800 p-2 rounded-md bg-primary-gray cursor-pointer hover:opacity-70"
          onClick={() => navigate('/')}
        >
          대기방으로 되돌아가기
        </div>
      </div>
    </div>
  );
};

export default EndingBoard;
