import test from 'ava';

import {MockSocket} from '../../mocks/socket';
import Player from '../../../../server/models/player';
import setup from '../../stubs/create-socket';
import rejectSkill from '../../../../server/socket/actions/reject-skill';

test('deletes a given players skill, based on provided index', t => {
  const skill1 = 'A';
  const skill2 = 'B';
  const player1 = new Player(new MockSocket());
  const player2 = new Player(new MockSocket());
  const {socket, game} = setup(true, true);

  game.addPlayer(player1);
  game.addPlayer(player2);

  player1.stats.setSkill(1, skill1);
  player1.stats.setSkill(2, skill2);
  player2.stats.setSkill(1, skill1);
  player2.stats.setSkill(2, skill2);

  rejectSkill(socket, {index: 1, player: player1.id});

  t.is(player1.stats.skills[0], skill1);
  t.is(player1.stats.skills[1], '');

  t.is(player2.stats.skills[1], skill2);
});
