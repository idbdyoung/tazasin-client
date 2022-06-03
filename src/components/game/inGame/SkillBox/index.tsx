import Player from '../../../../modules/game/Player';
import { useGame } from '../../../../modules/game/Provider';
import AttackBox from './AttackBox';
import MySkillBox from './MySkillBox';

const SkillBox = ({ player }: { player: Player }) => {
  const { gameRoomInfo } = useGame();

  return (
    <div className="flex flex-row justify-between w-full h-[50px]">
      <AttackBox skillUser={player} />
      <div className="flex flex-row flex-1 justify-center items-center space-x-2">
        <div className="text-white text-sm">{`승리조건: ${gameRoomInfo?.winCondition}점`}</div>
        <div style={{ color: player.color }} className="text-sm">{`승리까지 ${
          gameRoomInfo?.winCondition! - player.score
        }점 남았습니다`}</div>
      </div>
      <MySkillBox skillUser={player} />
    </div>
  );
};

export default SkillBox;
