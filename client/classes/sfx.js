// @flow

export default class SFX {
  constructor(file: string) {
    const audio = new Audio();
    audio.src = file;
    audio.preload = 'auto';

    this._audio = audio;
  }

  play() {
    this._audio.play();
  }
}
