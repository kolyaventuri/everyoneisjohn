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

test('when no channel provided, calls emit directly', t => {
  emit({event, payload});

  t.true(socket.emit.calledWith(event, payload));
});

test('does not require a paylaod', t => {
  emit({event});

  t.true(socket.emit.calledWith(event, undefined));
});

test('when a channel is provided, calls socket.to then emit', t => {
  emit({channel, event, payload});

  t.true(socket.to.calledWith(channel));
  t.true(socketToMocks.emit.calledWith(event, payload));
});
