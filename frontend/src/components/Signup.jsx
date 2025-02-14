import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState(""); // Store error messages
  const [loading, setLoading] = useState(false); // For button state
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(""); // Clear previous errors

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== cpassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role: "student", // Assuming the user is a student
      });

      alert(response.data.message); // Show success message
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Signup error:", error);

      // Handle duplicate email error
      if (error.response?.data?.error === "Email already registered") {
        setError("This email is already registered. Please use another one.");
      } else {
        setError(error.response?.data?.error || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  useEffect(() => {
    setError(""); // Clear errors when component mounts
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
        {/* Form Box */}
        <Box
          sx={{
            marginTop: "60px",
            backgroundColor: "#ede8dc",
            padding: 3,
            borderRadius: "10px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "@media (max-width: 600px)": { maxWidth: "90%", padding: "1.5rem" },
          }}
        >
          <Typography color="purple" variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Student Sign Up
          </Typography>
          <Stack spacing={2}>
            <TextField label="Full Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ maxWidth: "350px" }} />
            <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ maxWidth: "350px" }} />
            <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ maxWidth: "350px" }} />
            <TextField label="Confirm Password" type="password" variant="outlined" fullWidth value={cpassword} onChange={(e) => setCpassword(e.target.value)} sx={{ maxWidth: "350px" }} />

            {/* Display error message if any */}
            {error && <Typography color="error">{error}</Typography>}

            {/* Sign Up Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#a5b68d",
                color: "#5a3d31",
                "&:hover": { backgroundColor: "#c1cfa1" },
                maxWidth: "350px",
              }}
              onClick={handleSubmit}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            {/* Login Navigation Button */}
            <Button
              variant="text"
              fullWidth
              sx={{ textAlign: "center", color: "#5a3d31", maxWidth: "350px" }}
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </Button>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Signup;
