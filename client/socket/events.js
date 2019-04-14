// @flow

import startGame from './actions/start-game';
import setPlayerId from './actions/set-player-id';
import gameJoinSuccess from './actions/game-join-success';

const events = [
  {name: 'startGame', handler: startGame},
  {name: 'setPlayerId', handler: setPlayerId},
  {name: 'gameJoinSuccess', handler: gameJoinSuccess}
];

export default events;
