import {stub} from 'sinon';

export default class SFX {
  constructor(name) {
    this.name = name;
  }

  play = stub();
}
