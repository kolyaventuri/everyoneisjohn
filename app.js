// @flow

import Koa from 'koa';
import serve from 'koa-static';
import send from 'koa-send';

import logger from './lib/logger';

const app = new Koa();

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable-next-line import/no-unassigned-import */
  require('./middleware/hot-bundle');
}

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

app.use(serve('./static'));

app.use(async ctx => {
  await send(ctx, 'views/index.html');
});

app.on('error', (err, ctx) => {
  const context = ctx ? ctx.toString() : '';
  const error = `Server Error:\n${err.stack}${context}`;

  logger.logError(new Error(error));
});

export default app;
