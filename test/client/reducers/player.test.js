import test from 'ava';
import uuid from 'uuid/v4';

import reducer from '../../../client/reducers/player';

test('it should return the default state', t => {
  const result = reducer(undefined, {});

  t.deepEqual(result, {});
});

test('SET_PLAYER_INFO should be able to set the player id / name', t => {
  const id = uuid();
  const name = uuid();

  const expected = {
    id,
    name
  };

  const result = reducer({}, {
    type: 'SET_PLAYER_INFO',
    payload: {id, name}
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

test('SET_PLAYER_INFO, when passed a skill array, should not merge the arrays', t => {
  const skills = ['skilla'];
  const newSkills = ['skillb'];

  const expected = {skills: newSkills};

  const result = reducer({skills}, {
    type: 'SET_PLAYER_INFO',
    payload: {skills: newSkills}
  });

  t.deepEqual(result, expected);
});
