module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: { type: DataTypes.INTEGER }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Document, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
        });
      }
    }
  });
  return User;
};
