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

  const port = process.env.SOCKET_SERVER || 8301;
  socket = io(app);
  socket.on('connection', client => {
    logInfo('Client connected');
    applyHandlers(client);
  });

  logInfo(`Sockets listening on ${port}`);

  return socket;
};

export default socketBuilder;
