const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: String,
    subject:String,
    gender: String,
    dob: Date,
    contact: String,
    feesPaid: Boolean,
    class: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class',
    },
    assignedTeachers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Class' } // Reference to the Class model
    ],
  });
  module.exports = mongoose.model('Student', StudentSchema);
  