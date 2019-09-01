import {spy, stub} from 'sinon';

export const socketToMocks = {
  emit: spy()
};

const stubCache = {};
const stubEvent = (name, event, handler) => {
  if (name === 'use') {
    stubCache.use = stubCache.use || [];
    stubCache.use.push(event);
    return;
  }

  stubCache[name] = stubCache[name] || {};
  stubCache[name][event] = handler;
};

export class MockSocket {
  playerId = null;

  join = stub().callsFake((name, callback) => {
    this.rooms[name] = name;
    if (callback) {
      callback();
    }
  });

  leave = spy();

  to = stub().returns(socketToMocks);

  emit = spy();

  on = stub().callsFake((event, handler) => stubEvent('on', event, handler));

  use = stub().callsFake(handler => {
    stubEvent('use', handler);
  });

  listen = stub().returns(this);

  rooms = {}

  connected = true

  __invoke = (name, event, data) => {
    const handler = stubCache[name];
    if (name === 'use') {
      console.log(stubCache);
      for (const handle of handler) {
        if (typeof handle === 'function') {
          handle(data, () => {});
        }
      }

      return;
    }

    if (handler) {
      if (typeof handler[event] === 'function') {
        handler[event](data);
      }
    }
  }
}
