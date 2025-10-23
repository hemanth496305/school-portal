import Student from "../models/studentModel.js";
import Timetable from "../models/timetableModel.js";

export const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ className: req.user.className }).populate("subject");
    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

