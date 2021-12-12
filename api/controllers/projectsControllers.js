const User = require('../models/User');

exports.createProject = async (req, res) => {
	/** datos del usuario que quiere authentificarse */
	const { email, password } = req.body;
   
	try {
      return res.json({ message: req.body});
	} catch (error) {
		console.log(error);
	}
};
