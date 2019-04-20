// @flow

import io from 'socket.io-client';

import {applyHandlers} from './handlers';
import type {SocketType} from '.';

let socket;
const {protocol, hostname} = window.location;

const port = process.env.PORT || 3000;
const url = `${protocol}//${hostname}:${port}`;

const clientBuilder = (): SocketType => {
  if (socket) {
    return socket;
  }

  socket = io.connect(url);

  socket.on('connect', () => {
    applyHandlers(socket);
    socket.emit('initPlayer');
  });

  return socket;
};

export default clientBuilder;
