const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

   /** Validamos que el token sea el correcto */
   const token = req.header('x-auth-token');
   if(!token) {
      return res.status(400).json({ message: "Token no valido, permiso denegado"});
   }
   try {
      /** cifrar al creador del proyecto */
      const cifradoCreator = jwt.verify(token, process.env.WORD_SECRET);
      req.user = cifradoCreator.user;

      next();
   } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Token no valido"});
   }
}