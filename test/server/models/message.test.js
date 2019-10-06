import test from 'ava';
import sinon from 'sinon';

import Message from '../../../server/models/message';

test('auto-generates an ID', t => {
  const msg = new Message();

  t.true(typeof msg.id === 'string');
});

test('the ID is immutable', t => {
  const msg = new Message();
  const oldId = msg.id;

  const fn = () => {
    msg.id = 'aaa';
  };

  t.throws(fn);
  t.is(msg.id, oldId);
});

test('has a sender', t => {
  const sender = 'abc123';
  const msg = new Message(sender);

  t.is(msg.sender, sender);
});

test('has content', t => {
  const content = 'abc123';
  const msg = new Message(null, content);

  t.is(msg.content, content);
});

test('has a timestamp', t => {
  const now = new Date();
  const clock = sinon.useFakeTimers(now);

  const msg = new Message();

  t.deepEqual(msg.timestamp, now);

  clock.restore();
});
