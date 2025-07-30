const Class = require('../models/class.model');

exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const found = await Class.findByPk(req.params.id);
    if (!found) return res.status(404).json({ message: 'Class not found' });
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const updated = await Class.update(req.body, { where: { id: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const deleted = await Class.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
