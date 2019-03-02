import test from 'ava';

import Stats from '../../../server/models/stats';

const genStats = () => new Stats();

test('has points that start at 0', t => {
  const stats = genStats();

  t.is(stats.points, 0);
});

test('has willpower that starts at 10', t => {
  const stats = genStats();

  t.is(stats.willpower, 10);
});

test('can add / subtract willpower', t => {
  const stats = genStats();

  stats.willpower += 1;

  t.is(stats.willpower, 11);

  stats.willpower -= 2;

  t.is(stats.willpower, 9);
});

test('can have a goal', t => {
  const newGoal = 'Some goal';
  const stats = genStats();

  stats.goal = newGoal;

  t.is(stats.goal, newGoal);
});

test('goal can have a point value [1-3]', t => {
  const stats = genStats();

  stats.goalLevel = 1;
  t.is(stats.goalLevel, 1);

  stats.goalLevel = 2;
  t.is(stats.goalLevel, 2);

  stats.goalLevel = 3;
  t.is(stats.goalLevel, 3);

  stats.goalLevel = 4;
  t.is(stats.goalLevel, 3);

  stats.goalLevel = 0;
  t.is(stats.goalLevel, 1);
});

test('can set the 3 skills', t => {
  const stats = genStats();

  stats.setSkill(1, 'a');
  stats.setSkill(2, 'b');
  stats.setSkill(3, 'c');
  // Sad path
  stats.setSkill(4, 'd');
  stats.setSkill(0, 'e');

  t.deepEqual(stats.skills, ['a', 'b', 'c']);
});

test('spends 3 willpower if the 3rd skill is set', t => {
  const stats = genStats();

  stats.setSkill(1, 'a');
  stats.setSkill(2, 'b');

  t.is(stats.willpower, 10);

  stats.setSkill(3, 'c');

  t.is(stats.willpower, 7);
});

test('skills and goals cannot be set once they are frozen', t => {
  const stats = genStats();
  const goal = 'Some goal';

  stats.freeze();

  stats.goal = goal;
  stats.setSkill(1, 'Some skill');

  t.deepEqual(stats.skills, []);
  t.not(stats.goal, goal);
});

test('skills  / goals can be thawed for editing', t => {
  const stats = genStats();
  const goal = 'Some goal';

  stats.freeze();
  stats.thaw();

  stats.goal = goal;

  t.is(stats.goal, goal);
});
