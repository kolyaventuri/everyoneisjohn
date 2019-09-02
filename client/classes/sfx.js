// @flow

export default class SFX {
  constructor(file: string) {
    const audio = new Audio();
    audio.src = file;
    audio.preload = 'auto';

    audio.addEventListener('error', () => {
      this._ready = false;
    });
    audio.addEventListener('canplay', () => {
      this._ready = true;
    });

    this._ready = false;
    this._audio = audio;
  }

  play() {
    if (this._ready) {
      this._audio.play();
    }
  }
}
