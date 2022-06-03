/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_TOKEN_NAME: string;
    REACT_APP_WEBSOCKET_URL: string;
  }
}

type User = {
  id: number;
  name: string;
  email: string;
  totalGame: number;
  winGame: number;
  level: number;
  experience: number;
};

type GameState = 'ingame' | 'waiting' | 'destroy';

type GameRoom = {
  gameId: string;
  gameState: GameState;
  roomName: string;
  isPrivate: boolean;
  winCondition: number;
  hostId: number;
  colorStore: ColorMap;
  sessions: any[];
};

type GameSetting = {
  roomName: string;
  isPrivate: boolean;
  winCondition: number;
};

type GamePhase = 'ready' | 'mission' | 'end';

type GameWork = ((done?: () => any) => void) | ((done?: () => any) => Promise<void>);

type GameConfirmProps = {
  done: Dispatch<SetStateAction<boolean>>;
};

type GameController = {
  leaveGame: () => void;
  startGame: () => void;
  readyGame: () => void;
  changeGamePhase: (gamePhase: GamePhase) => void;
  typeWord: (typed: string) => void;
  answerCorrect: (word: MissionWord) => void;
  scorePlayer: (playerId: string, item: SkillEffect | null) => void;
  emitWord: (emittedWord: MissionWord) => void;
  doSkill: (skillType: SkillEffect, user: Player, target: Player) => void;
  resetAttackState: () => void;
  bombSetted: () => void;
  bombPlayer: (bombState: boolean) => void;
  endGame: (winnerId: string) => void;
};

type SkillEffect = 'default' | 'reverse' | 'light' | 'rotate' | 'blind' | 'bomb';
