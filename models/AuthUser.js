const uuid = require('uuid').v4;

const AuthUser = (sequelize, DataTypes) => {
  return sequelize.define('AuthUser', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => {
        return uuid()
      },
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID,
      references: 'User',
      referencesKey: 'id',
    }
  }, {
    freezeTableName: true,
    tableName: 'AuthUser',
    paranoid: true,

  });
}

module.exports = AuthUser;