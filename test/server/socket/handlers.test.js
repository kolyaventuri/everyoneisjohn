import test from 'ava';
import proxyquire from 'proxyquire';

import {MockSocket} from '../mocks';

const mockEvents = [
  {
    name: 'turtle',
    handler: () => {}
  }
];

const {applyHandlers} = proxyquire('../../../server/socket/handlers', {
  './events': {default: mockEvents}
});

test('autobinds events', t => {
  const socket = new MockSocket();
  const {name, handler} = mockEvents[0];

  applyHandlers(socket);

  t.true(socket.on.calledWith(name, handler));
});
