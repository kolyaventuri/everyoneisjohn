// @flow

export type RoomsType = {|
  game: ?string,
  private: ?string,
  gm: ?string
|};

export type Rooms = 'game' | 'private' | 'gm';
