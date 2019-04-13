import test from 'ava';

import {MockSocket} from '../../mocks/socket';
import Player from '../../../../server/models/player';
import setup from '../../stubs/create-socket';
import setGoalLevel from '../../../../server/socket/actions/set-goal-level';

test('can give points to a specific player', t => {
  const player1 = new Player(new MockSocket());
  const player2 = new Player(new MockSocket());
  const {socket, game} = setup(true, true);

  game.addPlayer(player1);
  game.addPlayer(player2);

  setGoalLevel(socket, {amount: 1, player: player1.id});

  t.is(player1.stats.goalLevel, 1);
  t.is(player2.stats.goalLevel, 0);
});
