import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  className: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  day: String,
  time: String
});

export default mongoose.model("Timetable", timetableSchema);

