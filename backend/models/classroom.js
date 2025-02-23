const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  batch: { type: String, required: true },
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  teacherName: { type: String, required: true }, 
  studentsPendingApproval: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  approvedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// ✅ Check if model already exists before defining it
module.exports = mongoose.models.Classroom || mongoose.model("Classroom", ClassroomSchema);
