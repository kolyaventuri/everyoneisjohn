// @flow

import server from './server';

/*
  This whole file is effectively a proxy between
  the memoized socket.io instance and the rest
  of the app.
*/

const instance = typeof server === 'function' ? server() : server;

export default instance;
