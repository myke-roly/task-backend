const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUser = async (req, res) => {
   // validar errores de los datos ingresados
   const errors = validationResult(req);
   
   if(!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()})
   }

   /** datos del nuevo usuario */
   const { email, password } = req.body;
   
	try {
      /** validar que no exista un usuario con el mismo email */
      let user = await User.findOne({ email });
      
      if(user) {
         return res.status(400).json({ message: "El usuario ya ha sido registrado!"});
      }

      /** Crear nuevo usuario si no existe uno con el mismo email */
      user = new User(req.body);
      // encriptar password del nuevo usuario
      const salt = bcryptjs.genSaltSync(10);
      user.password = await bcryptjs.hash(password, salt);

      // Autenticacion jwt
      const payload = {
         user: {
            id: user.id
         }
      }

      jwt.sign(payload, process.env.WORD_SECRET, {
         expiresIn: 3600 // la autenticacion dura 1 hora.
      }, (error, token) => {
         if(error) throw Error(error);

         res.send({ token: token, user });
      })
      
      /** Guardar datos del nuevo usuario */
      await user.save();
	} catch (error) {
      console.log(error);
		res.status(403).send('No se Pudo Gurdar nada');
	}
};
