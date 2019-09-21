// @flow

import {store} from '../../store';

type Payload = {
  skill: Array<string>
};

const setSkill = ({skills}: Payload) => {
  store.dispatch({
    type: 'SET_PLAYER_INFO',
    payload: {
      skills
    }
  });
};

export default setSkill;
