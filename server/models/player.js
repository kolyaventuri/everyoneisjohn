// @flow

import uuid from 'uuid/v1';
import Chance from 'chance';
import {diff, updatedDiff} from 'deep-object-diff';

import {logInfo} from '../lib/logger';
import type {RoomsType, Room} from '../constants/types';
import {rooms} from '../constants';
import {gameRepository, playerRepository} from '../repositories';
import {emit} from '../socket/emitter';
import Game from './game';
import Stats from './stats';

const chance = new Chance();

type Socket = {
  [string]: any
};

type IdType = string | null;

type StaticsType = {
  socket: Socket,
  id: string,
  active: boolean,
  name: string,
  disconnectTimer: ?TimeoutID,
  lastSerialized: {[string]: any},
  rooms: RoomsType
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
      lastSerialized: {},
      rooms: {}
    };

    this.assignRoom(rooms.PRIVATE, `player/${this.id}`);

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

    this.emitToMe('gameError', 'error.game.doesntExist');
  }

  leaveGame({silent}: {silent: boolean} = {silent: false}) {
    if (this.game) {
      this.game.removePlayer(this, silent);
    }

    this.clearRooms();

    this.__game = '';
  }

  setGame({id}: Game) {
    const {game} = this;

    this.__STATICS__.lastSerialized = {};

    if (game) {
      this.leaveGame({silent: true});
      this.resetStats();
    }

    this.__game = id;
  }

  assignRoom(type: Room, name: string) {
    this.__STATICS__.socket.join(name);
    this.__STATICS__.rooms[type] = name;
  }

  clearRooms() {
    const types = Object.values(rooms);

    const privateRoom = this.rooms[rooms.PRIVATE];

    for (const type of types) {
      if (type === rooms.PRIVATE) {
        continue;
      }

      this.__STATICS__.socket.leave(this.rooms[type]);
    }

    this.__STATICS__.rooms = {[rooms.PRIVATE]: privateRoom};
  }

  rejoinRooms() {
    const rooms = {...this.rooms};
    const names = Object.keys(rooms);

    for (const name of names) {
      this.assignRoom(name, rooms[name]);
    }
  }

  get rooms(): RoomsType {
    return this.__STATICS__.rooms;
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
    this.rejoinRooms();
    this.emitGameJoinSuccess(this.game.id);
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
      skills,
      goalLevel,
      frozen,
      winner
    } = this.stats;
    const {id, name} = this;
    const [skill1, skill2, skill3] = skills;

    const payload = {
      id,
      name,
      willpower,
      points,
      goal,
      goalLevel,
      frozen,
      winner,
      skill1,
      skill2,
      skill3
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
      this.emitToMe({event, payload});
    }

    if (this.game && emitToGm) {
      this.game.emitToGm({
        event,
        payload
      });
    }
  }

  emitSkill(index: number) {
    const skill = this.stats.skills[index];

    this.emitToMe({
      event: 'setSkill',
      payload: {
        index,
        skill
      }
    });

    if (this.game) {
      this.game.emitToGm({
        event: 'updatePlayer',
        payload: {
          id: this.id,
          [`skill${index + 1}`]: skill
        }
      });
    }
  }

  emitToMe({event, payload}: {event: string, payload?: any}) {
    const channel = this.rooms.private;

    emit({channel, event, payload});
  }

  emitGameJoinSuccess(id: string) {
    this.emitToMe({
      event: 'gameJoinSuccess',
      payload: id
    });
  }

  get id(): string {
    return this.__STATICS__.id;
  }

  get active(): boolean {
    return this.__STATICS__.active;
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
