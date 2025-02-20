import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  IconButton,
  Menu,
  useMediaQuery,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout"; // Import Logout Icon
import { motion } from "framer-motion";
import axios from "axios";

const buttonHoverColor = "#7a5e51";

const Sprofile = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data);
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
          padding: "0 10px",
        }}
      >
        {/* Header */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Student Profile
          </Typography>
          <img src="/images/edu.png" alt="Logo" style={{ width: "90px", marginTop: "5px" }} />
        </Box>

        {/* Home Button / Menu */}
        <Box sx={{ position: "absolute", top: "10px", right: "20px" }}>
          {isSmallScreen ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "#5a3d31" }}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
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
                "&:hover": { backgroundColor: "#e7dccd", borderColor: buttonHoverColor },
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
          {loading ? (
            <CircularProgress sx={{ color: "#5a3d31" }} />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <AccountCircleIcon sx={{ fontSize: 80, color: "#5a3d31", marginBottom: "10px" }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
                {profile?.name || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#5a3d31", marginTop: "10px" }}>
                Email: {profile?.email || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#5a3d31", marginTop: "10px" }}>
                Role: {profile?.role || "Student"}
              </Typography>
            </>
          )}
        </Card>

        {/* Logout Button */}
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            marginTop: "20px",
            color: "#5a3d31",
            borderColor: "#5a3d31",
            "&:hover": { backgroundColor: "#e7dccd", borderColor: "#7a5e51" },
          }}
        >
          Logout
        </Button>
      </Box>
    </motion.div>
  );
};

export default Sprofile;
