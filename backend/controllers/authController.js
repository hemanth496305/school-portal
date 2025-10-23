import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import Employee from "../models/employeeModel.js";
import Student from "../models/studentModel.js";

export const loginUser = async (req, res) => {
  const { role, username, password } = req.body;

  try {
    let user;
    if (role === "admin") user = await Admin.findOne({ username });
    else if (role === "employee") user = await Employee.findOne({ username });
    else if (role === "student") user = await Student.findOne({ username });

    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

