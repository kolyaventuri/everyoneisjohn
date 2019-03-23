import test from 'ava';

import {MockSocket} from '../../mocks/socket';
import Player from '../../../../server/models/player';
import setup from '../../stubs/create-socket';
import startBidding from '../../../../server/socket/actions/start-bidding';
import * as GameModes from '../../../../server/lib/game-mode';

test('emits a startBidding event if the player is the owner', t => {
  const {socket, game} = setup(true, true);

  startBidding(socket);

  t.true(game.emit.calledWith({
    channel: 'all',
    event: 'startBidding'
  }));
});

test('puts the game in VOTING mode', t => {
  const {socket, game} = setup(true, true);
  startBidding(socket);

  t.is(game.mode, GameModes.VOTING);
});

test('does NOT emit a startBidding event if the player is not the owner of a game', t => {
  const {game} = setup(true, true);
  const mySocket = new MockSocket();
  const player = new Player(mySocket);

  mySocket.player = player;
  mySocket.game = game;

  startBidding(mySocket);
  t.false(game.emit.called);
});
