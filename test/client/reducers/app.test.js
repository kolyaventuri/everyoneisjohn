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
    sound: false,
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

test('CLEAR_ERROR should clear any errors', t => {
  const expected = {
    error: null
  };

  const result = reducer({
    error: {
      error: 'a',
      type: '1'
    }
  }, {
    type: 'CLEAR_ERROR'
  });

  t.deepEqual(result, expected);
});

test('SET_SOUND should set the sound value', t => {
  const expected = {
    sound: true,
    error: null
  };

  const result = reducer({
    error: null,
    sound: false
  }, {
    type: 'SET_SOUND',
    payload: {sound: true}
  });

  t.deepEqual(result, expected);
});
