const mongoose = require('mongoose');

const projectsSchema = mongoose.Schema({
   name: {
      type: String,
      require: true,
      trim: true
   },
   creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   date_create: {
      type: Date,
      default: Date.now()
   }
});


module.exports = mongoose.model('project', projectsSchema);