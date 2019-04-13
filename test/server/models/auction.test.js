import test from 'ava';
import {stub} from 'sinon';

import {MockSocket} from '../mocks/socket';
import Auction from '../../../server/models/auction';
import Player from '../../../server/models/player';
import Game from '../../../server/models/game';

const genAuction = () => {
  const players = new Array(3).fill(0).map(_ => new Player(new MockSocket()));

  const game = new Game(new Player(new MockSocket()));

  for (const p of players) {
    game.addPlayer(p);
  }

  const auction = new Auction(game);

  return {game, players, auction};
};

test('allows each player to bid', t => {
  const {players, auction} = genAuction();

  auction.bid(players[0], 2);
  auction.bid(players[1], 3);

  const expected = [
    {player: players[0], amount: 2},
    {player: players[1], amount: 3}
  ];

  t.deepEqual(auction.bids, expected);
});

test('determines winner after all bids placed', t => {
  const {game, players, auction} = genAuction();
  game.endAuction = stub();

  auction.bid(players[0], 2);
  auction.bid(players[1], 3);
  auction.bid(players[2], 1);

  t.true(game.endAuction.calledWith(players[1], 3));
});
