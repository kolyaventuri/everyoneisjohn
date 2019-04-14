// @flow

import startGame from './actions/start-game';
import updatePlayer from './actions/update-player';
import gameJoinSuccess from './actions/game-join-success';

const events = [
  {name: 'startGame', handler: startGame},
  {name: 'updatePlayer', handler: updatePlayer},
  {name: 'gameJoinSuccess', handler: gameJoinSuccess}
];

export default events;
