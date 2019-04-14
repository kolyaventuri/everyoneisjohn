// @flow

import io from 'socket.io-client';
import {store} from '../store';

const {protocol, hostname} = window.location;

const port = process.env.SOCKET_PORT || 8031;
const url = `${protocol}//${hostname}:${port}`;

const socket = io.connect(url);
socket.on('connect', () => socket.emit('initPlayer'));
socket.on('setPlayerId', id => console.log('PID:', id));

socket.on('startGame', gameId => {
  store.dispatch({
    type: 'SET_GAME_GM',
    payload: {gameId}
  });
});

export default socket;
