import React, { useState } from "react";
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
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor =  "#7a5e51";

const Mannouncements = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [announcements, setAnnouncements] = useState([
    { id: 1, heading: "Event Update", text: "Details about the event", image: null },
    { id: 2, heading: "Holiday Notice", text: "School holiday announced", image: null },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ heading: "", text: "", image: null });
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (id) => {
    const announcement = announcements.find((a) => a.id === id);
    setEditingId(id);
    setEditData({ heading: announcement.heading, text: announcement.text, image: announcement.image });
    setOpenEditDialog(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditData({ ...editData, image: URL.createObjectURL(file) });
    }
  };

  const handleEditSubmit = () => {
    if (!editData.heading.trim()) {
      setAlert({ open: true, type: "error", message: "Heading is required!" });
      return;
    }

    setAnnouncements(
      announcements.map((a) =>
        a.id === editingId ? { ...a, ...editData } : a
      )
    );
    setEditingId(null);
    setOpenEditDialog(false);
    setAlert({ open: true, type: "success", message: "Announcement updated successfully!" });
  };

  const handleDeleteConfirm = () => {
    setAnnouncements(announcements.filter((a) => a.id !== deleteId));
    setOpenDeleteDialog(false);
    setAlert({ open: true, type: "success", message: "Announcement deleted successfully!" });
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          overflowX: "hidden",
          background: "linear-gradient(to right, #e7cccc, #ede8dc)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          {/* Back Button (Left) on Large Screens */}
          {!isSmallScreen && (
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                color: "#5a3d31",
                borderColor: "#5a3d31",
                "&:hover": {
                    backgroundColor: "#e7dccd",
                    borderColor: buttonHoverColor,
                },
              }}
            >
              Back
            </Button>
          )}

          {/* Logo and Heading Centered */}
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#5a3d31",
                marginBottom: "5px",
              }}
            >
              Manage Announcements
            </Typography>
            <img
              src="/images/edu.png"
              alt="Logo"
              style={{
                height: "auto",
              width: "90px", // Smaller logo size
              
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Home Button (Right) on Large Screens */}
          {!isSmallScreen && (
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

          {/* Responsive Menu for Small Screens */}
          {isSmallScreen && (
            <>
              <IconButton
                onClick={handleMenuClick}
                sx={{ color: "#5a3d31" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => navigate("/teacher")}>Home</MenuItem>
                <MenuItem onClick={() => navigate(-1)}>Back</MenuItem>
              </Menu>
            </>
          )}
        </Box>

        {/* Announcement Cards */}
        <Grid container spacing={2} sx={{ maxWidth: "800px", marginTop: "100px" }}>
  {announcements.map((announcement) => (
    <Grid item xs={12} sm={6} key={announcement.id}>
      <Paper
        elevation={3}
        sx={{
          padding: "15px",
          borderRadius: "12px",
          backgroundColor: primaryColor,
        }}
      >
        {/* Image Display with Default Fallback */}
        <Box
          sx={{
            width: "100%",
            paddingTop: "56.25%", // Aspect ratio 16:9
            backgroundImage: `url(${announcement.image || "https://th.bing.com/th/id/OIP.0SaE9Mkqufvz4VilIyaD-QHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#5a3d31", marginBottom: "10px" }}
        >
          {announcement.heading}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#5a3d31", marginBottom: "10px" }}
        >
          {announcement.text}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(announcement.id)}
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
            onClick={() => handleDelete(announcement.id)}
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


        {/* Edit Announcement Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Announcement</DialogTitle>
          <DialogContent>
  <TextField
    label="Announcement Heading"
    variant="outlined"
    fullWidth
    value={editData.heading}
    onChange={(e) => handleEditChange("heading", e.target.value)}
    sx={{
      marginBottom: "15px",
      backgroundColor: secondaryColor,
      borderRadius: "8px",
    }}
  />
  <TextField
    label="Announcement Text"
    multiline
    rows={3}
    variant="outlined"
    fullWidth
    value={editData.text}
    onChange={(e) => handleEditChange("text", e.target.value)}
    sx={{
      marginBottom: "15px",
      backgroundColor: secondaryColor,
      borderRadius: "8px",
    }}
  />
  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <Button
      variant="outlined"
      component="label"
      startIcon={<CloudUploadIcon />}
      sx={{
        width: "auto",
        color: "#5a3d31",
        borderColor: "lightgray",
        backgroundColor: secondaryColor,
        "&:hover": {
          backgroundColor: "#e7dccd",
          borderColor: buttonHoverColor,
        },
        marginBottom: "15px",
      }}
    >
      Upload Image
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={handleImageUpload}
      />
    </Button>
    {editData.image && (
      <Box
        sx={{
          width: "100px",
          height: "100px",
          backgroundImage: `url(${editData.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          border: "1px solid #5a3d31",
          marginLeft: "15px", // Space between button and image
        }}
      />
    )}
  </Box>
</DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          
        >
          <DialogTitle>Delete Announcement</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this announcement?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              variant="contained"
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
              onClick={handleDeleteConfirm}
              variant="contained"
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
          </DialogActions>
        </Dialog>

        {/* Alert Snackbar */}
          <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alert.type} sx={{ width: "100%" }}>
                  {alert.message}
                </Alert>
              </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Mannouncements;
