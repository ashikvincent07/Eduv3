const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true },
  heading: { type: String, required: true },
  text: { type: String },
  imageUrl: { type: String }, // Image URL if uploaded
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
