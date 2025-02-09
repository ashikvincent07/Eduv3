import React, { useState } from "react";
import { Box, Typography, Button, Paper, IconButton, Menu, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

// Color Palette
const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

// Timetable data (for periods and subjects)
const timetableData = {
  Monday: [
    "Math", "English", "Science", "Break", "History", "Physical Education",
  ],
  Tuesday: [
    "Biology", "Chemistry", "Math", "Break", "Literature", "Sports",
  ],
  Wednesday: [
    "Physics", "History", "Geography", "Break", "Music", "Drama",
  ],
  Thursday: [
    "Math", "History", "Art", "Break", "Physical Education", "Science",
  ],
  Friday: [
    "English", "Literature", "Math", "Break", "Music", "Sports",
  ],
};

const periods = ["I", "II", "III", "IV", "V", "VI"]; // Roman numerals for periods

const Timetable = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleHomeNavigate = () => {
    navigate("/teacher"); // Navigate to the home page
  };

  const handleEditTimetableNavigate = () => {
    navigate("/teacher/timetable/edit"); // Navigate to edit timetable page
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}  // Start below the screen
      animate={{ opacity: 1, y: 0 }}   // Slide to the center
      exit={{ opacity: 0, y: 50 }}     // Slide back down when leaving
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
        {/* Responsive Buttons and Logo */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: "20px", // Home button to top left corner
            display: { xs: "none", md: "block" }, // Hide on small screens
          }}
        >
              <Button
            variant="outlined"
            onClick={handleEditTimetableNavigate}
            sx={{
              color: "#5a3d31",
              borderColor: "#5a3d31",
              "&:hover": {
                backgroundColor: "#e7dccd",
                borderColor: buttonHoverColor,
              },
            }}
          >
            Edit Timetable
          </Button>
         
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "20px", // Edit Timetable button to top right corner
            display: { xs: "none", md: "block" }, // Hide on small screens
          }}
        >
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
        </Box>

        {/* Dropdown Menu for Small Screens */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "20px",
            display: { xs: "block", md: "none" }, // Show only on small screens
          }}
        >
          <IconButton onClick={handleMenuClick} sx={{ color: "#5a3d31" }}>
          <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor: primaryColor,
                color: "#5a3d31",
              },
            }}
          >
            <MenuItem onClick={handleHomeNavigate}>Home</MenuItem>
            <MenuItem onClick={handleEditTimetableNavigate}>Edit Timetable</MenuItem>
          </Menu>
        </Box>

        {/* Heading and Logo Section */}
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#5a3d31",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Timetable
          </Typography>
          <img
            src="../images/edu.png"
            alt="Logo"
            style={{
              height: "auto",
              width: "90px", // Logo size is reduced
              objectFit: "contain",
              marginTop: "", // Space between the heading and logo
            }}
          />
        </Box>

        {/* Timetable Section */}
        <Paper
          elevation={3}
          sx={{
            margin: "50px auto 0",
            maxWidth: "90%",
            padding: "",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: primaryColor,
          }}
        >
          <Box sx={{ overflowX: "scroll", padding: "10px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: secondaryColor }}>
                  <th
                    style={{
                      padding: "10px",
                      border: "2px solid #5a3d31",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Period
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "2px solid #5a3d31",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Monday
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "2px solid #5a3d31",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Tuesday
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "2px solid #5a3d31",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Wednesday
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "2px solid #5a3d31",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Thursday
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "2px solid #5a3d31",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Friday
                  </th>
                </tr>
              </thead>
              <tbody>
                {periods.map((period, periodIndex) => (
                  <tr key={periodIndex}>
                    <td
                      style={{
                        padding: "10px",
                        border: "2px solid #5a3d31",
                        backgroundColor: secondaryColor,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {period}
                    </td>
                    {Object.keys(timetableData).map((day, dayIndex) => (
                      <td
                        key={dayIndex}
                        style={{
                          padding: "10px",
                          border: "2px solid #5a3d31",
                          textAlign: "center",
                        }}
                      >
                        {timetableData[day][periodIndex]}
                      </td>
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
