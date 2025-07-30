const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');
const { authenticate, authorizeManager } = require('../middlewares/auth.middleware');

router.get('/', authenticate, managerController.getManagers);
router.get('/:id', authenticate, managerController.getManagerById);
router.post('/', authenticate, authorizeManager, managerController.createManager);
router.put('/:id', authenticate, authorizeManager, managerController.updateManager);
router.delete('/:id', authenticate, authorizeManager, managerController.deleteManager);

module.exports = router;
