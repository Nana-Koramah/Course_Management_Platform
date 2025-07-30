const express = require('express');
const router = express.Router();
const cohortController = require('../controllers/cohort.controller');
const { authenticate, authorizeManager } = require('../middlewares/auth.middleware');

router.get('/', authenticate, cohortController.getCohorts);
router.get('/:id', authenticate, cohortController.getCohortById);
router.post('/', authenticate, authorizeManager, cohortController.createCohort);
router.put('/:id', authenticate, authorizeManager, cohortController.updateCohort);
router.delete('/:id', authenticate, authorizeManager, cohortController.deleteCohort);

module.exports = router;
