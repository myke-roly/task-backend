const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/tasksControllers');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post(
	'/',
	auth,
	[
		check('name', 'El nombre de la tarea es obligatorio').not().isEmpty(),
		check('project', 'Elija un proyecto').not().isEmpty(),
	],
	taskControllers.createTask
);

router.get('/', auth, taskControllers.getTasks);

router.put('/:id', auth, taskControllers.updateTask);

router.delete('/:id', auth, taskControllers.deleteTask);

module.exports = router;
