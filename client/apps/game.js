// @flow

import type {
  GameStateType as GameType,
  PlayerStateType as PlayerType
} from '../reducers/types';

export type GameStateType = {
  history: {[string]: any},
  game: GameType
};

export type PlayerStateType = PlayerType;
