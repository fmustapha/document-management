module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        title: 'admin',
        description: 'Super user who can access all documents and assign roles',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'regular',
        description: 'Ordinary user who can access only docs they created',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
