// routes/admin.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Subject = require('../models/Subject');
const Timetable = require('../models/Timetable');
const { authenticate } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');

// Add employee (admin only)
router.post('/employee', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const { name, email, password, subject, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password required' });
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const hashed = await bcrypt.hash(password, 10);
    const employee = new User({ role: 'employee', name, email, password: hashed, subject, phone });
    await employee.save();
    res.json({ message: 'Employee created', employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add student (admin only)
router.post('/student', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const { name, email, password, studentId, class: cls, contact_no, address, fees_paid } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password required' });
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const hashed = await bcrypt.hash(password, 10);
    const student = new User({
      role: 'student',
      name,
      email,
      password: hashed,
      studentId,
      class: cls,
      contact_no,
      address,
      fees_paid: fees_paid || 0
    });
    await student.save();
    res.json({ message: 'Student created', student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create subject and assign teacher
router.post('/subject', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const { name, teacherId } = req.body;
    if (!name) return res.status(400).json({ message: 'subject name required' });
    const subject = new Subject({ name, teacher: teacherId });
    await subject.save();
    res.json({ message: 'Subject created', subject });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create timetable entry
router.post('/timetable', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const { class: cls, day, time, subjectId } = req.body;
    if (!cls || !day || !time || !subjectId) return res.status(400).json({ message: 'class, day, time, subjectId required' });
    const tt = new Timetable({ class: cls, day, time, subject: subjectId });
    await tt.save();
    res.json({ message: 'Timetable saved', tt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: list students
router.get('/students', authenticate, authorizeRoles('admin'), async (req, res) => {
  const students = await User.find({ role: 'student' }).select('-password');
  res.json(students);
});

// Admin: list employees
router.get('/employees', authenticate, authorizeRoles('admin'), async (req, res) => {
  const employees = await User.find({ role: 'employee' }).select('-password');
  res.json(employees);
});

module.exports = router;
