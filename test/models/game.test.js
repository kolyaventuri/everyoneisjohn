import test from 'ava';

import Game from '../../server/models/game';

const genGame = () => new Game();

test('it has an ID', t => {
  const game = genGame();

  t.is(typeof game.id, 'string');
  t.true(game.id.length === 5);
});

test('has a slug', t => {
  const game = genGame();

  t.is(typeof game.slug, 'string');
});
