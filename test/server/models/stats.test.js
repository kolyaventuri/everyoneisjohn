import test from 'ava';
import {stub} from 'sinon';

import Stats from '../../../server/models/stats';
import setup from '../stubs/create-socket';

const genPlayer = () => {
  const {player} = setup();
  player.emitUpdate = stub();

  return player;
};

const genStats = player => new Stats(player || genPlayer());

test('has points that start at 0', t => {
  const stats = genStats();

  t.is(stats.points, 0);
});

test('emits new points', t => {
  const player = genPlayer();
  const stats = genStats(player);

  stats.points += 3;

  t.true(player.emitUpdate.called);
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

test('emits new willpower', t => {
  const player = genPlayer();
  const stats = genStats(player);

  stats.willpower += 1;

  t.true(player.emitUpdate.called);
});

test('can have a goal', t => {
  const newGoal = 'Some goal';
  const stats = genStats();

  stats.goal = newGoal;

  t.is(stats.goal, newGoal);
});

test('emits new goal', t => {
  const player = genPlayer();
  const stats = genStats(player);

  stats.goal = 'abc';

  t.true(player.emitUpdate.called);
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

test('emits new goal level', t => {
  const player = genPlayer();
  const stats = genStats(player);

  stats.goalLevel = 2;

  t.true(player.emitUpdate.called);
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

test('new skills are emitted', t => {
  const player = genPlayer();
  const stats = genStats(player);

  stats.setSkill(1, 'a');

  t.true(player.emitUpdate.called);
});

test('spends 3 willpower if the 3rd skill is set', t => {
  const stats = genStats();

  stats.setSkill(1, 'a');
  stats.setSkill(2, 'b');

  t.is(stats.willpower, 10);

  stats.setSkill(3, 'c');

  t.is(stats.willpower, 7);
});

test('does not spend willpower again if 3rd skill has already been set', t => {
  const stats = genStats();

  stats.setSkill(1, 'a');
  stats.setSkill(2, 'b');
  stats.setSkill(3, 'c');

  stats.setSkill(3, 'd');

  t.is(stats.willpower, 7);
});

test('returns willpower if 3rd skill is unset', t => {
  const stats = genStats();

  stats.setSkill(1, 'a');
  stats.setSkill(2, 'b');
  stats.setSkill(3, 'c');

  stats.setSkill(3, '');

  t.is(stats.willpower, 10);
});

test('skills and goals cannot be set once they are frozen', t => {
  const player = genPlayer();
  const stats = genStats(player);
  const goal = 'Some goal';

  stats.freeze();

  stats.goal = goal;
  stats.setSkill(1, 'Some skill');

  t.deepEqual(stats.skills, ['', '', '']);
  t.not(stats.goal, goal);
  t.true(player.emitUpdate.calledWith(false));
});

test('skills  / goals can be thawed for editing', t => {
  const player = genPlayer();
  const stats = genStats(player);
  const goal = 'Some goal';

  stats.freeze();
  stats.thaw();

  stats.goal = goal;

  t.is(stats.goal, goal);
  t.true(player.emitUpdate.calledWith(false));
});

test('it has a winner attribute', t => {
  const stats = genStats();

  t.is(stats.winner, false);
});

test('it updates and emits the winner upon being changed', t => {
  const player = genPlayer();
  const stats = genStats(player);

  stats.winner = true;

  t.true(stats.winner);
  t.true(player.emitUpdate.called);
});
