import { cls } from "../../libs/utils";

import Spinner from "../loaders/Spinner";

interface SubmitButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  loading,
  disabled,
  className,
}) => {
  return (
    <button
      className={cls(disabled ? "D-btn-disabled" : "D-btn", className ?? "")}
      type="submit"
      disabled={disabled}
    >
      {loading ? <Spinner color="white" width={20} height={20} /> : text}
    </button>
  );
};

export default SubmitButton;
