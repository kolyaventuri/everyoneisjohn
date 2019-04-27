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
  name: string,
  disconnectTimer: ?TimeoutID
};

export default class Player {
  __STATICS__: StaticsType;

  name: string;

  __game: string;

  stats: Stats;

  destroyGame: () => void;

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
    this.destroyGame = this.destroyGame.bind(this);
  }

  deactivate() {
    this.__STATICS__.active = false;
  }

  joinGame(id: string) {
    const game = gameRepository.find(id);

    if (game) {
      return game.addPlayer(this);
    }

    this.socket.emit('gameError', 'error.game.doesnt_exist');
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
      this.destroyGame();
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

  destroyGame() {
    if (this.game && this.game.owner === this) {
      this.game.destroy();
    }
  }

  serialize() {
    const {
      willpower,
      points,
      skills,
      goal,
      goalLevel,
      frozen,
      winner
    } = this.stats;
    const {id, name} = this;
    const payload = {
      id,
      name,
      willpower,
      points,
      skills,
      goal,
      goalLevel,
      frozen,
      winner
    };

    return payload;
  }

  emitUpdate(emitToGm: boolean = true) {
    const payload = this.serialize();
    const event = 'updatePlayer';

    this.socket.emit(event, payload);

    if (this.game && emitToGm) {
      this.game.emit({
        channel: 'gm',
        event,
        payload
      });
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
      this.emitUpdate();
    }

    return this.__STATICS__.name;
  }
}
