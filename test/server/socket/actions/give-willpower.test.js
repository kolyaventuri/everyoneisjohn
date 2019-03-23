import test from 'ava';

import {MockSocket} from '../../mocks/socket';
import Player from '../../../../server/models/player';
import setup from '../../stubs/create-socket';
import giveWillpower from '../../../../server/socket/actions/give-willpower';

test('can give willpower to all players', t => {
  const player1 = new Player(new MockSocket());
  const player2 = new Player(new MockSocket());
  const {socket, game} = setup(true, true);

  game.addPlayer(player1);
  game.addPlayer(player2);

  giveWillpower(socket, {amount: 1});

  t.is(player1.stats.willpower, 11);
  t.is(player2.stats.willpower, 11);
});

test('can give willpower to a specific player', t => {
  const player1 = new Player(new MockSocket());
  const player2 = new Player(new MockSocket());
  const {socket, game} = setup(true, true);

  game.addPlayer(player1);
  game.addPlayer(player2);

  giveWillpower(socket, {amount: 1, player: player1.id});

  t.is(player1.stats.willpower, 11);
  t.is(player2.stats.willpower, 10);
});

test('does nothing if you are not the game owner', t => {
  const {game} = setup(true, true);
  const mySocket = new MockSocket();
  const player = new Player(mySocket);
  const player1 = new Player(new MockSocket());

  game.addPlayer(player1);

  mySocket.player = player;
  mySocket.game = game;

  giveWillpower(mySocket, {amount: 1});

  t.is(player1.stats.willpower, 10);
});
