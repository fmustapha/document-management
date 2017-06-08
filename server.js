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

// if (process.env.NODE_ENV !== 'test') {
database.sequelize.sync().then(
  app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
    }
  })
  ).catch(error => Logger.error(error));
// }

module.exports = app;

