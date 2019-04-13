// @flow

import initPlayer from './actions/init-player';
import disconnect from './actions/disconnect';
import updatePlayer from './actions/update-player';

import createGame from './actions/create-game';
import startGame from './actions/start-game';
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
  {name: 'createGame', handler: createGame, isGM: true},
  {name: 'startGame', handler: startGame, isGM: true},
  {name: 'startBidding', handler: startBidding, isGM: true},
  {name: 'startPlaying', handler: startPlaying, isGM: true},
  {name: 'giveWillpower', handler: giveWillpower, isGM: true},
  {name: 'givePoints', handler: givePoints, isGM: true},
  {name: 'setGoalLevel', handler: setGoalLevel, isGM: true}
];

export default events;
