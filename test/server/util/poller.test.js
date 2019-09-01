import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

const MAX_POLL_COUNT = 5;
const poller = proxyquire('../../../server/util/poller', {
  '../constants': {
    MAX_POLL_COUNT,
    SHORT_POLL_INTERVAL: 1
  }
}).default;

test('resolves immediately if the check method is truthy', async t => {
  const checkFn = stub().returns(true);

  await poller(checkFn);
  t.is(checkFn.callCount, 1);
});

test('resolves later if the polling takes a few tries', async t => {
  const checkFn = stub().returns(false);
  checkFn.onSecondCall().returns(true);

  await poller(checkFn);
  t.is(checkFn.callCount, 2);
});

test('rejects after the max poll count has been exceeded', async t => {
  const checkFn = stub().returns(false);

  try {
    await poller(checkFn);
  } catch {
    return t.is(checkFn.callCount, MAX_POLL_COUNT);
  }
});
