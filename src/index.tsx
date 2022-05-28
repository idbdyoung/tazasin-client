import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';

import { ModalProvider } from './modules/Modal';
import GameProvider from './modules/game/Provider';

import App from './App';
import Home from './pages/Home/index';
import Signup from './pages/Home/Signup';
import Enter from './pages/Home/Enter';
import Waiting from './pages/Waiting';
import Game from './pages/Game';
import Alert, { alertOption } from './components/Alert';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ModalProvider>
      <AlertProvider template={Alert} {...alertOption}>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />}>
              <Route index element={<Enter />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/waiting" element={<Waiting />} />
            <Route
              path="/game/:gameId"
              element={
                <GameProvider>
                  <Game />
                </GameProvider>
              }
            />
          </Route>
        </Routes>
      </AlertProvider>
    </ModalProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
