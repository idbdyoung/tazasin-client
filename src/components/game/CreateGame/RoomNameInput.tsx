import React from "react";

interface RoomNameInputProps {
  value: string;
  updater: React.Dispatch<React.SetStateAction<string>>;
}

const RoomNameInput: React.FC<RoomNameInputProps> = ({ value, updater }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updater(e.currentTarget.value);
  };

  return (
    <input
      className="D-input-default"
      type="text"
      value={value}
      placeholder="방제목"
      onChange={handleChange}
    />
  );
};

export default RoomNameInput;
