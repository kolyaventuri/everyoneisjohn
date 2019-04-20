import webpack from 'webpack';
import e2k from 'express-to-koa';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.dev';

export default app => {
  console.log(`Serving from ${webpackConfig.output.publicPath}`);
  const webpackCompiler = webpack(webpackConfig);

  app.use(e2k(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath
  })));
  app.use(e2k(webpackHotMiddleware(webpackCompiler)));
};
