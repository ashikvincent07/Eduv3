import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Select,
  CardContent,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useParams } from "react-router-dom";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

// Mock Data (You can replace this with real API data)
const classroomAssignments = {
  "Class 1": {
    assignments: [
      { id: "assignment1", name: "Math Homework" },
      { id: "assignment2", name: "Science Project" },
    ],
    students: [
      { id: 1, name: "John Doe", assignment1: "", assignment2: "" },
      { id: 2, name: "Jane Smith", assignment1: "", assignment2: "" },
    ],
  },
  "Class 2": {
    assignments: [
      { id: "assignment1", name: "Physics Homework" },
      { id: "assignment2", name: "Biology Project" },
    ],
    students: [
      { id: 3, name: "Peter Parker", assignment1: "", assignment2: "" },
      { id: 4, name: "Mary Jane", assignment1: "", assignment2: "" },
    ],
  },
};

const Assignmark = () => {
  const navigate = useNavigate();
  const { className } = useParams(); // Get class name from URL
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState("assignment1");
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [marks, setMarks] = useState({});
  
  useEffect(() => {
    const classData = classroomAssignments[className];
    if (classData) {
      setAssignments(classData.assignments);
      setStudents(classData.students);
      const initialMarks = classData.students.reduce((acc, student) => {
        acc[student.id] = student[selectedAssignment];
        return acc;
      }, {});
      setMarks(initialMarks);
    }
  }, [className, selectedAssignment]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleHomeNavigate = () => {
    navigate("/teacher");
    handleMenuClose();
  };

  const handleBackNavigate = () => {
    navigate(-1);
    handleMenuClose();
  };

  const handleAssignmentChange = (event) => {
    const newAssignment = event.target.value;
    setSelectedAssignment(newAssignment);
    const updatedMarks = students.reduce((acc, student) => {
      acc[student.id] = student[newAssignment];
      return acc;
    }, {});
    setMarks(updatedMarks);
  };

  const handleMarkChange = (studentId, newMark) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: newMark,
    }));
  };

  const handleSave = () => {
    // Here you can make an API call to save the updated marks
    console.log("Marks saved", marks);
    alert("Marks saved successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
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
          position: "relative",
        }}
      >
        {/* Top Section with Heading and Logo */}
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Assignment Grading
          </Typography>
          <img
            src="/images/edu.png"
            alt="Logo"
            style={{
              height: "auto",
              width: "90px",
              objectFit: "contain",
              marginTop: "5px",
            }}
          />
        </Box>

        {/* Navigation Section */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "10px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          {/* Back Button for Large Screens */}
          {!isSmallScreen && (
            <Button
              variant="outlined"
              onClick={handleBackNavigate}
              sx={{
                color: "#5a3d31",
                borderColor: "#5a3d31",
                "&:hover": {
                  backgroundColor: "#e7dccd",
                  borderColor: buttonHoverColor,
                },
              }}
            >
              Back
            </Button>
          )}

          {/* Home Button for Small Screens */}
          {isSmallScreen ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "#5a3d31" }}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleBackNavigate}>Back</MenuItem>
                <MenuItem onClick={handleHomeNavigate}>Home</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={handleHomeNavigate}
              sx={{
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
          )}
        </Box>

        {/* Assignment Selector */}
        <Box sx={{ mt: 3, width: "90%", maxWidth: "600px" }}>
          <Select
            value={selectedAssignment}
            onChange={handleAssignmentChange}
            fullWidth
            sx={{ backgroundColor: "#ede8dc" }}
          >
            {assignments.map((assignment) => (
              <MenuItem key={assignment.id} value={assignment.id}>
                {assignment.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Table for Student Data */}
        <Box sx={{ mt: 4, width: "90%", maxWidth: "600px" }}>
          <TableContainer component={Card}>
            <Table sx={{ backgroundColor: secondaryColor }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#5a3d31" }}>
                    Student Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#5a3d31" }}>
                    File
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#5a3d31" }}>
                    Mark
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student[selectedAssignment]}</TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={marks[student.id] || ""}
                        onChange={(e) =>
                          handleMarkChange(student.id, e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            "& fieldset": {
                              borderColor: "#5a3d31",
                            },
                            "&:hover fieldset": {
                              borderColor: buttonHoverColor,
                            },
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Save Button */}
        <Box sx={{ mt: 2, width: "90%", maxWidth: "600px", textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#5a3d31",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: buttonHoverColor,
              },
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Assignmark;
