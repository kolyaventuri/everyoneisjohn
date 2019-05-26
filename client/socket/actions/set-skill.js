// @flow

import {store} from '../../store';

type Payload = {
  index: number,
  skill: string
};

const setSkill = ({index, skill}: Payload) => {
  index += 1;

  store.dispatch({
    type: 'SET_PLAYER_INFO',
    payload: {
      [`skill${index}`]: skill
    }
  });
};

export default setSkill;
