// @flow

import uuid from 'uuid/v1';
import Chance from 'chance';
import {diff, updatedDiff} from 'deep-object-diff';

import {logInfo} from '../lib/logger';
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
  disconnectTimer: ?TimeoutID,
  lastSerialized: {[string]: any}
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
      name,
      lastSerialized: {}
    };

    this.resetStats();

    playerRepository.insert(this);
    this.destroyGame = this.destroyGame.bind(this);

    logInfo(`Player ${name} (${id}) created`);
  }

  deactivate() {
    this.__STATICS__.active = false;
  }

  joinGame(id: string) {
    const game = gameRepository.find(id);

    if (game) {
      return game.addPlayer(this);
    }

    this.socket.emit('gameError', 'error.game.doesntExist');
  }

  leaveGame() {
    if (this.game) {
      this.game.removePlayer(this);
    }

    this.__game = '';
  }

  setGame({id}: Game) {
    const {game} = this;

    this.__STATICS__.lastSerialized = {};

    if (game) {
      this.leaveGame();
      this.resetStats();
    }

    this.__game = id;
  }

  resetStats() {
    this.stats = new Stats(this);
  }

  disconnect() {
    logInfo(`Player ${this.id} disconnected.`);
    this.deactivate();

    this.__STATICS__.disconnectTimer = setTimeout(() => {
      this.destroyGame();
      this.leaveGame();
      this.destroy();
    }, 60 * 1000);
  }

  reconnect() {
    this.__STATICS__.active = true;
    this.__STATICS__.lastSerialized = {};

    clearTimeout(this.__STATICS__.disconnectTimer);
  }

  destroy() {
    logInfo(`Player ${this.id} is being destroyed!`);
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
      goal,
      goalLevel,
      skills,
      frozen,
      winner
    } = this.stats;
    const {id, name} = this;
    const payload = {
      id,
      name,
      willpower,
      points,
      goal,
      goalLevel,
      skills,
      frozen,
      winner
    };

    return payload;
  }

  emitUpdate(emitToGm: boolean = true, emitToPlayer: boolean = true) {
    const {lastSerialized} = this.__STATICS__;
    const serialized = this.serialize();
    const currentDiff = diff(lastSerialized, serialized);

    if (Object.values(currentDiff).length === 0) {
      return;
    }

    const updated = updatedDiff(lastSerialized, serialized);
    this.__STATICS__.lastSerialized = serialized;

    const payload = Object.values(updated).length === 0 ? serialized : updated;

    payload.id = this.id;

    const event = 'updatePlayer';
    if (emitToPlayer) {
      this.socket.emit(event, payload);
    }

    if (this.game && emitToGm) {
      this.game.emit({
        channel: 'gm',
        event,
        payload
      });
    }
  }

  emitDelete({type, index}: {type: string, index?: number}) {
    this.socket.emit('deleteItem', {
      type,
      index
    });
  }

  emitSkill(index: number) {
    const skill = this.stats.skills[index];

    this.socket.emit('setSkill', {
      index,
      skill
    });
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
