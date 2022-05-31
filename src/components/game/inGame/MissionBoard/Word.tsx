import { motion, useCycle } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { MissionWord } from '../../../../modules/game/Player';
import { useGame } from '../../../../modules/game/Provider';
import Star from '../../../svgs/Star';

interface WordProps {
  word: MissionWord;
}

const Word = ({ word }: WordProps) => {
  const { controller, myPlayer } = useGame();
  const wordRef = useRef<HTMLDivElement>(null);
  const [getScored, setScored] = useState(false);
  const [bombed, setBombed] = useState(false);
  const [animate, setAnimate] = useCycle({
    top: `${Math.floor(Math.random() * 100)}%`,
    left: `${Math.floor(Math.random() * 90)}%`,
    transition: { duration: Math.floor(Math.random() * 20) + 10, ease: 'linear' },
  });
  const [progress, setProgress] = useState(100);

  const scorePlayer = () => {
    if (!wordRef.current || !word.player?.id) return;

    if (word.bombUserId) {
      controller.bombPlayer(true);
    } else {
      controller.scorePlayer(word.player.id, word.item);
    }
    wordRef.current.style.display = 'none';
  };

  useEffect(() => {
    setProgress(100);
    if (!word.player) return;
    let time = 100;

    const id = setInterval(() => {
      setProgress(time);

      if (time === 0) {
        if (word.bombUserId) {
          setBombed(true);
        } else {
          setScored(true);
        }
        clearInterval(id);
        return;
      }
      time -= 1;
    }, 100);

    return () => {
      setScored(false);
      clearInterval(id);
    };
  }, [word.player]);

  useEffect(() => {
    if (!bombed) return;

    const id = setTimeout(() => {
      controller.bombPlayer(false);
    }, 1000);

    return () => clearTimeout(id);
  }, [bombed]);

  return (
    <motion.div
      ref={wordRef}
      style={{ color: word.player ? word.player.color : 'gray' }}
      className="absolute"
      animate={animate}
      onAnimationComplete={() => setAnimate()}
    >
      {getScored && (
        <motion.div
          style={{ color: word.player?.color }}
          className="flex flex-col justify-center items-center"
          animate={{ scale: [0, 2, 0.5, 1] }}
          transition={{ times: [0, 0.1, 0.9, 1] }}
          onAnimationComplete={() => scorePlayer()}
        >
          <div className="text-3xl">Score!</div>
          {word.item && (
            <div className="flex justify-center items-center w-7 h-7 p-1 bg-white rounded-full">
              <img src={`/assets/${word.item}.png`} className="w-4 h-4" />
            </div>
          )}
        </motion.div>
      )}
      {bombed && (
        <motion.div
          className="flex flex-col justify-center items-center text-red-500"
          animate={{ scale: [0, 2, 0.5, 1] }}
          transition={{ times: [0, 0.1, 0.9, 1] }}
          onAnimationComplete={() => scorePlayer()}
        >
          <div className="flex justify-center items-center w-7 h-7 p-1 bg-white rounded-full">
            <img src={'/assets/explode.png'} className="w-4 h-4" />
          </div>
          <div className="text-3xl">Bomb!</div>
        </motion.div>
      )}
      {word.player && (
        <div className="relative">
          <CircularProgressbar
            className="absolute flex justify-center items-center text-sm text-black -top-1 -right-2 w-2 h-2 rounded-full border-zinc-900"
            value={progress}
            strokeWidth={50}
            styles={buildStyles({
              strokeLinecap: 'butt',
              pathColor: word.player.color,
              trailColor: 'rgb(24 24 27)',
              backgroundColor: 'rgb(24 24 27)',
            })}
          />
        </div>
      )}
      <div
        style={{ opacity: `${progress}%` }}
        className={`relative ${myPlayer?.attackState === 'rotate' && 'animate-spin-slow'}`}
      >
        {myPlayer?.attackState === 'blind' && (
          <div className="absolute w-full h-[5px] bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        {myPlayer?.attackState === 'reverse' ? word.text.split('').reverse().join('') : word.text}
        {(word.item || word.bombUserId) && (
          <div className="absolute text-yellow-100 text-[1px] -top-1 -left-1 rotate-45">
            <Star
              fill={word.bombUserId === myPlayer?.id ? '#ff2d2d' : '#f8ffa4'}
              className="w-2 h-2"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Word;
