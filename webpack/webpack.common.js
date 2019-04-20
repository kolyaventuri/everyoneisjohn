const path = require('path');

module.exports = {
  entry: [
    path.join(process.cwd(), 'client/app.js')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]'
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
