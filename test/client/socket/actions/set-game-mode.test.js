import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

import {ALERT} from '../../../../client/constants/effects';
import {modes} from '../../../../client/constants/game';

const dispatch = stub();
const store = {dispatch};
const playSound = stub();

proxyquire.noCallThru();
const setGameMode = proxyquire('../../../../client/socket/actions/set-game-mode', {
  '../../store': {store},
  '../../utils/play-sound': playSound
}).default;

test('updates the redux store with the game mode', t => {
  const mode = modes.PLAYING;
  setGameMode(mode);

  t.true(dispatch.calledWith({
    type: 'SET_GAME_MODE',
    payload: {mode}
  }));
});

test('plays the ALERT sound if the VOTING mode is set', t => {
  setGameMode(modes.VOTING);

  t.true(playSound.calledWith(ALERT));
});
