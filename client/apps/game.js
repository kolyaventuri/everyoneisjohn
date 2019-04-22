// @flow

import type {
  GameStateType as GameType,
  PlayerStateType as PlayerType,
  GameModeType as ModeType
} from '../reducers/types';

export type GameStateType = {
  history: {[string]: any},
  game: GameType,
  player: PlayerType
};

export type PlayerStateType = PlayerType;

export type GameModeType = ModeType;
