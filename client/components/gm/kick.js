// @flow

import React from 'react';

import Reject from '../reject';
import socket from '../../socket';

type Props = {|
  player: string
|};

const kickPlayer = (player: string) => socket.emit('kickPlayer', {player});

const Kick = ({player}: Props) => <Reject onClick={() => kickPlayer(player)}/>;

export default Kick;
