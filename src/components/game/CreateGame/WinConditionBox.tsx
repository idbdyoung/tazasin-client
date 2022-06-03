import { ChangeEvent, useState } from 'react';

interface WinConditionBoxProps {
  value: number;
  updater: React.Dispatch<React.SetStateAction<number>>;
}

const WinConditionBox = ({ value, updater }: WinConditionBoxProps) => {
  const [alert, setAlert] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.currentTarget.value;
    setAlert('');

    if (value < 1) {
      value = 1;
      setAlert('1 보다 작을 수 없습니다.');
    } else if (value > 20) {
      value = 20;
      setAlert('20 보다 클 수 없습니다.');
    }
    updater(value);
  };

  return (
    <div className="flex flex-row space-x-2">
      <div className="text-white text-sm">승리 조건</div>
      <input
        className="focus:outline-none rounded-sm w-10"
        type="number"
        value={value}
        onChange={handleChange}
        min={1}
        max={20}
      />
      <div className="text-white text-sm">점</div>
      <div className="text-red-700 text-sm">{alert}</div>
    </div>
  );
};

export default WinConditionBox;
