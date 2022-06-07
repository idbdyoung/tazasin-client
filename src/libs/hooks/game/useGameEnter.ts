import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useUser from '../useUser';
import useAudioStream from './useAudioStream';
import Session from '../../../modules/game/Session';
import Game from '../../../modules/game/Game';
import { deleteAudioAll } from '../../utils';
import cookieClient from '../../cookie';

const useGameEnter = () => {
  const navigate = useNavigate();
  const [user] = useUser();
  const { gameId } = useParams<{ gameId: string }>();
  const { audioStream } = useAudioStream(user);
  const [session, setSession] = useState<Session>();
  const [enteredGame, setEnteredGame] = useState<Game>();

  const handleUpdateGame = (game: Game) => setEnteredGame(game);

  useEffect(() => {
    if (!user || !audioStream || !gameId) return;
    const socket = new WebSocket(
      `${process.env.REACT_APP_WEBSOCKET_URL}/${gameId}?token=${cookieClient.get(
        process.env.REACT_APP_TOKEN_NAME
      )}`
    );
    const session = new Session(socket, audioStream, user);
    setSession(session);

    socket.addEventListener('open', e => {});
    socket.addEventListener('close', e => {
      if (e.reason) {
        alert(e.reason);
      }
      audioStream.getAudioTracks()[0].stop();
      deleteAudioAll();
      navigate('/');
    });
    socket.addEventListener('error', e => {
      console.log(e);
      audioStream.getAudioTracks()[0].stop();
      deleteAudioAll();
      navigate('/');
    });
    socket.addEventListener('message', e => {
      try {
        const action = JSON.parse(e.data.toString());
        session.handleMessage(action);
      } catch (error) {
        console.log(error);
      }
    });

    return () => setSession(undefined);
  }, [user, audioStream, gameId]);

  useEffect(() => {
    session?.onGameUpdated(handleUpdateGame);
    return () => session?.removeGameUpdated(handleUpdateGame);
  }, [session]);

  return { enteredGame };
};

export default useGameEnter;
