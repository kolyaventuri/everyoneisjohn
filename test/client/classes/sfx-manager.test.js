import test from 'ava';

import Audio from '../../helpers/mock-audio';
import SFXManager from '../../../client/classes/sfx-manager';

test.beforeEach(() => {
  global.Audio = Audio;
});

test('can add a effect', t => {
  const name = 'foo';
  const file = 'foobar';
  const manager = new SFXManager();

  manager.add({name, file});
  const result = manager.get(name);

  t.is(result._audio.src, file);
});

test('can retrieve a specific effect', t => {
  const name = 'foo';
  const file = 'foobar';
  const manager = new SFXManager();

  manager.add({name, file});
  manager.add({name: 'foo2', file: 'foobar2'});

  const result = manager.get(name);

  t.is(result._audio.src, file);
});
