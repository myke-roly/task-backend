const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');
const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

router.post('/',
	[
      /** Validacion de los datos */
		check('name', 'El nombre no puede estar vacio').not().isEmpty(),
      check('email', 'Ingrese un email valido').isEmail(), //.matches(regEx)
		check('password', 'La contrase;a debe ser mayor a 6 caracteres').isLength({min: 6})
	],
	usersController.crearUser
);

module.exports = router;
