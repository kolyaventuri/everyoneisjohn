import test from 'ava';

import Repository from '../../../server/lib/repository';

const genRepo = () => {
  return new Repository();
};

const genItem = id => ({id: (id || 1).toString()});
const genItems = num => new Array(num).fill(1).map((_, i) => genItem(i));

test('can have data added to it', t => {
  const repo = genRepo();
  const item = genItem();

  repo.insert(item);

  t.is(repo.count, 1);
});

test('disallows duplicate objects', t => {
  const repo = genRepo();
  const item = genItem();

  repo.insert(item);
  repo.insert(item);

  t.is(repo.count, 1);
});

test('can retrieve specific object', t => {
  const repo = genRepo();
  const [item1, item2] = genItems(2);

  repo.insert(item1);
  repo.insert(item2);

  const result = repo.find(item1.id);

  t.deepEqual(result, item1);
});

test('returns null if object not found', t => {
  const repo = genRepo();
  const item = genItem();

  repo.insert(item);

  const result = repo.find('not-valid');

  t.is(result, null);
});

test('it can be completely cleared', t => {
  const repo = genRepo();
  const [item1, item2] = genItems(2);

  repo.insert(item1);
  repo.insert(item2);

  repo.clear();

  t.is(repo.count, 0);
});

test('it can retieve an array of all the objects', t => {
  const repo = genRepo();
  const item1 = genItem(1);
  const item2 = genItem(2);
  const items = [item1, item2];

  repo.insert(item1);
  repo.insert(item2);

  const result = repo.all();

  t.deepEqual(result, items);
});

test('it can destroy an object in the repo', t => {
  const repo = genRepo();
  const item1 = genItem(1);
  const item2 = genItem(2);
  const items = [item2];

  repo.insert(item1);
  repo.insert(item2);

  repo.destroy(item1);

  const result = repo.all();

  t.deepEqual(result, items);
});
