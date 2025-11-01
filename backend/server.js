const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===== MongoDB Connection =====
// Since MongoDB is running in Docker with container name "mongodb"
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ===== Schemas & Models =====
const adminSchema = new mongoose.Schema({ username: String, password: String });
const teacherSchema = new mongoose.Schema({ username: String, password: String });
const studentSchema = new mongoose.Schema({ username: String, password: String });

const Admin = mongoose.model('Admin', adminSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const Student = mongoose.model('Student', studentSchema);

// ===== Generic Signup/Login Handler =====
async function handleSignup(Model, req, res) {
  try {
    const { username, password } = req.body;
    const existingUser = await Model.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new Model({ username, password });
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
}

async function handleLogin(Model, req, res) {
  try {
    const { username, password } = req.body;
    const user = await Model.findOne({ username, password });
    if (!user)
      return res.status(400).json({ message: "Invalid username or password" });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
}

// ===== Routes =====

// Admin
app.post('/api/admin/signup', (req, res) => handleSignup(Admin, req, res));
app.post('/api/admin/login', (req, res) => handleLogin(Admin, req, res));

// Teacher
app.post('/api/teacher/signup', (req, res) => handleSignup(Teacher, req, res));
app.post('/api/teacher/login', (req, res) => handleLogin(Teacher, req, res));

// Student
app.post('/api/student/signup', (req, res) => handleSignup(Student, req, res));
app.post('/api/student/login', (req, res) => handleLogin(Student, req, res));

app.get('/', (req, res) => {
  res.status(200).send('<h2>✅ School Portal Backend is running successfully 🚀</h2>');
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));

