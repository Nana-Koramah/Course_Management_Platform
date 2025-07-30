const Mode = require('../models/mode.model');

// Create
exports.createMode = async (req, res) => {
  try {
    const mode = await Mode.create(req.body);
    res.status(201).json(mode);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create mode', error: error.message });
  }
};

// Read all
exports.getModes = async (req, res) => {
  try {
    const modes = await Mode.findAll();
    res.json(modes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve modes', error: error.message });
  }
};

// Read one
exports.getModeById = async (req, res) => {
  try {
    const mode = await Mode.findByPk(req.params.id);
    if (!mode) return res.status(404).json({ message: 'Mode not found' });
    res.json(mode);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving mode', error: error.message });
  }
};

// Update
exports.updateMode = async (req, res) => {
  try {
    const updated = await Mode.update(req.body, { where: { id: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ message: 'Mode not found' });
    res.json({ message: 'Mode updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating mode', error: error.message });
  }
};

// Delete
exports.deleteMode = async (req, res) => {
  try {
    const deleted = await Mode.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Mode not found' });
    res.json({ message: 'Mode deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mode', error: error.message });
  }
};
