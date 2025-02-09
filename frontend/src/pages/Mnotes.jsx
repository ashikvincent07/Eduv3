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

const Mnotes = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [notes, setNotes] = useState([
    { id: 1, heading: "Math Notes", file: "math_notes.pdf", date: "2025-02-10" },
    { id: 2, heading: "Science Notes", file: "science_notes.pdf", date: "2025-02-12" },
  ]);
  const [editingNote, setEditingNote] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

  const [heading, setHeading] = useState("");
  const [file, setFile] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

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
    navigate("/teacher/assignotes/notes");
    handleMenuClose();
  };

  const handleHeadingChange = (event) => setHeading(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleEditNote = (note) => {
    setEditingNote(note);
    setHeading(note.heading);
    setOpenEditModal(true);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setAlert({ open: true, type: "success", message: "Note deleted successfully!" });
  };

  const handleDeleteConfirmationOpen = (id) => {
    setDeleteNoteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setConfirmDeleteOpen(false);
    setDeleteNoteId(null);
  };

  const handleDeleteConfirmed = () => {
    handleDeleteNote(deleteNoteId);
    setConfirmDeleteOpen(false);
    setDeleteNoteId(null);
  };

  const handleSubmitEdit = () => {
    if (!heading.trim() || !file) {
      setAlert({ open: true, type: "error", message: "All fields are required!" });
      return;
    }

    // Check file size if necessary (limit to 10MB)
    if (file && file.size > 10 * 1024 * 1024) {
      setAlert({ open: true, type: "error", message: "File size exceeds 10MB!" });
      return;
    }

    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id
        ? { ...note, heading, file: file.name }
        : note
    );
    setNotes(updatedNotes);
    setOpenEditModal(false);
    setAlert({ open: true, type: "success", message: "Note updated successfully!" });
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
            Manage Notes
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

        {/* List of Notes */}
        <Grid container spacing={3} sx={{ justifyContent: "center", marginTop: "80px" }}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  backgroundColor: primaryColor,
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{note.heading}</Typography>
                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                  File: {note.file}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditNote(note)}
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
                    onClick={() => handleDeleteConfirmationOpen(note.id)}
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
              Edit Note
            </Typography>

            <TextField
              label="Note Heading"
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

            <input
              type="file"
              onChange={handleFileChange}
              style={{
                marginBottom: "15px",
                backgroundColor: secondaryColor,
                borderRadius: "8px",
                padding: "8px",
              }}
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
              Are you sure you want to delete this note?
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

export default Mnotes;
