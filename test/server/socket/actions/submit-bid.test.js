import test from 'ava';
import {stub} from 'sinon';

import createSocket from '../../stubs/create-socket';
import submitBid from '../../../../server/socket/actions/submit-bid';

test('can submit a players bid', t => {
  const {socket, player, game} = createSocket(true);

  game.addPlayer(player);
  game.addBid = stub();

  const amount = 3;
  submitBid(socket, {amount});

  t.true(game.addBid.calledWith(player, amount));
});
