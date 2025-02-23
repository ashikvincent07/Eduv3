const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Classroom = require("../models/Classroom");
const Note = require("../models/Note");

// ✅ Upload a Note (using a URL link instead of a file)
router.post("/upload", async (req, res) => {
  try {
    console.log("Request received:", req.body);

    const { classId, teacherId, heading, fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ error: "File URL is required." });
    }

    const note = new Note({
      classId,
      teacherId,
      heading,
      fileUrl, // Here, we use the URL directly
    });

    await note.save();
    res.status(201).json({ message: "Note uploaded successfully!", note });
  } catch (error) {
    console.error("Error uploading note:", error);
    res.status(500).json({ error: "Failed to upload note." });
  }
});

  
  

// Fetch notes by teacher ID
router.get("/fetchnotes/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Ensure teacherId is valid
    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    // Fetch notes along with class details
    const notes = await Note.find({ teacherId }).populate({
      path: "classId",
      select: "semester batch subject", // Select only required fields
    });

    if (!notes.length) {
      return res.status(404).json({ message: "No notes found" });
    }

    // Format response to include class details
    const formattedNotes = notes.map((note) => ({
      _id: note._id,
      teacherId: note.teacherId,
      heading: note.heading,
      fileUrl: note.fileUrl,
      createdAt: note.createdAt,
      semester: note.classId?.semester || "N/A",
      batch: note.classId?.batch || "N/A",
      subject: note.classId?.subject || "N/A",
    }));

    res.json(formattedNotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Edit Note
router.put("/edit/:id", async (req, res) => {
  try {
    const { heading, fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ error: "File URL is required." });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { heading, fileUrl },
      { new: true }
    );

    res.status(200).json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Failed to update note." });
  }
});


// ✅ DELETE Note by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Delete the associated file from the server
    const filePath = path.join(__dirname, "..", note.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Failed to delete note" });
  }
});

router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find all classrooms the student has joined
    const classrooms = await Classroom.find({ approvedStudents: studentId });

    if (!classrooms.length) {
      return res.status(404).json({ message: "No classrooms found for the student." });
    }

    // Extract classroom IDs
    const classIds = classrooms.map((classroom) => classroom._id);

    // Fetch notes for these classrooms
    const notes = await Note.find({ classId: { $in: classIds } })
      .sort({ createdAt: -1 }) // Sort by latest
      .populate("classId", "subject semester batch") // Get classroom details
      .populate("teacherId", "name email"); // Get teacher details

    res.json(notes);
  } catch (error) {
    console.error("Error fetching student notes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
