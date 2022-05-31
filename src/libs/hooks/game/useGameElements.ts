import { useEffect, useState } from 'react';
import Game from '../../../modules/game/Game';
import Player, { MissionWord } from '../../../modules/game/Player';

const useGameElements = (game?: Game) => {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [gameRoomInfo, setGameRoomInfo] = useState<GameRoom>();
  const [gamePhase, setGamePhase] = useState<GamePhase>('ready');
  const [myPlayer, setMyPlayer] = useState<Player>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [correctWord, setCorrectWord] = useState<MissionWord | null>(null);
  const [emittedWord, setEmittedWord] = useState<MissionWord | null>(null);
  const [bombUserId, setBombUserId] = useState<string | null>(null);
  const [bombState, setBombState] = useState(false);
  const [gameWinner, setGameWinner] = useState<Player | null>(null);

  const handleUpdateGameState = (gameState: GameState) => setGameState(gameState);

  const handleUpdatePlayers = (players: Player[]) => {
    setPlayers(players);
    setMyPlayer(players[0]);
  };

  const handleUpdateCorrectWord = (correctWord: MissionWord) => setCorrectWord(correctWord);

  const handleUpdateEmittedWord = (word: MissionWord) => setEmittedWord(word);

  const handleUpdateSetBomb = (bombUserId: string) => setBombUserId(bombUserId);

  const handleUpdateBombState = (bombState: boolean) => setBombState(bombState);

  const handleUpdateGameWinner = (gameWinner: Player) => {
    setGameWinner(gameWinner);
    setGamePhase('end');
  };

  const controller: GameController = {
    leaveGame: () => game?.leaveGame(),
    startGame: () => game?.startGame(),
    readyGame: () => game?.readyGame(),
    changeGamePhase: (gamePhase: GamePhase) => setGamePhase(gamePhase),
    typeWord: (typed: string) => game?.typeWord(typed),
    answerCorrect: (missionWord: MissionWord) => {
      game?.answerCorrect(missionWord);
      setCorrectWord(missionWord);
    },
    scorePlayer: (playerId: string, item: SkillEffect | null) => game?.scorePlayer(playerId, item),
    emitWord: (word: MissionWord) => game?.emitWord(word),
    doSkill: (skillType: SkillEffect, user: Player, target: Player) =>
      game?.doSkill(skillType, user, target),
    resetAttackState: () => game?.resetAttackState(),
    bombSetted: () => setBombUserId(null),
    bombPlayer: (bombState: boolean) => game?.bombPlayer(bombState),
    endGame: (winnerId: string) => {
      if (!myPlayer) return;
      setGameWinner(myPlayer);
      game?.endGame(winnerId);
      setGamePhase('end');
    },
  };

  useEffect(() => {
    if (!game) return;
    setGameRoomInfo(game.gameRoom);
    setPlayers([game.myPlayer]);

    game.addEventListener('gameState', handleUpdateGameState);
    game.addEventListener('players', handleUpdatePlayers);
    game.addEventListener('correctWord', handleUpdateCorrectWord);
    game.addEventListener('emitWord', handleUpdateEmittedWord);
    game.addEventListener('setBomb', handleUpdateSetBomb);
    game.addEventListener('bombState', handleUpdateBombState);
    game.addEventListener('gameWinner', handleUpdateGameWinner);

    return () => {
      game.removeEventListenr('gameState', handleUpdateGameState);
      game.removeEventListenr('players', handleUpdatePlayers);
      game.removeEventListenr('correctWord', handleUpdateCorrectWord);
      game.removeEventListenr('emitWord', handleUpdateEmittedWord);
      game.removeEventListenr('setBomb', handleUpdateSetBomb);
      game.removeEventListenr('bombState', handleUpdateBombState);
      game.removeEventListenr('gameWinner', handleUpdateGameWinner);
    };
  }, [game]);

  return {
    gameState,
    gameRoomInfo,
    players,
    myPlayer,
    gamePhase,
    correctWord,
    emittedWord,
    controller,
    bombUserId,
    bombState,
    gameWinner,
  };
};

export default useGameElements;
