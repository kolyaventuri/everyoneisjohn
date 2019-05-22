// @flow

import React from 'react';

import socket from '../../socket';

type Props = {|
  player: string
|};

const kickPlayer = (player: string) => socket.emit('kickPlayer', {player});

const Kick = ({player}: Props) => (
  <p
    data-type="button"
    onClick={() => kickPlayer(player)}
  >
    X
  </p>
);

export default Kick;
