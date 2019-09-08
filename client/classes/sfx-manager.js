// @flow

import SFX from './sfx';

export default class SFXManager {
  _sfxs: {[string]: SFX};

  constructor() {
    this._sfxs = {};
  }

  add({name, file}: {name: string, file: string}) {
    const sfx = new SFX(file);
    this._sfxs[name] = sfx;

    return sfx;
  }

  get(name: string): ?SFX {
    return this._sfxs[name] || null;
  }
}
