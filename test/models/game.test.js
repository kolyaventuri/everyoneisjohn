import test from 'ava';

import Game from '../../server/models/game';
import Player from '../../server/models/player';
import {socket} from '../mocks';

const genGame = owner => new Game(owner);
const genPlayer = () => new Player(socket);

test('it has an ID', t => {
  const game = genGame();

  t.is(typeof game.id, 'string');
  t.true(game.id.length === 5);
});

test('has a slug', t => {
  const game = genGame();

  t.is(typeof game.slug, 'string');
});

test('has an owner', t => {
  const owner = genPlayer();
  const game = genGame(owner);

  t.is(game.owner, owner);
});

test('can hold players', t => {
  const game = genGame();

  t.true(Array.isArray(game.players));
});
