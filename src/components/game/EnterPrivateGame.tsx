import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../modules/Modal';
import DefaultButton from '../buttons/Default';

const EnterPrivateGame = () => {
  const [gameNumber, setGameNumber] = useState('');
  const navigate = useNavigate();
  const modal = useModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/[0-9]/.test(value) || value === '') {
      setGameNumber(value);
    }
  };

  const handleClick = () => {
    navigate(`/game/${gameNumber}`);
    modal.close();
  };

  return (
    <div className="relative w-3/4 flex flex-col justify-center items-center max-w-xl border border-white bg-zinc-800 rounded-md p-4 space-y-3">
      <div className="w-full text-centerbg-zinc-800 text-white text-center">
        π 6μλ¦¬ κ²μ μ½λλ₯Ό μλ ₯ν΄ μ£ΌμΈμ π
      </div>
      <div className="flex flex-col w-1/2 justify-center space-y-5">
        <input
          className="D-input-default text-center"
          type="text"
          onChange={handleChange}
          value={gameNumber}
          maxLength={6}
        />
        <DefaultButton
          text="λ°©μ μμ₯νκΈ°"
          onClick={handleClick}
          disabled={gameNumber === '' || gameNumber.length !== 6}
        />
      </div>
    </div>
  );
};

export default EnterPrivateGame;
