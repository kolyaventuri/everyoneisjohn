// @flow

import gameError from './game-error';

const disconnect = () => gameError('error.app.socketDisconnect');

export default disconnect;
