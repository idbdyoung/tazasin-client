import { cls } from '../../../../../libs/utils';

interface IdMarkProps {
  text: string;
  className?: string;
  background?: string;
}

const Mark: React.FC<IdMarkProps> = ({ text, className, background }) => {
  return (
    <div
      style={{ background }}
      className={cls(
        'w-10 h-6 rounded-md flex justify-center items-center text-xs bg-primary-gray ring-zinc-800',
        className || ''
      )}
    >
      {text}
    </div>
  );
};

export default Mark;
