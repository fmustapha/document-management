module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.User, { foreignKey: 'roleTitle' });
      }
    }
  });
  return Role;
};
