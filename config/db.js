const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		console.log('db Contect');
	} catch (err) {
		console.log(err);
		/** si falla la conexion detenemos la aplicacion */
		process.exit(1);
	}
};

module.exports = conectDB;
