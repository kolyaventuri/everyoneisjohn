import MockRepo from './repo';

export const socket = {data: Symbol('Socket')};

export const repositories = {
  gameRepository: new MockRepo(),
  playerRepository: new MockRepo()
};
