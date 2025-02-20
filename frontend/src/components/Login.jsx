import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store error messages
  const [loading, setLoading] = useState(false); // Button loading state
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Extract token and user details
      const { token, user } = response.data;

      // Check if the user has the role of "student"
      if (user.role !== "student") {
        setError("Access denied. Only students can log in here.");
        setLoading(false);
        return;
      }

      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/student"); // Redirect to student dashboard
    } catch (error) {
      setError(error.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupNavigate = () => navigate("/signup");
  const handleHomeNavigate = () => navigate("/");

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
        {/* Home Button */}
        <Button
          onClick={handleHomeNavigate}
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "#a5b68d",
            color: "#5a3d31",
            "&:hover": { backgroundColor: "#c1cfa1", transform: "scale(1.05)" },
            fontSize: "0.9rem",
            borderRadius: "20px",
            padding: "8px 20px",
            transition: "transform 0.3s ease",
          }}
        >
          Home
        </Button>

        {/* Logo */}
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            left: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="./images/edu.png" alt="EduConnect Logo" style={{ width: "80px", height: "auto" }} />
        </Box>

        {/* Form Box */}
        <Box
          sx={{
            backgroundColor: "#ede8dc",
            padding: 3,
            borderRadius: "10px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            "@media (max-width: 600px)": { maxWidth: "90%", padding: "2rem" },
          }}
        >
          <Typography color="purple" variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Student Login
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

            {/* Display error message if any */}
            {error && <Typography color="error">{error}</Typography>}

            {/* Login Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#a5b68d",
                color: "#5a3d31",
                "&:hover": { backgroundColor: "#c1cfa1" },
              }}
              onClick={handleSubmit}
              disabled={loading} // Disable while loading
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Sign Up Navigation */}
            <Button
              variant="text"
              fullWidth
              sx={{ textAlign: "center", color: "#5a3d31" }}
              onClick={handleSignupNavigate}
            >
              Don't have an account? Sign Up
            </Button>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Login;
