import test from 'ava';
import uuid from 'uuid/v4';

import setup from '../../stubs/create-socket';
import updateStats from '../../../../server/socket/actions/update-stats';

test('changes the players goal if provided', t => {
  const {player, socket} = setup();
  const goal = uuid();

  updateStats(socket, {goal});

  t.is(player.stats.goal, goal);
});

test('sets a skill if provided', t => {
  const {player, socket} = setup();
  const skill = uuid();

  updateStats(socket, {
    skill: {
      number: 1,
      content: skill
    }
  });

  t.is(player.stats.__STATICS__.skill1, skill);
});
