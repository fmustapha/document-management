const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        username: 'faithm',
        firstname: 'Faith',
        lastname: 'Mustapha',
        email: 'fyoiza@gmail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'mattd',
        firstname: 'Mathew',
        lastname: 'Daniel',
        email: 'mattd@gmail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
