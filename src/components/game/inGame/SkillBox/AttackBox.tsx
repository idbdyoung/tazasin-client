import { useEffect, useRef, useState } from 'react';
import Player from '../../../../modules/game/Player';
import { useGame } from '../../../../modules/game/Provider';
import ArrowDown from '../../../svgs/ArrowDown';
import ArrowTop from '../../../svgs/ArrowTop';

import SkillButton, { itemKeys } from './SkillButton';

type ArrowKey = null | 'ArrowUp' | 'ArrowDown';
type SkillKey = null | '1' | '2' | '3' | '4';

const AttackBox = ({ skillUser }: { skillUser: Player }) => {
  const { players } = useGame();
  const targetIndex = useRef(1);
  const [target, setTarget] = useState<Player>(players[1]);
  const [arrowKeyState, setArrowKeyState] = useState<ArrowKey>(null);
  const [skillKeyState, setSkillKeyState] = useState<SkillKey>(null);

  const handleArrowKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      if (targetIndex.current === 1) {
        targetIndex.current = players.length - 1;
      } else {
        targetIndex.current--;
      }
      setArrowKeyState('ArrowUp');
    } else if (e.key === 'ArrowDown') {
      if (targetIndex.current === players.length - 1) {
        targetIndex.current = 1;
      } else {
        targetIndex.current++;
      }
      setArrowKeyState('ArrowDown');
    }
    setTarget(players[targetIndex.current]);
  };

  const handleSkillKeyPress = (e: KeyboardEvent) => {
    if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
      setSkillKeyState(e.key);
    }
  };

  const handleKeyDown = () => {
    setArrowKeyState(null);
    setSkillKeyState(null);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleArrowKeyPress);
    document.addEventListener('keypress', handleSkillKeyPress);
    document.addEventListener('keyup', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleArrowKeyPress);
      document.removeEventListener('keypress', handleSkillKeyPress);
      document.removeEventListener('keyup', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-row space-x-2 items-center">
      <div
        style={{ background: target?.color }}
        className="relative flex justify-center items-center w-[30px] h-[30px] rounded-full text-white text-xs"
      >
        <ArrowTop
          className={`absolute -top-4 w-4 h-4 ${
            arrowKeyState === 'ArrowUp' ? 'opacity-100' : 'opacity-20'
          }`}
        />
        {target?.user.name}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rotate-90">
          <img src="/assets/sword.png" />
        </div>
        <ArrowDown
          className={`absolute -bottom-4 w-4 h-4 ${
            arrowKeyState === 'ArrowDown' ? 'opacity-100' : 'opacity-20'
          }`}
        />
      </div>
      {Object.entries(skillUser.itemState).map((item, i) => {
        if (item[0] !== 'default' && item[0] !== 'bomb') {
          return (
            <SkillButton
              key={i}
              skillUser={skillUser}
              skillTarget={target}
              skillName={item[0] as SkillEffect}
              skillCount={item[1]}
              skillPressed={skillKeyState !== null && +skillKeyState === itemKeys[item[0]]}
            />
          );
        }
      })}
    </div>
  );
};

export default AttackBox;
