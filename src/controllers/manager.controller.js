const Manager = require('../models/manager.model');

exports.createManager = async (req, res) => {
  try {
    const manager = await Manager.create(req.body);
    res.status(201).json(manager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getManagers = async (req, res) => {
  try {
    const managers = await Manager.findAll();
    res.json(managers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getManagerById = async (req, res) => {
  try {
    const manager = await Manager.findByPk(req.params.id);
    if (!manager) return res.status(404).json({ message: 'Manager not found' });
    res.json(manager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateManager = async (req, res) => {
  try {
    const updated = await Manager.update(req.body, { where: { id: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Manager not found' });
    res.json({ message: 'Manager updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteManager = async (req, res) => {
  try {
    const deleted = await Manager.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Manager not found' });
    res.json({ message: 'Manager deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
