// @flow

import Chance from 'chance';

import Slug from '../lib/slug';
import {gameRepository, playerRepository} from '../repositories';
import Player from './player';

const chance = new Chance();

type StaticsType = {
  id: string,
  slug: string,
  owner: Player
};

const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export default class Game {
  __STATICS__: StaticsType;

  __players: Array<string>;

  constructor(owner: Player) {
    const id = chance.string({length: 5, pool});
    const slug = Slug.random();

    this.__STATICS__ = {
      id,
      slug,
      owner
    };

    this.__players = [];

    gameRepository.insert(this);
  }

  addPlayer({id}: Player) {
    const players = this.__players;

    if (players.includes(id)) {
      return;
    }

    players.push(id);
  }

  removePlayer({id}: Player) {
    const players = this.__players;
    const index = players.indexOf(id);

    if (index > -1) {
      players.splice(index, 1);
    }
  }

  get id(): string {
    return this.__STATICS__.id;
  }

  get slug(): string {
    return this.__STATICS__.slug;
  }

  get owner(): Player {
    return this.__STATICS__.owner;
  }

  get players(): Array<Player> {
    return this.__players.map(playerId => playerRepository.find(playerId));
  }
}
