const express = require('express');
const router = express.Router();
const projectsControllers = require('../controllers/projectsControllers');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.get('/', auth, projectsControllers.getProjects);

router.post('/',
	auth,
	[check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()],
	projectsControllers.createProject
);

router.put('/:id', 
	auth,
	[check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()],
	projectsControllers.updateProject
);

router.delete('/:id',
	auth,
	projectsControllers.deleteProject
);

module.exports = router;
