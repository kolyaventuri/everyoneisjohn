import test from 'ava';
import proxyquire from 'proxyquire';
import {MockSocket, socketToMocks} from '../mocks/socket';

const socket = new MockSocket();
const {emit} = proxyquire('../../../server/socket/emitter', {
  '.': {default: socket}
});

const channel = 'someChannel';
const event = 'someEvent';
const payload = {
  some: 'payload'
};

test('does not require a paylaod', t => {
  emit({channel, event});

  t.true(socket.to.calledWith(channel));
  t.true(socketToMocks.emit.calledWith(event, undefined));
});

test('can emit with a payload', t => {
  emit({channel, event, payload});

  t.true(socket.to.calledWith(channel));
  t.true(socketToMocks.emit.calledWith(event, payload));
});
