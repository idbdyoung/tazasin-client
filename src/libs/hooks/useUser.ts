import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import useSWR, { Fetcher, KeyedMutator } from 'swr';

import cookieClient from '../cookie';

type UseUserReturnType = [
  User | undefined,
  { mutate: KeyedMutator<{ user?: User }>; loading: boolean; error: any }
];

const fetcher: Fetcher<{ user?: User }> = async (url: string) => {
  if (!cookieClient.get(process.env.REACT_APP_TOKEN_NAME)) {
    return {};
  }
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${cookieClient.get(process.env.REACT_APP_TOKEN_NAME)}`,
    },
  });

  if (!res.ok) {
    throw new Error('유효한 토큰이 아닙니다. 다시 로그인 해 주세요');
  }
  return res.json();
};

const useUser = (): UseUserReturnType => {
  const alert = useAlert();
  const { data, mutate, error } = useSWR(`${process.env.REACT_APP_API_URL}/user`, fetcher);

  useEffect(() => {
    if (!data && error) {
      cookieClient.remove(process.env.REACT_APP_TOKEN_NAME);
      alert.show(error.message, { type: 'error' });
      return;
    }
  }, [data, error, alert]);

  return [
    data?.user,
    {
      mutate,
      loading: !data && !error,
      error,
    },
  ];
};

export default useUser;
