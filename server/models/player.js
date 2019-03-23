// @flow

import uuid from 'uuid/v1';
import Chance from 'chance';

import {gameRepository, playerRepository} from '../repositories';
import Game from './game';
import Stats from './stats';

const chance = new Chance();

type Socket = {[string]: any};

type IdType = string | null;

type StaticsType = {
  socket: Socket,
  id: string,
  active: boolean,
  disconnectTimer: ?TimeoutID
};

export default class Player {
  __STATICS__: StaticsType;

  name: string;

  __game: string;

  stats: Stats;

  constructor(socket: Socket, id: IdType = null) {
    id = id || uuid();
    socket.playerId = socket.playerId || id;

    this.__STATICS__ = {
      socket,
      id,
      active: true,
      disconnectTimer: null
    };

    this.name = chance.name({middle: true, prefix: true});

    this.stats = new Stats();

    playerRepository.insert(this);
  }

  deactivate() {
    this.__STATICS__.active = false;
  }

  joinGame(id: string) {
    const game = gameRepository.find(id);

    if (game) {
      game.addPlayer(this);
    }
  }

  leaveGame() {
    if (this.game) {
      this.game.removePlayer(this);
    }

    this.__game = '';
  }

  setGame({id}: Game) {
    this.__game = id;
  }

  disconnect() {
    this.deactivate();

    this.__STATICS__.disconnectTimer = setTimeout(() => {
      this.leaveGame();
      this.destroy();
    }, 60 * 1000);
  }

  reconnect() {
    this.__STATICS__.active = true;

    clearTimeout(this.__STATICS__.disconnectTimer);
  }

  destroy() {
    playerRepository.destroy(this);
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

  get game(): Game {
    return gameRepository.find(this.__game);
  }
}
