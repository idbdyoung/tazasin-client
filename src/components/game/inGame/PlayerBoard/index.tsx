import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../../../modules/game/Provider';
import UserProfile from '../UserProfile';

import type Player from '../../../../modules/game/Player';
import type { ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';
import type { MissionWord } from '../../../../modules/game/Player';

interface TypingBoardProps {
  player: Player;
  currentWords: MissionWord[];
}

const PlayerBoard = ({ player, currentWords }: TypingBoardProps) => {
  const { gameState, controller } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  const [typing, setTyping] = useState('');
  const [borderColor, setBoarderColor] = useState(player.color);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTyping(value);
    controller.typeWord(value);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.value = '복붙은 선넘었지 ㅋㅋㅋ';
    setTyping(e.currentTarget.value);
  };

  const setBorder = (color: string) => {
    let blink = 0;

    const id = setInterval(() => {
      if (blink === 10) {
        setBoarderColor(player.color);
        clearInterval(id);
        return;
      }
      if (blink % 2) {
        setBoarderColor('white');
      } else {
        setBoarderColor(color);
      }
      blink++;
    }, 100);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    if (e.key === 'Enter') {
      const correctWord = currentWords.find(word => word.text === typing);

      if (correctWord) {
        setBorder(player.color);
        const word: MissionWord = {
          ...correctWord,
          player,
        };
        controller.answerCorrect(word);
      } else {
        setBorder('red');
      }
      setTyping('');
      inputRef.current.value = '';
      controller.typeWord('');
    }
  };

  useEffect(() => {
    if (player.isMe) return;
    if (!inputRef.current) return;
    inputRef.current.value = player.currentTyping;
  }, [player.currentTyping]);

  return (
    <div
      style={{ border: `2px solid ${borderColor}` }}
      className={`flex flex-col aspect-square rounded-md p-1 ${
        gameState === 'waiting' ? 'w-[300px]' : 'w-full'
      }`}
    >
      <div className="relative flex flex-col w-full h-full box-border space-y-1">
        <UserProfile player={player} />
        <div className={`flex w-full justify-center items-center`}>
          {gameState === 'ingame' &&
            (player.isMe ? (
              <input
                ref={inputRef}
                type="text"
                name="typing"
                value={typing}
                onChange={handleChange}
                className="w-full h-[50px] text-center focus:outline-none bg-zinc-200 focus:bg-zinc-200 rounded-sm select-none"
                onPaste={handlePaste}
                onKeyPress={handleEnter}
                autoComplete="off"
              />
            ) : (
              <input
                ref={inputRef}
                type="text"
                className="w-full h-[50px] border border-white border-opacity-20 text-center text-white focus:outline-none bg-zinc-800 focus:bg-zinc-200 rounded-md select-none"
                disabled={true}
                onPaste={handlePaste}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerBoard;
