const express = require("express");
const router = express.Router();
const Classroom = require("../models/classroom");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// ✅ Create Classroom (Authenticated)
router.post("/create", verifyToken, async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id).select("name");
    if (!teacher) return res.status(404).json({ message: "User not found" });

    const { semester, batch, subject } = req.body;
    if (!semester || !batch || !subject) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingClassroom = await Classroom.findOne({
      semester,
      batch,
      subject,
      teacherId: teacher._id,
    });

    if (existingClassroom) {
      return res.status(400).json({ message: "Classroom already exists" });
    }

    const newClassroom = new Classroom({
      semester,
      batch,
      subject,
      teacherId: teacher._id,
      teacherName: teacher.name,
    });

    await newClassroom.save();
    res.status(201).json(newClassroom);
  } catch (error) {
    console.error("Error creating classroom:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get All Classrooms (Filtered for students who haven't joined)
router.get("/classes", verifyToken, async (req, res) => {
  try {
    const studentId = req.user.id;
    const classrooms = await Classroom.find({
      approvedStudents: { $ne: studentId },
    }).populate("teacherId", "name");

    const formattedClasses = classrooms.map((cls) => ({
      _id: cls._id,
      subject: cls.subject,
      semester: cls.semester,
      batch: cls.batch,
      teacher: cls.teacherId ? cls.teacherId.name : "Unknown",
    }));

    res.json(formattedClasses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classrooms", error: error.message });
  }
});

// ✅ Student Requests to Join a Classroom
router.post("/join/:classroomId", verifyToken, async (req, res) => {
  try {
    const studentId = req.user.id;
    const classroom = await Classroom.findById(req.params.classroomId);

    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    if (classroom.studentsPendingApproval.includes(studentId)) {
      return res.status(400).json({ message: "Request already sent" });
    }

    classroom.studentsPendingApproval.push(studentId);
    await classroom.save();

    res.status(200).json({ message: "Join request sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending join request", error: error.message });
  }
});

// ✅ Teacher Approves Student Request
router.post("/approve/:classroomId/:studentId", verifyToken, async (req, res) => {
  try {
    const teacherId = req.user.id;
    const classroom = await Classroom.findById(req.params.classroomId);

    if (!classroom) return res.status(404).json({ message: "Classroom not found" });
    if (classroom.teacherId.toString() !== teacherId) {
      return res.status(403).json({ message: "Unauthorized to approve requests" });
    }

    const studentId = req.params.studentId;
    if (!classroom.studentsPendingApproval.includes(studentId)) {
      return res.status(400).json({ message: "Student did not request to join" });
    }

    classroom.studentsPendingApproval = classroom.studentsPendingApproval.filter(
      (id) => id.toString() !== studentId
    );
    classroom.approvedStudents.push(studentId);
    await classroom.save();

    res.status(200).json({ message: "Student approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error approving student", error: error.message });
  }
});

// ✅ Teacher Declines Student Request (NEW)
router.post("/decline/:classroomId/:studentId", verifyToken, async (req, res) => {
  try {
    const teacherId = req.user.id;
    const classroom = await Classroom.findById(req.params.classroomId);

    if (!classroom) return res.status(404).json({ message: "Classroom not found" });
    if (classroom.teacherId.toString() !== teacherId) {
      return res.status(403).json({ message: "Unauthorized to decline requests" });
    }

    const studentId = req.params.studentId;
    const initialLength = classroom.studentsPendingApproval.length;

    // Remove student from pending list
    classroom.studentsPendingApproval = classroom.studentsPendingApproval.filter(
      (id) => id.toString() !== studentId
    );

    if (classroom.studentsPendingApproval.length === initialLength) {
      return res.status(400).json({ message: "Student not found in pending list" });
    }

    await classroom.save();
    res.status(200).json({ message: "Student declined successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error declining student", error: error.message });
  }
});

// ✅ Get Students Pending Approval for a Classroom
router.get("/pending/:classroomId", verifyToken, async (req, res) => {
  try {
    const teacherId = req.user.id;
    const classroom = await Classroom.findById(req.params.classroomId)
      .populate("studentsPendingApproval", "name email batch semester");

    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    if (classroom.teacherId.toString() !== teacherId) {
      return res.status(403).json({ message: "Unauthorized to view pending students" });
    }

    res.status(200).json({ 
      subject: classroom.subject,
      batch: classroom.batch || "N/A",
      semester: classroom.semester || "N/A",
      pendingStudents: classroom.studentsPendingApproval 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending students", error: error.message });
  }
});

// ✅ Get Teacher's Classes
router.get("/teacher/classes", verifyToken, async (req, res) => {
  try {
    const teacherId = req.user.id;
    const classes = await Classroom.find({ teacherId }).select("subject semester batch");

    res.json({ classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get Approved Students in a Classroom
router.get("/:classroomId/students", verifyToken, async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.classroomId).populate(
      "approvedStudents",
      "name email batch semester"
    );
    
    if (!classroom) return res.status(404).json({ message: "Classroom not found" });
    
    res.status(200).json({
      subject: classroom.subject,
      batch: classroom.batch,
      semester: classroom.semester,
      approvedStudents: classroom.approvedStudents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

// ✅ Remove (Kick Out) a Student from Classroom
router.delete("/:classId/remove/:studentId", async (req, res) => {
  const { classId, studentId } = req.params;
  try {
    const classroom = await Classroom.findById(classId);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    classroom.approvedStudents = classroom.approvedStudents.filter(
      (student) => student._id.toString() !== studentId
    );

    await classroom.save();
    res.status(200).json({ message: "Student removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/:classId", async (req, res) => {
  const { classId } = req.params;
  const classroom = await Classroom.findById(classId);
  if (!classroom) {
    return res.status(404).json({ message: "Classroom not found" });
  }
  res.json(classroom);
});


router.get("/students/:studentId/classes", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    // Find all classrooms where the student is in approvedStudents
    const classes = await Classroom.find({ approvedStudents: studentId });

    if (!classes.length) {
      return res.status(404).json({ message: "No classes found" });
    }

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
