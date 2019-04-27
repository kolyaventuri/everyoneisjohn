import test from 'ava';

import reducer, {defaultState} from '../../../client/reducers/app';

test('it should return the default state', t => {
  const result = reducer(undefined, {});

  t.deepEqual(result, defaultState);
});

test('SET_ERROR should be able to set the game GM', t => {
  const error = 'someerror';
  const type = 'fatal';

  const expected = {
    error: {
      error,
      type
    }
  };

  const result = reducer(defaultState, {
    type: 'SET_ERROR',
    payload: {error, type}
  });

  t.deepEqual(result, expected);
});
