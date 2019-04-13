// @flow

export type GameStateType = {
  history: {[string]: any},
  game: {
    gameId: string,
    isGm: boolean
  }
};
