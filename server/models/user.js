module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleTitle: { type: DataTypes.STRING, defaultValue: 'regular' }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Document, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleTitle',
        });
      }
    }
  });
  return User;
};
