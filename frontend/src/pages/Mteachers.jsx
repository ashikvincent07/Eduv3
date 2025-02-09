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
import { motion } from "framer-motion";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Mteachers = () => {
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

  const teachersData = [
    { name: "Mr. John", subject: "Operating Systems" },
    { name: "Ms. Jane", subject: "Computer Networks" },
    { name: "Mr. Smith", subject: "Android Development" },
    { name: "Ms. Alice", subject: "Life Skills" },
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
            Teachers List
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
              position: "fixed",
              top: "10px",
              left: "20px",
              zIndex: 1000,
            }}
          >
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
                <MenuItem onClick={() => navigate(-1)}>Back</MenuItem>
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

        {/* Table for Teachers List */}
        <Card sx={{ width: "90%", maxWidth: "1200px", marginTop: "80px" }}>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Teacher Name</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Subject</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teachersData.map((teacher, index) => (
                    <TableRow key={index}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell align="center">{teacher.subject}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            setAlert({
                              open: true,
                              type: "warning",
                              message: `${teacher.name} has been kicked out!`,
                            })
                          }
                        >
                          Kick Out
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Snackbar Alert */}
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
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

export default Mteachers;
