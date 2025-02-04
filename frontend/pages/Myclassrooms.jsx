import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  IconButton,
  Menu,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { motion } from "framer-motion"; // Importing framer-motion

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const MyClassrooms = () => {
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
            My Classrooms
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

        {/* Home Button or Dropdown */}
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

        {/* Cards for Other Options */}
        <Grid
          container
          spacing={3}
          sx={{ marginTop: "40px", justifyContent: "center", px: 2 }}
        >
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                backgroundColor: primaryColor,
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate("/teacher/myclassroom/studentslist")}
            >
              <CardContent>
                <SchoolIcon sx={{ fontSize: 40, color: "#5a3d31" }} />
                <Typography variant="h6" sx={{ color: "#5a3d31", marginTop: "10px" }}>
                  Students List
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                backgroundColor: primaryColor,
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate("/teacher/myclassroom/gradecard")}
            >
              <CardContent>
                <GradeIcon sx={{ fontSize: 40, color: "#5a3d31" }} />
                <Typography variant="h6" sx={{ color: "#5a3d31", marginTop: "10px" }}>
                  Grade Card
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                backgroundColor: primaryColor,
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate("/teacher/myclassroom/assignmentmark")}
            >
              <CardContent>
                <AssignmentIcon sx={{ fontSize: 40, color: "#5a3d31" }} />
                <Typography variant="h6" sx={{ color: "#5a3d31", marginTop: "10px" }}>
                  Assignment Mark
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

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

export default MyClassrooms;
