// @flow

import io from 'socket.io';
import {applyHandlers} from './handlers';

let socket = null;

const socketBuilder = (app: {[string]: any}) => {
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
