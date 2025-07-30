const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Facilitator = require('./facilitator.model');
const Module = require('./module.model');
const Class = require('./class.model');
const Mode = require('./mode.model');

const Allocation = sequelize.define('Allocation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  term: {
    type: DataTypes.STRING, // e.g. "Fall 2025", "Semester 2"
    allowNull: false,
  },
  allocationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

// Relationships
Facilitator.hasMany(Allocation);
Allocation.belongsTo(Facilitator);

Module.hasMany(Allocation);
Allocation.belongsTo(Module);

Class.hasMany(Allocation);
Allocation.belongsTo(Class);

Mode.hasMany(Allocation);
Allocation.belongsTo(Mode);

module.exports = Allocation;