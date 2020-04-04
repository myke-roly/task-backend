const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.post(
	'/',
	[
		/** Validacion de los datos */
		check('email', 'Ingrese un email valido').isEmail(),
		check('password', 'La contrase;a debe ser mayor a 6 caracteres').isLength({ min: 6 })
	],
	authController.authUser
);

module.exports = router;
