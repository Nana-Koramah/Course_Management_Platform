const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Module = require('./module.model');
const Class = require('./class.model');
const Facilitator = require('./facilitator.model');
const Mode = require('./mode.model');

const CourseOffering = sequelize.define('CourseOffering', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  academicYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  term: {
    type: DataTypes.STRING,
    allowNull: false, // e.g., 'Term 1', 'Term 2'
  },
});

CourseOffering.belongsTo(Module, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});

CourseOffering.belongsTo(Class, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});

CourseOffering.belongsTo(Facilitator, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});

CourseOffering.belongsTo(Mode, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});

module.exports = CourseOffering;