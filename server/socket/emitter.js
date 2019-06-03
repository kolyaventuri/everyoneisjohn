// @flow

type EmitArgs = {|
  event: 'string',
  channel: string,
  payload?: any,
|};

let socket;
if (process.env.NODE_ENV === 'test') {
  socket = require('.').default;
} else {
  setImmediate(() => {
    socket = require('.').default;
  });
}

export const emit = ({event, payload, channel}: EmitArgs) => {
  return socket.to(channel).emit(event, payload);
};
