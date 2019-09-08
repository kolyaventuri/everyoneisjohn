import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import {ON, OFF} from '../../../client/constants/settings';

const sfxName = 'fooBar';
const sfx2Name = 'barFoo';
const sfxs = {
  [sfxName]: {play: stub()},
  [sfx2Name]: {play: stub()}
};

const manager = {
  get: name => sfxs[name]
};

const get = stub().returns(ON);

proxyquire.noCallThru();
const playSound = proxyquire('../../../client/utils/play-sound', {
  '../lib/sfx': manager,
  './local-storage': {get}
}).default;

test('it loads and plays the sound asked for', t => {
  playSound(sfxName);

  t.true(sfxs[sfxName].play.called);
});

test('it does nothing if the sound is invalid', t => {
  const fn = () => playSound('blah');

  t.notThrows(fn);
});

test('it does nothing if the sound is turned off', t => {
  get.returns(OFF);

  playSound(sfx2Name);

  t.false(sfxs[sfx2Name].play.called);
});
