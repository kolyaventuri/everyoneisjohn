import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const dispatch = stub();
const store = {dispatch};

const setConnectionStatus = proxyquire('../../../client/actions/set-connection-status', {
  '../store': {store}
}).default;

test('it dispatches a SET_CONNECITON_STATUS event', t => {
  setConnectionStatus('connected');

  t.true(dispatch.calledWith({
    type: 'SET_CONNECTION_STATUS',
    payload: {
      status: 'connected'
    }
  }));
});
