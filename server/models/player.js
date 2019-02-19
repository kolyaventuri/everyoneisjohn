// @flow

import uuid from 'uuid/v1';
import Chance from 'chance';

const chance = new Chance();

type Socket = {[string]: any};

type IdType = string | null;

type StaticsType = {
  socket: Socket,
  id: string,
  active: boolean
};

export default class Player {
  __STATICS__: StaticsType;

  name: string;

  constructor(socket: Socket, id: IdType = null) {
    this.__STATICS__ = {
      socket,
      id: id || uuid(),
      active: true
    };

    this.name = chance.name({middle: true, prefix: true});
  }

  deactivate() {
    this.__STATICS__.active = false;
  }

  get id(): string {
    return this.__STATICS__.id;
  }

  get active(): boolean {
    return this.__STATICS__.active;
  }

  get socket(): Socket {
    return this.__STATICS__.socket;
  }
}
