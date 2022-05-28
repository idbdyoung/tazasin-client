import {
  AlertComponentPropsWithStyle,
  AlertType,
  positions,
} from "react-alert";

import Info from "./svgs/Info";
import Success from "./svgs/Success";
import Error from "./svgs/Error";

const handleType = (type: AlertType | undefined) => {
  switch (type) {
    case "info": {
      return {
        bg: "bg-primary-gray",
        icon: <Info />,
      };
    }
    case "success": {
      return {
        bg: "bg-primary-green",
        icon: <Success />,
      };
    }
    case "error": {
      return {
        bg: "bg-primary-red",
        icon: <Error />,
      };
    }
  }
};

const Alert: React.ComponentType<AlertComponentPropsWithStyle> = ({
  style,
  options,
  message,
  close,
}) => (
  <div
    className={`flex w-screen p-4 ${handleType(options.type)?.bg}`}
    style={style}
  >
    <div className="flex-1 flex">
      {handleType(options.type)?.icon}
      <div className="px-2 text-zinc-800">{message}</div>
    </div>
    <div className="text-zinc-800 cursor-pointer" onClick={close}>
      닫기
    </div>
  </div>
);

export default Alert;

export const alertOption = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  containerStyle: {
    zIndex: 999,
  },
};
