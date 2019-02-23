// @flow

import Chance from 'chance';

import Slug from '../lib/slug';
import * as GameModes from '../lib/game-mode';
import {gameRepository, playerRepository} from '../repositories';
import Player from './player';
import Auction from './auction';

const chance = new Chance();

type GameMode = GameModes.GameMode;
type StaticsType = {
  id: string,
  slug: string,
  owner: string
};

const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export default class Game {
  __STATICS__: StaticsType;

  __players: Array<string>;

  __mode: GameMode;

  __auction: Auction | null;

  constructor(owner: Player) {
    const id = chance.string({length: 5, pool});
    const slug = Slug.random();

    this.__STATICS__ = {
      id,
      slug,
      owner: owner.id
    };

    this.__players = [];
    this.__mode = GameModes.SETUP;
    this.__auction = null;

    gameRepository.insert(this);
  }

  addPlayer(player: Player) {
    const {id} = player;
    const players = this.__players;

    if (players.includes(id)) {
      return;
    }

    players.push(id);
    player.setGame(this);
  }

  removePlayer({id}: Player) {
    const players = this.__players;
    const index = players.indexOf(id);

    if (index > -1) {
      players.splice(index, 1);
    }
  }

  addBid(player: Player, amount: number) {
    if (this.mode === GameModes.VOTING && this.__auction) {
      this.__auction.bid(player, amount);
    }
  }

  destroy() {
    gameRepository.destroy(this);
  }

  get id(): string {
    return this.__STATICS__.id;
  }

  get slug(): string {
    return this.__STATICS__.slug;
  }

  get owner(): Player {
    return playerRepository.find(this.__STATICS__.owner);
  }

  get players(): Array<Player> {
    return this.__players.map(playerId => playerRepository.find(playerId));
  }

  get mode(): GameMode {
    return this.__mode;
  }

  set mode(mode: GameMode) {
    const newMode = Object.values(GameModes).find(m => m === mode);

    if (!newMode || typeof newMode !== 'symbol') {
      return;
    }

    this.__mode = mode;

    if (mode === GameModes.VOTING) {
      this.__auction = new Auction(this.players);
    } else {
      this.__auction = null;
    }
  }
}
