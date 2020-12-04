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
      return b.amount - a.amount;
    });
    const winningAmount = bids[0].amount;

    const rolloffBids = bids.filter(bid => bid.amount === winningAmount);
    const winnerIndex = Math.floor(Math.random() * rolloffBids.length);
    const {player: winner, amount} = rolloffBids[winnerIndex];

    this.__STATICS__.game.endAuction(winner, amount);
  }
}
