// models/Timetable.js
const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  class: { type: String, required: true },
  day: { type: String, required: true }, // e.g., Monday
  time: { type: String, required: true }, // e.g., 09:00-10:00
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }
});

module.exports = mongoose.model('Timetable', TimetableSchema);
