import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import useUser from '../../libs/hooks/useUser';
import useMutation from '../../libs/hooks/useMutation';
import cookieClient from '../../libs/cookie';
import { userNameOption, userPasswordOption } from '../../libs/inputOptions';

import Input from '../../components/Input';
import SubmitButton from '../../components/buttons/Submit';

interface FormType {
  name: string;
  password: string;
}

interface MutationResult {
  ok: boolean;
  token?: string;
  error?: string;
}

const Enter: React.FC = () => {
  const [user, { mutate }] = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormType>();
  const [enter, { loading, data }] = useMutation<MutationResult>(
    `${process.env.REACT_APP_API_URL}/enter`
  );

  const inputOnValid = (data: FormType) => {
    if (loading) return;
    enter(data);
  };

  useEffect(() => {
    if (data && !data.ok) {
      setError('name', { message: data.error });
      return;
    }

    if (data && data.ok) {
      cookieClient.set(process.env.REACT_APP_TOKEN_NAME, data.token, {
        path: '/',
      });
      mutate();
      return;
    }
  }, [data, setError]);

  return (
    <form onSubmit={handleSubmit(inputOnValid)} className="flex flex-col items-center w-2/3">
      <Input
        register={register('name', userNameOption)}
        error={errors.name?.message}
        type={'text'}
        placeholder="이름을 입력하세요"
      />
      <Input
        register={register('password', userPasswordOption)}
        error={errors.password?.message}
        type="password"
        placeholder="비밀번호를 입력하세요"
      />
      <SubmitButton
        className="w-28 h-10 mt-5"
        text="입장"
        loading={loading}
        disabled={errors.name || errors.password || loading ? true : false}
      />
      <div
        onClick={() => navigate('/signup')}
        className="text-[10px] text-white border-b border-white mt-3 cursor-pointer hover:opacity-50 opacity-60"
      >
        회원가입
      </div>
    </form>
  );
};

export default Enter;
