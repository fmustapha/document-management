import express from 'express';
import webpack from 'webpack';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from '../../webpack.config.dev';
import allRoutes from '../routes';

// Set up the express app
const app = express();
const compiler = webpack(config);

app.use(express.static(path.join(__dirname, '../../')));

// Log requests to the console.
app.use(logger('dev'));

if (process.env.NODE_ENV !== 'test') {
  // Use webpack middleware
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

// Parse incoming requests data, this will happen on every request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../client/index.html'));
  res.redirect('/dms/');
});

app.use('/users', allRoutes.user);
app.use('/documents', allRoutes.document);
app.use('/roles', allRoutes.role);
app.use('/search', allRoutes.search);

export default app;
