import { MouseEventHandler } from "react";
import { cls } from "../../libs/utils";

const ArrowLeft = ({
  stroke,
  className,
  onClick,
  disabled,
}: {
  stroke?: string;
  className?: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${cls(
      "w-4 h-4 ",
      className || "",
      disabled ? "opacity-10 cursor-default" : "hover:opacity-70"
    )}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke={stroke}
    strokeWidth={2}
    onClick={!disabled ? onClick : undefined}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

export default ArrowLeft;
