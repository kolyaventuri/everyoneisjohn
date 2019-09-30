// @flow

import uuid from 'uuid/v1';
import Chance from 'chance';
import {diff, updatedDiff} from 'deep-object-diff';

import {logInfo, logError} from '../lib/logger';
import type {RoomsType, Room} from '../constants/types';
import {
  rooms,
  POLL_INTERVAL,
  MAX_POLL_COUNT
} from '../constants';
import {gameRepository, playerRepository} from '../repositories';
import {emit} from '../socket/emitter';
import poller from '../util/poller';
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
  rooms: RoomsType,
  ready: boolean
};

type EmitType = {event: string, payload?: any};

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
      rooms: {},
      ready: false
    };

    this.assignRoom(rooms.PRIVATE, `player/${this.id}`);

    this.resetStats();

    playerRepository.insert(this);
    this.destroyGame = this.destroyGame.bind(this);

    logInfo(`Player ${name} (${id}) created`);

    this.__STATICS__.ready = true;
  }

  deactivate() {
    this.__STATICS__.active = false;
  }

  joinGame(id: string) {
    const game = gameRepository.find(id);

    if (game) {
      return game.addPlayer(this);
    }

    this.emitToMe({
      event: 'gameError',
      payload: 'error.game.doesntExist'
    });
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

  assignRoom(type: Room, name: string, callback: ?(err: ?Error) => void) {
    this.__STATICS__.socket.join(name, err => {
      if (typeof callback === 'function') {
        callback(err);
      }
    });
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
    let rejoinedRoomCount = 0;

    this.waitForSocketConnection().then(() => {
      logInfo(`Socket ready for player ${this.id}`);
      for (const name of names) {
        this.assignRoom(name, rooms[name], err => {
          if (err) {
            logError(`Player ${this.id} encountered the following error while joining ${name} (${rooms[name]})`);
            logError(err);
          } else {
            logInfo(`Player ${this.id} rejoined ${name} (${rooms[name]})`);
          }

          rejoinedRoomCount += 1;

          if (rejoinedRoomCount === names.length) {
            this.waitForRooms();
          }
        });
      }
    }).catch(() => {
      logError(`Socket not ready in time for player ${this.id}`);
      this.emitTimeout();
    });
  }

  waitForSocketConnection() {
    return new Promise((resolve, reject) => {
      let pollCount = 0;

      const fn = () => {
        if (pollCount === MAX_POLL_COUNT) {
          return reject();
        }

        const {
          connected
        } = this.__STATICS__.socket;

        if (connected) {
          return resolve(true);
        }

        pollCount += 1;
        setTimeout(fn, POLL_INTERVAL);
      };

      fn();
    });
  }

  waitForRooms() {
    const expectedRooms = Object.values(this.rooms);

    let pollCount = 0;
    const fn = () => {
      if (pollCount === MAX_POLL_COUNT) {
        logError(`Player ${this.id} did not join rooms in time.`);
        this.emitTimeout();
      }

      const inRooms = this.__STATICS__.socket.rooms;
      let totalInRooms = 0;
      for (const room of expectedRooms) {
        if (inRooms[room]) {
          totalInRooms += 1;
        }
      }

      if (totalInRooms === expectedRooms.length) {
        this.__STATICS__.ready = true;
        return;
      }

      pollCount += 1;
      setTimeout(fn, POLL_INTERVAL);
    };

    fn();
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
    logInfo(`Player ${this.id} reconnecting.`);
    this.__STATICS__.ready = false;
    this.__STATICS__.active = true;
    this.__STATICS__.lastSerialized = {};

    clearTimeout(this.__STATICS__.disconnectTimer);
    this.rejoinRooms();
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

    const payload = {
      id,
      name,
      willpower,
      points,
      goal,
      goalLevel,
      frozen,
      winner,
      skills
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

  emitSkills(emitToMe?: boolean = true) {
    const {skills} = this.stats;

    if (emitToMe) {
      this.emitToMe({
        event: 'setSkills',
        payload: {
          skills
        }
      });
    }

    if (this.game) {
      this.game.emitToGm({
        event: 'updatePlayer',
        payload: {
          id: this.id,
          skills
        }
      });
    }
  }

  emitToMe({event, payload}: EmitType) {
    const channel = this.rooms.private;

    const emitFn = () => emit({channel, event, payload});

    if (this.ready) {
      emitFn();
    }

    poller(() => this.ready)
      .then(emitFn)
      .catch(() => {
        logError(`Player ${this.id} not ready in time.`);
        this.emitTimeout();
      });
  }

  hardEmit({event, payload}: EmitType) {
    this.__STATICS__.socket.emit(event, payload);
  }

  emitGameJoinSuccess(id: string) {
    poller(() => this.ready)
      .then(() => {
        logInfo(`Player ${this.id} successfully joined game ${id}`);
        this.emitToMe({
          event: 'gameJoinSuccess',
          payload: id
        });
      })
      .catch(() => {
        logError(`Player ${this.id} not ready in time.`);
        this.emitTimeout();
      });
  }

  emitTimeout() {
    this.hardEmit({
      event: 'gameError',
      payload: 'error.app.timeout'
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

  get ready(): boolean {
    return this.__STATICS__.ready;
  }
}
