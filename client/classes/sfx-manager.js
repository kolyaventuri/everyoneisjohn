// @flow

import SFX from './sfx';

export default class SFXManager {
  _sfxs: {[string]: SFX};

  constructor() {
    this._sfxs = {};
  }

  add({name, file}: {name: string, file: string}) {
    this._sfxs[name] = new SFX(file);
  }

  get(name: string): ?SFX {
    return this._sfxs[name] || null;
  }
}
