import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  timetable: [{ day: String, time: String, class: String }],
  username: { type: String, unique: true },
  password: String
});

export default mongoose.model("Employee", employeeSchema);

