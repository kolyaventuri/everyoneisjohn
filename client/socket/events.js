// @flow

import startGame from './actions/start-game';
import updatePlayer from './actions/update-player';
import gameJoinSuccess from './actions/game-join-success';
import setGameMode from './actions/set-game-mode';
import gameError from './actions/game-error';
import disconnect from './actions/disconnect';
import reconnectFailed from './actions/reconnect-failed';
import gameKick from './actions/game-kick';
import setSkills from './actions/set-skills';
import chatReceive from './actions/chat-receive';

import setPlayers from './actions/set-players';

const events = [
  // Generic events
  {name: 'startGame', handler: startGame},
  {name: 'updatePlayer', handler: updatePlayer},
  {name: 'gameJoinSuccess', handler: gameJoinSuccess},
  {name: 'setGameMode', handler: setGameMode},
  {name: 'gameError', handler: gameError},
  {name: 'gameKick', handler: gameKick},
  {name: 'setSkills', handler: setSkills},
  {name: 'disconnect', handler: disconnect},
  {name: 'reconnect_failed', handler: reconnectFailed},
  {name: 'chatReceive', handler: chatReceive},

  // GM Events
  {name: 'setPlayers', handler: setPlayers}
];

export default events;
