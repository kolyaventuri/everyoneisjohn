// @flow

import initPlayer from './actions/init-player';
import disconnect from './actions/disconnect';
import updatePlayer from './actions/update-player';

import createGame from './actions/create-game';
import startBidding from './actions/start-bidding';
import startPlaying from './actions/start-playing';
import giveWillpower from './actions/give-willpower';
import givePoints from './actions/give-points';
import setGoalLevel from './actions/set-goal-level';

const events = [
  // Generic server events
  {name: 'initPlayer', handler: initPlayer},
  {name: 'disconnect', handler: disconnect},
  {name: 'updatePlayer', handler: updatePlayer},

  // GM Events
  {name: 'createGame', handler: createGame},
  {name: 'startBidding', handler: startBidding},
  {name: 'startPlaying', handler: startPlaying},
  {name: 'giveWillpower', handler: giveWillpower},
  {name: 'givePoints', handler: givePoints},
  {name: 'setGoalLevel', handler: setGoalLevel}
];

export default events;
