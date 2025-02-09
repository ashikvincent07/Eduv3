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
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";

const primaryColor = "#e7cccc";
const buttonHoverColor = "#7a5e51";

const Req = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [requests, setRequests] = useState([
    { id: 1, title: "S6BCAB", description: "OS" },
    { id: 2, title: "S4BBA", description: "BS" },
  ]);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState(null);

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
    navigate("/teacher/classroom");
    handleMenuClose();
  };

  const handleDeleteRequest = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    setAlert({ open: true, type: "success", message: "Request deleted successfully!" });
  };

  const handleDeleteConfirmationOpen = (id) => {
    setDeleteRequestId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setConfirmDeleteOpen(false);
    setDeleteRequestId(null);
  };

  const handleDeleteConfirmed = () => {
    handleDeleteRequest(deleteRequestId);
    setConfirmDeleteOpen(false);
    setDeleteRequestId(null);
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
          padding: "px 0",
          position: "relative",
        }}
      >
        {/* Top Section with Heading and Logo */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Pending Requests
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
                <MenuItem onClick={handleManageNavigate}>Manage Requests</MenuItem>
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

        {/* List of Requests */}
        <Grid container spacing={3} sx={{ justifyContent: "center", marginTop: "80px" }}>
          {requests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  backgroundColor: primaryColor,
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{request.title}</Typography>
                <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                  {request.description}
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteConfirmationOpen(request.id)}
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
              </Paper>
            </Grid>
          ))}
        </Grid>

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
              Are you sure you want to delete this request?
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

export default Req;