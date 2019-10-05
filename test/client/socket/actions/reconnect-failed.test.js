import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';
import {FAILED} from '../../../../client/constants/connection-status';

const setConn = stub();
const gameError = stub();

const reconnectFailed = proxyquire('../../../../client/socket/actions/reconnect-failed', {
  './game-error': {default: gameError},
  '../../actions/set-connection-status': {default: setConn}
}).default;

test('calls the gameError action', t => {
  reconnectFailed();

  t.true(gameError.calledWith('error.app.socketDisconnect'));
});

test('sets the connection status to failed', t => {
  reconnectFailed();

  t.true(setConn.calledWith(FAILED));
});
