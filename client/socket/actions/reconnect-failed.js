// @flow

import {FAILED} from '../../constants/connection-status';
import setConnectionStatus from '../../actions/set-connection-status';
import gameError from './game-error';

const reconnectFailed = () => {
  gameError('error.app.socketDisconnect');

  setConnectionStatus(FAILED);
};

export default reconnectFailed;
