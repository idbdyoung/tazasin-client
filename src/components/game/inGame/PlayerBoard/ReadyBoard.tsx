import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../../../modules/game/Provider';

const readyTexts = ['3초 뒤 게임이 시작됩니다.', '3', '2', '1', 'Start!'];

const ReadyBoard = () => {
  const { controller } = useGame();
  const textIndex = useRef(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (textIndex.current === 5) {
      controller.changeGamePhase('mission');
      return;
    }
    const id = setTimeout(
      () => {
        setCurrentText(readyTexts[textIndex.current]);
        textIndex.current++;
      },
      !textIndex.current ? 0 : 1000
    );

    return () => clearTimeout(id);
  }, [currentText]);

  return (
    <div className="flex justify-center items-center w-full h-full text-white text-5xl">
      {currentText}
    </div>
  );
};

export default ReadyBoard;
