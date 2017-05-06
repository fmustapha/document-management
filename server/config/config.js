import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    dialect: 'postgres',
    url: process.env.DB_URL
  },
  test: {
    username: 'andeladeveloper',
    password: null,
    database: 'documentdb_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'andeladeveloper',
    password: null,
    database: 'documentdb_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
