import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Modal,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import UploadIcon from "@mui/icons-material/Upload";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const assignmentsData = {
  OS: [
    {
      heading: "Assignment 1",
      question: "Describe the process scheduling algorithms.",
      submissionDate: "2025-02-10",
    },
  ],
  CN: [
    {
      heading: "Assignment 1",
      question: "Explain the OSI model layers.",
      submissionDate: "2025-02-05",
    },
  ],
};

const Sassignments = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("OS");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleHomeNavigate = () => {
    navigate("/student");
    handleMenuClose();
  };

  const handleManageNavigate = () => {
    navigate("/student/assignnotes");
    handleMenuClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmitAssignment = (assignment) => {
    if (!selectedFile) {
      setAlert({ open: true, type: "error", message: "Please select a file before submitting!" });
      return;
    }

    const fileType = selectedFile?.type;
    const fileSize = selectedFile?.size;

    if (fileType && !["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"].includes(fileType)) {
      setAlert({ open: true, type: "error", message: "Only PDF or PPT files are allowed!" });
      return;
    }

    if (fileSize && fileSize > 5 * 1024 * 1024) {
      setAlert({ open: true, type: "error", message: "File size should not exceed 5MB!" });
      return;
    }

    setSelectedAssignment(assignment);
    setConfirmSubmitOpen(true);
  };

  const handleConfirmSubmitClose = () => {
    setConfirmSubmitOpen(false);
  };

  const handleConfirmSubmit = () => {
    setConfirmSubmitOpen(false);
    setAlert({ open: true, type: "success", message: "Assignment submitted successfully!" });
  };

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
            Submit Assignment
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
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleManageNavigate}>Back</MenuItem>
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
                Back
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
                Home
              </Button>
            </>
          )}
        </Box>

        {/* Assignment Selection */}
        <FormControl sx={{ minWidth: 200, marginBottom: "20px" }}>
          <InputLabel id="subject-select-label">Select Subject</InputLabel>
          <Select
            labelId="subject-select-label"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {Object.keys(assignmentsData).map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Assignment Cards */}
        <Grid container spacing={2} justifyContent="center">
          {assignmentsData[selectedSubject].map((assignment, index) => {
            const submissionDate = new Date(assignment.submissionDate);
            const currentDate = new Date();
            const isSubmissionOver = currentDate > submissionDate;

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "20px",
                    backgroundColor: primaryColor,
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    {assignment.heading}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                    {assignment.question}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: "10px", color: "#5a3d31" }}>
                    Submission Date: {assignment.submissionDate}
                  </Typography>
                  <input
                    accept=".pdf,.ppt,.pptx"
                    type="file"
                    style={{ display: "none" }}
                    id={`upload-button-${index}`}
                    onChange={handleFileChange}
                  />
                  <label htmlFor={`upload-button-${index}`}>
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<UploadIcon />}
                      sx={{
                        backgroundColor: "#5a3d31",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: buttonHoverColor,
                        },
                      }}
                      disabled={isSubmissionOver}
                    >
                      Upload File
                    </Button>
                  </label>
                  {selectedFile && (
                    <Typography variant="body2" sx={{ marginTop: "10px", color: "#5a3d31" }}>
                      Selected File: {selectedFile.name}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    onClick={() => handleSubmitAssignment(assignment)}
                    sx={{
                      marginTop: "20px",
                      backgroundColor: "#5a3d31",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: buttonHoverColor,
                      },
                    }}
                    fullWidth
                    disabled={!selectedFile || isSubmissionOver}
                  >
                    Submit Assignment
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Confirmation Dialog for Submission */}
        <Modal
          open={confirmSubmitOpen}
          onClose={handleConfirmSubmitClose}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: primaryColor,
              width: "80%",
              maxWidth: "400px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Are you sure you want to submit this assignment?
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={handleConfirmSubmitClose}
                sx={{
                  color: "#5a3d31",
                  borderColor: "#5a3d31",
                  "&:hover": {
                    backgroundColor: "#e7dccd",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleConfirmSubmit}
                sx={{
                  backgroundColor: "#5a3d31",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: buttonHoverColor,
                  },
                }}
              >
                Confirm
              </Button>
            </Box>
          </Paper>
        </Modal>

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

export default Sassignments;
