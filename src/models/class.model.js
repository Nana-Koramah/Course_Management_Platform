const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cohort = require('./cohort.model');

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  graduationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

// Associations
Class.belongsTo(Cohort, { foreignKey: 'cohortId', onDelete: 'CASCADE' });
Cohort.hasMany(Class, { foreignKey: 'cohortId' });

module.exports = Class;