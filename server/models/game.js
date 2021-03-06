// @flow

import Chance from 'chance';

import {logInfo, logError} from '../lib/logger';
import Slug from '../lib/slug';
import * as GameModes from '../lib/game-mode';
import {gameRepository, playerRepository} from '../repositories';
import {rooms} from '../constants';
import type {RoomsType, Rooms} from '../constants/types';
import {emit} from '../socket/emitter';
import Player from './player';
import Auction from './auction';
import Chat from './chat';

const chance = new Chance();

type GameMode = GameModes.GameMode;
type StaticsType = {
  id: string,
  slug: string,
  owner: string,
  prefix: string,
  rooms: RoomsType
};
type EmitPayload = {|
  event: string,
  payload?: any
|};

const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const orEquals = (original, ...variants) => variants.indexOf(original) > -1;

export default class Game {
  __STATICS__: StaticsType;

  __players: Array<string>;

  __mode: GameMode;

  __auction: Auction | null;

  _chats: {[string]: Chat};

  constructor(owner: Player, init: boolean = true) {
    const id = chance.string({length: 5, pool});
    const slug = Slug.random();
    const prefix = `game/${id}`;

    this.__STATICS__ = {
      id,
      slug,
      prefix,
      rooms: {
        [rooms.GAME]: `${prefix}/all`
      },
      owner: owner.id
    };

    this.__players = [];
    this.__mode = GameModes.SETUP;
    this.__auction = null;
    this._chats = {};

    gameRepository.insert(this);
    if (init) {
      this.gmInitGame();
    }

    logInfo(`Game ${id} created by player ${owner.id}`);
  }

  async addPlayer(player: Player) {
    const {id} = player;
    const players = this.__players;

    if (!players.includes(id)) {
      players.push(id);
      logInfo(`Player ${player.id} added to Game ${this.id}`);
      player.setGame(this);
    }

    const {prefix} = this.__STATICS__;
    player.assignRoom(rooms.GAME, `${prefix}/all`);

    try {
      await player.emitGameJoinSuccess(this.id);
      player.emitUpdate(false);
      this.gmEmitPlayers();
      this.emitGameMode(`player/${player.id}`);
    } catch (error) {
      logError(error);
    }
  }

  gmInitGame() {
    logInfo(`Player ${this.owner.id} init as GM for game ${this.id}`);
    const {prefix} = this.__STATICS__;
    this.owner.setGame(this);

    this.owner.assignRoom(rooms.GM, `${prefix}/gm`);
    this.owner.assignRoom(rooms.GAME, `${prefix}/all`);

    this.emitGameMode(rooms.GM);
    this.emitToGm({
      event: 'startGame',
      payload: this.id
    });
  }

  gmEmitPlayers() {
    this.emitToGm({
      event: 'setPlayers',
      payload: this.players
        .map(p => p && p.serialize && p.serialize())
        .filter(p => p !== null)
    });
  }

  emitToGm({event, payload}: EmitPayload) {
    this.owner.emitToMe({event, payload});
  }

  emitToAll({event, payload}: EmitPayload) {
    emit({
      channel: this.owner.rooms.game,
      event,
      payload
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
        emit({
          channel: player.rooms.private,
          event: 'gameKick'
        });
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

  endAuction(winner: Player, amount: number) {
    winner.stats.willpower -= amount;
    winner.stats.winner = true;

    this.mode = GameModes.PLAYING;
  }

  createChat(player1: Player, player2: Player): Chat {
    const chatId = this.getChatId(player1, player2);
    const chat = chatId ? this._chats[chatId] : new Chat(player1, player2);

    if (!chatId) {
      this._chats[chat.id] = chat;
    }

    return chat;
  }

  getChatId(player1: Player, player2: Player): ?String {
    const keys = Object.keys(this._chats);

    const chatId = keys.find(key => {
      const chat = this._chats[key];

      return (
        orEquals(chat.player1.id, player1.id, player2.id) ||
        orEquals(chat.player2.id, player1.id, player2.id)
      );
    });

    return chatId || null;
  }

  getChat(player1: Player, player2: Player): ?Chat {
    const chatId = this.getChatId(player1, player2);

    return chatId ? this._chats[chatId] : null;
  }

  get chats(): {[string]: Chat} {
    return this._chats;
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

  emitGameMode(channel: ?Rooms) {
    const payload = {
      channel: this.__STATICS__.rooms[rooms.ALL],
      event: 'setGameMode',
      payload: this.mode
        .toString()
        .toString()
        .slice(7, -1)
    };
    let emitFn = emit;

    if (channel === rooms.GM) {
      emitFn = this.emitToGm.bind(this);
      delete payload.channel;
    }

    emitFn(payload);
  }
}
