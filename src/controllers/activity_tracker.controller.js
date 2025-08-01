const { ActivityTracker, Allocation, Facilitator } = require('../models');
const { Op } = require('sequelize');
const notificationQueue = require('../queues/notification.queue');
const Manager = require('../models/manager.model');

// Create or update a log (upsert)
exports.submitActivityLog = async (req, res) => {
  try {
    const {
      allocationId,
      weekNumber,
      facilitatorId,
      attendance,
      formativeOneGrading,
      formativeTwoGrading,
      summativeGrading,
      courseModeration,
      intranetSync,
      gradeBookStatus
    } = req.body;

    const existing = await ActivityTracker.findOne({ where: { allocationId, weekNumber } });

    if (existing) {
      await existing.update({
        allocationId,
        weekNumber,
        facilitatorId,
        attendance,
        formativeOneGrading,
        formativeTwoGrading,
        summativeGrading,
        courseModeration,
        intranetSync,
        gradeBookStatus
      });

      return res.status(200).json({ message: 'Activity log updated', log: existing });
    }

    const newLog = await ActivityTracker.create({
      allocationId,
      weekNumber,
      facilitatorId,
      attendance,
      formativeOneGrading,
      formativeTwoGrading,
      summativeGrading,
      courseModeration,
      intranetSync,
      gradeBookStatus
    });

   
    await notificationQueue.add({
      type: 'log-submission',
      facilitatorId: req.user.facilitatorId,
      message: `Activity log submitted for Week ${weekNumber}`,
    });

    res.status(201).json({ message: 'Activity log submitted', log: newLog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all logs (Managers)
exports.getAllLogs = async (req, res) => {
  try {
    const { weekNumber, status } = req.query;
    const filters = {};

    if (weekNumber) filters.weekNumber = weekNumber;
    if (status) {
      filters[Op.or] = [
        { formativeOneGrading: status },
        { formativeTwoGrading: status },
        { summativeGrading: status },
        { courseModeration: status },
        { intranetSync: status },
        { gradeBookStatus: status }
      ];
    }

    const logs = await ActivityTracker.findAll({ where: filters });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get facilitator logs
exports.getFacilitatorLogs = async (req, res) => {
  try {
    const facilitatorId = req.user.facilitatorId;
    console.log('Fetching logs for facilitatorId:', facilitatorId);

    const logs = await ActivityTracker.findAll({
      include: [{
        model: Allocation,
        where: { facilitatorId: req.user.facilitatorId },
        attributes: ['id', 'term'], 
      }],
      order: [['weekNumber', 'DESC']]
    });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a log (Facilitator or Manager)
exports.deleteLog = async (req, res) => {
  try {
    const log = await ActivityTracker.findByPk(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });

    await log.destroy();
    res.status(200).json({ message: 'Log deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logActivity = async (req, res) => {
  try {
    const activity = await ActivityTracker.create(req.body);

    // Send notification to manager
    const manager = await Manager.findOne(); 
    if (manager?.email) {
      await notificationQueue.add({
        email: manager.email,
        message: `ALERT: ${req.user.name} submitted activity for ${activity.weekNumber}.`,
      });
    }

    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};