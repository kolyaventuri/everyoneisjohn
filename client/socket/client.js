// @flow

import io from 'socket.io-client';

import {get} from '../utils/local-storage';
import {EIJ_PID} from '../constants/storage-keys';
import {MAX_RECONNECTS, RECONNECT_DELAY} from '../constants/settings';
import {applyHandlers} from './handlers';

import type {SocketType} from '.';

let socket;

const clientBuilder = (): SocketType => {
  if (socket) {
    return socket;
  }

  socket = io({
    reconnectionAttempts: MAX_RECONNECTS,
    reconnectionDelay: RECONNECT_DELAY,
    reconnectionDelayMax: RECONNECT_DELAY * 2,
    randomizationFactor: 0
  }).connect();

  const id = get(EIJ_PID);

  socket.on('connect', () => {
    applyHandlers(socket);
    socket.emit('initPlayer', id || undefined);
  });

  return socket;
};

export default clientBuilder;
