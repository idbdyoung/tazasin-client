type EnteredAction = {
  type: 'entered';
  gameRoom: GameRoom;
  sessionId: string;
  user: User;
  color: string;
};

type LeavedAction = {
  type: 'leaved';
  leavedId: string;
  nextHostId?: string;
};

type CalledAction = {
  type: 'called';
  from: string;
  user: User;
  description: RTCSessionDescriptionInit;
  color: string;
  isUserReady: boolean;
};

type AnsweredAction = {
  type: 'answered';
  from: string;
  description: RTCSessionDescriptionInit;
};

type CandidatedAction = {
  type: 'candidated';
  from: string;
  candidate: RTCIceCandidateInit;
};

type GameStartedAction = {
  type: 'gameStarted';
  onGame: true;
};

type GameResetedAction = {
  type: 'gameReseted';
};

export type ReceiveAction =
  | EnteredAction
  | LeavedAction
  | CalledAction
  | AnsweredAction
  | CandidatedAction
  | GameStartedAction
  | GameResetedAction;
