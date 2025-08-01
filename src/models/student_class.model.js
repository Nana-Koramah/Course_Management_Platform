const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = require('./student.model');
const Class = require('./class.model');

const StudentClass = sequelize.define('StudentClass', {
  enrolledAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
});

Student.belongsToMany(Class, { through: StudentClass });
Class.belongsToMany(Student, { through: StudentClass });

module.exports = StudentClass;