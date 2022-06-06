import { GameAction } from '../../libs/actions/game';
import actionCreator from '../../libs/actions/send';

import Player from './Player';
import Game from './Game';

class Peer {
  player: Player;
  pc: RTCPeerConnection;
  dataChannel?: RTCDataChannel;
  leaveWorks = new Set<(() => void) | undefined>();
  removeAudio?: () => void;
  removeTrack?: () => void;

  constructor(public game: Game, isOffering: boolean, player: Player) {
    this.player = player;
    this.pc = this.createRTC(isOffering, this.game.audioStream);
  }

  disconnect() {
    this.removeAudio?.();
    this.removeTrack?.();
    this.pc.close();
    this.dataChannel?.close();
  }

  createAudio(id: string): HTMLAudioElement {
    const $audio = document.createElement('audio');
    const $root = document.querySelector('#root');
    $audio.id = id;
    $audio.autoplay = true;
    $root?.appendChild($audio);
    this.removeAudio = () => $root?.removeChild($audio);
    return $audio;
  }

  handleMessage(action: GameAction) {
    switch (action.type) {
      case 'gameReady': {
        this.player.isReady = !this.player.isReady;
        this.game.update('players');
        break;
      }
      case 'typeWord': {
        this.player.currentTyping = action.typed;
        this.game.update('players');
        break;
      }
      case 'answerCorrect': {
        this.game.correctWord = action.missionWord;
        this.game.update('correctWord');
        break;
      }
      case 'emitWord': {
        this.game.emittedWord = action.word;
        this.game.update('emitWord');
        break;
      }
      case 'skill': {
        const skillUser = this.game.peers.get(action.user.id);
        if (!skillUser) return;
        skillUser.player.itemState[action.skillType] -= 1;
        this.game.myPlayer.attackState = action.skillType;
        this.game.update('players');
        break;
      }
      case 'resetAttackState': {
        this.player.attackState = 'default';
        this.game.update('players');
        break;
      }
      case 'setBomb': {
        this.game.myPlayer.bombUserId = action.bombUserId;
        this.game.update('setBomb');
        break;
      }
      case 'bombState': {
        const player = this.game.peers.get(action.bombedPlayerId)?.player;
        if (!player) return;
        player.bombed = action.bombState;

        if (player.score < 2) {
          player.score = 0;
        } else {
          player.score -= 2;
        }
        this.game.update('players');
        break;
      }
      case 'endGame': {
        const peer = this.game.peers.get(action.winnerId);
        if (!peer) return;
        this.game.gameWinner = peer.player;
        this.game.update('gameWinner');
        break;
      }
      default:
        break;
    }
  }

  private createRTC(isOffering: boolean, myAudioStream: MediaStream): RTCPeerConnection {
    const messageHandler = async (e: MessageEvent) => {
      try {
        const message = JSON.parse(e.data);
        this.handleMessage(message);
      } catch (error) {
        console.log(error);
      }
    };
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: ['turn:tazasin.com:3478?transport=tcp'],
          username: process.env.REACT_APP_TURN_SERVER_USER_NAME,
          credential: process.env.REACT_APP_TURN_SERVER_USER_PASSWD,
        },
        {
          urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
        },
      ],
    });
    pc.addEventListener('icecandidate', e =>
      this.game.socket.send(JSON.stringify(actionCreator.candidate(this.player.id, e.candidate)))
    );
    pc.addEventListener('track', e => {
      const $audio = this.createAudio(this.player.id);
      $audio.srcObject = e.streams[0];
      this.player.startSoundDetect(e.streams[0]);
    });

    if (isOffering) {
      this.dataChannel = pc.createDataChannel('data');
      this.dataChannel.addEventListener('message', messageHandler);
    } else {
      pc.addEventListener('datachannel', e => {
        this.dataChannel = e.channel;
        this.dataChannel.addEventListener('message', messageHandler);
      });
    }
    myAudioStream.getTracks().forEach(track => {
      const sender = pc.addTrack(track, myAudioStream);
      this.removeTrack = () => pc.removeTrack(sender);
    });
    return pc;
  }
}

export default Peer;
