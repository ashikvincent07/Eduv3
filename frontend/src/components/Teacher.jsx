import React, { useState } from "react";
import { Box, Grid, Paper, Typography, Button, useMediaQuery, Menu, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NoteIcon from "@mui/icons-material/Note";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MenuIcon from "@mui/icons-material/Menu";

// Sections with MUI Icons
const sections = [
  {
    title: "Announcements",
    description: "View and manage important announcements.",
    path: "/teacher/announcements",
    bgColor: "#c1cfa1",
    icon: <NotificationsIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "Timetable",
    description: "View and update your class schedule.",
    path: "/teacher/timetable",
    bgColor: "#c1cfa1",
    icon: <CalendarTodayIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "Assignments & Notes",
    description: "Manage assignments and upload notes.",
    path: "/teacher/assignotes",
    bgColor: "#c1cfa1",
    icon: <NoteIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "Create Classroom",
    description: "Manage all classrooms and groups.",
    path: "/teacher/classroom",
    bgColor: "#c1cfa1",
    icon: <ClassIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "My Classroom",
    description: "Access tools for your assigned classes.",
    path: "/teacher/myclassroom",
    bgColor: "#c1cfa1",
    icon: <GroupIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "Profile",
    description: "Manage your personal information and settings.",
    path: "/teacher/profile",
    bgColor: "#c1cfa1",
    icon: <AccountCircleIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "Manage Class",
    description: "Access and manage your classroom tools.",
    path: "/teacher/manageclass", // Adjust this path as needed
    bgColor: "#c1cfa1",
    icon: <WorkOutlineIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
    // Add any conditional rendering logic here if needed for class teachers
  },
];

const Teacher = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [classMenuAnchor, setClassMenuAnchor] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleClassSelect = (className) => {
    setSelectedClass(className);
    setClassMenuAnchor(null);
  };

  const classNames = [
    "Math 101",
    "Science 202",
    "History 303",
    "English 404",
    "Art 505",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          padding: isSmallScreen ? "10px" : "20px",
          background: "linear-gradient(to right, #e7cccc, #ede8dc)",
        }}
      >
        {/* Top Section with Request Button and Select Class Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isSmallScreen ? "10px" : "0px",
          }}
        >
          {/* Request Button (Left Side) */}
          <Button
            variant="outlined"
            onClick={handleMenuOpen}
            sx={{
              color: "#5a3d31",
              borderColor: "#5a3d31",
              "&:hover": {
                backgroundColor: "#e7dccd",
                borderColor: "#7a5e51",
              },
            }}
          >
            Request
          </Button>

          {/* Dropdown menu for Teachers and Students */}
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
            <MenuItem onClick={() => navigate("/teacher/Reqt")}>Teachers</MenuItem>
            <MenuItem onClick={() => navigate("/teacher/Reqs")}>Students</MenuItem>
          </Menu>

          {/* Select Class Button with Dropdown (Right Side) */}
          <Button
            variant="outlined"
            onClick={(e) => setClassMenuAnchor(e.currentTarget)}
            sx={{
              color: "#5a3d31",
              borderColor: "#5a3d31",
              "&:hover": {
                backgroundColor: "#e7dccd",
                borderColor: "#7a5e51",
              },
            }}
          >
            {selectedClass || "Select Class"}
          </Button>

          {/* Dropdown menu for class names */}
          <Menu
            anchorEl={classMenuAnchor}
            open={Boolean(classMenuAnchor)}
            onClose={() => setClassMenuAnchor(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {classNames.map((className, index) => (
              <MenuItem key={index} onClick={() => handleClassSelect(className)}>
                {className}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Header with Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: isSmallScreen ? "10px" : "20px",
            flexDirection: "column",
          }}
        >
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            align="center"
            sx={{
              fontWeight: "bold",
              color: "#5a3d31",
              marginTop: isSmallScreen ? "10px" : "0",
              
            }}
          >
            EDUCONNECT
          </Typography>

          {/* Logo below the Heading */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "" }}>
            <img
              src="./images/edu.png" // Replace with actual logo URL
              alt="Logo"
              style={{
                height: "auto",
                width: isSmallScreen ? "70px" : "90px",
              }}
            />
          </Box>
        </Box>

        {/* Sections */}
        <Grid container spacing={isSmallScreen ? 2 : 3}>
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigate(section.path)}
                style={{ cursor: "pointer" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: isSmallScreen ? "15px" : "20px",
                    textAlign: "center",
                    borderRadius: "12px",
                    backgroundColor: section.bgColor,
                    color: "#5a3d31",
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {section.icon}
                  </Box>

                  {/* Title and Description */}
                  <Typography
                    variant={isSmallScreen ? "subtitle1" : "h6"}
                    sx={{ fontWeight: "bold" }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginY: "10px", color: "#5a3d31" }}
                  >
                    {section.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default Teacher;
