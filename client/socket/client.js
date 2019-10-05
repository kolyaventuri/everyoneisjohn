// @flow

import io from 'socket.io-client';

import {get} from '../utils/local-storage';
import {EIJ_PID} from '../constants/storage-keys';
import {MAX_RECONNECTS} from '../constants/settings';
import {applyHandlers} from './handlers';

import type {SocketType} from '.';

let socket;

const clientBuilder = (): SocketType => {
  if (socket) {
    return socket;
  }

  socket = io({
    reconnectionAttempts: MAX_RECONNECTS
  }).connect();

  const id = get(EIJ_PID);

  socket.on('connect', () => {
    applyHandlers(socket);
    socket.emit('initPlayer', id || undefined);
  });

  return socket;
};

export default clientBuilder;
