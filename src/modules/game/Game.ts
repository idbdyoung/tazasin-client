import actionCreator from '../../libs/actions/send';
import gameActionCreator, { GameAction } from '../../libs/actions/game';
import CustomEvent from '../CustomEvent';
import Player, { MissionWord } from './Player';
import Peer from './Peer';

interface GameEventMap {
  gameState: GameState;
  players: Player[];
  correctWord: MissionWord;
  emitWord: MissionWord;
  setBomb: string;
  bombState: boolean;
  gameWinner: Player;
}

class Game {
  socket: WebSocket;
  audioStream: MediaStream;
  gameRoom: GameRoom;
  myPlayer: Player;
  peers = new Map<string, Peer>();
  gameEventMap = new Map<keyof GameEventMap, CustomEvent<any>>();
  correctWord: MissionWord | null = null;
  emittedWord: MissionWord | null = null;
  gameWinner: Player | null = null;

  constructor(
    socket: WebSocket,
    audioStream: MediaStream,
    gameRoom: GameRoom,
    sessionId: string,
    user: User,
    color: string
  ) {
    this.socket = socket;
    this.audioStream = audioStream;
    this.gameRoom = gameRoom;
    this.myPlayer = new Player(
      sessionId,
      user,
      color,
      this.gameRoom.hostId === user.id,
      true,
      false
    );
    this.myPlayer.startSoundDetect(this.audioStream);
  }

  leaveGame() {
    console.log('removed');
    this.audioStream.getAudioTracks()[0].stop();
    this.socket.close();
  }

  startGame() {
    if (!this.myPlayer.isHost) return;
    this.socket.send(JSON.stringify(actionCreator.startGame(this.gameRoom.gameId)));
  }

  readyGame() {
    this.broadCast(gameActionCreator.gameReady());
    this.myPlayer.isReady = !this.myPlayer.isReady;
    this.update('players');
  }

  endGame(winnerId: string) {
    this.broadCast(gameActionCreator.endGame(winnerId));
    this.socket.send(JSON.stringify(actionCreator.endGame(this.gameRoom.gameId)));
  }

  typeWord(typed: string) {
    this.broadCast(gameActionCreator.typeWord(typed));
  }

  answerCorrect(missionWord: MissionWord) {
    this.broadCast(gameActionCreator.answerCorrect(missionWord));
  }

  scorePlayer(playerId: string, item: SkillEffect | null) {
    if (playerId === this.myPlayer.id) {
      this.myPlayer.score += 1;
      if (!item) return;
      this.myPlayer.itemState[item] += 1;
    } else {
      const peer = this.peers.get(playerId);
      if (!peer) return;
      peer.player.score += 1;
      if (!item) return;
      peer.player.itemState[item] += 1;
    }
    this.broadCast(gameActionCreator.scorePlayer(playerId));
    this.update('players');
  }

  emitWord(word: MissionWord) {
    this.emittedWord = word;
    this.broadCast(gameActionCreator.emitWord(word));
    this.update('emitWord');
  }

  doSkill(skillType: SkillEffect, skillUser: Player, skillTarget: Player) {
    if (skillType === 'default') {
      this.myPlayer.attackState = 'default';
      this.broadCast(gameActionCreator.resetAttackState());
    } else if (skillType === 'bomb') {
      if (+skillUser.id === this.gameRoom.hostId) {
        this.myPlayer.bombUserId = skillUser.id;
        this.update('setBomb');
      } else {
        this.direct(String(this.gameRoom.hostId), gameActionCreator.setBomb(skillUser.id));
      }
    } else {
      const peer = this.peers.get(skillTarget.id);
      if (!peer) return;
      peer.player.attackState = skillType;
      this.broadCast(gameActionCreator.skill(skillType, skillUser, skillTarget));
    }
    this.myPlayer.itemState[skillType] -= 1;
    this.update('players');
  }

  resetAttackState() {
    this.myPlayer.attackState = 'default';
    this.broadCast(gameActionCreator.resetAttackState());
    this.update('players');
  }

  bombPlayer(bombed: boolean) {
    this.broadCast(gameActionCreator.bombState(bombed, this.myPlayer.id));
    this.myPlayer.bombed = bombed;

    if (this.myPlayer.score < 2) {
      this.myPlayer.score = 0;
    } else {
      this.myPlayer.score -= 2;
    }
    this.update('players');
  }

  createPeer(
    id: string,
    user: User,
    color: string,
    isOffering: boolean,
    isUserReady: boolean
  ): Peer {
    const player = new Player(
      id,
      user,
      color,
      this.gameRoom.hostId === user.id,
      false,
      isUserReady
    );
    const peer = new Peer(this, isOffering, player);
    this.peers.set(id, peer);
    this.update('players');
    return peer;
  }

  deletePeer(id: string) {
    this.peers.get(id)?.disconnect();
    this.peers.delete(id);
    this.update('players');
  }

  addEventListener<T extends keyof GameEventMap>(
    type: T,
    listener: { (data: GameEventMap[T]): void }
  ) {
    let event = this.gameEventMap.get(type);
    if (!event) {
      event = new CustomEvent<GameEventMap[T]>();
      this.gameEventMap.set(type, event);
    }
    event.expose().on(listener);
  }

  removeEventListenr<T extends keyof GameEventMap>(
    type: T,
    listener: { (data: GameEventMap[T]): void }
  ) {
    this.gameEventMap.get(type)?.expose().off(listener);
  }

  update(type: keyof GameEventMap) {
    switch (type) {
      case 'players': {
        this.gameEventMap
          .get(type)
          ?.trigger([this.myPlayer, ...Array.from(this.peers.values()).map(peer => peer.player)]);
        break;
      }
      case 'gameState': {
        this.gameEventMap
          .get(type)
          ?.trigger(this.gameRoom.gameState === 'ingame' ? 'waiting' : 'ingame');
        break;
      }
      case 'correctWord': {
        this.gameEventMap.get(type)?.trigger(this.correctWord);
        break;
      }
      case 'emitWord': {
        this.gameEventMap.get(type)?.trigger(this.emittedWord);
        break;
      }
      case 'setBomb': {
        this.gameEventMap.get(type)?.trigger(this.myPlayer.bombUserId);
        break;
      }
      case 'bombState': {
        this.gameEventMap.get(type)?.trigger(this.myPlayer.bombed);
        break;
      }
      case 'gameWinner': {
        this.gameEventMap.get(type)?.trigger(this.gameWinner);
        break;
      }
      default:
        break;
    }
  }

  private broadCast(gameAction: GameAction) {
    this.peers.forEach(peer => peer.dataChannel?.send(JSON.stringify(gameAction)));
  }

  private direct(to: string, gameAction: GameAction) {
    this.peers.get(to)?.dataChannel?.send(JSON.stringify(gameAction));
  }
}

export default Game;
