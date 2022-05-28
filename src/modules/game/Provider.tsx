import { createContext, useContext } from 'react';

import useGameEnter from '../../libs/hooks/game/useGameEnter';
import useGameElements from '../../libs/hooks/game/useGameElements';

import Player, { MissionWord } from './Player';
import Game from './Game';

type GameProps = {
  game?: Game;
  gameState: GameState;
  gameRoomInfo?: GameRoom;
  gamePhase: GamePhase;
  myPlayer?: Player;
  players: Player[];
  controller: GameController;
  correctWord: MissionWord | null;
  emittedWord: MissionWord | null;
};

const GameContext = createContext<GameProps>({} as GameProps);

const useProvideGame = () => {
  const { enteredGame } = useGameEnter();
  const {
    gameState,
    gameRoomInfo,
    players,
    myPlayer,
    gamePhase,
    correctWord,
    controller,
    emittedWord,
  } = useGameElements(enteredGame);

  return {
    gameState,
    gameRoomInfo,
    gamePhase,
    myPlayer,
    players,
    controller,
    correctWord,
    emittedWord,
    game: enteredGame,
  };
};

const GameProvider: React.FC = ({ children }) => {
  const game = useProvideGame();
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext<GameProps>(GameContext);

export default GameProvider;
