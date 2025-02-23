const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/authroutes");
const classroomRoutes = require("./routes/classroomRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const notesRoutes = require("./routes/noteRoutes");


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/notes", notesRoutes);
app.use("/api/announcements", announcementRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`MongoDB Connected`);
    console.log(`Server running on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));
