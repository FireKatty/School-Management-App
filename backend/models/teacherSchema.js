const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: String,
  subject:String,
  gender: String,
  dob: Date,
  contact: String,
  salary: Number,
  assignedClasses: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Class' } // Reference to the Class model
  ],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model('Teacher', TeacherSchema);
