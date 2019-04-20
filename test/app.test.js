import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

const useMock = stub();
const onMock = stub();

class KoaMock {
  use = useMock;

  on = onMock;

  callback = stub()
}

// This is fine because app is automatically evaled
/* eslint-disable-next-line no-unused-expressions */
proxyquire('../app', {
  koa: KoaMock
}).default;

test('it sets up listeners', t => {
  t.true(useMock.callCount > 0);
  t.true(onMock.callCount > 0);
});
