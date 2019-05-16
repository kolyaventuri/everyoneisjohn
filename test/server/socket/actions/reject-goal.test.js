import test from 'ava';

import {MockSocket} from '../../mocks/socket';
import Player from '../../../../server/models/player';
import setup from '../../stubs/create-socket';
import rejectGoal from '../../../../server/socket/actions/reject-goal';

test('deletes a given players goal', t => {
  const goal = 'Some goal';
  const player1 = new Player(new MockSocket());
  const player2 = new Player(new MockSocket());
  const {socket, game} = setup(true, true);

  game.addPlayer(player1);
  game.addPlayer(player2);

  player1.stats.goal = goal;
  player2.stats.goal = goal;

  rejectGoal(socket, {player: player1.id});

  t.is(player1.stats.goal, '');

  t.is(player2.stats.goal, goal);
});
