import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

const sfxName = 'fooBar';
const sfxs = {
  [sfxName]: {play: stub()}
};

const manager = {
  get: name => sfxs[name]
};

proxyquire.noCallThru();
const playSound = proxyquire('../../../client/utils/play-sound', {
  '../lib/sfx': manager
}).default;

test('it loads and plays the sound asked for', t => {
  playSound(sfxName);

  t.true(sfxs[sfxName].play.called);
});

test('it does nothing if the sound is invalid', t => {
  const fn = () => playSound('blah');

  t.notThrows(fn);
});
