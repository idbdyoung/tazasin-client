import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import useTextAnimate from '../../libs/hooks/useTextAnimate';
import useUser from '../../libs/hooks/useUser';
import { getRandomInt } from '../../libs/utils';

const subTitleStore = [
  '이제 당신도 직장에서 일 잘하는 사람처럼 보일 수 있습니다.',
  '타자의 신. 도전하세요!',
];

const titleColorList = [
  'text-white',
  'text-yellow-200',
  'text-red-200',
  'text-blue-200',
  'text-teal-200',
];

const Home = () => {
  const [user] = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const colorIndex = useRef(0);
  const [titleColor, setTitleColor] = useState('text-white');
  const { textPrinter } = useTextAnimate(subTitleStore[getRandomInt(0, subTitleStore.length)], 90);

  useEffect(() => {
    if (colorIndex.current === titleColorList.length - 1) {
      colorIndex.current = 0;
    }
    const id = setTimeout(() => setTitleColor(titleColorList[colorIndex.current]), 2300);
    colorIndex.current++;

    return () => clearTimeout(id);
  }, [titleColor]);

  useEffect(() => {
    if (user) {
      navigate('/waiting');
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full mx-auto space-y-1">
      <div className={`${titleColor} font-serif text-[45px] animate-pulse`}>타자의 신</div>
      {pathname.includes('signup') ? (
        <div className="text-white text-[20px] font-serif">회원가입</div>
      ) : (
        <div className="text-white font-serif text-[12px]">{textPrinter}</div>
      )}
      <div className="flex justify-center w-full pt-[20px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
