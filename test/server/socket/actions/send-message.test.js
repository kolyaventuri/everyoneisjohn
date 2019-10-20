import test from 'ava';
import {stub} from 'sinon';

import createSocket from '../../stubs/create-socket';
import sendMessage from '../../../../server/socket/actions/send-message';

const postMessage = stub();
class Chat {
  postMessage = postMessage;
}

test('fires a postMessage event on the attached chat', t => {
  const {socket, player, game} = createSocket(true);

  game.addPlayer(player);
  const {owner} = game;

  const chat = new Chat();
  game.createChat.withArgs(player, owner).returns(chat);

  const content = 'abc123';
  sendMessage(socket, {content});

  t.true(postMessage.calledWith(player, content));
});
