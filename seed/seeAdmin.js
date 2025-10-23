// seed/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/school_db';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@school.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function seed() {
  await mongoose.connect(MONGO_URI);
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = new User({
    role: 'admin',
    name: 'Super Admin',
    email: ADMIN_EMAIL,
    password: hashed
  });
  await admin.save();
  console.log('Admin user created:', ADMIN_EMAIL, ADMIN_PASSWORD);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
