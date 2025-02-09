import React from "react";
import { Box, Grid, Paper, Typography, Button, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NoteIcon from "@mui/icons-material/Note";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const sections = [
  {
    title: "Announcements",
    description: "View important announcements.",
    path: "/student/announcements",
    bgColor: "#c1cfa1",
    icon: <NotificationsIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "Timetable",
    description: "View your class schedule.",
    path: "/student/timetable",
    bgColor: "#c1cfa1",
    icon: <CalendarTodayIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "Assignments & Notes",
    description: "Access assignments and notes.",
    path: "/student/assignnotes",
    bgColor: "#c1cfa1",
    icon: <NoteIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "Join Classroom",
    description: "Join or view your classroom.",
    path: "/student/joinclass",
    bgColor: "#c1cfa1",
    icon: <ClassIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "My Classroom",
    description: "Explore your assigned classes.",
    path: "/student/myclass",
    bgColor: "#c1cfa1",
    icon: <GroupIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
  {
    title: "Profile",
    description: "View and edit your profile.",
    path: "/student/profile",
    bgColor: "#c1cfa1",
    icon: <AccountCircleIcon sx={{ fontSize: 80, color: "#5a3d31" }} />,
  },
];


const Student = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const handleClassNavigate = () => {
    navigate("/student/myclass");
  };

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
        {/* Class Name Button Positioned at the Top Right */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: isSmallScreen ? "10px" : "20px",
          }}
        >
          <Button
          onClick={handleClassNavigate}
            variant="outlined"
            sx={{
              color: "#5a3d31",
              borderColor: "#5a3d31",
              "&:hover": {
                backgroundColor: "#e7dccd",
                borderColor: "#7a5e51",
              },
            }}
          >
            S6BCAB
          </Button>
        </Box>

        {/* Header with Title */}
        <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: isSmallScreen ? "10px" : "20px",
    flexDirection: "column",
    marginTop: isSmallScreen ? "-10px" : "-50px", // Adjusted positioning
  }}
>
  <Typography
    variant={isSmallScreen ? "h5" : "h4"}
    align="center"
    sx={{
      fontWeight: "bold",
      color: "#5a3d31",
      marginTop: isSmallScreen ? "5px" : "0",
    }}
  >
    EDUCONNECT
  </Typography>

  {/* Logo below the Heading */}
  <Box sx={{ display: "flex", justifyContent: "center", marginTop: isSmallScreen ? "-5px" : "10px" }}>
    <img
      src="./images/edu.png"
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
                      marginBottom: "20px",
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

export default Student;
