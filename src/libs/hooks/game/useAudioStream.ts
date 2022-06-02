import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAudioStream = (user?: User) => {
  const navigate = useNavigate();
  const [micPermission, setMicPermission] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream>();

  const getAudioStream = async (): Promise<MediaStream> =>
    navigator.mediaDevices.getUserMedia({ audio: true });

  useEffect(() => {
    if (!user) return;
    if (micPermission) return;

    getAudioStream()
      .then(audioStream => {
        setMicPermission(true);
        setAudioStream(audioStream);
      })
      .catch(e => {
        console.log(e);
        setMicPermission(false);
        alert('마이크 권한을 활성화 하고 다시 게임에 참여해 주세요');
        navigate('/', { replace: true });
      });
  }, [user, micPermission, setAudioStream, setMicPermission]);

  return { audioStream };
};

export default useAudioStream;
