const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Cohort = require('./cohort.model');
const Class = require('./class.model');

const Student = sequelize.define('Student', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: { model: User, key: 'id' },
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },

  // Add these two:
  cohortId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Cohort, key: 'id' },
  },
  classId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Class, key: 'id' },
  },
});

// Associations
Student.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Student, { foreignKey: 'userId' });

Student.belongsTo(Cohort, { foreignKey: 'cohortId', onDelete: 'CASCADE' });
Student.belongsTo(Class, { foreignKey: 'classId', onDelete: 'CASCADE' });

module.exports = Student;
