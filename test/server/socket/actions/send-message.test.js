import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

import {repositories} from '../../mocks';
import createSocket from '../../stubs/create-socket';

const sendMessage = proxyquire(
  '../../../../server/socket/actions/send-message',
  {
    '../../repositories': repositories
  }
).default;
const {playerRepository} = repositories;

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

test('fires a postMessage event to the player if the owner is sending the message', t => {
  const {socket, player, game} = createSocket(true);

  game.addPlayer(player);
  const {owner} = game;

  const chat = new Chat();
  game.createChat.withArgs(owner, player).returns(chat);
  playerRepository.find.withArgs(player.id).returns(player);
  socket.player = owner;

  const content = 'abc123';
  sendMessage(socket, {content, recipient: player.id});

  t.true(postMessage.calledWith(owner, content));
});
