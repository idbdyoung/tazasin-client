import CustomEvent from '../CustomEvent';

export type MissionWord = {
  text: string;
  player: Player | null;
  item: SkillEffect | null;
  bombUserId: string | null;
};

class Player {
  id: string;
  user: User;
  color: string;
  isHost: boolean;
  isMe: boolean;
  isReady: boolean;
  currentTyping: string;
  attackState: SkillEffect = 'default';
  itemState: {
    [key in SkillEffect]: number;
  } = {
    blind: 1,
    light: 1,
    rotate: 1,
    reverse: 1,
    bomb: 1,
    default: 1,
  };
  score: number = 0;
  bombUserId: string | null = null;
  readonly MIN_DECIBELS = -45;
  private audioDetectedEvent = new CustomEvent<boolean>();

  constructor(
    id: string,
    user: User,
    color: string,
    isHost: boolean,
    isMe: boolean,
    isReady: boolean
  ) {
    this.id = id;
    this.user = user;
    this.color = color;
    this.isHost = isHost;
    this.isMe = isMe;
    this.isReady = isHost ? true : isReady;
    this.currentTyping = '';
  }

  onAudioDetected(handler: { (detected: boolean): void }) {
    this.audioDetectedEvent.expose().on(handler);
  }

  removeAudioDetected(handler: { (detected: boolean): void }) {
    this.audioDetectedEvent.expose().off(handler);
  }

  startSoundDetect(audioStream: MediaStream) {
    const audioCtx = new AudioContext();
    const audioStreamSource = audioCtx.createMediaStreamSource(audioStream);
    const analyser = audioCtx.createAnalyser();
    analyser.minDecibels = this.MIN_DECIBELS;
    audioStreamSource.connect(analyser);
    const bufferLength = analyser.frequencyBinCount;
    const domainData = new Uint8Array(bufferLength);

    const detectSound = () => {
      let detectFalseTriggered = false;
      analyser.getByteFrequencyData(domainData);

      for (let i = 0; i < bufferLength; i++) {
        if (domainData[i] > 0) {
          this.audioDetectedEvent.trigger(true);
          break;
        }

        if (!detectFalseTriggered) {
          this.audioDetectedEvent.trigger(false);
          detectFalseTriggered = true;
        }
      }
      window.requestAnimationFrame(detectSound);
    };
    window.requestAnimationFrame(detectSound);
  }
}

export default Player;
