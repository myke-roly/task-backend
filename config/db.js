const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true
		});
		console.log('db Contect');
	} catch (err) {
		console.log(err);
		process.exit(1); //Detenemos la aplicacion
	}
};

module.exports = conectDB;
