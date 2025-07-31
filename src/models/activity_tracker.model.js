const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ActivityTracker = sequelize.define('ActivityTracker', {
  allocationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CourseOfferings',
      key: 'id',
    },
  },
  weekNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attendance: {
  type: DataTypes.JSON,
  allowNull: false,
  defaultValue: [],
  },

  facilitatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Facilitator', 
    },
  },

  formativeOneGrading: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started',
  },
  formativeTwoGrading: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started',
  },
  summativeGrading: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started',
  },
  courseModeration: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started',
  },
  intranetSync: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started',
  },
  gradeBookStatus: {
    type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
    defaultValue: 'Not Started',
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
}, {
  timestamps: true,
});

module.exports = ActivityTracker;