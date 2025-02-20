import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { motion } from "framer-motion";

const primaryColor = "#e7cccc";
const buttonHoverColor = "#7a5e51";

const MyClassrooms = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]); // Initially empty

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/classrooms/teacher/classes", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log(response.data); // Debugging
  
        setClasses(response.data.classes); // ✅ Extracting 'classes' array correctly
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
  
    fetchClasses();
  }, []);
  

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleCardClick = (route) => {
    navigate(route);
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
          background: "linear-gradient(to right, #e7cccc, #ede8dc)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "px 0",
          position: "relative",
        }}
      >
        {/* Page Header */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            My Classrooms
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

        {/* Navigation */}
        <Box sx={{ width: "100%", position: "absolute", top: "10px", right: "20px", display: "flex", justifyContent: "flex-end" }}>
          {isSmallScreen ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "#5a3d31" }}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                <MenuItem onClick={() => navigate("/teacher")}>Home</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={() => navigate("/teacher")}
              sx={{ color: "#5a3d31", borderColor: "#5a3d31", "&:hover": { backgroundColor: "#e7dccd", borderColor: buttonHoverColor } }}
            >
              Home
            </Button>
          )}
        </Box>

        {/* Class Selection */}
        <Box sx={{ marginTop: "30px" }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="select-class-label">Select Class</InputLabel>
            <Select
              labelId="select-class-label"
              value={selectedClass}
              label="Select Class"
              onChange={handleClassChange}
            >
            {classes.length > 0 ? (
            classes.map((classObj) => (
                <MenuItem key={classObj._id} value={classObj._id}> 
                  {`${classObj.subject} - ${classObj.semester} (${classObj.batch})`}
                </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Classes Available</MenuItem>
              )}
            </Select>

          </FormControl>
        </Box>

        {/* Classroom Cards */}
        {selectedClass && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "40px", flexWrap: "wrap" }}>
            <Card
              sx={{
                backgroundColor: primaryColor,
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                width: isSmallScreen ? "100%" : "300px",
                maxWidth: "300px",
                padding: "20px",
                boxShadow: 6,
                "&:hover": { boxShadow: 12 },
              }}
              onClick={() => handleCardClick(`/teacher/myclassroom/${selectedClass}/studentslist`)}
            >
              <CardContent>
                <SchoolIcon sx={{ fontSize: 40, color: "#5a3d31" }} />
                <Typography variant="h6" sx={{ color: "#5a3d31", marginTop: "10px" }}>Students List</Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                backgroundColor: primaryColor,
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                width: isSmallScreen ? "100%" : "300px",
                maxWidth: "300px",
                padding: "20px",
                boxShadow: 6,
                "&:hover": { boxShadow: 12 },
              }}
              onClick={() => handleCardClick(`/teacher/myclassroom/${selectedClass}/joinrequests`)}
            >
              <CardContent>
                <GroupAddIcon sx={{ fontSize: 40, color: "#5a3d31" }} />
                <Typography variant="h6" sx={{ color: "#5a3d31", marginTop: "10px" }}>Join Requests</Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default MyClassrooms;
