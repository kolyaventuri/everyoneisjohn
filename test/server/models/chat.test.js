import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import Player from '../../../server/models/player';
import {repositories} from '../mocks';
import {MockSocket} from '../mocks/socket';

const _setupMessage = stub();
class Message {
  constructor(...args) {
    _setupMessage(...args);
    this.content = args[1];
  }
}

const Chat = proxyquire.noCallThru()('../../../server/models/chat', {
  '../repositories': repositories,
  './message': Message
}).default;
const {playerRepository} = repositories;

const socket = new MockSocket();
const genPlayer = () => new Player(socket);
const genChat = (player, player2) => new Chat(player || genPlayer(), player2 || genPlayer());

test('auto-generates an ID', t => {
  const chat = genChat();

  t.true(typeof chat.id === 'string');
});

test('the ID is immutable', t => {
  const chat = genChat();
  const oldId = chat.id;

  const fn = () => {
    chat.id = 'aaa';
  };

  t.throws(fn);
  t.is(chat.id, oldId);
});

test('has a player1', t => {
  const player = genPlayer();
  const chat = genChat(player);

  playerRepository.find = stub().withArgs(player.id).returns(player);
  t.is(chat.player1, player);
});

test('has a player2', t => {
  const player = genPlayer();
  const chat = genChat(null, player);

  playerRepository.find = stub().withArgs(player.id).returns(player);
  t.is(chat.player2, player);
});

test('can post a message', t => {
  const player = genPlayer();
  const chat = genChat(player);

  const message = 'abc123';
  chat.postMessage(player, message);

  t.true(_setupMessage.calledWith(player.id, message));

  t.is(chat.messages.length, 1);
  t.is(chat.messages[0].content, message);
});
