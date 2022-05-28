import { useGame } from '../../../../modules/game/Provider';

const RoomState = () => {
  const { gameRoomInfo } = useGame();
  return (
    <div className="flex flex-col">
      <div className="select-text">{`방번호 : ${gameRoomInfo?.gameId}`}</div>
      <div>{gameRoomInfo?.roomName}</div>
    </div>
  );
};

export default RoomState;
