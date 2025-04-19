const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]+$/, // Alphanumeric validation
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Basic email regex
  },
  dob: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  enrollmentYear: {
    type: Number,
    required: true,
    min: 2000,
    max: currentYear,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;