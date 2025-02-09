import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Modal,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Massignments = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [assignments, setAssignments] = useState([
    { id: 1, heading: "Math Assignment", question: "Solve for x", submissionDate: "2025-02-10" },
    { id: 2, heading: "Science Assignment", question: "Explain gravity", submissionDate: "2025-02-12" },
  ]);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

  const [heading, setHeading] = useState("");
  const [question, setQuestion] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");

  const [openEditModal, setOpenEditModal] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State for confirmation dialog
  const [deleteAssignmentId, setDeleteAssignmentId] = useState(null); // Store assignment ID to delete

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleHomeNavigate = () => {
    navigate("/teacher");
    handleMenuClose();
  };

  const handleManageNavigate = () => {
    navigate("/teacher/assignotes/assignments");
    handleMenuClose();
  };

  const handleHeadingChange = (event) => setHeading(event.target.value);
  const handleQuestionChange = (event) => setQuestion(event.target.value);
  const handleSubmissionDateChange = (event) => setSubmissionDate(event.target.value);

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setHeading(assignment.heading);
    setQuestion(assignment.question);
    setSubmissionDate(assignment.submissionDate);
    setOpenEditModal(true);
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
    setAlert({ open: true, type: "success", message: "Assignment deleted successfully!" });
  };

  const handleDeleteConfirmationOpen = (id) => {
    setDeleteAssignmentId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setConfirmDeleteOpen(false);
    setDeleteAssignmentId(null);
  };

  const handleDeleteConfirmed = () => {
    handleDeleteAssignment(deleteAssignmentId);
    setConfirmDeleteOpen(false);
    setDeleteAssignmentId(null);
  };

  const handleSubmitEdit = () => {
    if (!heading.trim() || !question.trim() || !submissionDate) {
      setAlert({ open: true, type: "error", message: "All fields are required!" });
      return;
    }

    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === editingAssignment.id
        ? { ...assignment, heading, question, submissionDate }
        : assignment
    );
    setAssignments(updatedAssignments);
    setOpenEditModal(false);
    setAlert({ open: true, type: "success", message: "Assignment updated successfully!" });
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
            Manage Assignments
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
                <MenuItem onClick={handleManageNavigate}>Manage Assignments</MenuItem>
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

        {/* List of Assignments */}
        <Grid container spacing={3} sx={{ justifyContent: "center", marginTop: "80px" }}>
          {assignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={4} key={assignment.id}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  backgroundColor: primaryColor,
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{assignment.heading}</Typography>
                <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                  {assignment.question}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                  Submission Date: {assignment.submissionDate}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditAssignment(assignment)}
                    sx={{
                      backgroundColor: "#5a3d31",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: buttonHoverColor,
                      },
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteConfirmationOpen(assignment.id)}
                    sx={{
                      backgroundColor: "#b54d4d",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: buttonHoverColor,
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Edit Modal */}
        <Modal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: primaryColor,
              width: "80%",
              maxWidth: "600px",
              borderRadius: "12px",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "20px", textAlign: "center" }}>
              Edit Assignment
            </Typography>

            <TextField
              label="Assignment Heading"
              variant="outlined"
              fullWidth
              value={heading}
              onChange={handleHeadingChange}
              sx={{
                marginBottom: "15px",
                backgroundColor: secondaryColor,
                borderRadius: "8px",
              }}
              required
            />

            <TextField
              label="Question"
              variant="outlined"
              fullWidth
              value={question}
              onChange={handleQuestionChange}
              sx={{
                marginBottom: "15px",
                backgroundColor: secondaryColor,
                borderRadius: "8px",
              }}
              required
            />

            <TextField
              label="Submission Date"
              variant="outlined"
              fullWidth
              type="date"
              value={submissionDate}
              onChange={handleSubmissionDateChange}
              sx={{
                marginBottom: "15px",
                backgroundColor: secondaryColor,
                borderRadius: "8px",
              }}
              required
            />

            <Button
              variant="contained"
              onClick={handleSubmitEdit}
              sx={{
                marginTop: "20px",
                backgroundColor: "#5a3d31",
                color: "#fff",
                "&:hover": {
                  backgroundColor: buttonHoverColor,
                },
              }}
              fullWidth
            >
              Save Changes
            </Button>
          </Paper>
        </Modal>

        {/* Confirmation Dialog for Deletion */}
        <Modal
          open={confirmDeleteOpen}
          onClose={handleDeleteConfirmationClose}
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
              Are you sure you want to delete this assignment?
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={handleDeleteConfirmationClose}
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
                onClick={handleDeleteConfirmed}
                sx={{
                  backgroundColor: "#b54d4d",
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

export default Massignments;
