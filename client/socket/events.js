// @flow

import startGame from './actions/start-game';
import setPlayerInfo from './actions/set-player-info';
import gameJoinSuccess from './actions/game-join-success';

const events = [
  {name: 'startGame', handler: startGame},
  {name: 'setPlayerInfo', handler: setPlayerInfo},
  {name: 'gameJoinSuccess', handler: gameJoinSuccess}
];

export default events;
