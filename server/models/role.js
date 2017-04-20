module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Roles', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.User, { foreignKey: 'roleId' });
      }
    }
  });
  return Role;
};
