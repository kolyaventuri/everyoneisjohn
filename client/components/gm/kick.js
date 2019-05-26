// @flow

import React from 'react';

import Reject from '../reject';
import socket from '../../socket';

type Props = {|
  player: string,
  className?: string
|};

const kickPlayer = (player: string) => socket.emit('kickPlayer', {player});

const Kick = ({player, className}: Props) => (
  <span className={className}>
    <Reject onClick={() => kickPlayer(player)}/>
  </span>
);

Kick.defaultProps = {
  className: ''
};

export default Kick;
