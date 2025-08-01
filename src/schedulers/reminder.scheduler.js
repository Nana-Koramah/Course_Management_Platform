const cron = require('node-cron');
const { Op } = require('sequelize');
const ActivityTracker = require('../models/activity_tracker.model');
const CourseOffering = require('../models/course_offering.model');
const Allocation = require('../models/allocation.model');
const Facilitator = require('../models/facilitator.model');
const notificationQueue = require('../queues/notification.queue');

// Run every day at 6 PM
cron.schedule('0 18 * * *', async () => {
  const today = new Date();
  const currentWeek = getCurrentWeek(today);

  const allocations = await Allocation.findAll({
    include: [{ model: Facilitator }],
  });

  for (const alloc of allocations) {
    const existingLog = await ActivityTracker.findOne({
      where: {
        allocationId: alloc.id,
        weekNumber: currentWeek,
      },
    });

    if (!existingLog && alloc.Facilitator?.email) {
      await notificationQueue.add({
        email: alloc.Facilitator.email,
        message: `Reminder: You haven’t submitted your activity log for Week ${currentWeek}.`,
      });
    }
  }

  console.log(` Weekly reminder run at ${today.toISOString()}`);
});

// Week helper
function getCurrentWeek(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = Math.floor((date - start) / (7 * 24 * 60 * 60 * 1000));
  return diff + 1;
}
