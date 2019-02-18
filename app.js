// @flow

import Koa from 'koa';

import logger from './lib/logger';

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  logger.logInfo(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
  ctx.body = 'Hello world';
});

app.on('error', (err, ctx) => logger.logError('Server Error', err, ctx));

export default app;
