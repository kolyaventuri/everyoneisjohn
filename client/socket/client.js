// @flow

import io from 'socket.io-client';

import {applyHandlers} from './handlers';
import type {SocketType} from '.';

let socket;

const clientBuilder = (): SocketType => {
  if (socket) {
    return socket;
  }

  socket = io.connect();

  socket.on('connect', () => {
    applyHandlers(socket);
    socket.emit('initPlayer');
  });

  return socket;
};

export default clientBuilder;
