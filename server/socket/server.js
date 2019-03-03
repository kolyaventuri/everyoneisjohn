// @flow

import {applyHandlers} from './handlers';
import logger from './logger';

let io = require('socket.io');

type SocketType = {[string]: any};

const {logInfo} = logger;
let socket = null;

const socketBuilder = (port?: number): SocketType => {
  if (socket) {
    return socket;
  }

  if (process.env.NODE_ENV === 'test') {
    io = require('../../test/server/mocks/global-socket');
  }

  socket = io().listen(port);

  socket.on('connection', client => {
    logInfo('Client connected');
    applyHandlers(client);
  });

  logInfo(`Sockets listening on ${port || ''}`);

  return socket;
};

export default socketBuilder;
