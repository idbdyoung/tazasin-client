import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '../libs/hooks/useUser';
import useMutation from '../libs/hooks/useMutation';
import useGameList from '../libs/hooks/game/useGameList';
import { useModal } from '../modules/Modal';

import Button from '../components/buttons/Default';
import CreateGame from '../components/game/CreateGame';
import GameRoom from '../components/game/GameRoom';

interface createdGameResultesult {
  ok: boolean;
  gameId: string;
}

const Waiting: React.FC = () => {
  const [user] = useUser();
  const [gameList] = useGameList();
  const modal = useModal();
  const navigate = useNavigate();
  const [createGame, { loading, data: createGameResult }] = useMutation<createdGameResultesult>(
    `${process.env.REACT_APP_API_URL}/game/create`
  );

  const openCreateGamePopup = () => {
    if (!user) return;
    modal.open(<CreateGame createGame={createGame} loading={loading} />);
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (createGameResult && createGameResult.ok) {
      modal.close();
      navigate(`/game/${createGameResult.gameId}`, { replace: true });
    }
  }, [createGameResult]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between w-full h-20 px-5">
        <div className="flex flex-col text-sm h-11 text-primary-gray">
          <div className="mr-4">{`대기중인 게임: ${gameList?.length ?? 0}`}</div>
        </div>
        <div className="flex flex-row">
          <Button className={'mr-3'} text={'코드로 참여'} onClick={() => {}} />
          <Button text={'방만들기'} onClick={openCreateGamePopup} />
        </div>
      </div>
      <div className="flex flex-row overflow-y-hidden space-x-3 flex-1 box-border">
        <div className="flex overflow-scroll px-5 py-3 flex-1 bg-yellow-50">
          <div className="w-full h-[1500px] bg-indigo-300"></div>
        </div>
        <div className="overflow-scroll px-5 py-3 w-3/4">
          {gameList &&
            gameList.map(gameRoom => <GameRoom key={gameRoom.gameId} gameRoom={gameRoom} />)}
        </div>
      </div>
    </div>
  );
};

export default Waiting;
