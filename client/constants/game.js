// @flow

import keyMirror from 'keymirror';

export const modes = keyMirror({
  SETUP: null,
  VOTING: null,
  PLAYING: null
});

export type ModeType = modes.SETUP | modes.VOTING | modes.PLAYING;
