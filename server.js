import open from 'open';
import path from 'path';
import dotenv from 'dotenv';
import Logger from 'js-logger';
import app from './server/config/app';
import database from './server/models';

dotenv.config();
Logger.useDefaults();

const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

app.get('/dms/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'client/index.html'));
});
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'test') {
  database.sequelize.sync().then(
  app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
    } else {
      open(`http://localhost:${port}`);
    }
  })
  ).catch(error => Logger.error(error));
}

module.exports = app;

// const server = http.createServer(app);
// const server = http.createServer(app);

// server.on('listening', () => {
//   Logger.info('ok, server is running');
// });

// database.sequelize.sync().then(db => (db ? server
// .listen(port) : Logger.info('could not connect to database')))
// .then(() => Logger.info('server connected'))
// .catch(error => Logger.error(error));

