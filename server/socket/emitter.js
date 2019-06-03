// @flow

type EmitArgs = {|
  event: 'string',
  channel?: string,
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
  const context = channel ? socket.to(channel) : socket;
  const fn = context.emit;
  const emitFn = fn.bind(context);

  return emitFn(event, payload);
};
