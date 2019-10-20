import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import {MockSocket} from '../../../server/mocks/socket';
import Message from '../../../../server/models/message';
import Player from '../../../../server/models/player';

const store = {
  dispatch: stub()
};

const socket = new MockSocket();
const genPlayer = () => new Player(socket);
const genMessage = (content, player) =>
  new Message(player || genPlayer(), content || 'abc123');

const chatReceive = proxyquire(
  '../../../../client/socket/actions/chat-receive',
  {
    '../../store': {store}
  }
).default;

test('dispatches an ADD_MESSAGE action', t => {
  const message = genMessage().serialize();

  chatReceive(message);

  t.true(
    store.dispatch.calledWith({
      type: 'ADD_MESSAGE',
      payload: {
        message
      }
    })
  );
});
