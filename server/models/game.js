// @flow

import Chance from 'chance';

import Slug from '../lib/slug';
import * as GameModes from '../lib/game-mode';
import {gameRepository, playerRepository} from '../repositories';
import socket from '../socket';
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

type EmitType = {
  channel: string,
  event: string,
  payload?: string
};

const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export default class Game {
  __STATICS__: StaticsType;

  __players: Array<string>;

  __mode: GameMode;

  __auction: Auction | null;

  constructor(owner: Player) {
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

    owner.socket.join(`${prefix}/gm`);
    owner.socket.join(`${prefix}/all`);
  }

  addPlayer(player: Player) {
    const {id} = player;
    const players = this.__players;

    if (players.includes(id)) {
      return;
    }

    players.push(id);
    player.setGame(this);

    const {prefix} = this.__STATICS__;
    player.socket.join(`${prefix}/all`);
    player.socket.join(`${prefix}/player/${player.id}`);
  }

  removePlayer({id}: Player) {
    const players = this.__players;
    const index = players.indexOf(id);

    if (index > -1) {
      players.splice(index, 1);
    }
  }

  addBid(player: Player, amount: number) {
    if (this.mode === GameModes.VOTING && this.__auction) {
      this.__auction.bid(player, amount);
    }
  }

  destroy() {
    gameRepository.destroy(this);
  }

  emit({channel, event, payload}: EmitType) {
    const {prefix} = this.__STATICS__;
    channel = `${prefix}/${channel}`;

    socket.to(channel).emit(event, payload);
  }

  endAuction(winner: Player, amount: number) {
    winner.stats.willpower -= amount;

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
      this.__auction = new Auction(this);
    } else {
      this.__auction = null;
    }

    const payload = {
      channel: 'all',
      event: 'game.mode',
      payload: this.mode.toString().toString().slice(7, -1)
    };

    this.emit(payload);
  }
}
