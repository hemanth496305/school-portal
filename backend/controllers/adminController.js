import Admin from "../models/adminModel.js";
import Employee from "../models/employeeModel.js";
import Student from "../models/studentModel.js";
import Subject from "../models/subjectModel.js";
import Timetable from "../models/timetableModel.js";

export const getDashboard = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalEmployees = await Employee.countDocuments();
    res.json({ totalStudents, totalEmployees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

