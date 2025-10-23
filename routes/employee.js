// routes/employee.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const Subject = require('../models/Subject');
const Timetable = require('../models/Timetable');
const User = require('../models/User');

// employee: view assigned subjects
router.get('/my-subjects', authenticate, authorizeRoles('employee'), async (req, res) => {
  const subs = await Subject.find({ teacher: req.user._id });
  res.json(subs);
});

// employee: view timetable for classes they teach (look up subjects)
router.get('/my-timetable', authenticate, authorizeRoles('employee'), async (req, res) => {
  const subs = await Subject.find({ teacher: req.user._id });
  const subIds = subs.map(s => s._id);
  const tts = await Timetable.find({ subject: { $in: subIds } }).populate('subject');
  res.json(tts);
});

// employee: update their own profile
router.put('/me', authenticate, authorizeRoles('employee'), async (req, res) => {
  const { name, phone, subject } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.subject = subject || user.subject;
  await user.save();
  res.json({ message: 'Profile updated', user });
});

module.exports = router;
