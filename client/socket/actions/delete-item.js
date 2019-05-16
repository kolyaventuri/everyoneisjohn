// @flow

import {store} from '../../store';

type Payload = {|
  type: string,
  index?: number
|};

const deleteItem = ({type, index}: Payload) => {
  if (type === 'skill') {
    const {
      player: {skills}
    } = store.getState();

    skills[index] = '';

    store.dispatch({
      type: 'SET_PLAYER_INFO',
      payload: {
        skills
      }
    });
  }
};

export default deleteItem;
