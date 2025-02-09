import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Snackbar, Alert, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { FaFileAlt, FaBook } from "react-icons/fa"; // React Icons for Assignment and Notes
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Assignotes = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

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

 

  const handleCardClick = (link) => {
    navigate(link);
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
            Assignments & Notes
          </Typography>
          <img
            src="../images/edu.png"
            alt="Logo"
            style={{
              height: "auto",
              width: "90px",
              objectFit: "contain",
              marginTop: "5px",
            }}
          />
        </Box>

        {/* Menu Section for Small Screens */}
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

        {/* Cards for Assignments & Notes */}
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: secondaryColor,
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: 3,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#e7dccd",
                  },
                }}
                onClick={() => handleCardClick("/teacher/assignotes/assignments")}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <FaFileAlt size={50} />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#5a3d31",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Assignments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: secondaryColor,
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: 3,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#e7dccd",
                  },
                }}
                onClick={() => handleCardClick("/teacher/assignotes/notes")}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <FaBook size={50} />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#5a3d31",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Notes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Snackbar for Alerts */}
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity={alert.type} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Assignotes;
