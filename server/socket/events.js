// @flow

import initPlayer from './actions/init-player';
import disconnect from './actions/disconnect';
import updatePlayer from './actions/update-player';

import createGame from './actions/create-game';
import startBidding from './actions/start-bidding';
import startPlaying from './actions/start-playing';

const events = [
  // Generic server events
  {name: 'initPlayer', handler: initPlayer},
  {name: 'disconnect', handler: disconnect},
  {name: 'updatePlayer', handler: updatePlayer},

  // Game events
  {name: 'createGame', handler: createGame},
  {name: 'startBidding', handler: startBidding},
  {name: 'startPlaying', handler: startPlaying}
];

export default events;
