const Facilitator = require('../models/facilitator.model');

exports.createFacilitator = async (req, res) => {
  try {
    const facilitator = await Facilitator.create(req.body);
    res.status(201).json(facilitator);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create facilitator', error: error.message });
  }
};

exports.getFacilitators = async (req, res) => {
  try {
    const facilitators = await Facilitator.findAll();
    res.json(facilitators);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve facilitators', error: error.message });
  }
};

exports.getFacilitatorById = async (req, res) => {
  try {
    const facilitator = await Facilitator.findByPk(req.params.id);
    if (!facilitator) return res.status(404).json({ message: 'Facilitator not found' });
    res.json(facilitator);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving facilitator', error: error.message });
  }
};

exports.updateFacilitator = async (req, res) => {
  try {
    const updated = await Facilitator.update(req.body, { where: { id: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ message: 'Facilitator not found' });
    res.json({ message: 'Facilitator updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating facilitator', error: error.message });
  }
};

exports.deleteFacilitator = async (req, res) => {
  try {
    const deleted = await Facilitator.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Facilitator not found' });
    res.json({ message: 'Facilitator deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting facilitator', error: error.message });
  }
};
