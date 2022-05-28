import Player from '../../../../../modules/game/Player';
import { useGame } from '../../../../../modules/game/Provider';

interface SkillButton {
  type: SkillEffect;
  useable: boolean;
  user: Player;
  target: Player;
}

const SkillButton = ({ type, useable, user, target }: SkillButton) => {
  const { controller } = useGame();

  const handleClick = () => {
    if (!useable) return;
    controller.doSkill(type, user, target);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex justify-center items-center w-6 h-6 rounded-full p-1 ${
        useable ? 'bg-white cursor-pointer hover:opacity-50' : 'bg-zinc-600'
      }`}
    >
      <img src={`/assets/${type}.png`} />
    </div>
  );
};

export default SkillButton;
