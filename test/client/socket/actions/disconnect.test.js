import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';
import {FAILING} from '../../../../client/constants/connection-status';

const setConn = stub();

const disconnect = proxyquire('../../../../client/socket/actions/disconnect', {
  '../../actions/set-connection-status': {default: setConn}
}).default;

test('sets the connection status to failing', t => {
  disconnect();

  t.true(setConn.calledWith(FAILING));
});
