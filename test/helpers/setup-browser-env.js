import browserEnv from 'browser-env';
import Audio from './mock-audio';

const origin = 'http://localhost';

const opts = {
  url: origin,
  referrer: origin
};

browserEnv(['window', 'document', 'navigator'], opts);

window.Audio = Audio;
global.Audio = Audio;
