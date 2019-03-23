// @flow

const modes = {
  SETUP: Symbol('SETUP'),
  VOTING: Symbol('VOTING'),
  PLAYING: Symbol('PLAYING')
};

export type GameMode = typeof modes.SETUP;

export const {SETUP} = modes;
export const {VOTING} = modes;
export const {PLAYING} = modes;
