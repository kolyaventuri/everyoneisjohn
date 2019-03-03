// @flow

import Player from '../models/player';

const events = [
  {
    name: 'initPlayer',
    handler: socket => {
      const player = new Player(socket);
      socket.emit('setPlayerId', player.id);
    }
  }
];

export default events;
