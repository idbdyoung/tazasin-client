import Player, { MissionWord } from '../../modules/game/Player';

type GameReadyAction = {
  type: 'gameReady';
};

type TypeWordAction = {
  type: 'typeWord';
  typed: string;
};

type AnswerCorrectAction = {
  type: 'answerCorrect';
  missionWord: MissionWord;
};

type ScorePlayerAction = {
  type: 'scorePlayer';
  playerId: string;
};

type EmitWordAction = {
  type: 'emitWord';
  word: MissionWord;
};

type SkillAction = {
  type: 'skill';
  skillType: SkillEffect;
  user: Player;
  target: Player;
};

type ResetAttackStateAction = {
  type: 'resetAttackState';
};

type SetBombAction = {
  type: 'setBomb';
  bombUserId: string;
};

type BombStateAction = {
  type: 'bombState';
  bombState: boolean;
  bombedPlayerId: string;
};

type EndGameAction = {
  type: 'endGame';
  winnerId: string;
};

export type GameAction =
  | GameReadyAction
  | TypeWordAction
  | AnswerCorrectAction
  | ScorePlayerAction
  | EmitWordAction
  | SkillAction
  | ResetAttackStateAction
  | SetBombAction
  | BombStateAction
  | EndGameAction;

const gameActionCreator = {
  gameReady: (): GameReadyAction => ({ type: 'gameReady' }),
  typeWord: (typed: string): TypeWordAction => ({ type: 'typeWord', typed }),
  answerCorrect: (missionWord: MissionWord): AnswerCorrectAction => ({
    type: 'answerCorrect',
    missionWord,
  }),
  scorePlayer: (playerId: string): ScorePlayerAction => ({ type: 'scorePlayer', playerId }),
  emitWord: (word: MissionWord): EmitWordAction => ({
    type: 'emitWord',
    word,
  }),
  skill: (skillType: SkillEffect, user: Player, target: Player): SkillAction => ({
    type: 'skill',
    skillType,
    user,
    target,
  }),
  resetAttackState: (): ResetAttackStateAction => ({
    type: 'resetAttackState',
  }),
  setBomb: (bombUserId: string): SetBombAction => ({
    type: 'setBomb',
    bombUserId,
  }),
  bombState: (bombState: boolean, bombedPlayerId: string): BombStateAction => ({
    type: 'bombState',
    bombState,
    bombedPlayerId,
  }),
  endGame: (winnerId: string): EndGameAction => ({
    type: 'endGame',
    winnerId,
  }),
};

export default gameActionCreator;
