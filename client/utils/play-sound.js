// @flow

import {SOUND, ON} from '../constants/settings';
import manager from '../lib/sfx';
import {get} from './local-storage';

const sounds = {};

const isSoundOn = () => get(SOUND) === ON;

const playSound = (name: string) => {
  const sound = sounds[name] || manager.get(name);

  if (sound && isSoundOn()) {
    sounds[name] = sound;
    sound.play();
  }
};

export default playSound;
