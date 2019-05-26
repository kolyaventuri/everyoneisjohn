// @flow

import Chance from 'chance';

import {logInfo} from '../lib/logger';
import Slug from '../lib/slug';
import * as GameModes from '../lib/game-mode';
import {gameRepository, playerRepository} from '../repositories';
import Player from './player';
import Auction from './auction';

const chance = new Chance();

type GameMode = GameModes.GameMode;
type StaticsType = {
  id: string,
  slug: string,
  owner: string,
  prefix: string
};

type EmitPayload = string | {[string]: any} | Array<any>;

type EmitType = {
  channel: string,
  event: string,
  payload?: EmitPayload
};

const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

let socket = null;
if (process.env.NODE_ENV === 'test') {
  socket = require('../socket').default;
} else {
  setImmediate(() => {
    socket = require('../socket').default;
  });
}

export default class Game {
  __STATICS__: StaticsType;

  __players: Array<string>;

  __mode: GameMode;

  __auction: Auction | null;

  constructor(owner: Player, init: boolean = true) {
    const id = chance.string({length: 5, pool});
    const slug = Slug.random();
    const prefix = `game/${id}`;

    this.__STATICS__ = {
      id,
      slug,
      prefix,
      owner: owner.id
    };

    this.__players = [];
    this.__mode = GameModes.SETUP;
    this.__auction = null;

    gameRepository.insert(this);
    if (init) {
      this.gmInitGame();
    }

    logInfo(`Game ${id} created by player ${owner.id}`);
  }

  addPlayer(player: Player) {
    const {id} = player;
    const players = this.__players;

    if (!players.includes(id)) {
      players.push(id);
      logInfo(`Player ${player.id} added to Game ${this.id}`);
      player.setGame(this);
    }

    const {prefix} = this.__STATICS__;
    player.socket.join(`${prefix}/all`);
    player.socket.join(`${prefix}/player/${player.id}`);
    player.socket.emit('gameJoinSuccess', this.id);

    player.emitUpdate(false);
    this.gmEmitPlayers();
    this.emitGameMode(`player/${player.id}`);
  }

  gmInitGame() {
    logInfo(`Player ${this.owner.id} init as GM for game ${this.id}`);
    const {prefix} = this.__STATICS__;
    this.owner.setGame(this);

    this.owner.socket.join(`${prefix}/gm`);
    this.owner.socket.join(`${prefix}/all`);
    this.emitGameMode('gm');
    this.owner.socket.emit('startGame', this.id);
  }

  gmEmitPlayers() {
    this.emit({
      channel: 'gm',
      event: 'setPlayers',
      payload: this.players.map(p => p && p.serialize && p.serialize()).filter(p => p !== null)
    });
  }

  removePlayer(player: Player, silent: boolean = false) {
    const {id} = player;
    const players = this.__players;
    const index = players.indexOf(id);

    if (index > -1) {
      players.splice(index, 1);

      this.gmEmitPlayers();

      if (!silent) {
        player.socket.emit('gameKick');
      }
    }
  }

  addBid(player: Player, amount: number) {
    if (this.mode === GameModes.VOTING && this.__auction) {
      this.__auction.bid(player, amount);
    }
  }

  destroy() {
    logInfo(`Game ${this.id} is being destroyed!`);
    gameRepository.destroy(this);
  }

  emit({channel, event, payload}: EmitType) {
    const {prefix} = this.__STATICS__;
    channel = `${prefix}/${channel}`;

    if (socket) {
      socket.to(channel).emit(event, payload);
    }
  }

  endAuction(winner: Player, amount: number) {
    winner.stats.willpower -= amount;
    winner.stats.winner = true;

    this.mode = GameModes.PLAYING;
  }

  get id(): string {
    return this.__STATICS__.id;
  }

  get slug(): string {
    return this.__STATICS__.slug;
  }

  get owner(): Player {
    return playerRepository.find(this.__STATICS__.owner);
  }

  get players(): Array<Player> {
    return this.__players.map(playerId => playerRepository.find(playerId));
  }

  get mode(): GameMode {
    return this.__mode;
  }

  set mode(mode: GameMode) {
    const newMode = Object.values(GameModes).find(m => m === mode);

    if (!newMode || typeof newMode !== 'symbol') {
      return;
    }

    if (this.__mode === GameModes.SETUP && mode !== GameModes.SETUP) {
      for (const player of this.players) {
        player.stats.freeze();
      }
    }

    this.__mode = mode;

    if (mode === GameModes.VOTING) {
      for (const player of this.players) {
        if (player.stats.winner) {
          player.stats.winner = false;
        }
      }

      this.__auction = new Auction(this);
    } else {
      this.__auction = null;
    }

    this.emitGameMode();
  }

  emitGameMode(channel: string = 'all') {
    const payload = {
      channel,
      event: 'setGameMode',
      payload: this.mode.toString().toString().slice(7, -1)
    };

    this.emit(payload);
  }
}
