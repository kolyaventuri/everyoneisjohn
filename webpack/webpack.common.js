const path = require('path');
const webpack = require('webpack');

const cssLoaderOpts = 'css-loader?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]';

module.exports = {
  entry: [
    path.join(process.cwd(), 'client/app.js')
  ],
  plugins: [
    new webpack.EnvironmentPlugin({
      ENV: 'local'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!' + cssLoaderOpts,
        include: /flexboxgrid/
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: cssLoaderOpts
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    path: path.join(process.cwd(), 'static/javascripts'),
    publicPath: '/javascripts/'
  }
};
