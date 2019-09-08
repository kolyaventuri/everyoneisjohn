// @flow

import SFXManager from '../classes/sfx-manager';
import effects from '../constants/effects';

const manager = new SFXManager();

for (const {name, file} of effects) {
  manager.add({name, file});
}

export default manager;
