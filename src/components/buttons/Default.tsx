import { cls } from "../../libs/utils";

interface ButtonProps {
  text: string;
  onClick: (...any: any) => any;
  className?: string;
  disabled?: boolean;
}

const Default: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={() => onClick()}
      className={cls(
        "min-w-[100px] h-9 px-3 rounded-lg bg-primary-gray text-sm",
        className || "",
        disabled ? "opacity-20 cursor-default" : "hover:opacity-70"
      )}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Default;
