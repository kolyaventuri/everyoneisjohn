// @flow

import socket from '.';

type EmitArgs = {|
  event: 'string',
  payload?: any,
  channel?: string
|};

export const emit = ({event, payload, channel}: EmitArgs) => {
  const {emit: emitFn} = channel ? socket.to(channel) : socket;

  emitFn(event, payload);
};
