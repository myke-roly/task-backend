const express = require('express');
const router = express.Router();
const projectsControllers = require('../controllers/projectsControllers');

router.post('/', projectsControllers.createProject);

module.exports = router;
