import React, { useState } from "react";
import { Box, Typography, Button, Paper, MenuItem, Select } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Color Palette
const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

// Sample timetable data structure
const timetableData = {
  "Sem 1": {
    "BCA": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    },
    "B.Sc": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    }
  },
  "Sem 2": {
    "BCA": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    },
    "B.Sc": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    }
  },
  "Sem 3": {
    "BCA": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    },
    "B.Sc": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    }
  },
  "Sem 4": {
    "BCA": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    },
    "B.Sc": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    }
  },
  "Sem 5": {
    "BCA": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    },
    "B.Sc": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    }
  },
  "Sem 6": {
    "BCA": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    },
    "B.Sc": {
      Monday: ["Math", "English", "Science", "Break", "History", "Physical Education"],
      Tuesday: ["Biology", "Chemistry", "Math", "Break", "Literature", "Sports"],
      Wednesday: ["Physics", "History", "Geography", "Break", "Music", "Drama"],
      Thursday: ["Math", "History", "Art", "Break", "Physical Education", "Science"],
      Friday: ["English", "Literature", "Math", "Break", "Music", "Sports"],
    }
  },
  
};

const periods = ["I", "II", "III", "IV", "V", "VI"]; // Roman numerals for periods
const semesters = Object.keys(timetableData);
const classes = Object.keys(timetableData[semesters[0]]);

const Timetable = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedClass, setSelectedClass] = useState(classes[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          background: "linear-gradient(to right, #e7cccc, #ede8dc)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        {/* Navigation */}
        <Button
          variant="outlined"
          onClick={() => navigate("/student")}
          sx={{
            position: "absolute",
            top: "10px",
            left: "20px",
            color: "#5a3d31",
            borderColor: "#5a3d31",
            "&:hover": {
              backgroundColor: "#e7dccd",
              borderColor: buttonHoverColor,
            },
          }}
        >
          Home
        </Button>

        {/* Heading */}
        <Typography variant="h5" sx={{ color: "#5a3d31", fontWeight: "bold", marginBottom: "20px" }}>
          Timetable
        </Typography>

        {/* Select Semester & Class */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: "20px" }}>
          <Select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            {semesters.map((sem) => (
              <MenuItem key={sem} value={sem}>{sem}</MenuItem>
            ))}
          </Select>
          <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            {classes.map((cls) => (
              <MenuItem key={cls} value={cls}>{cls}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* Timetable */}
        <Paper elevation={3} sx={{ maxWidth: "90%", padding: "20px", borderRadius: "12px", backgroundColor: primaryColor }}>
          <Box sx={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: secondaryColor }}>
                  <th style={{ padding: "10px", border: "2px solid #5a3d31", fontWeight: "bold" }}>Day</th>
                  {periods.map((period, index) => (
                    <th key={index} style={{ padding: "10px", border: "2px solid #5a3d31", fontWeight: "bold" }}>{period}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(timetableData[selectedSemester][selectedClass]).map((day) => (
                  <tr key={day}>
                    <td style={{ padding: "10px", border: "2px solid #5a3d31", backgroundColor: secondaryColor, fontWeight: "bold" }}>{day}</td>
                    {timetableData[selectedSemester][selectedClass][day].map((subject, index) => (
                      <td key={index} style={{ padding: "10px", border: "2px solid #5a3d31", textAlign: "center" }}>{subject}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Timetable;
