import browserEnv from 'browser-env';

const origin = 'http://localhost';

const opts = {
  url: origin,
  referrer: origin
};

browserEnv(['window', 'document', 'navigator'], opts);
