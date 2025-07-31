const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Manager = sequelize.define('Manager', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: { model: User, key: 'id' },
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  department: DataTypes.STRING,
});

User.hasOne(Manager, { foreignKey: 'userId' });
Manager.belongsTo(User, { foreignKey: 'userId' });

module.exports = Manager;
