const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    dialect: 'postgres',
    url: process.env.DB_URL
  },
  test: {
    dialect: 'postgres',
    url: process.env.TEST_DB_URL,
    logging: false
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  }
};
