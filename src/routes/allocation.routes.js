const express = require('express');
const router = express.Router();
const allocationController = require('../controllers/allocation.controller');
const { authenticate, authorizeManager } = require('../middlewares/auth.middleware');

// Public (or protected) view
router.get('/', authenticate, allocationController.getAllocations);
router.get('/:id', authenticate, allocationController.getAllocationById);
router.get('/facilitator/dashboard', authenticate, allocationController.facilitatorDashboard);


// Manager-only
router.get('/manager/dashboard', authenticate, authorizeManager, allocationController.managerDashboard);
router.post('/', authenticate, authorizeManager, allocationController.createAllocation);
router.put('/:id', authenticate, authorizeManager, allocationController.updateAllocation);
router.delete('/:id', authenticate, authorizeManager, allocationController.deleteAllocation);

module.exports = router;