// @flow

import events from './events';

type SocketType = {[string]: any};

export const applyHandlers = (socket: SocketType) => {
  for (const {name, handler} of events) {
    socket.on(name, handler);
  }
};
