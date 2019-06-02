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
  const context = channel ? socket.to(channel) : socket;
  const fn = context.emit;
  const emitFn = fn.bind(context);

  emitFn(event, payload);
};
