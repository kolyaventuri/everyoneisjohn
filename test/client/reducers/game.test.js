import test from 'ava';

import reducer from '../../../src/reducers/game';

test('it should return the default state', t => {
  const result = reducer(undefined, {});

  t.deepEqual(result, {});
});

test('SET_GAME_GM should be able to set the game GM', t => {
  const gameId = 'ABCDEF';

  const expected = {
    gameId,
    isGm: true
  };

  const result = reducer({}, {
    type: 'SET_GAME_GM',
    payload: {gameId}
  });

  t.deepEqual(result, expected);
});
