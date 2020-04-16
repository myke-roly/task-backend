const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
	name: {
      type: String,
      require: true,
   },
   state: {
      type: Boolean,
      default: false
   },
   creator: {
      type: Date,
      default: Date.now()
   },
   project: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'project'
   }
});

module.exports = mongoose.model('task', tasksSchema );