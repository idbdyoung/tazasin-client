import { ReceiveAction } from '../../libs/actions/receive';
import actionCreator, { SendAction } from '../../libs/actions/send';
import CustomEvent from '../CustomEvent';
import Game from './Game';

class Session {
  socket: WebSocket;
  audioStream: MediaStream;
  user: User;
  game?: Game;
  gameUpdatedEvent = new CustomEvent<Game>();
  isReady: boolean;

  constructor(socket: WebSocket, audioStream: MediaStream, user: User) {
    this.socket = socket;
    this.audioStream = audioStream;
    this.user = user;
    this.isReady = false;
  }

  emit(action: SendAction) {
    this.socket.send(JSON.stringify(action));
  }

  onGameUpdated(handler: { (game: Game): void }) {
    this.gameUpdatedEvent.expose().on(handler);
  }

  removeGameUpdated(handler: { (game: Game): void }) {
    this.gameUpdatedEvent.expose().off(handler);
  }

  handleMessage(action: ReceiveAction) {
    switch (action.type) {
      case 'entered': {
        this.handleEntered(action.gameRoom, action.sessionId, action.user, action.color);
        break;
      }
      case 'leaved': {
        if (!this.game) return;
        if (action.nextHostId) {
          if (+action.nextHostId === this.user.id) {
            this.game.myPlayer.isHost = true;
            this.game.myPlayer.isReady = true;
            alert('새로운 방장으로 임명되었습니다.');
          } else {
            const peer = this.game.peers.get(action.nextHostId);
            if (peer) {
              peer.player.isHost = true;
            }
          }
          this.game.gameRoom.hostId = Number(action.nextHostId);
        }
        this.game.deletePeer(action.leavedId);

        break;
      }
      case 'called': {
        this.handleCalled(
          action.from,
          action.user,
          action.color,
          action.description,
          action.isUserReady
        );
        break;
      }
      case 'answered': {
        this.handleAnswered(action.from, action.description);
        break;
      }
      case 'candidated': {
        this.handleCandidated(action.from, action.candidate);
        break;
      }
      case 'gameStarted': {
        this.handleGameStarted();
        break;
      }
      case 'gameReseted': {
        this.handleGameReseted();
        break;
      }
    }
  }

  private async handleEntered(gameRoom: GameRoom, sessionId: string, user: User, color: string) {
    if (user.id !== this.user.id) {
      return this.call(sessionId, user, color);
    }
    this.game = new Game(this.socket, this.audioStream, gameRoom, sessionId, user, color);
    this.gameUpdatedEvent.trigger(this.game);
  }

  private handleCalled(
    from: string,
    user: User,
    color: string,
    description: RTCSessionDescriptionInit,
    isUserReady: boolean
  ) {
    this.answer(from, user, color, description, isUserReady);
  }

  private async handleAnswered(from: string, description: RTCSessionDescriptionInit) {
    const peer = this.game?.peers.get(from);

    if (!peer) return;
    const { pc } = peer;
    await pc.setRemoteDescription(description);
  }

  private async handleCandidated(from: string, candidate: RTCIceCandidateInit) {
    const peer = this.game?.peers.get(from);

    if (!peer) return;
    const { pc } = peer;
    await pc.addIceCandidate(candidate);
  }

  private handleGameStarted() {
    this.game?.update('gameState');
  }

  private handleGameReseted() {
    this.game?.update('gameState');
  }

  private async call(to: string, user: User, color: string) {
    if (!this.game) return;
    const { pc } = this.game.createPeer(to, user, color, true, false);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    this.emit(actionCreator.call(to, offer, this.game.myPlayer.color, this.game.myPlayer.isReady));
  }

  private async answer(
    to: string,
    user: User,
    color: string,
    description: RTCSessionDescriptionInit,
    isUserReady: boolean
  ) {
    if (!this.game) return;
    const { pc } = this.game.createPeer(to, user, color, false, isUserReady);
    await pc.setRemoteDescription(description);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    this.emit(actionCreator.answer(to, answer));
  }
}

export default Session;
