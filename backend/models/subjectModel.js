import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }
});

export default mongoose.model("Subject", subjectSchema);

