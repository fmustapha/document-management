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
    url: process.env.DB_URL,
    dialect: 'postgres'
  }
};
