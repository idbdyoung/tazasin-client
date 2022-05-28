type EnterAction = {
  type: 'enter';
  gameId: string;
};

type CallAction = {
  type: 'call';
  to: string;
  description: RTCSessionDescriptionInit;
  color: string;
  isUserReady: boolean;
};

type AnswerAction = {
  type: 'answer';
  to: string;
  description: RTCSessionDescriptionInit;
};

type CandidateAction = {
  type: 'candidate';
  to: string;
  candidate: RTCIceCandidate | null;
};

type StartGameAction = {
  type: 'startGame';
  gameId: string;
};

export type SendAction =
  | EnterAction
  | CallAction
  | AnswerAction
  | CandidateAction
  | StartGameAction;

const actionCreator = {
  enter: (gameId: string): EnterAction => ({ type: 'enter', gameId }),
  call: (
    to: string,
    description: RTCSessionDescriptionInit,
    color: string,
    isUserReady: boolean
  ): CallAction => ({
    type: 'call',
    to,
    description,
    color,
    isUserReady,
  }),
  answer: (to: string, description: RTCSessionDescriptionInit): AnswerAction => ({
    type: 'answer',
    to,
    description,
  }),
  candidate: (to: string, candidate: RTCIceCandidate | null): CandidateAction => ({
    type: 'candidate',
    to,
    candidate,
  }),
  startGame: (gameId: string): StartGameAction => ({
    type: 'startGame',
    gameId,
  }),
};

export default actionCreator;
