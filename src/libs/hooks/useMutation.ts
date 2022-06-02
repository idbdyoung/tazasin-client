import { useState } from 'react';
import { useAlert } from 'react-alert';

import cookieClient from '../cookie';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(url: string): UseMutationResult<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const alert = useAlert();

  function mutate(data: any, withCookie?: boolean) {
    if (withCookie && !cookieClient.get(process.env.REACT_APP_TOKEN_NAME)) {
      return {};
    }
    setLoading(true);
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookieClient.get(process.env.REACT_APP_TOKEN_NAME)}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(response => response.json().catch(() => {}))
      .then(setData)
      .catch(() => alert.error('서버에 연결할 수 없습니다.'))
      .finally(() => setLoading(false));
  }

  return [mutate, { loading, data }];
}
