import React, { useState } from "react";
import { Box, Typography, Button, IconButton, Menu, MenuItem, Card, CardContent, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa"; // React Icons for Students and Teachers
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Mclass = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);

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

  const handleCardClick = (link) => {
    navigate(link);
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
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Manage Class
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
                <MenuItem onClick={handleHomeNavigate}>Home</MenuItem>
              </Menu>
            </>
          ) : (
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
          )}
        </Box>

        {/* Cards for Students and Teachers */}
        <Box sx={{ marginTop: "80px", display: "flex", gap: 3 }}>
          <Card
            sx={{
              backgroundColor: secondaryColor,
              borderRadius: "12px",
              padding: "20px",
              boxShadow: 6, // Increased shadow for hover
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#e7dccd",
              },
            }}
            onClick={() => handleCardClick("/teacher/manageclass/students")}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <FaUserGraduate size={50} />
              <Typography variant="h6" sx={{ color: "#5a3d31", fontWeight: "bold", marginTop: "10px" }}>
                Students
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: secondaryColor,
              borderRadius: "12px",
              padding: "20px",
              boxShadow: 6, // Increased shadow for hover
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#e7dccd",
              },
            }}
            onClick={() => handleCardClick("/teacher/manageclass/teachers")}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <FaChalkboardTeacher size={50} />
              <Typography variant="h6" sx={{ color: "#5a3d31", fontWeight: "bold", marginTop: "10px" }}>
                Teachers
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Mclass;
