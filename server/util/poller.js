// @flow

import {MAX_POLL_COUNT, SHORT_POLL_INTERVAL} from '../constants';

type CheckFnType = () => boolean;

const poller = (checkFn: CheckFnType) => {
  let callCount = 0;

  return new Promise((resolve, reject) => {
    const poll = () => {
      if (callCount === MAX_POLL_COUNT) {
        return reject(new Error('Poll count exceeded.'));
      }

      if (checkFn()) {
        resolve();
      } else {
        callCount += 1;
        setTimeout(poll, SHORT_POLL_INTERVAL);
      }
    };

    poll();
  });
};

export default poller;
