import test from 'ava';

import Auction from '../../../server/models/auction';
import Player from '../../../server/models/player';

const genAuction = () => {
  const players = new Array(3).fill(0).map(_ => new Player());
  const auction = new Auction(players);

  return {players, auction};
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
  const {players, auction} = genAuction();

  auction.bid(players[0], 2);
  auction.bid(players[1], 3);

  t.is(auction.winner, null);

  auction.bid(players[2], 1);

  t.is(auction.winner, players[1]);
});
