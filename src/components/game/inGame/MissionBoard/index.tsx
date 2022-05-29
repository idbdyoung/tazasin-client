import { useGame } from '../../../../modules/game/Provider';
import ReadyBoard from '../PlayerBoard/ReadyBoard';
import Word from './Word';

import type { MissionWord } from '../../../../modules/game/Player';
import CureVisual from './CureVisual';

interface MissionBoardProps {
  currentWords: MissionWord[];
}

const MissionBoard = ({ currentWords }: MissionBoardProps) => {
  const { gamePhase, gameState, players, myPlayer } = useGame();

  return (
    <div className="relative h-full w-full bg-zinc-900 rounded-md">
      {gamePhase === 'ready' ? (
        <ReadyBoard />
      ) : gamePhase === 'end' ? (
        <div>게임끝</div>
      ) : (
        <div id="mission-board" className="relative w-full h-full">
          <CureVisual />
          {myPlayer?.attackState === 'light' && (
            <div className="absolute w-full h-full bg-[gray] animate-light rounded-md" />
          )}
          {currentWords.map((word, i) => (
            <Word key={i} word={word} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionBoard;
