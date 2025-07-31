const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Allocation = sequelize.define('Allocation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  term: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  allocationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  
});

module.exports = Allocation;
