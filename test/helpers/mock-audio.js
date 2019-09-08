import {stub} from 'sinon';

export default class Audio {
  oncanplay = () => {
    this._ready = true;
  }

  set src(file) {
    this._src = file;
    this.oncanplay();
  }

  get src() {
    return this._src;
  }

  addEventListener(type, fn) {
    this[`on${type}`] = fn;
  }

  append = stub();

  play = stub();
}
