const cron = require('node-cron');
const { ActivityTracker, Allocation, Facilitator } = require('../models');
const notificationQueue = require('../queues/notification.queue');
const { Op } = require('sequelize');

cron.schedule('0 18 * * 0', async () => {
  console.log(' Checking missed activity logs...');

  try {
    const currentWeek = getCurrentWeekNumber();
    const allocations = await Allocation.findAll({ include: [Facilitator] });

    for (const alloc of allocations) {
      const log = await ActivityTracker.findOne({
        where: {
          allocationId: alloc.id,
          weekNumber: currentWeek
        }
      });

      if (!log && alloc.Facilitator?.email) {
        const facilitatorName = alloc.Facilitator.name || 'Facilitator';

        // Notify the facilitator
        await notificationQueue.add({
          email: alloc.Facilitator.email,
          message: `Reminder: You haven’t submitted your activity log for Week ${currentWeek}.`,
        });

        // Notify the manager 
        await notificationQueue.add({
          email: 'manager@example.com', 
          message: `${facilitatorName} has missed their activity log submission for Week ${currentWeek}.`,
        });

        console.log(` Notification sent to ${alloc.Facilitator.email} and manager`);
      }
    }
  } catch (err) {
    console.error(' Error checking missed logs:', err);
  }
});

function getCurrentWeekNumber() {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
}
