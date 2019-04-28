// @flow

import Logger from 'scriba';

const logger = new Logger({scope: 'SERVER'});

export const {logInfo, logError} = logger;
