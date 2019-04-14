// @flow

import uuid from 'uuid/v1';
import Chance from 'chance';

import {gameRepository, playerRepository} from '../repositories';
import Game from './game';
import Stats from './stats';
import type {StatsUpdateType} from './stats';

const chance = new Chance();

type Socket = {[string]: any};

type IdType = string | null;

type StaticsType = {
  socket: Socket,
  id: string,
  active: boolean,
  name: string,
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

    const name = chance.name({middle: true, prefix: true});

    this.__STATICS__ = {
      socket,
      id,
      active: true,
      disconnectTimer: null,
      name
    };

    this.stats = new Stats(this);

    playerRepository.insert(this);
  }

  deactivate() {
    this.__STATICS__.active = false;
  }

  joinGame(id: string) {
    const game = gameRepository.find(id);

    if (game) {
      return game.addPlayer(this);
    }

    this.socket.emit('game.error', 'error.game.doesnt_exist');
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

  handleUpdateStats(stats: StatsUpdateType) {
    this.socket.emit('updateStats', stats);
    if (this.game && this.game.owner) {
      this.game.owner.socket.emit('updateStats', {player: this.id, ...stats});
    }
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

  get name(): string {
    return this.__STATICS__.name;
  }

  set name(newName: string): string {
    this.__STATICS__.name = newName;

    if (this.game) {
      this.game.owner.socket.emit('playerUpdated', {
        id: this.id,
        name: newName
      });
    }

    return this.__STATICS__.name;
  }
}
