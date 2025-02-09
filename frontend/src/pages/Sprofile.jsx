import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Sprofile = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [menuAnchor, setMenuAnchor] = React.useState(null);

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
            Student Profile
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
                <MenuItem onClick={() => navigate("/student")}>Home</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={() => navigate("/student")}
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

        {/* Profile Card */}
        <Card
          sx={{
            width: "70%",
            maxWidth: "600px",
            marginTop: "80px",
            textAlign: "center",
            borderRadius: "20px",
            padding: "20px",
            backgroundColor: "#f5e6d7",
          }}
        >
          <AccountCircleIcon
            sx={{ fontSize: 80, color: "#5a3d31", marginBottom: "10px" }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#5a3d31" }}
          >
            Adam White
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#5a3d31", marginTop: "10px" }}
          >
            Email: adam.white@example.com
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#5a3d31", marginTop: "10px" }}
          >
            Class: Science
          </Typography>
        </Card>
      </Box>
    </motion.div>
  );
};

export default Sprofile;
