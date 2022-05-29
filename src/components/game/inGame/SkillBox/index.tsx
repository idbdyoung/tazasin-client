import Player from '../../../../modules/game/Player';
import AttackBox from './AttackBox';
import MySkillBox from './MySkillBox';

const SkillBox = ({ player }: { player: Player }) => {
  return (
    <div className="flex flex-row justify-between w-full h-[50px]">
      <AttackBox skillUser={player} />
      <MySkillBox skillUser={player} />
    </div>
  );
};

export default SkillBox;
