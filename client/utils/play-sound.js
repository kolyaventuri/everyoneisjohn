// @flow

import manager from '../lib/sfx';

const sounds = {};

const playSound = (name: string) => {
  const sound = sounds[name] || manager.get(name);

  if (sound) {
    sounds[name] = sound;
    sound.play();
  }
};

export default playSound;
