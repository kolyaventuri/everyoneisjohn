// @flow

import {store} from '../../store';

type Payload = {|
  type: string,
  index?: number
|};

const deleteItem = ({type, index}: Payload) => {
  if (type === 'skill') {
    store.dispatch({
      type: 'SET_PLAYER_INFO',
      payload: {
        [`skill${index}`]: ''
      }
    });
  }
};

export default deleteItem;
