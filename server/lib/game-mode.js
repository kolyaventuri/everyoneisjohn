// @flow

const modes = {
  SETUP: Symbol('SETUP'),
  VOTING: Symbol('VOTING')
};

export type GameMode = typeof modes.SETUP;

export const {SETUP} = modes;
export const {VOTING} = modes;
