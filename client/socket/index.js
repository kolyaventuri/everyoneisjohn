// @flow

import client from './client';

export type SocketType = {[string]: any};
const instance = typeof client === 'function' ? client() : client;

export default instance;
