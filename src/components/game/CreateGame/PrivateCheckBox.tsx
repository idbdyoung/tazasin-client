interface PrivateCheckBox {
  value: boolean;
  updater: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrivateCheckBox: React.FC<PrivateCheckBox> = ({ value, updater }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updater(e.currentTarget.checked);
  };
  return (
    <div className="pt-3">
      <label htmlFor="private" className="text-white text-sm">
        비밀방
        <input
          id="private"
          type="checkbox"
          className="ml-2"
          checked={value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default PrivateCheckBox;
