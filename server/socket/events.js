// @flow

import initPlayer from './actions/init-player';
import disconnect from './actions/disconnect';
import updatePlayer from './actions/update-player';
import joinGame from './actions/join-game';

import createGame from './actions/create-game';
import joinGm from './actions/join-gm';
import startGame from './actions/start-game';
import startBidding from './actions/start-bidding';
import startPlaying from './actions/start-playing';
import giveWillpower from './actions/give-willpower';
import givePoints from './actions/give-points';
import setGoalLevel from './actions/set-goal-level';
import rejectSkill from './actions/reject-skill';
import rejectGoal from './actions/reject-goal';
import kickPlayer from './actions/kick-player';

import submitBid from './actions/submit-bid';
import updateStats from './actions/update-stats';

const events = [
  // Generic server events
  {name: 'initPlayer', handler: initPlayer},
  {name: 'disconnect', handler: disconnect},
  {name: 'updatePlayer', handler: updatePlayer},
  {name: 'joinGame', handler: joinGame},

  // GM Events
  {name: 'createGame', handler: createGame},
  {name: 'joinGm', handler: joinGm},
  {name: 'startGame', handler: startGame, isGM: true},
  {name: 'startBidding', handler: startBidding, isGM: true},
  {name: 'startPlaying', handler: startPlaying, isGM: true},
  {name: 'giveWillpower', handler: giveWillpower, isGM: true},
  {name: 'givePoints', handler: givePoints, isGM: true},
  {name: 'setGoalLevel', handler: setGoalLevel, isGM: true},
  {name: 'rejectSkill', handler: rejectSkill, isGM: true},
  {name: 'rejectGoal', handler: rejectGoal, isGM: true},
  {name: 'kickPlayer', handler: kickPlayer, isGM: true},

  // Player events
  {name: 'submitBid', handler: submitBid},
  {name: 'updateStats', handler: updateStats}
];

export default events;
