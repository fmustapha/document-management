import http from 'http';
import dotenv from 'dotenv';
import Logger from 'js-logger';
import app from './server/config/app';
import database from './server/models';

dotenv.config();
Logger.useDefaults();

const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

const server = http.createServer(app);

database.sequelize.sync().then(db => (db ? server
.listen(port) : Logger.info('could not connect to database')))
.then(() => Logger.info('server connected'))
.catch(error => Logger.error(error));

