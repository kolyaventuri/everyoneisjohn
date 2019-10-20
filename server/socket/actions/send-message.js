// @flow

import type {SocketType} from '..';

type Payload = {
  content: string
};

const sendMessage = (socket: SocketType, {content}: Payload) => {
  const {game, player} = socket;
  const {owner} = game;

  const chat = game.createChat(player, owner);
  chat.postMessage(player, content);
};

export default sendMessage;
