const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Facilitator = sequelize.define('Facilitator', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: { model: User, key: 'id' },
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

User.hasOne(Facilitator, { foreignKey: 'userId' });
Facilitator.belongsTo(User, { foreignKey: 'userId' });

module.exports = Facilitator;

