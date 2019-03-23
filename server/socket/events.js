// @flow

import initPlayer from './actions/init-player';
import disconnect from './actions/disconnect';
import updatePlayer from './actions/update-player';

import createGame from './actions/create-game';
import startRound from './actions/start-round';

const events = [
  // Generic server events
  {name: 'initPlayer', handler: initPlayer},
  {name: 'disconnect', handler: disconnect},
  {name: 'updatePlayer', handler: updatePlayer},

  // Game events
  {name: 'createGame', handler: createGame},
  {name: 'startRound', handler: startRound}
];

export default events;
