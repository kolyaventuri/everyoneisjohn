// @flow

export type GameStateType = {
  gameId: string,
  isGm: boolean
};

export type PlayerStateType = {
  name: string,
  id: string,
  willpower: number,
  points: number,
  skills: Array<string>,
  goal: string,
  goalLevel: number,
  frozen: boolean
};

export type ActionType = {
  type: string,
  payload: {[string]: any}
};
