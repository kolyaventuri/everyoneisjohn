import test from 'ava';

import {MockSocket} from '../../mocks/socket';
import Player from '../../../../server/models/player';
import setup from '../../stubs/create-socket';
import givePoints from '../../../../server/socket/actions/give-points';

test('can give points to a specific player', t => {
  const player1 = new Player(new MockSocket());
  const player2 = new Player(new MockSocket());
  const {socket, game} = setup(true, true);

  game.addPlayer(player1);
  game.addPlayer(player2);

  givePoints(socket, {amount: 1, player: player1.id});

  t.is(player1.stats.points, 1);
  t.is(player2.stats.points, 0);
});
