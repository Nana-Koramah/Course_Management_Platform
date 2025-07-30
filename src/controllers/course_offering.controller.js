const CourseOffering = require('../models/course_offering.model');

exports.createCourseOffering = async (req, res) => {
  try {
    const offering = await CourseOffering.create(req.body);
    res.status(201).json(offering);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseOfferings = async (req, res) => {
  try {
    const offerings = await CourseOffering.findAll();
    res.json(offerings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseOfferingById = async (req, res) => {
  try {
    const offering = await CourseOffering.findByPk(req.params.id);
    if (!offering) return res.status(404).json({ message: 'Course offering not found' });
    res.json(offering);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourseOffering = async (req, res) => {
  try {
    const updated = await CourseOffering.update(req.body, { where: { id: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Course offering not found' });
    res.json({ message: 'Course offering updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourseOffering = async (req, res) => {
  try {
    const deleted = await CourseOffering.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Course offering not found' });
    res.json({ message: 'Course offering deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
