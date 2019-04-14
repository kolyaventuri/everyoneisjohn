// @flow

import events from './events';

import type {SocketType} from '.';

type EventType = {|
  name: string,
  handler: Function
|};

export const applyHandlers = (client: SocketType) => {
  for (const event: EventType of events) {
    const {name, handler} = event;

    client.on(name, handler.bind(this));
  }
};
