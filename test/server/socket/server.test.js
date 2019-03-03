import test from 'ava';
import proxyquire from 'proxyquire';
import {spy, match} from 'sinon';

import {MockSocket} from '../mocks/socket';

const globalSocket = new MockSocket();
const handlers = {
  applyHandlers: spy()
};

const server = proxyquire('../../../server/socket/server', {
  'socket.io': () => globalSocket,
  './handlers': handlers
}).default;

test('binds the incoming socket to an instance of SocketHandler', t => {
  server({});
  const socket = new MockSocket();

  globalSocket.__invoke('on', 'connection', socket);
  t.true(globalSocket.on.calledWith('connection', match.func));

  t.true(handlers.applyHandlers.calledWith(socket));
});
