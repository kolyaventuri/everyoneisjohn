// @flow

import {store} from '../../store';

type Payload = {
  id: string,
  name: string
};

const setPlayerInfo = ({id, name}: Payload) => {
  store.dispatch({
    type: 'SET_PLAYER_INFO',
    payload: {id, name}
  });
};

export default setPlayerInfo;
