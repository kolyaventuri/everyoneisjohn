// @flow

import Player from './player';
import Game from './game';

type BidType = {|
  player: Player,
  amount: number
|};

type StaticsType = {|
  playerCount: number,
  game: Game
|};

export default class Auction {
  __STATICS__: StaticsType;

  bids: Array<BidType>;

  constructor(game: Game) {
    const {players} = game;

    this.bids = [];
    this.__STATICS__ = {
      playerCount: players.length,
      game
    };
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

    const {player: winner, amount} = bids[0];

    this.__STATICS__.game.endAuction(winner, amount);
  }
}
