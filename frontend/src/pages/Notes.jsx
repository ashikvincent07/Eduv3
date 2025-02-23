import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Notes = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [heading, setHeading] = useState("");
  const [noteLink, setNoteLink] = useState("");
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user might be logged out");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/classrooms/teacher/classes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data.classes)) {
          setClassList(response.data.classes);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching class list:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget); // Opens the menu
  };

  const handleMenuClose = () => {
    setMenuAnchor(null); // Closes the menu
  };

  const handleHomeNavigate = () => {
    navigate("/teacher");
    handleMenuClose();
  };

  const handleManageNavigate = () => {
    navigate("/teacher/notes/manage");
    handleMenuClose();
  };

  const handleSubmit = async () => {
    if (!heading.trim() || !selectedClass || !noteLink.trim()) {
      setAlert({ open: true, type: "error", message: "All fields are required!" });
      return;
    }

    const teacherId = localStorage.getItem("teacherId");
    if (!teacherId) {
      setAlert({ open: true, type: "error", message: "Teacher ID is missing. Please log in again." });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user might be logged out");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/notes/upload",
        { heading, classId: selectedClass, teacherId, fileUrl: noteLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Upload success:", response.data);
      setAlert({ open: true, type: "success", message: "Notes shared successfully!" });
      setHeading("");
      setNoteLink("");
      setSelectedClass("");
    } catch (error) {
      console.error("Upload failed:", error.response ? error.response.data : error);
      setAlert({ open: true, type: "error", message: "Failed to share notes!" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>Upload Notes</Typography>

        {/* Menu and Form Component */}
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
              <IconButton
                onClick={handleMenuOpen}
                sx={{ color: "#5a3d31" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleManageNavigate}>Manage Notes</MenuItem>
                <MenuItem onClick={handleHomeNavigate}>Home</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleManageNavigate}
                sx={{
                  color: "#5a3d31",
                  borderColor: "#5a3d31",
                  position: "absolute",
                  left: "20px",
                  top: "10px",
                  "&:hover": {
                    backgroundColor: "#e7dccd",
                    borderColor: buttonHoverColor,
                  },
                }}
              >
                Manage Notes
              </Button>
              <Button
                variant="outlined"
                onClick={handleHomeNavigate}
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
                Back
              </Button>
            </>
          )}
        </Box>

        <Paper elevation={3} sx={{ margin: "50px auto", maxWidth: "600px", width: "90%", padding: "20px", borderRadius: "12px", textAlign: "center", backgroundColor: primaryColor }}>
          <TextField label="Notes Heading" variant="outlined" fullWidth value={heading} onChange={(e) => setHeading(e.target.value)} sx={{ marginBottom: "15px", backgroundColor: secondaryColor }} required />

          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <InputLabel required>Select Class</InputLabel>
            <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} label="Select Class" sx={{ backgroundColor: secondaryColor }} required>
              {classList.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>{cls.subject} - {cls.semester} - {cls.batch}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Notes Link" variant="outlined" fullWidth value={noteLink} onChange={(e) => setNoteLink(e.target.value)} sx={{ marginBottom: "15px", backgroundColor: secondaryColor }} required />

          <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: "20px", backgroundColor: "#5a3d31", color: "#fff" }} fullWidth>
            Share Notes
          </Button>
        </Paper>

        <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}>
          <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.type} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Notes;
