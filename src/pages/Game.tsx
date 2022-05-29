import { useEffect, useRef, useState } from 'react';
import { useGame } from '../modules/game/Provider';

import GameHeader from '../components/game/inGame/GameHeader';
import PlayerBoard from '../components/game/inGame/PlayerBoard';
import UserProfile from '../components/game/inGame/UserProfile';
import MissionBoard from '../components/game/inGame/MissionBoard';
import SkillBox from '../components/game/inGame/SkillBox';

import type { MissionWord } from '../modules/game/Player';

const missions = ['안녕하세요', '반갑습니다', '일어나세요', '뭐하십니까?', '큰일났습니다.'];
const items: SkillEffect[] = ['blind', 'light', 'default', 'reverse', 'rotate'];

const Game: React.FC = () => {
  const {
    gamePhase,
    gameState,
    correctWord,
    emittedWord,
    players,
    myPlayer,
    controller,
    game,
    bombUserId,
  } = useGame();
  const missionIndex = useRef(0);
  const tmpNum = useRef(0);
  const [currentWords, setCurrentWords] = useState<MissionWord[]>([]);

  const handleRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handleBackEvent = () => {
    if (!game) return;
    if (window.confirm('방을 나가시겠습니까?')) {
      game?.leaveGame();
      return;
    }
    return window.history.pushState('', '', '?moved');
  };

  useEffect(() => {
    if (window.location.search !== '?moved') {
      window.history.pushState('', '', '?moved');
    }
    if (!game) return;
    window.addEventListener('beforeunload', handleRefresh);
    window.addEventListener('popstate', handleBackEvent);

    return () => {
      window.removeEventListener('beforeunload', handleRefresh);
      window.removeEventListener('popstate', handleBackEvent);
    };
  }, [game]);

  useEffect(() => {
    if (!emittedWord) return;

    setCurrentWords([...currentWords, emittedWord]);
  }, [emittedWord]);

  useEffect(() => {
    if (gamePhase === 'ready') return;

    if (myPlayer?.isHost) {
      const id = setInterval(() => {
        const word: MissionWord = {
          text: missions[missionIndex.current] + tmpNum.current,
          player: null,
          item:
            bombUserId !== null || Math.random() > 0.8
              ? items[Math.floor(Math.random() * 4)]
              : null,
          bombUserId,
        };

        controller.emitWord(word);
        if (bombUserId !== null) controller.bombSetted();

        if (missionIndex.current === missions.length - 1) {
          missionIndex.current = 0;
        } else {
          missionIndex.current++;
        }
        tmpNum.current++;
      }, 4000);

      return () => clearInterval(id);
    }
  }, [gamePhase, myPlayer?.isHost, bombUserId]);

  useEffect(() => {
    if (!correctWord) return;

    const coloredWords = currentWords.map(missionWord => {
      if (missionWord.text === correctWord.text) {
        missionWord.player = correctWord.player;
      }
      return missionWord;
    });

    setCurrentWords(coloredWords);
  }, [correctWord]);

  return (
    <div className="flex flex-col w-full h-full box-border">
      {gameState === 'waiting' && <GameHeader />}
      <div className={`relative flex flex-row flex-1 justify-center p-2 space-x-2`}>
        <div
          className={`flex w-full justify-center space-x-2 ${
            gameState === 'ingame' ? 'items-start' : 'items-center'
          }`}
        >
          <div
            className={`flex ${
              gameState === 'ingame' ? 'flex-col space-y-2' : 'flex-row space-x-2'
            }`}
          >
            {players.map(player => (
              <PlayerBoard key={player.id} player={player} currentWords={currentWords} />
            ))}
          </div>
          {gameState === 'ingame' && (
            <div className="flex flex-col w-full h-full space-y-2">
              {gameState === 'ingame' && gamePhase === 'mission' && myPlayer && (
                <SkillBox player={myPlayer} />
              )}
              <MissionBoard currentWords={currentWords} />
            </div>
          )}
          {gameState === 'waiting' &&
            new Array(4 - players.length).fill('').map((_, i) => (
              <div
                key={i}
                className="relative flex flex-col w-[300px] aspect-square border border-white border-opacity-10 rounded-md"
              >
                <UserProfile player={undefined} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
