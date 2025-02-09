// Tlogin.jsx
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Tlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Handle the login functionality here (you can add authentication logic)
    console.log("Teacher Login Submitted", email, password);
  };

  const handleHomeNavigate = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Box
        sx={{
          height: "100vh",
          width: "100vw", // Full width
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e7cccc",
          padding: 2,
          position: "relative",
        }}
      >
        {/* Title Screen Button */}
        <Button
          onClick={handleHomeNavigate}
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "#a5b68d",
            color: "#5a3d31",
            "&:hover": {
              backgroundColor: "#c1cfa1",
              transform: "scale(1.05)", // Zoom effect on hover
            },
            fontSize: "0.9rem",
            borderRadius: "20px",
            padding: "8px 20px",
            transition: "transform 0.3s ease", // Zoom-in effect
          }}
        >
          Home
        </Button>

        {/* Left Column: Logo on top left corner */}
        <Box
          sx={{
            position: "absolute",
            top: "20px",  // Align to top
            left: "20px", // Align to left
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="./images/edu.png"
            alt="EduConnect Logo"
            style={{
              width: "80px",
              height: "auto",
            }}
          />
        </Box>

        {/* Form Box */}
        <Box
          sx={{
            backgroundColor: "#ede8dc",
            padding: 3,
            borderRadius: "10px",
            width: "100%",
            maxWidth: "400px", // Adjusted max-width for responsive design
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            "@media (max-width: 600px)": {
              maxWidth: "90%", // Make the form take more space on smaller screens
              padding: "2rem", // Padding adjusted for smaller screens
            },
          }}
        >
          <Typography color="purple" variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Teacher Login
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#a5b68d",
                color: "#5a3d31",
                "&:hover": { backgroundColor: "#c1cfa1" },
              }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Tlogin;
