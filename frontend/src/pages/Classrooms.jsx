import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
  Menu,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion"; // Import Framer Motion

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Classrooms = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [teacherRequestStatus, setTeacherRequestStatus] = useState("");
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);

  const subjects = ["Math", "Science", "English", "History"];

  const handleClassSelect = (event) => setSelectedClass(event.target.value);
  const handleSubjectSelect = (event) => setSelectedSubject(event.target.value);

  const handleRequestApproval = () => {
    if (!selectedClass || !selectedSubject) {
      setAlert({
        open: true,
        type: "error",
        message: "Please select a class and a subject!",
      });
      return;
    }

    setTeacherRequestStatus("Request Sent for Approval!");
    setAlert({
      open: true,
      type: "success",
      message: `Request for approval sent for ${selectedClass} - ${selectedSubject}`,
    });
  };

  const handleAlertClose = () => setAlert({ ...alert, open: false });

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
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
          padding: "20px 0",
        }}
      >
        {/* Top Section with Heading and Logo */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "2 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Manage Classrooms
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

        {/* Menu Section for Small Screens */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "10px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-end", // Align the buttons to the right
            padding: "0 20px",
          }}
        >
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
                <MenuItem onClick={() => navigate("/teacher")}>Home</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate("/teacher")}
                sx={{
                  color: "#5a3d31",
                  borderColor: "#5a3d31",
                  position: "absolute",
                  right: "20px",
                  top: "10px",
                  "&:hover": {
                    backgroundColor: "#e7dccd",
                    borderColor: buttonHoverColor,
                  },
                }}
              >
                Home
              </Button>
            </>
          )}
        </Box>

        {/* Card Layout for Content */}
        <Card sx={{ width: "70%", maxWidth: "900px", marginTop: "80px" }}>
          <CardContent>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <TextField
                select
                label="Select Class"
                fullWidth
                value={selectedClass}
                onChange={handleClassSelect}
                sx={{
                  marginBottom: "20px",
                  backgroundColor: secondaryColor,
                  borderRadius: "8px",
                }}
              >
                <MenuItem value="Class 1A">Class 1A</MenuItem>
                <MenuItem value="Class 2B">Class 2B</MenuItem>
                <MenuItem value="Class 3C">Class 3C</MenuItem>
              </TextField>

              <TextField
                select
                label="Select Subject"
                fullWidth
                value={selectedSubject}
                onChange={handleSubjectSelect}
                sx={{
                  marginBottom: "20px",
                  backgroundColor: secondaryColor,
                  borderRadius: "8px",
                }}
              >
                {subjects.map((subject, index) => (
                  <MenuItem key={index} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                variant="contained"
                onClick={handleRequestApproval}
                sx={{
                  backgroundColor: "#5a3d31",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: buttonHoverColor,
                  },
                }}
                fullWidth
              >
                Send Request for Approval
              </Button>

              {teacherRequestStatus && (
                <Typography variant="body1" sx={{ marginTop: "20px", color: "#5a3d31" }}>
                  {teacherRequestStatus}
                </Typography>
              )}

              <Button
                variant="outlined"
                onClick={() => navigate("/teacher/classroom/req")}
                sx={{
                  marginTop: "20px",
                  color: "#5a3d31",
                  borderColor: "#5a3d31",
                  "&:hover": {
                    borderColor: buttonHoverColor,
                    backgroundColor: "#5a3d31",
                    color: "#fff",
                  },
                }}
                fullWidth
              >
                View Pending Requests
              </Button>
            </Box>
          </CardContent>
        </Card>

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

export default Classrooms;
