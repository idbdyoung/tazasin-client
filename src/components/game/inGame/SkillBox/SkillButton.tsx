import { useEffect } from 'react';
import Player from '../../../../modules/game/Player';
import { useGame } from '../../../../modules/game/Provider';

export const itemKeys: { [key: string]: number } = {
  blind: 1,
  light: 2,
  rotate: 3,
  reverse: 4,
  bomb: 9,
  default: 0,
};

interface SkillItemProps {
  skillUser: Player;
  skillTarget: Player;
  skillName: SkillEffect;
  skillCount: number;
  skillPressed: boolean;
}

const SkillButton = ({
  skillUser,
  skillTarget,
  skillName,
  skillCount,
  skillPressed,
}: SkillItemProps) => {
  const { controller } = useGame();

  useEffect(() => {
    if (!skillPressed) return;
    if (skillCount <= 0) return;
    if (skillName) controller.doSkill(skillName, skillUser, skillTarget);
  }, [skillPressed]);

  return (
    <div
      className={`relative border border-white border-opacity-30 flex justify-center items-center rounded-md w-[50px] h-[50px] ${
        skillPressed && 'bg-slate-300'
      }`}
    >
      <div className="absolute top-0 left-1 text-white text-opacity-20">{itemKeys[skillName]}</div>
      <div
        className={`relative flex flex-col items-center justify-center text-[5px] rounded-full w-8 h-8 ${
          skillCount > 0 ? 'bg-white' : 'bg-warmGray-400'
        }`}
      >
        <img src={`/assets/${skillName}.png`} className="w-5 h-5" />
        {skillCount > 0 && (
          <div className="absolute top-0 -right-1 flex justify-center items-center rounded-full w-4 h-4 border border-black border-opacity-20 bg-white font-bold">
            {skillCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillButton;
