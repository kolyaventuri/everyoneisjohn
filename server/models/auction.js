// @flow

import Player from './player';

type BidType = {|
  player: Player,
  amount: number
|};

type StaticsType = {|
  playerCount: number
|};

export default class Auction {
  __STATICS__: StaticsType;

  bids: Array<BidType>;

  winner: Player | null;

  constructor(players: Array<Player>) {
    this.bids = [];
    this.__STATICS__ = {
      playerCount: players.length
    };
    this.winner = null;
  }

  bid(player: Player, amount: number) {
    this.bids.push({player, amount});

    if (this.bids.length === this.__STATICS__.playerCount) {
      this.determineWinner();
    }
  }

  determineWinner = () => {
    const bids = this.bids.sort((a, b) => {
      if (a.amount < b.amount) {
        return 1;
      }

      if (a.amount > b.amount) {
        return -1;
      }

      return 0;
    });

    this.winner = bids[0].player;
  }
}
