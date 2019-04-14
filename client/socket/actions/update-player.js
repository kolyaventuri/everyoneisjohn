// @flow

import {store} from '../../store';

type Payload = {|
  id: string,
  name: string,
  willpower: number,
  points: number,
  skills: Array<string>,
  goal: string,
  goalLevel: number,
  frozen: boolean
|};

const setPlayerInfo = (payload: Payload) => {
  store.dispatch({
    type: 'SET_PLAYER_INFO',
    payload
  });
};

export default setPlayerInfo;
