import { useEffect, useState } from 'react';

const Score = ({ score, color }: { score: number; color: string }) => {
  const [getScored, setScored] = useState(false);

  useEffect(() => {
    setScored(true);

    setTimeout(() => setScored(false), 700);
  }, [score]);

  return (
    <div className="absolute top-1 right-1">
      <div
        style={{ background: color }}
        className={`text-white flex justify-center items-center w-7 h-7 rounded-full ${
          getScored && 'animate-ping ease duration-300'
        }`}
      >
        {score}
      </div>
    </div>
  );
};

export default Score;
