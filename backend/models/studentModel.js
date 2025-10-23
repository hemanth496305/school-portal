import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  contact: String,
  address: String,
  className: String,
  feesPaid: Boolean,
  username: { type: String, unique: true },
  password: String
});

export default mongoose.model("Student", studentSchema);

