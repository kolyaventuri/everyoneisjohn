// @flow

import path from 'path';
import Bundler from 'parcel-bundler';

const dir = path.join(__dirname, '../src');

const options = {
  outDir: path.join(__dirname, '../static/javascripts'),
  outFile: 'bundle.js'
};

const bundler = new Bundler(path.join(dir, 'app.js'), options);

bundler.bundle();
