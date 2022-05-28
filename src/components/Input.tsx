import { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: string;
}

const Input: React.FC<InputProps> = ({ register, error, ...rest }) => {
  return (
    <div className="w-[300px]">
      <div className="w-full h-4 mt-1 pl-1.5 mb-1 text-primary-red text-xs font-semibold">
        {error}
      </div>
      <input
        className="D-input-default text-center placeholder:text-center"
        {...register}
        {...rest}
        autoComplete={'off'}
      />
    </div>
  );
};

export default Input;
