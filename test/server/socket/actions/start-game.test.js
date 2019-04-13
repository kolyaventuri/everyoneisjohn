import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import {MockSocket} from '../../mocks/socket';
import Player from '../../../../server/models/player';
import setup from '../../stubs/create-socket';

const startBidding = stub();

const startGame = proxyquire('../../../../server/socket/actions/start-game', {
  './start-bidding': {default: startBidding}
}).default;

test('freezes all players stats', t => {
  const {socket, game} = setup(true, true);
  const players = new Array(3).fill(0).map(() => new Player(new MockSocket()));

  for (const p of players) {
    p.stats.freeze = stub();
    game.addPlayer(p);
  }

  startGame(socket);

  t.true(players[0].stats.freeze.called);
  t.true(players[1].stats.freeze.called);
  t.true(players[2].stats.freeze.called);
});

test('invokes startBidding method', t => {
  const {socket} = setup(true, true);

  startGame(socket);

  t.true(startBidding.called);
});
