const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cohort = require('./cohort.model');
const Class = require('./class.model');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Student.belongsTo(Cohort, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});
Student.belongsTo(Class, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});

module.exports = Student;