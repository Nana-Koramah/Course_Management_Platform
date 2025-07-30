const Module = require('../models/module.model');

exports.createModule = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create module', error: error.message });
  }
};

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve modules', error: error.message });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving module', error: error.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const updated = await Module.update(req.body, { where: { id: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ message: 'Module not found' });
    res.json({ message: 'Module updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating module', error: error.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const deleted = await Module.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Module not found' });
    res.json({ message: 'Module deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting module', error: error.message });
  }
};
