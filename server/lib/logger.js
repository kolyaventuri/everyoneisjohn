// @flow

import Logger from 'scriba';

const logger = new Logger({scope: 'SERVER'});

if (process.env.NODE_ENV === 'test') {
  const noop = () => {};
  logger.logInfo = noop;
  logger.logError = noop;
}

export const {logInfo, logError} = logger;
