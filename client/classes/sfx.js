// @flow

const formats = ['mp3', 'ogg'];
const mimeTypes = ['audio/mpeg', 'audio/ogg'];

export default class SFX {
  constructor(file: string) {
    const audio = new Audio();
    audio.preload = 'auto';

    audio.addEventListener('error', () => {
      this._ready = false;
    });
    audio.addEventListener('canplay', () => {
      this._ready = true;
    });

    this._ready = false;
    this._audio = audio;
    this._src = file;

    this._loadAudio();
  }

  _loadAudio() {
    for (let i = 0; i < formats.length; i++) {
      const format = formats[i];
      const mime = mimeTypes[i];

      const source = document.createElement('source');

      source.type = mime;
      source.src = `${this._src}.${format}`;
      this._audio.append(source);
    }
  }

  play() {
    if (this._ready) {
      this._audio.play();
    }
  }
}
