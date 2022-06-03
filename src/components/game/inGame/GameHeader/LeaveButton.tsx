import { useGame } from '../../../../modules/game/Provider';

const LeaveButton = () => {
  const { controller } = useGame();

  const handleLeaveGame = () => {
    if (window.confirm('방을 나가시겠습니까?')) {
      controller.leaveGame();
    }
  };

  return (
    <div
      className="flex justify-center items-center text-sm text-zinc-800 rounded-full w-10 h-10 bg-primary-gray cursor-pointer hover:opacity-70"
      onClick={handleLeaveGame}
    >
      나가기
    </div>
  );
};

export default LeaveButton;
