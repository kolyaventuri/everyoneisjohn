// @flow

import startGame from './actions/start-game';
import updatePlayer from './actions/update-player';
import gameJoinSuccess from './actions/game-join-success';

import setPlayers from './actions/set-players';

const events = [
  // Generic events
  {name: 'startGame', handler: startGame},
  {name: 'updatePlayer', handler: updatePlayer},
  {name: 'gameJoinSuccess', handler: gameJoinSuccess},

  // GM Events
  {name: 'setPlayers', handler: setPlayers}
];

export default events;
