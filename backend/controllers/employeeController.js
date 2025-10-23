import Employee from "../models/employeeModel.js";
import Timetable from "../models/timetableModel.js";

export const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ teacher: req.user.id }).populate("subject");
    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

