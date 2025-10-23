// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['admin','employee','student'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },

  // for employees
  subject: { type: String }, // e.g., "Mathematics"
  phone: { type: String },

  // for students
  studentId: { type: String }, // student unique id
  class: { type: String },
  contact_no: { type: String },
  address: { type: String },
  fees_paid: { type: Number, default: 0 }
},
{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);
