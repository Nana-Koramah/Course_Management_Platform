const Cohort = require('../models/cohort.model');

exports.createCohort = async (req, res) => {
  try {
    const cohort = await Cohort.create(req.body);
    res.status(201).json(cohort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCohorts = async (req, res) => {
  try {
    const cohorts = await Cohort.findAll();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCohortById = async (req, res) => {
  try {
    const cohort = await Cohort.findByPk(req.params.id);
    if (!cohort) return res.status(404).json({ message: 'Cohort not found' });
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCohort = async (req, res) => {
  try {
    const updated = await Cohort.update(req.body, { where: { id: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Cohort not found' });
    res.json({ message: 'Cohort updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCohort = async (req, res) => {
  try {
    const deleted = await Cohort.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Cohort not found' });
    res.json({ message: 'Cohort deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
