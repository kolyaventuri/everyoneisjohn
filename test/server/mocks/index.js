import {spy, stub} from 'sinon';
import MockRepo from './repo';

export const socketToMocks = {
  emit: spy()
};

export class MockSocket {
  join = spy();

  to = stub().returns(socketToMocks);

  emit = spy();
}

export const repositories = {
  gameRepository: new MockRepo(),
  playerRepository: new MockRepo()
};
