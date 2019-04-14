// @flow

import startGame from './actions/start-game';
import setPlayerId from './actions/set-player-id';

const events = [
  {name: 'startGame', handler: startGame},
  {name: 'setPlayerId', handler: setPlayerId}
];

export default events;
