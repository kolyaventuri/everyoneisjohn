// @flow

import playSound from '../../utils/play-sound';
import {ALERT} from '../../constants/effects';
import {modes} from '../../constants/game';
import {store} from '../../store';

const triggers = {
  [modes.VOTING]: () => playSound(ALERT)
};

const setGameMode = (mode: string) => {
  const trigger = triggers[mode];

  if (typeof trigger === 'function') {
    trigger();
  }

  store.dispatch({
    type: 'SET_GAME_MODE',
    payload: {mode}
  });
};

export default setGameMode;
