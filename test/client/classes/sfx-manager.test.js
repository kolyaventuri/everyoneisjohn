import test from 'ava';

import Audio from '../../helpers/mock-audio';
import SFXManager from '../../../client/classes/sfx-manager';
import SFX from '../../../client/classes/sfx';

test.beforeEach(() => {
  global.Audio = Audio;
});

test('can add a effect', t => {
  const name = 'foo';
  const file = 'foobar';
  const manager = new SFXManager();

  const added = manager.add({name, file});
  t.true(added instanceof SFX);
});

test('can retrieve a specific effect', t => {
  const name = 'foo';
  const file = 'foobar';
  const manager = new SFXManager();

  manager.add({name, file});
  manager.add({name: 'foo2', file: 'foobar2'});

  const result = manager.get(name);
  t.true(result._audio.append.called);

  const {firstCall, lastCall} = result._audio.append;
  const sourceMp3 = firstCall.args[0];
  const sourceOgg = lastCall.args[0];

  t.true(sourceMp3.src.endsWith(`${file}.mp3`));
  t.true(sourceOgg.src.endsWith(`${file}.ogg`));
});
