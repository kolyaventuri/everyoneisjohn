import test from 'ava';
import {stub} from 'sinon';
import Audio from '../../helpers/mock-audio';

import SFX from '../../../client/classes/sfx';

test.beforeEach(() => {
  global.Audio = Audio;
});

test('it loads the specified audio file', t => {
  const file = '../../some/file';
  const sfx = new SFX(file);

  t.is(sfx._audio.src, file);
  t.is(sfx._audio.preload, 'auto');
});

test('#play plays the specified audio file', t => {
  const sfx = new SFX('..');
  sfx._audio.oncanplay();

  sfx.play();

  t.true(sfx._audio.play.called);
});

test('#play does not play if the src does not exist', t => {
  const sfx = new SFX('badfile');
  sfx._audio.play = stub().throws(new Error());

  try {
    sfx.play();
  } finally {
    t.false(sfx._audio.play.called);
  }
});
