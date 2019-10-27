// @flow

import type {SocketType} from '..';
import {playerRepository} from '../../repositories';

type Payload = {
  content: string,
  recipient?: string
};

const sendMessage = (socket: SocketType, {content, recipient}: Payload) => {
  const {game, player} = socket;
  const {owner} = game;

  const player1 = player.id === owner.id ? owner : player;
  const player2 =
    player.id === owner.id ? playerRepository.find(recipient) : owner;

  const chat = game.createChat(player1, player2);
  chat.postMessage(player, content);
};

export default sendMessage;
