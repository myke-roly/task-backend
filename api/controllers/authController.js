const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
	// validar errores de autenticacion
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() });
	}

	/** datos del usuario que quiere authentificarse */
	const { email, password } = req.body;

	try {
		/** Buscar si existe el usuario */
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'El usuario no existe' });
		}

		/** validar que la contrasena sea igual */
		const correctPass = await bcryptjs.compare(password, user.password);

		if (!correctPass) {
			return res.status(400).json({ message: 'Contrase;s Incorrecta' });
		}

		/** Crear Y firma el JWT */
		const payload = {
			id: user.id
      };
      
      jwt.sign(payload, process.env.WORD_SECRET, {
         expiresIn: 3600
      }, (error, token) => {
			if(error) throw error;
			return res.status(200).json({ token, message: user });
      });
	} catch (error) {
		console.log(error);
		res.status(403).send('No se Pudo autenticar');
	}
};
