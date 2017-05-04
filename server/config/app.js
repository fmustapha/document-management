import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import allRoutes from '../routes';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data, this will happen on every request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Document Management System' });
});

app.use('/users', allRoutes.user);
app.use('/documents', allRoutes.document);
app.use('/roles', allRoutes.role);
app.use('/search', allRoutes.search);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'REQUEST PAGE NOT FOUND' });
});

export default app;
