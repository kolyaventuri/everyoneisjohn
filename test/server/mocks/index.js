import {spy, stub} from 'sinon';
import MockRepo from './repo';

export const socketToMocks = {
  emit: spy()
};

const stubCache = {};
const stubEvent = (name, event, handler) => {
  stubCache[name] = stubCache[name] || {};
  stubCache[name][event] = handler;
};

export class MockSocket {
  join = spy();

  to = stub().returns(socketToMocks);

  emit = spy();

  on = stub().callsFake((event, handler) => stubEvent('on', event, handler));

  __invoke = (name, event, data) => {
    const handler = stubCache[name];
    if (handler) {
      if (typeof handler[event] === 'function') {
        handler[event](data);
      }
    }
  }
}

export const repositories = {
  gameRepository: new MockRepo(),
  playerRepository: new MockRepo()
};
