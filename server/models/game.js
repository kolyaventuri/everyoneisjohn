// @flow

import Chance from 'chance';

import Slug from '../lib/slug';
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

  __players: Array<Player>;

  constructor(owner: Player) {
    const id = chance.string({length: 5, pool});
    const slug = Slug.random();

    this.__STATICS__ = {
      id,
      slug,
      owner
    };

    this.__players = [];
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
    return this.__players;
  }
}
