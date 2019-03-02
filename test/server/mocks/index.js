import MockRepo from './repo';
import {spy} from 'sinon';

export class MockSocket {
  join = spy();
}

export const repositories = {
  gameRepository: new MockRepo(),
  playerRepository: new MockRepo()
};
