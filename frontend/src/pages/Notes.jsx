import React, { useState } from "react";
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
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Notes = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [heading, setHeading] = useState("");
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget); // Opens the menu
  };

  const handleMenuClose = () => {
    setMenuAnchor(null); // Closes the menu
  };

  const handleHomeNavigate = () => {
    navigate("/teacher/assignotes");
    handleMenuClose();
  };

  const handleManageNavigate = () => {
    navigate("/teacher/assignotes/notes/manage");
    handleMenuClose();
  };

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 10485760) { // 10MB limit
      setFile(selectedFile);
    } else {
      setAlert({
        open: true,
        type: "error",
        message: "File size should be less than 10MB!",
      });
    }
  };

  const handleSubmit = () => {
    if (!heading.trim()) {
      setAlert({ open: true, type: "error", message: "Heading is required!" });
      return;
    }

    if (!file) {
      setAlert({ open: true, type: "error", message: "File is required!" });
      return;
    }

    setAlert({
      open: true,
      type: "success",
      message: "Notes uploaded successfully!",
    });

    // Simulate form submission
    console.log("Heading:", heading);
    console.log("File:", file);
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
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
          position: "relative",
        }}
      >
        {/* Top Section with Heading and Logo */}
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            padding: "",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#5a3d31",
            }}
          >
            Upload Notes
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

        <Paper
          elevation={3}
          sx={{
            margin: "100px auto 0",
            maxWidth: "600px",
            width: "90%",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: primaryColor,
          }}
        >
          <TextField
            label="Notes Heading"
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

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <Button
              variant="outlined"
              component="label"
              sx={{
                backgroundColor: secondaryColor,
                borderRadius: "8px",
                width: "100%",
                padding: "10px",
                textAlign: "center",
                "&:hover": {
                  backgroundColor: buttonHoverColor,
                },
              }}
            >
              Upload Notes
              <input
                type="file"
                accept="application/pdf,application/msword,.docx,.pptx,.txt,.zip"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {file && (
              <Box sx={{ marginLeft: "10px", textAlign: "left", flexShrink: 0 }}>
                <Typography variant="body2" sx={{ color: "#5a3d31" }}>
                  {file.name} ({(file.size / 1048576).toFixed(2)} MB)
                </Typography>
              </Box>
            )}
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
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
            Upload Notes
          </Button>
        </Paper>

        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alert.type}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Notes;
