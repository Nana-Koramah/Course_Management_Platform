const CourseOffering = require('../models/course_offering.model');
const Module = require('../models/module.model');
const Class = require('../models/class.model');
const Facilitator = require('../models/facilitator.model');
const Mode = require('../models/mode.model');


exports.getAllCourseOfferings = async (req, res) => {
  try {
    const { term, cohortId, intake, facilitatorId, modeId } = req.query;

    const filters = {};

    if (term) filters.term = term;
    if (facilitatorId) filters.facilitatorId = facilitatorId;
    if (modeId) filters.modeId = modeId;

    const courseOfferings = await CourseOffering.findAll({
      where: filters,
      include: [
        {
          model: Class,
          include: [
            {
              model: cohorts,
              where: intake ? { intake } : {},
              ...(cohortId && { where: { id: cohortId } }),
            }
          ]
        },
        { model: Module },
        { model: Facilitator },
        { model: Mode }
      ]
    });

    res.status(200).json(courseOfferings);
  } catch (err) {
    console.error('Error fetching course offerings:', err);
    res.status(500).json({ error: 'Failed to fetch course offerings' });
  }
};

// Create a new course offering
exports.createCourseOffering = async (req, res) => {
  try {
    const { academicYear, term, ModuleId, ClassId, FacilitatorId, ModeId, startDate, endDate } = req.body;

    if (!academicYear || !term || !ModuleId || !ClassId || !FacilitatorId || !ModeId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const offering = await CourseOffering.create({
      academicYear,
      term,
      ModuleId,
      ClassId,
      FacilitatorId,
      ModeId,
      startDate,
      endDate
    });

    res.status(201).json({ message: 'Course offering created', data: offering });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all course offerings with their associations
exports.getCourseOfferings = async (req, res) => {
  try {
    const offerings = await CourseOffering.findAll({
      include: [Module, Class, Facilitator, Mode],
    });
    res.json({ data: offerings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single course offering by ID
exports.getCourseOfferingById = async (req, res) => {
  try {
    const offering = await CourseOffering.findByPk(req.params.id, {
      include: [Module, Class, Facilitator, Mode],
    });

    if (!offering) {
      return res.status(404).json({ message: 'Course offering not found' });
    }

    res.json({ data: offering });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a course offering
exports.updateCourseOffering = async (req, res) => {
  try {
    const [updated] = await CourseOffering.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: 'Course offering not found or no changes made' });
    }

    const updatedOffering = await CourseOffering.findByPk(req.params.id);
    res.json({ message: 'Course offering updated', data: updatedOffering });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a course offering
exports.deleteCourseOffering = async (req, res) => {
  try {
    const deleted = await CourseOffering.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Course offering not found' });
    }

    res.json({ message: 'Course offering deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
