// const { sequelize } = require("se");
// const { DataTypes } = require("sequelize/types");
const uuid = require('uuid').v4;

const User = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => {
        return uuid()
      },
      primaryKey: true
    },
    name: DataTypes.STRING,
  }, {
    freezeTableName: true,
    tableName: 'User',
    paranoid: true,
  });
}


module.exports = User;