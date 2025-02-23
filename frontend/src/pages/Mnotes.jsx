import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Modal,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const primaryColor = "#e7cccc";
const buttonHoverColor = "#7a5e51";

const Mnotes = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("teacherId");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [editModal, setEditModal] = useState(false);
  const [editNote, setEditNote] = useState(null);

  // Delete Confirmation Dialog State
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    if (!teacherId) {
      console.error("Teacher ID is undefined. Cannot fetch notes.");
      return;
    }

    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notes/fetchnotes/${teacherId}`);
        setNotes(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, [teacherId]);

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

  const handleBackNavigate = () => {
    navigate("/teacher/notes");
    handleMenuClose();
  };

  const handleEditNote = (note) => {
    setEditNote(note);
    setEditModal(true);
  };

  const handleUpdateNote = async () => {
    try {
      const updatedNote = {
        heading: editNote.heading,
        fileUrl: editNote.fileUrl, // Use the URL directly
      };
  
      await axios.put(`http://localhost:5000/api/notes/edit/${editNote._id}`, updatedNote);
  
      // Fetch updated notes list
      const response = await axios.get(`http://localhost:5000/api/notes/fetchnotes/${teacherId}`);
      setNotes(Array.isArray(response.data) ? response.data : []);
  
      setAlert({ open: true, type: "success", message: "Note updated successfully!" });
      setEditModal(false);
    } catch (error) {
      console.error("Error updating note:", error);
      setAlert({ open: true, type: "error", message: "Failed to update note" });
    }
  };
  

  const handleOpenDeleteDialog = (note) => {
    setNoteToDelete(note);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setNoteToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleDeleteNote = async () => {
    if (!noteToDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/notes/delete/${noteToDelete._id}`);
      setNotes(notes.filter((note) => note._id !== noteToDelete._id));
      setAlert({ open: true, type: "success", message: "Note deleted successfully!" });
    } catch (error) {
      console.error("Error deleting note:", error);
      setAlert({ open: true, type: "error", message: "Failed to delete note" });
    }

    setOpenDeleteDialog(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }}>
      <Box sx={{ minHeight: "100vh", width: "100vw", background: "linear-gradient(to right, #e7cccc, #ede8dc)", padding: "20px 0", textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>Manage Notes</Typography>
        
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
                <MenuItem onClick={handleBackNavigate}>Back</MenuItem>
                <MenuItem onClick={handleHomeNavigate}>Home</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleHomeNavigate}
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
                Home
              </Button>
              <Button
                variant="outlined"
                onClick={handleBackNavigate}
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

        <Grid container spacing={3} sx={{ justifyContent: "center", marginTop: "20px" }}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note._id}>
              <Paper elevation={3} sx={{ padding: "20px", backgroundColor: primaryColor, borderRadius: "12px", textAlign: "center" }}>
                <Typography variant="h6">{note.heading}</Typography>
                <Typography variant="body2">
                  <strong>Class:</strong> {`${note.semester} ${note.batch} ${note.subject}`}
                </Typography>
                <Typography variant="body2">
                  <strong>File URL:</strong>{" "}
                  <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
                    {note.fileUrl.length > 30 ? note.fileUrl.substring(0, 30) + "..." : note.fileUrl}
                  </a>
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
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
                    onClick={() => handleOpenDeleteDialog(note)}
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
        <Modal open={editModal} onClose={() => setEditModal(false)}>
          <Paper sx={{ width: "400px", padding: "20px", margin: "100px auto", textAlign: "center" }}>
            <Typography variant="h6">Edit Note</Typography>

            {/* Edit Heading */}
            <TextField
              label="Heading"
              fullWidth
              margin="normal"
              value={editNote?.heading || ""}
              onChange={(e) => setEditNote({ ...editNote, heading: e.target.value })}
            />

            {/* URL Input */}
            <TextField
              label="File URL"
              fullWidth
              margin="normal"
              value={editNote?.fileUrl || ""}
              onChange={(e) => setEditNote({ ...editNote, fileUrl: e.target.value })}
            />

            {/* Save Changes Button */}
            <Button
              variant="contained"
              onClick={handleUpdateNote}
              sx={{ marginTop: "10px" }}
            >
              Save Changes
            </Button>
          </Paper>
        </Modal>


        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this note? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteNote} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}>
          <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.type} sx={{ width: "100%" }}>{alert.message}</Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Mnotes;
