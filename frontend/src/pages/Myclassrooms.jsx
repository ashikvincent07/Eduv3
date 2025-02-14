import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
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
import { motion } from "framer-motion";

const primaryColor = "#e7cccc";
const buttonHoverColor = "#7a5e51";

const MyClassrooms = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedClass, setSelectedClass] = useState(""); // Track selected class
  const [classes, setClasses] = useState(["Class 1", "Class 2", "Class 3"]); // Example classes

  const handleAlertClose = () => setAlert({ ...alert, open: false });
  
  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value); // Update selected class
  };

  const handleCardClick = (route) => {
    if (!selectedClass) {
      setAlert({
        open: true,
        type: "error",
        message: "Please select a class first to proceed.",
      });
      return;
    }
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
        {/* Top Section with Heading and Logo */}
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

        {/* Home Button or Dropdown */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "10px",
            right: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {isSmallScreen ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: "#5a3d31",
                }}
              >
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
                <MenuItem onClick={() => navigate("/teacher")}>Home</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={() => navigate("/teacher")}
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

        {/* Class Selection Dropdown */}
        <Box sx={{ marginTop: "30px" }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="select-class-label">Select Class</InputLabel>
            <Select
              labelId="select-class-label"
              value={selectedClass}
              label="Select Class"
              onChange={handleClassChange}
            >
              {classes.map((className, index) => (
                <MenuItem key={index} value={className}>
                  {className}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Cards for Students List and Assignment Mark */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "40px",
            flexWrap: "wrap", // Enable wrapping for smaller screens
          }}
        >
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
              "&:hover": {
                boxShadow: 12,
              },
            }}
            onClick={() =>
              handleCardClick(`/teacher/myclassroom/${selectedClass}/studentslist`)
            }
            disabled={!selectedClass} // Disable card until class is selected
          >
            <CardContent>
              <SchoolIcon sx={{ fontSize: 40, color: "#5a3d31" }} />
              <Typography variant="h6" sx={{ color: "#5a3d31", marginTop: "10px" }}>
                Students List
              </Typography>
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
              "&:hover": {
                boxShadow: 12,
              },
            }}
            onClick={() =>
              handleCardClick(`/teacher/myclassroom/${selectedClass}/assignmentmark`)
            }
            disabled={!selectedClass} // Disable card until class is selected
          >
            <CardContent>
              <AssignmentIcon sx={{ fontSize: 40, color: "#5a3d31" }} />
              <Typography variant="h6" sx={{ color: "#5a3d31", marginTop: "10px" }}>
                Assignment Mark
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Snackbar for Alerts */}
        <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity={alert.type} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default MyClassrooms;
