// import { handleLeaveEvent } from "../../libs/hooks/useLeavePage";

import DefaultButton from '../buttons/Default';

const Disconnected: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-white">🥲</div>
      <div className="text-white">서버와의 연결이 끊어졌습니다ㅠ</div>
      <div className="flex flex-row mt-6 space-x-5">
        {/* <a
          href="/"
          className="flex justify-center items-center min-w-[100px] h-9 px-3 rounded-lg bg-primary-gray text-sm hover:opacity-70"
          onClick={() => {
            window.removeEventListener('beforeunload', handleLeaveEvent);
          }}
        >
          다시 접속하기
        </a> */}
        <DefaultButton text="로그아웃하기" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Disconnected;
