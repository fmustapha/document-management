import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.join(__dirname, '/client/index.js')
  ],
  target: 'web',
  output: {
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '/client')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client'),
        loaders: ['babel-loader'] },
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.jpg|png|jpeg|gif(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
