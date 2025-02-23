import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Snackbar,
  Alert,
  TextField,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const API_URL = "http://localhost:5000/api/announcements";

const primaryColor = "#e7cccc";
const buttonHoverColor = "#7a5e51";

const Mannouncements = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ heading: "", text: "", image: null });
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const teacherId = localStorage.getItem("teacherId");
        if (!teacherId) {
          console.error("No teacherId found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/fetchann?teacherId=${teacherId}`);
        setAnnouncements(response.data.announcements);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = (id) => {
    const announcement = announcements.find((a) => a._id === id);
    setEditingId(id);
    setEditData({ heading: announcement.heading, text: announcement.text, image: announcement.image });
    setOpenEditDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`${API_URL}/delete/${deleteId}`);
      setAnnouncements(announcements.filter((a) => a._id !== deleteId));
      setAlert({ open: true, type: "success", message: "Announcement deleted successfully!" });
    } catch (error) {
      setAlert({ open: true, type: "error", message: "Failed to delete announcement." });
    }
    setOpenDeleteDialog(false);
  };

  const handleEditSubmit = async () => {
    if (!editData.heading.trim()) {
      setAlert({ open: true, type: "error", message: "Heading is required!" });
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("heading", editData.heading);
      formData.append("text", editData.text);
      if (editData.image) {
        formData.append("image", editData.image);
      }
  
      await axios.put(`${API_URL}/edit/${editingId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Update state
      setAnnouncements(
        announcements.map((a) =>
          a._id === editingId ? { ...a, heading: editData.heading, text: editData.text, imageUrl: editData.image ? URL.createObjectURL(editData.image) : a.imageUrl } : a
        )
      );
  
      setOpenEditDialog(false);
      setAlert({ open: true, type: "success", message: "Announcement updated successfully!" });
    } catch (error) {
      setAlert({ open: true, type: "error", message: "Failed to update announcement." });
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
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31", marginBottom: "20px" }}>
          Manage Announcements
        </Typography>
        
        <Box sx={{ position: "absolute", top: "10px", right: "20px" }}>
          {isSmallScreen ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "#5a3d31" }}>
                <MenuIcon/>
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
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
                "&:hover": { backgroundColor: "#e7dccd", borderColor: buttonHoverColor },
              }}
            >
              Home
            </Button>
          )}
        </Box>


        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2} sx={{ maxWidth: "800px" }}>
            {announcements.map((announcement) => (
              <Grid item xs={12} sm={6} key={announcement._id}>
                <Paper elevation={3} sx={{ padding: "15px", borderRadius: "12px", backgroundColor: primaryColor }}>
                  
                  {/* Image Display */}
                  {announcement.imageUrl && (
                    <Box
                      component="img"
                      src={`http://localhost:5000${announcement.imageUrl}`}  // Adjust if needed
                      alt="Announcement"
                      sx={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    />
                  )}

                  {/* Announcement Heading */}
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#5a3d31", marginBottom: "5px" }}>
                    {announcement.heading}
                  </Typography>

                  {/* Announcement Text */}
                  <Typography variant="body2" sx={{ color: "#5a3d31", marginBottom: "10px" }}>
                    {announcement.text}
                  </Typography>

                  {/* Class Name */}
                  <Typography variant="subtitle2" sx={{ fontStyle: "italic", color: "#7a5e51", marginBottom: "5px" }}>
                    {announcement.semester} - {announcement.batch} ({announcement.subject})
                  </Typography>

                  {/* Edit and Delete Buttons */}
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(announcement._id)}
                      sx={{ backgroundColor: "#5a3d31", color: "#fff" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setOpenDeleteDialog(true);
                        setDeleteId(announcement._id);
                      }}
                      sx={{ backgroundColor: "#b54d4d", color: "#fff" }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

        )}
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Delete Announcement</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this announcement?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDelete} sx={{ backgroundColor: "#b54d4d", color: "#fff" }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Announcement</DialogTitle>
          <DialogContent>
            {/* Heading Field */}
            <TextField
              label="Heading"
              fullWidth
              value={editData.heading}
              onChange={(e) => setEditData({ ...editData, heading: e.target.value })}
              sx={{ marginBottom: "10px" }}
            />

            {/* Text Field */}
            <TextField
              label="Text"
              fullWidth
              multiline
              rows={3}
              value={editData.text}
              onChange={(e) => setEditData({ ...editData, text: e.target.value })}
              sx={{ marginBottom: "10px" }}
            />

            {/* Image Preview */}
            {editData.imageUrl && (
              <Box
                component="img"
                src={`http://localhost:5000${editData.imageUrl}`}  // Adjust backend URL if necessary
                alt="Announcement"
                sx={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}

            {/* Image Upload Field */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditData({ ...editData, image: e.target.files[0] })}
              style={{ marginBottom: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} sx={{ backgroundColor: "#5a3d31", color: "#fff" }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>


        <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Mannouncements;
