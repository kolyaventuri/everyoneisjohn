// @flow

export type GameStateType = {
  gameId: string,
  isGm: boolean
};

export type PlayerStateType = {
  name: string,
  id: string
};

export type ActionType = {
  type: string,
  payload: {[string]: any}
};
