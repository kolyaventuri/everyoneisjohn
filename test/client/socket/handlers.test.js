import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import {MockSocket} from '../../server/mocks/socket';

const mockEvents = [
  {
    name: 'turtle',
    handler: () => {}
  }
];

const {applyHandlers} = proxyquire('../../../client/socket/handlers', {
  './events': {default: mockEvents}
});

test('autobinds events', t => {
  const socket = new MockSocket();
  const {name, handler} = mockEvents[0];

  handler.bind = stub().returns(handler);

  applyHandlers(socket);

  t.true(socket.on.calledWith(name, handler));
});
