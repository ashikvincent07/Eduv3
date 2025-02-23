import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const primaryColor = "#e7cccc";
const buttonHoverColor = "#7a5e51";

const Snotes = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

  useEffect(() => {
    const fetchStudentClasses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) return;
  
        // Fetch classes the student has joined
        const response = await axios.get(`http://localhost:5000/api/classrooms/students/${user.id}/classes`);
  
        if (response.data.length === 0) {
          setAlert({ open: true, type: "warning", message: "No subjects found." });
          setLoading(false);
          return;
        }
  
        // Extract subjects
        const uniqueSubjects = response.data.map((cls) => cls.subject);
        setSubjects(uniqueSubjects);
        setSelectedSubject(uniqueSubjects[0]); // Default to first subject
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setAlert({ open: true, type: "error", message: "Failed to fetch subjects" });
        setLoading(false);
      }
    };
  
    fetchStudentClasses();
  }, []);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) return;
  
        const response = await axios.get(
          `http://localhost:5000/api/notes/student/${user.id}`
        );
  
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setAlert({ open: true, type: "error", message: "Failed to fetch notes" });
        setLoading(false);
      }
    };
  
    fetchNotes();
  }, []);
  

  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleHomeNavigate = () => {
    navigate("/student");
    handleMenuClose();
  };

  const handleSubjectSelect = (event) => setSelectedSubject(event.target.value);
  const handleAlertClose = () => setAlert({ ...alert, open: false });

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
        <Box sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Notes
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

        {/* Menu and Button Component */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "10px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-end",
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
          )}
        </Box>

        {/* Subject Selector */}
        {subjects.length > 0 && (
          <FormControl sx={{ width: "50%", marginTop: "20px" }}>
            <InputLabel>Select Subject</InputLabel>
            <Select value={selectedSubject} onChange={handleSubjectSelect}>
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}


        {/* Notes Table */}
        {loading ? (
          <CircularProgress sx={{ marginTop: "20px" }} />
        ) : notes.length === 0 ? (
          <Typography sx={{ marginTop: "20px", color: "#5a3d31" }}>
            No notes available.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "20px" }}>
            <Table>
              <TableHead sx={{ backgroundColor: primaryColor }}>
                <TableRow>
                  <TableCell><strong>Note Heading</strong></TableCell>
                  <TableCell><strong>Teacher</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes
                  .filter((note) => note.classId.subject === selectedSubject)
                  .map((note) => (
                    <TableRow key={note._id}>
                      <TableCell>{note.heading}</TableCell>
                      <TableCell>{note.teacherId.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#5a3d31",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: buttonHoverColor,
                            },
                          }}
                          onClick={() => window.open(note.fileUrl, "_blank")}
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

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

export default Snotes;
