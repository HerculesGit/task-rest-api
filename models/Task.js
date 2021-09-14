const uuid = require('uuid').v4;

const Task = (sequelize, DataTypes) => {
  return sequelize.define('Task', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => {
        return uuid()
      },
      primaryKey: true
    },
    name: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.UUID,
      references: 'User',
      referencesKey: 'id',
    }
  }, {
    freezeTableName: true,
    tableName: 'Task',
    paranoid: true,
  });
}

module.exports = Task;