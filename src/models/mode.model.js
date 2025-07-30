const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mode = sequelize.define('Mode', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // e.g., 'Online', 'Hybrid', 'In-person'
  },
});

module.exports = Mode;