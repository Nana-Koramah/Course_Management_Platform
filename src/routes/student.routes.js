const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { authenticate, authorizeManager } = require('../middlewares/auth.middleware');

router.get('/', authenticate, studentController.getStudents);
router.get('/:id', authenticate, studentController.getStudentById);
router.post('/', authenticate, authorizeManager, studentController.createStudent);
router.put('/:id', authenticate, authorizeManager, studentController.updateStudent);
router.delete('/:id', authenticate, authorizeManager, studentController.deleteStudent);

module.exports = router;
