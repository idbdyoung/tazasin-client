import { TailSpin } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface SpinnerProps {
  color: string;
  width: number;
  height: number;
}

const Spinner: React.FC<SpinnerProps> = ({ color, width, height }) => (
  <TailSpin color={color} width={width} height={height} />
);

export default Spinner;
