import {stub} from 'sinon';

export default class MockRepo {
  insert = stub();

  find = stub().returnsArg(0);

  clear = stub();

  all = stub();

  count = 0;
}
