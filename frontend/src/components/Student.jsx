import React from "react";
import { Box, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NoteIcon from "@mui/icons-material/Note";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const sections = [
  { title: "Announcements", description: "View important announcements.", path: "/student/announcements", icon: <NotificationsIcon sx={{ fontSize: 60, color: "#5a3d31" }} /> },
  { title: "Timetable", description: "View your class schedule.", path: "/student/timetable", icon: <CalendarTodayIcon sx={{ fontSize: 60, color: "#5a3d31" }} /> },
  { title: "Class Notes", description: "Access your class notes.", path: "/student/notes", icon: <NoteIcon sx={{ fontSize: 60, color: "#5a3d31" }} /> },
  { title: "Join Classroom", description: "Enroll in your classroom and start learning.", path: "/student/joinclass", icon: <ClassIcon sx={{ fontSize: 60, color: "#5a3d31" }} /> },
  { title: "My Classrooms", description: "Explore your assigned classes.", path: "/student/myclass", icon: <GroupIcon sx={{ fontSize: 60, color: "#5a3d31" }} /> },
  { title: "Profile", description: "View and edit your profile.", path: "/student/profile", icon: <AccountCircleIcon sx={{ fontSize: 60, color: "#5a3d31" }} /> },
];

const Student = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.6 }}>
      <Box sx={{ minHeight: "100vh", px: isSmallScreen ? 2 : 4, py: 3, background: "linear-gradient(to right, #e7cccc, #ede8dc)", overflowX: "hidden" }}>
        
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Typography variant={isSmallScreen ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "#5a3d31" }}>EDUCONNECT</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <img src="./images/edu.png" alt="Logo" style={{ width: isSmallScreen ? "60px" : "80px" }} />
          </Box>
        </Box>

        {/* Sections */}
        <Grid container spacing={2} justifyContent="center">
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} onClick={() => navigate(section.path)} style={{ cursor: "pointer" }}>
                <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 2, backgroundColor: "#c1cfa1", color: "#5a3d31" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>{section.icon}</Box>
                  <Typography variant={isSmallScreen ? "subtitle1" : "h6"} sx={{ fontWeight: "bold" }}>{section.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{section.description}</Typography>
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
