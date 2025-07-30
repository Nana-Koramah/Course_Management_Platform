const Allocation = require('../models/allocation.model');
const Facilitator = require('../models/facilitator.model');
const Module = require('../models/module.model');
const Class = require('../models/class.model');
const Mode = require('../models/mode.model');

// Create new allocation
exports.createAllocation = async (req, res) => {
  try {
    const { facilitatorId, moduleId, classId, modeId, term } = req.body;

    const allocation = await Allocation.create({ facilitatorId, moduleId, classId, modeId, term });
    res.status(201).json(allocation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create allocation', error: error.message });
  }
};

// Get all allocations (with optional filters)
exports.getAllocations = async (req, res) => {
  try {
    const { term, facilitatorId, moduleId, classId, modeId, page = 1, limit = 10, sortBy = 'createdAt', order = 'DESC' } = req.query;

    const filters = {};
    if (term) filters.term = term;
    if (facilitatorId) filters.facilitatorId = facilitatorId;
    if (moduleId) filters.moduleId = moduleId;
    if (classId) filters.classId = classId;
    if (modeId) filters.modeId = modeId;

    const offset = (page - 1) * limit;

    const allocations = await Allocation.findAndCountAll({
      where: filters,
      include: [Facilitator, Module, Class, Mode],
      order: [[sortBy, order.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      total: allocations.count,
      page: parseInt(page),
      pageSize: parseInt(limit),
      data: allocations.rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching allocations', error: error.message });
  }
};



// Get one allocation
exports.getAllocationById = async (req, res) => {
  try {
    const allocation = await Allocation.findByPk(req.params.id, {
      include: [Facilitator, Module, Class, Mode],
    });

    if (!allocation) return res.status(404).json({ message: 'Allocation not found' });
    res.json(allocation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching allocation', error: error.message });
  }
};

// Update allocation
exports.updateAllocation = async (req, res) => {
  try {
    const updated = await Allocation.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated[0] === 0) return res.status(404).json({ message: 'Allocation not found' });
    res.json({ message: 'Allocation updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating allocation', error: error.message });
  }
};

// Delete allocation
exports.deleteAllocation = async (req, res) => {
  try {
    const deleted = await Allocation.destroy({ where: { id: req.params.id } });

    if (!deleted) return res.status(404).json({ message: 'Allocation not found' });
    res.json({ message: 'Allocation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting allocation', error: error.message });
  }
};

exports.managerDashboard = async (req, res) => {
  try {
    const stats = await Allocation.findAll({
      include: [Facilitator, Module, Class],
    });

    res.json({
      message: 'Manager dashboard data',
      totalAllocations: stats.length,
      data: stats,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
};

exports.facilitatorDashboard = async (req, res) => {
  try {
    const stats = await Allocation.findAll({
      where: { facilitatorId: req.user.id }, // assuming token has user.id
      include: [Module, Class],
    });

    res.json({
      message: 'Facilitator dashboard data',
      totalModules: stats.length,
      data: stats,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
};
