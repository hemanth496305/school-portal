// routes/student.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const Timetable = require('../models/Timetable');
const Subject = require('../models/Subject');

// student: view profile
router.get('/me', authenticate, authorizeRoles('student'), async (req, res) => {
  res.json(req.user);
});

// student: view fees
router.get('/fees', authenticate, authorizeRoles('student'), async (req, res) => {
  res.json({ fees_paid: req.user.fees_paid });
});

// student: view timetable for their class
router.get('/timetable', authenticate, authorizeRoles('student'), async (req, res) => {
  const cls = req.user.class;
  if (!cls) return res.status(400).json({ message: 'Student has no class assigned' });
  const tts = await Timetable.find({ class: cls }).populate('subject');
  res.json(tts);
});

module.exports = router;
