import useSWR, { Fetcher, KeyedMutator } from 'swr';
import cookieClient from '../../cookie';

type UseGameRoomReturnType = [
  GameRoom[] | undefined,
  {
    mutate: KeyedMutator<{ gameRoomList?: GameRoom[] }>;
    loading: boolean;
    error: any;
  }
];

const fetcher: Fetcher<{ gameRoomList?: GameRoom[] }> = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${cookieClient.get(process.env.REACT_APP_TOKEN_NAME)}`,
    },
  });
  if (!res.ok) {
    throw new Error('정보를 불러 올 수 없습니다.');
  }
  return res.json();
};

const useGameList = (): UseGameRoomReturnType => {
  const { data, mutate, error } = useSWR(`${process.env.REACT_APP_API_URL}/game/list`, fetcher);

  return [
    data?.gameRoomList,
    {
      mutate,
      loading: !data && !error,
      error,
    },
  ];
};

export default useGameList;
