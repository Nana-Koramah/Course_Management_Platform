const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// === Sequelize Instance ===
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// === Model Imports ===
const Cohort = require('./cohort.model');
const Class = require('./class.model');
const Student = require('./student.model');
const Facilitator = require('./facilitator.model');
const Module = require('./module.model');
const Mode = require('./mode.model');
const Allocation = require('./allocation.model');
const CourseOffering = require('./course_offering.model');
const ActivityTracker = require('./activity_tracker.model');

// === Model Associations ===

// Cohort → Class (1:M)
Cohort.hasMany(Class, { foreignKey: 'cohortId' });
Class.belongsTo(Cohort, { foreignKey: 'cohortId' });

// Class → Student (1:M)
Class.hasMany(Student, { foreignKey: 'classId' });
Student.belongsTo(Class, { foreignKey: 'classId' });

// Facilitator → Allocation (1:M)
Facilitator.hasMany(Allocation, { foreignKey: 'facilitatorId' });
Allocation.belongsTo(Facilitator, { foreignKey: 'facilitatorId' });

// Module → Allocation (1:M)
Module.hasMany(Allocation, { foreignKey: 'moduleId' });
Allocation.belongsTo(Module, { foreignKey: 'moduleId' });

// Class → Allocation (1:M)
Class.hasMany(Allocation, { foreignKey: 'classId' });
Allocation.belongsTo(Class, { foreignKey: 'classId' });

// Mode → Allocation (1:M)
Mode.hasMany(Allocation, { foreignKey: 'modeId' });
Allocation.belongsTo(Mode, { foreignKey: 'modeId' });

// Allocation → ActivityLog (1:M)
Allocation.hasMany(ActivityTracker, { foreignKey: 'allocationId' }); 
ActivityTracker.belongsTo(Allocation, { foreignKey: 'allocationId' }); 

// === Exports ===
module.exports = {
  sequelize,
  Cohort,
  Class,
  Student,
  Facilitator,
  Module,
  Mode,
  Allocation,
  CourseOffering,
  ActivityTracker, 
};
