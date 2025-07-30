const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

// GET routes – accessible by both managers and facilitators
router.get('/', authenticate, authorizeRoles(['manager', 'facilitator']), studentController.getStudents);
router.get('/:id', authenticate, authorizeRoles(['manager', 'facilitator']), studentController.getStudentById);

// POST, PUT, DELETE – only accessible by managers
router.post('/', authenticate, authorizeRoles(['manager']), studentController.createStudent);
router.put('/:id', authenticate, authorizeRoles(['manager']), studentController.updateStudent);
router.delete('/:id', authenticate, authorizeRoles(['manager']), studentController.deleteStudent);

module.exports = router;

