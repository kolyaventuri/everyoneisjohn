// @flow

import io from 'socket.io';
import {applyHandlers} from './handlers';
import logger from './logger';

type SocketType = {[string]: any};

const {logInfo} = logger;
let socket = null;

const socketBuilder = (app?: {[string]: any}): SocketType => {
  if (socket) {
    return socket;
  }

  socket = io(app);
  socket.on('connection', client => {
    applyHandlers(client);
  });

  const port = process.env.PORT || 3000;
  logInfo(`Sockets listening on ${port}`);

  return socket;
};

export default socketBuilder;
