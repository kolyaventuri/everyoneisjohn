import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const gameError = stub();

const disconnect = proxyquire('../../../../client/socket/actions/disconnect', {
  './game-error': {default: gameError}
}).default;

test('calls the gameError action', t => {
  disconnect();

  t.true(gameError.calledWith('error.app.socketDisconnect'));
});
