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
  const {game} = store.getState();

  const type = game.isGm ? 'SET_GAME_PLAYER_INFO' : 'SET_PLAYER_INFO';

  store.dispatch({
    type,
    payload
  });
};

export default setPlayerInfo;
