import test from 'ava';

import {get, set} from '../../../client/utils/local-storage';

test('it can set values on localStorage', t => {
  const value = 'abc';
  const key = 'def';

  set(key, value);

  const result = window.localStorage.getItem(key);

  t.is(result, value);
});

test('it can get the values from localStorage', t => {
  const value = 'abc';
  const key = 'def';

  window.localStorage.setItem(key, value);

  const result = get(key);

  t.is(result, value);
});
