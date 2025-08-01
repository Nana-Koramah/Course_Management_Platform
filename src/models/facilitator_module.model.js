const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Facilitator = require('./facilitator.model');
const Module = require('./module.model');

const FacilitatorModule = sequelize.define('FacilitatorModule', {
}, {
  timestamps: false,
});

Facilitator.belongsToMany(Module, { through: FacilitatorModule });
Module.belongsToMany(Facilitator, { through: FacilitatorModule });

module.exports = FacilitatorModule;