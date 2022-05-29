import { useEffect, useState } from 'react';
import Player from '../../../../modules/game/Player';
import SkillButton, { itemKeys } from './SkillButton';

type KeyType = null | '9' | '0';

const MySkillBox = ({ skillUser }: { skillUser: Player }) => {
  const [skillKeyState, setSkillKeyState] = useState<KeyType>(null);

  const handleSkillKeyPress = (e: KeyboardEvent) => {
    if (e.key === '9' || e.key === '0') {
      setSkillKeyState(e.key);
    }
  };

  const handleKeyDown = () => {
    setSkillKeyState(null);
  };

  useEffect(() => {
    document.addEventListener('keypress', handleSkillKeyPress);
    document.addEventListener('keyup', handleKeyDown);

    return () => {
      document.removeEventListener('keypress', handleSkillKeyPress);
      document.removeEventListener('keyup', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-row space-x-2">
      {Object.entries(skillUser.itemState).map((item, i) => {
        if (item[0] === 'bomb' || item[0] === 'default') {
          return (
            <SkillButton
              key={i}
              skillUser={skillUser}
              skillTarget={skillUser}
              skillName={item[0]}
              skillCount={item[1]}
              skillPressed={skillKeyState !== null && +skillKeyState === itemKeys[item[0]]}
            />
          );
        }
      })}
    </div>
  );
};

export default MySkillBox;
