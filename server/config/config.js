import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    dialect: 'postgres',
    url: process.env.DB_URL
  },
  test: {
    dialect: 'postgres',
    url: process.env.TEST_DB_URL
  },
  production: {
    username: 'andeladeveloper',
    password: null,
    database: 'documentdb_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
