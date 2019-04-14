import test from 'ava';
import uuid from 'uuid/v4';

import reducer from '../../../client/reducers/player';

test('it should return the default state', t => {
  const result = reducer(undefined, {});

  t.deepEqual(result, {});
});

test('SET_PLAYER_ID should be able to set the player id', t => {
  const id = uuid();

  const expected = {
    id
  };

  const result = reducer({}, {
    type: 'SET_PLAYER_ID',
    payload: {id}
  });

  t.deepEqual(result, expected);
});

test('SET_PLAYER_NAME should be able to set the player name', t => {
  const name = uuid();

  const expected = {
    name
  };

  const result = reducer({}, {
    type: 'SET_PLAYER_NAME',
    payload: {name}
  });

  t.deepEqual(result, expected);
});
