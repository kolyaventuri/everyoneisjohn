// @flow

import Chance from 'chance';

import Slug from '../lib/slug';

const chance = new Chance();

type StaticsType = {
  id: string,
  slug: string
};

const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export default class Game {
  __STATICS__: StaticsType;

  constructor() {
    const id = chance.string({length: 5, pool});
    const slug = Slug.random();

    this.__STATICS__ = {
      id,
      slug
    };
  }

  get id(): string {
    return this.__STATICS__.id;
  }

  get slug(): string {
    return this.__STATICS__.slug;
  }
}
