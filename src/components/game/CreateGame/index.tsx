import React, { useState } from 'react';

import CloseButton from './CloseButton';
import Title from './Title';
import RoomNameInput from './RoomNameInput';
import PrivateCheckBox from './PrivateCheckBox';
import DefaultButton from '../../buttons/Default';
import WinConditionBox from './WinConditionBox';

interface CreateGameProps {
  createGame: (data: any, withCookie: boolean) => any;
  loading: boolean;
}

const CreateGame: React.FC<CreateGameProps> = ({ createGame, loading }) => {
  const [roomName, setRoomName] = useState<string>('타자의 신을 향해~!');
  const [isPrivate, setPrivate] = useState<boolean>(false);
  const [winCondition, setWinCondition] = useState<number>(10);

  const handleCreateGame = () => {
    const createGameData: GameSetting = {
      roomName,
      isPrivate,
      winCondition,
    };
    createGame({ createGameData }, true);
  };

  return (
    <div className="relative w-3/4 max-w-xl border border-white bg-zinc-800 rounded-md p-4 space-y-3">
      {loading && <div className="absolute w-full h-full bg-opacity-70 bg-black">로딩중</div>}
      <CloseButton />
      <Title />
      <PrivateCheckBox value={isPrivate} updater={setPrivate} />
      <WinConditionBox value={winCondition} updater={setWinCondition} />
      <RoomNameInput value={roomName} updater={setRoomName} />
      <div className="w-full flex justify-center py-3">
        <DefaultButton text="게임 생성하기" onClick={handleCreateGame} disabled={!roomName} />
      </div>
    </div>
  );
};

export default CreateGame;
