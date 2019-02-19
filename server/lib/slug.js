// @flow

import Chance from 'chance';

const chance = new Chance();

export default class Slug {
  static random(): string {
    const prefix = chance.prefix({full: true});
    const animal = chance.animal();
    const country = chance.country({full: true}).replace(/ /g, '');

    return `${prefix}${animal}Of${country}`;
  }
}
