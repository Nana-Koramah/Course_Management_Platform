const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cohort = sequelize.define('Cohort', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Cohort;