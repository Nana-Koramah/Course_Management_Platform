const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Manager = sequelize.define('Manager', {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
    allowNull: false,
    unique: true,
  },
  department: DataTypes.STRING,
});

User.hasOne(Manager, { foreignKey: 'userId' });
Manager.belongsTo(User, { foreignKey: 'userId' });

module.exports = Manager;
