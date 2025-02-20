const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  batch: { type: String, required: true },
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  teacherName: { type: String, required: true }, 
  studentsPendingApproval: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // New Field
  approvedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // New Field
});

module.exports = mongoose.model("Classroom", ClassroomSchema);
