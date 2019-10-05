// @flow

import {FAILING} from '../../constants/connection-status';
import setConnectionStatus from '../../actions/set-connection-status';

const disconnect = () => setConnectionStatus(FAILING);

export default disconnect;
