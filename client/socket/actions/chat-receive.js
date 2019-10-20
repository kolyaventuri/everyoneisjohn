// @flow

import {store} from '../../store';
import type {SerializedMessage as Message} from '../../../server/models/message';

const chatReceive = (message: Message) => {
  store.dispatch({
    type: 'ADD_MESSAGE',
    payload: {message}
  });
};

export default chatReceive;
