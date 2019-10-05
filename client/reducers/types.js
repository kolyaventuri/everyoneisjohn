// @flow

export type ConnectionStatus = 'connecting' | 'connected' | 'failing' | 'failed';

export type PlayerStateType = {
  name: string,
  id: string,
  willpower: number,
  points: number,
  skills: Array<string>,
  goal: string,
  goalLevel: number,
  frozen: boolean,
  hasAcceptedThirdSkill: boolean
};

export type GameModeType = 'SETUP' | 'VOTING' | 'PLAYING';

export type GameStateType = {
  gameId: string,
  isGm: boolean,
  players: Array<PlayerStateType>,
  mode: GameModeType
};

export type ActionType = {
  type: string,
  payload: {[string]: any}
};

export type ErrorType = {
  error: string,
  type: string
};

export type AppStateType = {
  error: ErrorType | null,
  sound: boolean,
  connection: {
    status: ConnectionStatus
  }
};

export type ApplicationStateType = {
  game: GameStateType,
  player: PlayerStateType,
  app: AppStateType
};
