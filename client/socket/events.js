// @flow

import startGame from './actions/start-game';
import updatePlayer from './actions/update-player';
import gameJoinSuccess from './actions/game-join-success';
import setGameMode from './actions/set-game-mode';
import gameError from './actions/game-error';
import disconnect from './actions/disconnect';
import deleteItem from './actions/delete-item';
import gameKick from './actions/game-kick';
import setSkill from './actions/set-skill';

import setPlayers from './actions/set-players';

const events = [
  // Generic events
  {name: 'startGame', handler: startGame},
  {name: 'updatePlayer', handler: updatePlayer},
  {name: 'gameJoinSuccess', handler: gameJoinSuccess},
  {name: 'setGameMode', handler: setGameMode},
  {name: 'gameError', handler: gameError},
  {name: 'disconnect', handler: disconnect},
  {name: 'deleteItem', handler: deleteItem},
  {name: 'gameKick', handler: gameKick},
  {name: 'setSkill', handler: setSkill},

  // GM Events
  {name: 'setPlayers', handler: setPlayers}
];

export default events;
