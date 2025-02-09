// Signup.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Sign Up Submitted", name, email, password);
    navigate("/login");
  };

  const handleLoginNavigate = () => {
    navigate("/login");
  };

  
  const handleHomeNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
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
              transform: "scale(1.05)",
            },
            fontSize: "0.9rem",
            borderRadius: "20px",
            padding: "8px 20px",
            transition: "transform 0.3s ease",
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
            marginTop: "60px",
            backgroundColor: "#ede8dc",
            padding: 3,
            borderRadius: "10px",
            width: "100%",
            maxWidth: "400px", // Reduced max width for the form box to make it more compact
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            height: "auto",
            display: "flex",
            flexDirection: "column", // Force column layout
            alignItems: "center", // Center the form
            "@media (max-width: 600px)": {
              maxWidth: "90%", // Ensure form takes up most of the screen on smaller devices
              padding: "1.5rem", // Adjust padding for smaller screens
            },
          }}
        >
          {/* Right Column: Form Content */}
          <Box sx={{ padding: 3 }}>
            <Typography color="purple" variant="h5" align="center" sx={{ marginBottom: 3 }}>
              Student Sign Up
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ maxWidth: "350px" }} // Reduced width of form fields
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ maxWidth: "350px" }} // Reduced width of form fields
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ maxWidth: "350px" }} // Reduced width of form fields
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                sx={{ maxWidth: "350px" }} // Reduced width of form fields
              />

              {/* Sign Up Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#a5b68d",
                  color: "#5a3d31",
                  "&:hover": { backgroundColor: "#c1cfa1" },
                  maxWidth: "350px", // Reduced width of button
                }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>

              {/* Login Navigation Button */}
              <Button
                variant="text"
                fullWidth
                sx={{
                  textAlign: "center",
                  color: "#5a3d31",
                  maxWidth: "350px", // Reduced width of button
                }}
                onClick={handleLoginNavigate}
              >
                Already have an account? Login
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Signup;
