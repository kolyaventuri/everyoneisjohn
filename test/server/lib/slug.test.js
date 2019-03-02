import test from 'ava';

import Slug from '../../../server/lib/slug';

test('it generates a random slug', t => {
  const slug = Slug.random();

  t.is(typeof slug, 'string');
});

