module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users', });
      }
    }
  });
  return Role;
};
