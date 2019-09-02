import test from 'ava';
import {stub} from 'sinon';

import SFX from '../../../client/classes/sfx';

const setSrc = stub();
class Audio {
  set src(file) {
    setSrc(file);
    this._src = file;
  }

  play = stub();
}

test.beforeEach(() => {
  global.Audio = Audio;
});

test('it loads the specified audio file', t => {
  const file = '../../some/file';
  const sfx = new SFX(file);

  t.true(setSrc.calledWith(file));
  t.is(sfx._audio.preload, 'auto');
});

test('#play plays the specified audio file', t => {
  const sfx = new SFX('..');

  sfx.play();

  t.true(sfx._audio.play.called);
});
