import { useEffect, useState } from 'react';
import Star from '../../../svgs/Star';

const Score = ({ score, color }: { score: number; color: string }) => {
  const [getScored, setScored] = useState(false);

  useEffect(() => {
    setScored(true);

    setTimeout(() => setScored(false), 700);
  }, [score]);

  return (
    <div className="absolute -top-1 -right-1">
      <div className="relative">
        <Star
          fill={color}
          className={`text-white flex justify-center items-center w-12 h-12 rounded-full ${
            getScored && 'animate-ping ease duration-300'
          }`}
        />
        <div className="absolute text-white text-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {score}
        </div>
      </div>
    </div>
  );
};

export default Score;
