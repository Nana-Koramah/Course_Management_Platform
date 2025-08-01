const notificationQueue = require('../queues/notification.queue');

notificationQueue.process(async (job) => {
  const { email, message } = job.data;
  console.log(` Sending reminder to ${email}: ${message}`);

  // Simulate delay for processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
});

console.log(' Notification worker started...');
