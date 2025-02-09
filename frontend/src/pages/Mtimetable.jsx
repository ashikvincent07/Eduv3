import React, { useState } from "react";
import { Box, Typography, Button, Paper, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

// Color Palette
const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const periods = ["I", "II", "III", "IV", "V", "VI"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Mtimetable = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  
  // State to manage editable timetable
  const [timetableData, setTimetableData] = useState({
    Monday: ["", "", "", "", "", ""],
    Tuesday: ["", "", "", "", "", ""],
    Wednesday: ["", "", "", "", "", ""],
    Thursday: ["", "", "", "", "", ""],
    Friday: ["", "", "", "", "", ""],
  });

  const handleHomeNavigate = () => {
    navigate("/teacher");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle changes to input fields
  const handleInputChange = (day, periodIndex, value) => {
    setTimetableData((prevTimetable) => ({
      ...prevTimetable,
      [day]: prevTimetable[day].map((subject, idx) => (idx === periodIndex ? value : subject)),
    }));
  };

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
          position: "relative",
        }}
      >
        {/* Navigation Buttons */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "20px",
            display: { xs: "none", md: "block" },
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
            display: { xs: "block", md: "none" },
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
          </Menu>
        </Box>

        {/* Page Heading and Logo */}
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#5a3d31",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Edit Timetable
          </Typography>
          <img
            src="/images/edu.png"
            alt="Logo"
            style={{
              height: "auto",
              width: "90px",
              objectFit: "contain",
              marginTop: "",
            }}
          />
        </Box>

        {/* Editable Timetable Section */}
        <Paper
          elevation={3}
          sx={{
            margin: "50px auto 0",
            maxWidth: "90%",
            padding: "10px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: primaryColor,
          }}
        >
          <Box sx={{ overflowX: "scroll", padding: "10px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: secondaryColor }}>
                  <th style={{ padding: "10px", border: "2px solid #5a3d31", fontWeight: "bold" }}>Period</th>
                  {weekdays.map((day) => (
                    <th key={day} style={{ padding: "10px", border: "2px solid #5a3d31", fontWeight: "bold" }}>
                      {day}
                    </th>
                  ))}
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
                      }}
                    >
                      {period}
                    </td>
                    {weekdays.map((day) => (
                      <td key={day} style={{ padding: "10px", border: "2px solid #5a3d31" }}>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={timetableData[day][periodIndex]}
                          onChange={(e) => handleInputChange(day, periodIndex, e.target.value)}
                          sx={{
                            width: "100%",
                            backgroundColor: "#fff",
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Paper>

        {/* Save Button */}
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            backgroundColor: "#5a3d31",
            "&:hover": {
              backgroundColor: buttonHoverColor,
            },
          }}
        >
          Save Timetable
        </Button>
      </Box>
    </motion.div>
  );
};

export default Mtimetable;
