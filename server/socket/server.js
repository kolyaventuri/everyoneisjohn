// @flow

import io from 'socket.io';
import {applyHandlers} from './handlers';

type SocketType = {[string]: any};

let socket = null;

const socketBuilder = (app?: {[string]: any}): SocketType => {
  if (socket) {
    return socket;
  }

  socket = io(app);
  socket.on('connection', client => {
    applyHandlers(client);
  });

  return socket;
};

export default socketBuilder;
