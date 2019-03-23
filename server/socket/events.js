// @flow

import initPlayer from './actions/init-player';
import disconnect from './actions/disconnect';

const events = [
  {name: 'initPlayer', handler: initPlayer},
  {name: 'disconnect', handler: disconnect}
];

export default events;
