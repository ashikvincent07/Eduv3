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

const Gradecard = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [studentsData] = useState([
    { name: "John Doe", mark: "" },
    { name: "Jane Smith", mark: "" },
    { name: "Alice Johnson", mark: "" },
  ]);

  const handleAlertClose = () => setAlert({ ...alert, open: false });

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleCardClick = () => {
    setShowTable(true);
  };

  const handleMarkChange = (index, value) => {
    const updatedData = [...studentsData];
    updatedData[index].mark = value;
    setAlert({ open: true, type: "success", message: "Mark updated successfully!" });
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
          padding: "px 0",
        }}
      >
        {/* Top Section with Heading and Logo */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Grade Card
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

        {/* Card or Table */}
        {!showTable ? (
          <Card
            sx={{
              width: "90%",
              maxWidth: "600px",
              marginTop: "80px",
              textAlign: "center",
              cursor: "pointer",
              padding: "20px",
              backgroundColor: "#f5e6d7", // Changed card color
            }}
            onClick={handleCardClick}
          >
            <Typography variant="h6" sx={{ color: "#5a3d31" }}>
              Internal 1
            </Typography>
          </Card>
        ) : (
          <Card sx={{ width: "90%", maxWidth: "600px", marginTop: "80px" }}>
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Student Name</strong></TableCell>
                      <TableCell align="center"><strong>Mark</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentsData.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell align="center">
                          <input
                            type="number"
                            value={student.mark}
                            onChange={(e) => handleMarkChange(index, e.target.value)}
                            style={{ width: "100%", textAlign: "center" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

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

export default Gradecard;
