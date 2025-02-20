const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/authroutes");
const classroomRoutes = require("./routes/classroomRoutes"); // Import Classroom Routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/classrooms", classroomRoutes); // Add Classroom Routes

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`MongoDB Connected`);
    console.log(`Server running on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));
