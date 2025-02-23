const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Announcement = require("../models/announcement");
const Classroom = require("../models/Classroom"); 
const upload = require("../middleware/upload");

// ✅ Create an announcement
router.post("/create", upload.single("image"), async (req, res) => {
    console.log("Received request body:", req.body); // ✅ Add this line for debugging
  
    const { classId, heading, text, teacherId } = req.body;
  
    if (!teacherId) {
      return res.status(400).json({ error: "Teacher ID is required." });
    }
  
    try {
      const announcement = new Announcement({
        classId,
        heading,
        text,
        teacherId,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      });
  
      await announcement.save();
      res.status(201).json({ message: "Announcement created successfully!", announcement });
    } catch (error) {
      console.error("Error creating announcement:", error);
      res.status(500).json({ error: "Failed to create announcement." });
    }
  });
  

// ✅ Get announcements for a specific class
router.get("/fetchann", async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("classId", "semester batch subject") // Fetch semester, batch, and subject from Classroom
      .populate("teacherId", "name") // Fetch only name from User
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Announcements fetched successfully",
      announcements: announcements.map((ann) => ({
        _id: ann._id,
        heading: ann.heading,
        text: ann.text,
        imageUrl: ann.imageUrl || null,
        teacherName: ann.teacherId ? ann.teacherId.name : "Unknown",
        semester: ann.classId ? ann.classId.semester : "Unknown",
        batch: ann.classId ? ann.classId.batch : "Unknown",
        subject: ann.classId ? ann.classId.subject : "Unknown",
        createdAt: ann.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements", error });
  }
});

// ✅ Update an announcement (Supports Image Upload)
router.put("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, text } = req.body;

    let announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    // Prepare update data
    let updateData = { heading, text };

    // If a new image is uploaded, replace the old one
    if (req.file) {
      // Delete old image if exists
      if (announcement.imageUrl) {
        const fs = require("fs");
        const path = require("path");
        const oldImagePath = path.join(__dirname, "..", "uploads", path.basename(announcement.imageUrl));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete old image
        }
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    // Update the announcement
    announcement = await Announcement.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ message: "Announcement updated successfully", announcement });
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({ error: "Failed to update announcement." });
  }
});

// ✅ Delete an announcement
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    // If an image exists, delete it from the uploads folder
    if (announcement.imageUrl) {
      const fs = require("fs");
      const path = require("path");
      const imagePath = path.join(__dirname, "..", "uploads", path.basename(announcement.imageUrl));
      
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Remove image file
      }
    }

    // Delete announcement from the database
    await Announcement.findByIdAndDelete(id);

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ error: "Failed to delete announcement." });
  }
});

// Get announcements for a student
router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find all classrooms the student has joined
    const classrooms = await Classroom.find({ approvedStudents: studentId });

    // Extract classroom IDs
    const classIds = classrooms.map((classroom) => classroom._id);

    // Fetch announcements for these classrooms
    const announcements = await Announcement.find({ classId: { $in: classIds } })
      .sort({ createdAt: -1 }) // Sort by latest
      .populate("classId", "semester batch subject");

    res.json(announcements);
  } catch (error) {
    console.error("Error fetching student announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
