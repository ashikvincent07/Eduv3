import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  Menu,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion"; // Importing framer-motion

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Lstudents = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleAlertClose = () => setAlert({ ...alert, open: false });

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const studentsData = [
    { name: "John Doe", assignment1: 85, assignment2: 90, internal1: 78, internal2: 88 },
    { name: "Jane Smith", assignment1: 92, assignment2: 88, internal1: 84, internal2: 91 },
    { name: "Alice Johnson", assignment1: 76, assignment2: 80, internal1: 70, internal2: 75 },
  ];

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
          padding: "px 0",
        }}
      >
        {/* Top Section with Heading and Logo */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Students List
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

        {/* Back Button for Larger Screens */}
        {!isSmallScreen && (
          <Box
            sx={{
              position: "fixed", // Use fixed position to pin it to the top-left
              top: "10px",
              left: "20px",
              zIndex: 1000, // Ensure it's on top of other elements
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(-1)} // Goes back to the previous page
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
          </Box>
        )}

        {/* Home Button or Dropdown for Smaller Screens */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "10px",
            right: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {isSmallScreen ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: "#5a3d31",
                }}
              >
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
                <MenuItem onClick={() => navigate("/teacher")}>Home</MenuItem>
                <MenuItem onClick={() => navigate(-1)}>Back</MenuItem> {/* Added Back option */}
              </Menu>
            </>
          ) : (
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
        </Box>

        {/* Table for Students List */}
        <Card sx={{ width: "90%", maxWidth: "1200px", marginTop: "80px" }}>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell align="center"><strong>Assignment 1</strong></TableCell>
                    <TableCell align="center"><strong>Assignment 2</strong></TableCell>
                    <TableCell align="center"><strong>Internal 1</strong></TableCell>
                    <TableCell align="center"><strong>Internal 2</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentsData.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell align="center">{student.assignment1}</TableCell>
                      <TableCell align="center">{student.assignment2}</TableCell>
                      <TableCell align="center">{student.internal1}</TableCell>
                      <TableCell align="center">{student.internal2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

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

export default Lstudents;
