// @flow

type EmitArgs = {|
  event: 'string',
  payload?: any,
  channel?: string
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
  const {emit: fn} = channel ? socket.to(channel) : socket;
  const emitFn = fn.bind(socket);

  emitFn(event, payload);
};
