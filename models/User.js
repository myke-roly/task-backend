const moongose = require('mongoose');

const UsersSchema = moongose.Schema({
	name: {
      type: String,
      trim: true,
      require: true
   },
   email: {
      type: String,
      trim: true,
      require: true,
      unique: true
   },
   password: {
      type: String,
      trim: true,
      require: true
   },
   register: {
      type: Date,
      default: Date.now()
   }
});

module.exports = moongose.model('User', UsersSchema);